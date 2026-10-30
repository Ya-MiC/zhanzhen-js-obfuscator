<script setup lang="ts">
import { ref } from 'vue'

const theme = ref<'light-a' | 'light-b' | 'dark-a' | 'dark-b'>('light-a')

const applyTheme = (t: string) => {
  document.documentElement.setAttribute('data-theme', t)
  localStorage.setItem('zhanzhen-theme', t)
}

const toggleTheme = () => {
  const order: ('light-a' | 'light-b' | 'dark-a' | 'dark-b')[] = ['light-a', 'light-b', 'dark-a', 'dark-b']
  const idx = order.indexOf(theme.value)
  theme.value = order[(idx + 1) % order.length]
  applyTheme(theme.value)
}
</script>

<template>
  <button class="btn btn-ghost" @click="toggleTheme" :aria-label="`切換主題：${theme}`">
    <span class="muted small">{{ theme === 'light-a' || theme === 'light-b' ? '🌙' : '☀️' }}</span>
    <span class="small">{{ theme }}</span>
  </button>
</template>

<style scoped>
.btn-ghost {
  min-width: auto;
  min-height: auto;
  padding: var(--space-xs) var(--space-sm);
  font-size: 12px;
}
</style>
