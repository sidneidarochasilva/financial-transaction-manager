<template>
  <ds-modal
    v-model="isOpen"
    title="Nova Transação"
    size="md"
    @close="handleClose"
  >
    <form @submit.prevent="onSubmit" class="flex flex-col gap-5">
      <ds-input
        v-model="description"
        label="Descrição"
        placeholder="Ex: Salário, Compras, etc."
        required
        :error="errors.description"
      />

      <ds-input
        :model-value="displayValue"
        @update:model-value="handleValueChange"
        label="Valor"
        placeholder="R$ 0,00"
        required
        :error="errors.value"
      />

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-slate-700">
          Tipo
          <span class="text-red-500">*</span>
        </label>
        <div class="grid grid-cols-2 gap-3">
          <label class="relative flex items-center cursor-pointer">
            <input
              type="radio"
              v-model="type"
              value="income"
              class="peer sr-only"
            />
            <span class="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-slate-500 bg-white border-2 border-slate-200 rounded-lg transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              Entrada
            </span>
          </label>
          <label class="relative flex items-center cursor-pointer">
            <input
              type="radio"
              v-model="type"
              value="expense"
              class="peer sr-only"
            />
            <span class="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-slate-500 bg-white border-2 border-slate-200 rounded-lg transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
              Saída
            </span>
          </label>
        </div>
        <p v-if="errors.type" class="text-sm text-red-500 m-0">{{ errors.type }}</p>
      </div>

      <ds-select
        v-model="category"
        label="Categoria"
        :options="categoryOptions"
        placeholder="Selecione uma categoria"
        required
        :error="errors.category"
      />

      <ds-input
        v-model="date"
        type="date"
        label="Data"
        required
        :error="errors.date"
      />

      <ds-alert
        v-if="formError"
        v-model="showError"
        variant="error"
        :message="formError"
        dismissible
      />
    </form>

    <template #footer>
      <ds-button variant="ghost" @click="handleClose">
        Cancelar
      </ds-button>
      <ds-button variant="success" :loading="loading" @click="onSubmit">
        Adicionar Transação
      </ds-button>
    </template>
  </ds-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import type { TransactionType, TransactionCategory } from '@/types/transaction'
import { categoryLabels } from '@/types/transaction'
import { DsModal, DsInput, DsSelect, DsButton, DsAlert } from '@design-system'
import { transactionSchema } from '@/schemas/transaction'

export interface AddTransactionModalProps {
  modelValue: boolean
  loading?: boolean
}

const props = defineProps<AddTransactionModalProps>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  submit: [data: {
    description: string
    value: number
    type: TransactionType
    category: TransactionCategory
    date: Date
  }]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const { errors, defineField, handleSubmit, resetForm, setFieldValue, values } = useForm({
  validationSchema: transactionSchema,
  initialValues: {
    description: '',
    value: 0,
    type: 'expense' as TransactionType,
    category: '' as TransactionCategory | '',
    date: new Date().toISOString().split('T')[0],
  },
})

const [description] = defineField('description')
const [type] = defineField('type')
const [category] = defineField('category')
const [date] = defineField('date')

const displayValue = ref('')

const handleValueChange = (newValue: string | number) => {
  let value = newValue.toString().replace(/\D/g, '')
  
  if (!value) {
    displayValue.value = ''
    setFieldValue('value', 0)
    return
  }

  const numericValue = Number(value) / 100
  setFieldValue('value', numericValue)
  
  displayValue.value = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numericValue)
}

const formError = ref('')
const showError = ref(false)

// Reset form when modal opens
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    resetForm({
      values: {
        description: '',
        value: 0,
        type: 'expense',
        category: '',
        date: new Date().toISOString().split('T')[0],
      }
    })
    displayValue.value = ''
    formError.value = ''
    showError.value = false
  }
})

const categoryOptions = computed(() => {
  const categories: TransactionCategory[] = values.type === 'income'
    ? ['salary', 'freelance', 'investment', 'other']
    : ['food', 'transport', 'entertainment', 'bills', 'shopping', 'health', 'education', 'other']

  return categories.map(cat => ({
    value: cat,
    label: categoryLabels[cat],
  }))
})

const onSubmit = handleSubmit((formValues) => {
  emit('submit', {
    description: formValues.description,
    value: formValues.value,
    type: formValues.type as TransactionType,
    category: formValues.category as TransactionCategory,
    date: new Date(formValues.date),
  })
})

const handleClose = () => {
  resetForm()
  emit('update:modelValue', false)
}

// Reset category when type changes
watch(() => values.type, () => {
  setFieldValue('category', '')
})
</script>
