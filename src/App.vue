<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useObfuscation } from './composables/useObfuscation'
import ThemeToggle from './components/ThemeToggle.vue'
import ObfuscatorPanel from './components/ObfuscatorPanel.vue'

const activeTab = ref<'obfuscate' | 'settings'>('obfuscate')
</script>

<template>
  <div class="app" :class="`theme-${theme}`">
    <header class="app-header">
      <div class="brand">
        <div class="badge" aria-label="晏銘湛箴 家族徽章位">◆</div>
        <div class="brand-text">
          <div class="brand-name">晏銘湛箴</div>
          <div class="brand-desc">本地優先 JavaScript 混淆器 · 全程離線</div>
        </div>
      </div>
      <ThemeToggle />
    </header>

    <main class="app-main">
      <nav class="app-nav">
        <button
          class="nav-item"
          :class="{ active: activeTab === 'obfuscate' }"
          @click="activeTab = 'obfuscate'"
        >
          混淆
        </button>
        <button
          class="nav-item"
          :class="{ active: activeTab === 'settings' }"
          @click="activeTab = 'settings'"
        >
          設置
        </button>
      </nav>

      <div class="app-content">
        <ObfuscatorPanel v-if="activeTab === 'obfuscate'" />
        <div v-else class="empty-state">
          <p class="muted">設置頁面敬請期待。</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-lg);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
}
.brand {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}
.badge {
  width: 32px;
  height: 32px;
  border: 2px solid var(--color-brand);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: var(--color-brand);
  font-size: 18px;
}
.brand-text {
  display: flex;
  flex-direction: column;
}
.brand-name {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 600;
  color: var(--color-ink);
}
.brand-desc {
  font-size: 12px;
  color: var(--color-ink-secondary);
}
.app-nav {
  display: flex;
  gap: var(--space-sm);
  padding: var(--space-sm);
  background: var(--color-surface-raised);
  border-bottom: 1px solid var(--color-border);
}
.nav-item {
  padding: var(--space-sm) var(--space-md);
  border: none;
  background: transparent;
  color: var(--color-ink-secondary);
  border-radius: var(--radius-md);
  font-size: 14px;
  cursor: pointer;
  min-width: var(--hit-area-min);
  min-height: var(--hit-area-min);
}
.nav-item.active {
  background: var(--color-accent);
  color: var(--color-on-accent);
}
.nav-item:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}
.app-content {
  flex: 1;
  padding: var(--space-lg);
  overflow: auto;
}
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: var(--color-ink-tertiary);
}
</style>
