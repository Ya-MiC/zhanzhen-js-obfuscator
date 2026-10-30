// Web Worker：在背景執行 javascript-obfuscator，避免阻塞 UI 主執行緒
// javascript-obfuscator 授權：BSD-2-Clause（寬鬆，可商用）
// 來源：https://github.com/javascript-obfuscator/javascript-obfuscator (LICENSE: BSD-2-Clause)

import { obfuscate as jsObfuscate } from 'javascript-obfuscator'

const presets: Record<string, any> = {
  light: {
    compact: true,
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: false,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: false,
    simplify: true,
    splitStrings: false,
    stringArray: false,
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false,
  },
  medium: {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: false,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    simplify: true,
    splitStrings: true,
    splitStringsThreshold: 0.75,
    stringArray: true,
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false,
  },
  strong: {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    simplify: true,
    splitStrings: true,
    splitStringsThreshold: 0.75,
    stringArray: true,
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false,
  },
}

self.onmessage = async (e: MessageEvent) => {
  const { code, preset } = e.data
  const config = presets[preset] || presets.light

  try {
    // 進度回報（js-obfuscator 無內建進度事件，此處以階段模擬）
    self.postMessage({ type: 'progress', payload: 30 })

    const result = jsObfuscate(code, config)

    self.postMessage({ type: 'progress', payload: 70 })

    self.postMessage({
      type: 'done',
      payload: result.getObfuscatedCode(),
    })
  } catch (err: any) {
    self.postMessage({
      type: 'error',
      payload: err?.message || String(err),
    })
  }
}
