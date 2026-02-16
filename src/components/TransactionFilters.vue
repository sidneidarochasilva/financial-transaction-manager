<template>
  <div class="flex flex-col md:flex-row gap-6 items-end mb-6">
    <div class="w-full md:w-auto">
      <label class="block mb-2 text-sm font-medium text-slate-700">Tipo</label>
      <div class="flex gap-2 flex-wrap">
        <button
          :class="['inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border rounded-lg cursor-pointer transition-all duration-200', filterType === 'all' ? 'bg-sky-500 text-white border-sky-500 hover:bg-sky-600 hover:border-sky-600' : 'text-slate-500 bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300']"
          @click="handleFilterChange('all')"
        >
          Todos
        </button>
        <button
          :class="['inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border rounded-lg cursor-pointer transition-all duration-200', filterType === 'income' ? 'bg-green-600 text-white border-green-600 hover:bg-green-700 hover:border-green-700' : 'text-slate-500 bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300']"
          @click="handleFilterChange('income')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
          Entradas
        </button>
        <button
          :class="['inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border rounded-lg cursor-pointer transition-all duration-200', filterType === 'expense' ? 'bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600' : 'text-slate-500 bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300']"
          @click="handleFilterChange('expense')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
          </svg>
          Saídas
        </button>
      </div>
    </div>

    <div class="w-full md:flex-1">
      <div class="relative flex items-center">
        <svg class="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchInput"
          type="text"
          class="w-full py-2.5 pl-12 pr-12 text-base font-inherit text-slate-800 bg-white border border-slate-300 rounded-lg transition-all duration-200 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
          placeholder="Buscar por descrição..."
          @input="handleSearchInput"
        />
        <button
          v-if="searchInput || filterType !== 'all'"
          class="absolute right-2 flex items-center justify-center w-8 h-8 p-0 bg-transparent border-none rounded-md text-slate-500 cursor-pointer transition-all duration-200 hover:bg-slate-100 hover:text-slate-800"
          type="button"
          @click="handleClear"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TransactionType } from '@/types/transaction'

export interface TransactionFiltersProps {
  filterType?: TransactionType | 'all'
  searchQuery?: string
}

const props = withDefaults(defineProps<TransactionFiltersProps>(), {
  filterType: 'all',
  searchQuery: '',
})

const emit = defineEmits<{
  'update:filterType': [type: TransactionType | 'all']
  'update:searchQuery': [query: string]
  clear: []
}>()

const searchInput = ref(props.searchQuery)

const handleFilterChange = (type: TransactionType | 'all') => {
  emit('update:filterType', type)
}

const handleSearchInput = () => {
  emit('update:searchQuery', searchInput.value)
}

const handleClear = () => {
  searchInput.value = ''
  emit('update:filterType', 'all')
  emit('update:searchQuery', '')
  emit('clear')
}
</script>
