<template>
  <ds-modal v-model="isOpen" title="Confirmar Exclusão" size="sm" @close="handleClose">
    <div class="flex flex-col gap-6">
      <div class="flex justify-center text-amber-500">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-12 h-12">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <p class="text-center text-lg font-medium text-slate-800 m-0">
        Tem certeza que deseja excluir esta transação?
      </p>

      <div v-if="transaction" class="bg-slate-50 rounded-lg p-4 flex flex-col gap-3">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-slate-500">Descrição:</span>
          <span class="text-sm font-semibold text-slate-800">{{ transaction.description }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-slate-500">Valor:</span>
          <span :class="['text-sm font-semibold', transaction.type === 'income' ? 'text-green-700' : 'text-red-700']">
            {{ formatCurrency(transaction.value) }}
          </span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-slate-500">Tipo:</span>
          <ds-badge :variant="transaction.type === 'income' ? 'success' : 'danger'" size="sm">
            {{ transaction.type === 'income' ? 'Entrada' : 'Saída' }}
          </ds-badge>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-slate-500">Data:</span>
          <span class="text-sm font-semibold text-slate-800">{{ formatDate(transaction.date) }}</span>
        </div>
      </div>

      <ds-alert v-model="showAlert" variant="warning" message="Esta ação não pode ser desfeita." />
    </div>

    <template #footer>
      <ds-button variant="ghost" @click="handleClose">
        Cancelar
      </ds-button>
      <ds-button variant="danger" :loading="loading" @click="handleConfirm">
        Excluir
      </ds-button>
    </template>
  </ds-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Transaction } from '@/types/transaction'
import { DsModal, DsButton, DsAlert, DsBadge } from '@design-system'

export interface DeleteConfirmationModalProps {
  modelValue: boolean
  transaction: Transaction | null
  loading?: boolean
}

const props = defineProps<DeleteConfirmationModalProps>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const showAlert = ref(true)

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

const handleConfirm = () => {
  emit('confirm')
}

const handleClose = () => {
  emit('update:modelValue', false)
}
</script>
