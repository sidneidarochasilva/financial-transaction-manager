<template>
  <div class="bg-white rounded-xl shadow-sm overflow-hidden">
    <div class="flex items-center justify-between p-6 border-b border-slate-100">
      <h2 class="m-0 text-xl font-semibold text-slate-800">Transações</h2>
      <div class="transaction-list-count">
        <ds-badge variant="primary" size="lg">
          {{ filteredCount }} de {{ totalCount }} transações
        </ds-badge>
      </div>
    </div>

    <div class="relative h-[600px] overflow-hidden">
      <div v-if="loading" class="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-10 text-slate-500">
        <div class="w-12 h-12 border-4 border-slate-200 border-t-sky-500 rounded-full animate-spin mb-4"></div>
        <p>Carregando transações...</p>
      </div>

      <div v-if="transactions.length === 0 && !loading" class="h-full flex flex-col items-center justify-center text-slate-500">
        <svg class="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p>Nenhuma transação encontrada</p>
      </div>

      <div v-show="transactions.length > 0" class="h-full overflow-y-auto overflow-x-hidden" ref="scrollContainer">
        <div
          class="relative w-full"
          :style="{ height: virtualHeight + 'px' }"
        >
          <div
            class="absolute top-0 left-0 right-0 px-6 py-3"
            v-for="item in visibleTransactions"
            :key="item.data.id"
            :style="{ transform: `translateY(${item.offset}px)` }"
          >
            <ds-card padding="md" hoverable>
              <div class="w-full">
                <div class="flex items-center justify-between gap-4 flex-col md:flex-row md:items-start">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-3 mb-2">
                      <h3 class="m-0 text-base font-semibold text-slate-800 whitespace-nowrap overflow-hidden text-ellipsis">{{ item.data.description }}</h3>
                      <ds-badge
                        :variant="item.data.type === 'income' ? 'success' : 'danger'"
                        size="sm"
                      >
                        {{ item.data.type === 'income' ? 'Entrada' : 'Saída' }}
                      </ds-badge>
                    </div>
                    <div class="flex items-center gap-2 text-sm text-slate-500">
                      <span class="font-medium">
                        {{ categoryLabels[item.data.category] }}
                      </span>
                      <span class="text-slate-300">•</span>
                      <span>
                        {{ formatDate(item.data.date) }}
                      </span>
                    </div>
                  </div>
                  <div class="flex flex-col items-end gap-2 w-full md:w-auto md:flex-row md:justify-between md:items-center">
                    <p :class="['m-0 text-xl font-bold whitespace-nowrap md:text-lg', item.data.type === 'income' ? 'text-green-700' : 'text-red-700']">
                      {{ formatCurrency(item.data.value, item.data.type) }}
                    </p>
                    <ds-button
                      variant="danger"
                      size="sm"
                      @click="handleDelete(item.data)"
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </ds-button>
                  </div>
                </div>
              </div>
            </ds-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import type { Transaction } from '@/types/transaction'
import { categoryLabels } from '@/types/transaction'
import { DsCard, DsBadge, DsButton } from '@design-system'

export interface TransactionListProps {
  transactions: Transaction[]
  totalCount: number
  filteredCount: number
  loading?: boolean
}

const props = defineProps<TransactionListProps>()

const emit = defineEmits<{
  delete: [transaction: Transaction]
}>()

const ITEM_HEIGHT = 120 // Approximate height per item
const BUFFER_SIZE = 3 // Number of extra items to render above/below viewport

const scrollContainer = ref<HTMLElement>()
const scrollTop = ref(0)
const containerHeight = ref(800)

interface VirtualItem {
  data: Transaction
  offset: number
  index: number
}

const virtualHeight = computed(() => {
  return props.transactions.length * ITEM_HEIGHT
})

const visibleRange = computed(() => {
  const start = Math.max(0, Math.floor(scrollTop.value / ITEM_HEIGHT) - BUFFER_SIZE)
  const visibleCount = Math.ceil(containerHeight.value / ITEM_HEIGHT)
  const end = Math.min(
    props.transactions.length,
    start + visibleCount + BUFFER_SIZE * 2
  )
  return { start, end }
})

const visibleTransactions = computed<VirtualItem[]>(() => {
  const { start, end } = visibleRange.value
  const items: VirtualItem[] = []
  
  for (let i = start; i < end; i++) {
    items.push({
      data: props.transactions[i],
      offset: i * ITEM_HEIGHT,
      index: i,
    })
  }
  
  return items
})

const formatCurrency = (value: number, type: string): string => {
  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
  
  return type === 'income' ? `+ ${formatted}` : `- ${formatted}`
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

const handleDelete = (transaction: Transaction) => {
  emit('delete', transaction)
}

const handleScroll = () => {
  if (scrollContainer.value) {
    scrollTop.value = scrollContainer.value.scrollTop
  }
}

const updateContainerHeight = () => {
  if (scrollContainer.value) {
    containerHeight.value = scrollContainer.value.clientHeight
  }
}

// Watch transactions to ensure virtual list updates properly
watch(() => props.transactions, () => {
  nextTick(() => {
    updateContainerHeight()
  })
}, { deep: true })

onMounted(() => {
  nextTick(() => {
    updateContainerHeight()
    if (scrollContainer.value) {
      scrollContainer.value.addEventListener('scroll', handleScroll, { passive: true })
      
      // Use ResizeObserver for robust height detection
      const resizeObserver = new ResizeObserver(() => {
        updateContainerHeight()
      })
      resizeObserver.observe(scrollContainer.value)
      
      // Cleanup observer on unmount
      onUnmounted(() => {
        resizeObserver.disconnect()
      })
    }
  })
})

onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', handleScroll)
  }
})
</script>
