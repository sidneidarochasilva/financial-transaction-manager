<template>
  <header class="bg-white/95 backdrop-blur-md shadow-sm py-6 sticky top-0 z-50">
    <div class="w-full max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 items-start">
        <div class="flex items-center gap-4">
          <svg class="w-10 h-10 md:w-12 md:h-12 text-[#667eea] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h1 class="m-0 text-2xl md:text-3xl font-bold bg-gradient-to-br from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">Gerenciador Financeiro</h1>
            <p class="mt-1 text-sm text-slate-500 text-[0.8125rem] md:text-[0.875rem]">Controle suas finanças de forma simples e eficiente</p>
          </div>
        </div>
        <ds-button variant="success" size="lg" @click="$emit('open-add-modal')">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Nova Transação
        </ds-button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { DsButton } from '@design-system'

defineEmits<{
  'open-add-modal': []
}>()
</script>
