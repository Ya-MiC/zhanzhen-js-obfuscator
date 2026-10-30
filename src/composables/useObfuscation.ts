import { ref } from 'vue'

export function useObfuscation() {
  let worker: Worker | null = null

  const obfuscate = (code: string, preset: 'light' | 'medium' | 'strong', onProgress: (p: number) => void) => {
    return new Promise<{ code: string }>((resolve, reject) => {
      worker = new Worker(new URL('../workers/obfuscate.worker.ts', import.meta.url))

      worker.onmessage = (e: MessageEvent) => {
        const { type, payload } = e.data
        if (type === 'progress') {
          onProgress(payload)
        } else if (type === 'done') {
          worker!.terminate()
          worker = null
          resolve({ code: payload })
        } else if (type === 'error') {
          worker!.terminate()
          worker = null
          reject(new Error(payload))
        }
      }
      worker.onerror = (err) => {
        worker = null
        reject(err)
      }

      worker.postMessage({ code, preset })
    })
  }

  const cancel = () => {
    if (worker) {
      worker.terminate()
      worker = null
    }
  }

  return { obfuscate, cancel }
}
