<template>
  <div class="ds-input-wrapper">
    <label v-if="label" :for="inputId" class="ds-input-label">
      {{ label }}
      <span v-if="required" class="ds-input-required">*</span>
    </label>
    
    <div class="ds-input-container">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
    </div>
    
    <p v-if="error" class="ds-input-error">{{ error }}</p>
    <p v-else-if="hint" class="ds-input-hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

export interface DsInputProps {
  modelValue?: string | number
  type?: 'text' | 'number' | 'email' | 'password' | 'tel' | 'url' | 'date'
  label?: string
  placeholder?: string
  error?: string
  hint?: string
  disabled?: boolean
  required?: boolean
  id?: string
}

const props = withDefaults(defineProps<DsInputProps>(), {
  type: 'text',
  modelValue: '',
  disabled: false,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const inputId = computed(() => props.id || `ds-input-${Math.random().toString(36).substring(2, 9)}`)
const isFocused = ref(false)

const inputClasses = computed(() => {
  const classes = ['ds-input']

  if (props.error) {
    classes.push('ds-input--error')
  }

  if (isFocused.value) {
    classes.push('ds-input--focused')
  }

  if (props.disabled) {
    classes.push('ds-input--disabled')
  }

  return classes.join(' ')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}
</script>

<style scoped>
.ds-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ds-input-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-neutral-700);
}

.ds-input-required {
  color: var(--color-danger-500);
}

.ds-input-container {
  position: relative;
}

.ds-input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-size: 1rem;
  font-family: inherit;
  color: var(--color-neutral-800);
  background: white;
  border: 1px solid var(--color-neutral-300);
  border-radius: 0.5rem;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
}

.ds-input::placeholder {
  color: var(--color-neutral-400);
}

.ds-input:hover:not(:disabled) {
  border-color: var(--color-neutral-400);
}

.ds-input--focused {
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary-500), transparent 90%);
}

.ds-input--error {
  border-color: var(--color-danger-500);
}

.ds-input--error.ds-input--focused {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-danger-500), transparent 90%);
}

.ds-input--disabled {
  background: var(--color-neutral-100);
  cursor: not-allowed;
  opacity: 0.6;
}

.ds-input-error {
  font-size: 0.875rem;
  color: var(--color-danger-500);
  margin: 0;
}

.ds-input-hint {
  font-size: 0.875rem;
  color: var(--color-neutral-500);
  margin: 0;
}
</style>
