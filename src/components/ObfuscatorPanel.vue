<script setup lang="ts">
import { ref } from 'vue'
import { useObfuscation } from '../composables/useObfuscation'

const rawCode = ref('')
const obfuscated = ref('')
const preset = ref<'light' | 'medium' | 'strong'>('light')
const isProcessing = ref(false)
const progress = ref(0)
const resultFilename = ref('obfuscated.js')
const showPreview = ref(true)
const fileName = ref<string | null>(null)
const { obfuscate, cancel } = useObfuscation()

const handleObfuscate = async () => {
  if (!rawCode.value.trim()) return
  isProcessing.value = true
  progress.value = 0
  try {
    const result = await obfuscate(rawCode.value, preset.value, (p: number) => {
      progress.value = p
    })
    obfuscated.value = result.code
    isProcessing.value = false
    progress.value = 100
  } catch (err) {
    isProcessing.value = false
    alert('混淆失敗：' + (err as Error).message)
  }
}

const handlePickFile = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  fileName.value = file.name
  const text = await file.text()
  rawCode.value = text
}

const handleExport = () => {
  if (!obfuscated.value) return
  const blob = new Blob([obfuscated.value], { type: 'application/javascript' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = resultFilename.value || 'obfuscated.js'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const handleCancel = () => {
  cancel()
  isProcessing.value = false
}
</script>

<template>
  <div class="panel ink-wash">
    <div class="panel-header">
      <h2>JavaScript 混淆</h2>
      <p class="muted">全程離線，代碼不上傳任何伺服器。界面文案寫「混淆」，不承諾「加密」或「無法破解」。</p>
    </div>

    <div class="grid">
      <div class="input-card card">
        <div class="card-head">
          <span class="tag">輸入</span>
          <label class="btn btn-ghost small">
            選擇檔案
            <input type="file" accept=".js,.mjs,.cjs" class="hidden" @change="handlePickFile" />
          </label>
          <span v-if="fileName" class="muted small">{{ fileName }}</span>
        </div>
        <textarea
          v-model="rawCode"
          class="textarea input"
          placeholder="在此貼上 JavaScript 代碼，或點選「選擇檔案」載入..."
          @input="showPreview = true"
        ></textarea>
        <div class="char-count">{{ rawCode.length }} 個字元</div>
      </div>

      <div class="controls card">
        <div class="card-head"><span class="tag">預設</span></div>
        <div class="preset-group">
          <label class="preset-item">
            <input type="radio" name="preset" value="light" v-model="preset" />
            <span>輕量（改名 + 壓縮）</span>
          </label>
          <label class="preset-item">
            <input type="radio" name="preset" value="medium" v-model="preset" />
            <span>標準（字符串數組 + 控制流扁平化）</span>
          </label>
          <label class="preset-item">
            <input type="radio" name="preset" value="strong" v-model="preset" />
            <span>強力（含死代碼注入，體積與性能較大）</span>
          </label>
        </div>
        <div class="actions">
          <button class="btn btn-primary" @click="handleObfuscate" :disabled="isProcessing || !rawCode.trim()">
            {{ isProcessing ? '混淆中…' : '開始混淆' }}
          </button>
          <button v-if="isProcessing" class="btn btn-danger" @click="handleCancel">取消</button>
        </div>
        <div v-if="progress > 0 && progress < 100" class="progress">
          <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
    </div>

    <div v-if="obfuscated" class="output-card card">
      <div class="card-head">
        <span class="tag">輸出</span>
        <button class="btn btn-ghost small" @click="showPreview = !showPreview">
          {{ showPreview ? '隱藏預覽' : '預覽結果' }}
        </button>
      </div>
      <div v-if="showPreview" class="preview">
        <pre><code>{{ obfuscated }}</code></pre>
      </div>
      <div class="actions">
        <input
          v-model="resultFilename"
          class="input small"
          placeholder="輸出檔名"
        />
        <button class="btn btn-primary" @click="handleExport">導出檔案</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel {
  max-width: 900px;
  margin: 0 auto;
}
.panel-header {
  margin-bottom: var(--space-xl);
}
.grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--space-lg);
  align-items: start;
}
@media (max-width: 720px) {
  .grid { grid-template-columns: 1fr; }
}
.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-md);
}
.tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: var(--color-tag);
  color: var(--color-ink);
}
.char-count {
  margin-top: var(--space-sm);
  font-size: 12px;
  color: var(--color-ink-tertiary);
  text-align: right;
}
.preset-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
.preset-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  cursor: pointer;
  min-height: var(--hit-area-min);
}
.preset-item input { margin: 0; }
.preset-item span { font-size: 13px; color: var(--color-ink); }
.actions {
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
  flex-wrap: wrap;
}
.progress {
  margin-top: var(--space-sm);
  height: 6px;
  background: var(--color-surface-raised);
  border-radius: 3px;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  background: var(--color-accent);
  transition: width 200ms ease;
}
.output-card {
  margin-top: var(--space-lg);
}
.preview {
  margin-top: var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-1);
  overflow: auto;
  max-height: 320px;
}
.preview pre {
  padding: var(--space-md);
  margin: 0;
  font-family: ui-monospace, 'Cascadia Code', 'Fira Code', monospace;
  font-size: 12px;
  line-height: 1.5;
  color: var(--color-ink);
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
