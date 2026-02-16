<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <ds-card class="bg-white transition-all duration-300" hoverable>
      <div class="flex items-center gap-4">
        <div class="flex items-center justify-center w-14 h-14 rounded-xl shrink-0 bg-gradient-to-br from-green-100 to-green-200 text-green-700">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="m-0 mb-1 text-sm font-medium text-slate-500">Total de Entradas</p>
          <p class="m-0 text-xl lg:text-2xl font-bold leading-tight whitespace-nowrap overflow-hidden text-ellipsis text-green-700" :title="formatCurrency(totalIncome)">{{ formatCurrency(totalIncome) }}</p>
        </div>
      </div>
    </ds-card>

    <ds-card class="bg-white transition-all duration-300" hoverable>
      <div class="flex items-center gap-4">
        <div class="flex items-center justify-center w-14 h-14 rounded-xl shrink-0 bg-gradient-to-br from-red-100 to-red-200 text-red-700">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="m-0 mb-1 text-sm font-medium text-slate-500">Total de Saídas</p>
          <p class="m-0 text-xl lg:text-2xl font-bold leading-tight whitespace-nowrap overflow-hidden text-ellipsis text-red-700" :title="formatCurrency(totalExpense)">{{ formatCurrency(totalExpense) }}</p>
        </div>
      </div>
    </ds-card>

    <ds-card class="bg-white transition-all duration-300" hoverable>
      <div class="flex items-center gap-4">
        <div :class="['flex items-center justify-center w-14 h-14 rounded-xl shrink-0', balance >= 0 ? 'bg-gradient-to-br from-green-100 to-green-200 text-green-700' : 'bg-gradient-to-br from-red-100 to-red-200 text-red-700']">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="m-0 mb-1 text-sm font-medium text-slate-500">Saldo</p>
          <p :class="['m-0 text-xl lg:text-2xl font-bold leading-tight whitespace-nowrap overflow-hidden text-ellipsis', balance >= 0 ? 'text-green-700' : 'text-red-700']" :title="formatCurrency(balance)">{{ formatCurrency(balance) }}</p>
        </div>
      </div>
    </ds-card>

    <ds-card class="bg-white transition-all duration-300" padding="sm">
      <div class="mb-4 px-3 pt-3">
        <h3 class="m-0 text-base font-semibold text-slate-800">Receitas vs Despesas</h3>
      </div>
      <div class="flex gap-8 items-end justify-center h-[200px] p-4 mb-4 md:h-[150px]">
        <div class="flex-1 max-w-[100px] h-full flex items-end">
          <div class="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500 ease-out flex items-start justify-center pt-2 min-h-[40px]" :style="{ height: incomePercentage + '%' }">
            <span class="text-sm font-semibold text-white">{{ Math.round(incomePercentage) }}%</span>
          </div>
        </div>
        <div class="flex-1 max-w-[100px] h-full flex items-end">
          <div class="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg transition-all duration-500 ease-out flex items-start justify-center pt-2 min-h-[40px]" :style="{ height: expensePercentage + '%' }">
            <span class="text-sm font-semibold text-white">{{ Math.round(expensePercentage) }}%</span>
          </div>
        </div>
      </div>
      <div class="flex gap-6 justify-center p-3 border-t border-slate-100">
        <div class="flex items-center gap-2 text-sm text-slate-500">
          <span class="w-3 h-3 rounded-full bg-green-500"></span>
          <span>Receitas</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-slate-500">
          <span class="w-3 h-3 rounded-full bg-red-500"></span>
          <span>Despesas</span>
        </div>
      </div>
    </ds-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DsCard } from '@design-system'

export interface FinancialSummaryProps {
  totalIncome: number
  totalExpense: number
  balance: number
}

const props = defineProps<FinancialSummaryProps>()

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

const incomePercentage = computed(() => {
  const total = props.totalIncome + props.totalExpense
  return total > 0 ? (props.totalIncome / total) * 100 : 0
})

const expensePercentage = computed(() => {
  const total = props.totalIncome + props.totalExpense
  return total > 0 ? (props.totalExpense / total) * 100 : 0
})
</script>
