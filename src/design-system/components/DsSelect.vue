<template>
  <div class="ds-select-wrapper">
    <label v-if="label" :for="selectId" class="ds-select-label">
      {{ label }}
      <span v-if="required" class="ds-select-required">*</span>
    </label>
    
    <div class="ds-select-container">
      <select
        :id="selectId"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :class="selectClasses"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      
      <svg class="ds-select-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
    
    <p v-if="error" class="ds-select-error">{{ error }}</p>
    <p v-else-if="hint" class="ds-select-hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

export interface SelectOption {
  value: string | number
  label: string
}

export interface DsSelectProps {
  modelValue?: string | number
  options: SelectOption[]
  label?: string
  placeholder?: string
  error?: string
  hint?: string
  disabled?: boolean
  required?: boolean
  id?: string
}

const props = withDefaults(defineProps<DsSelectProps>(), {
  modelValue: '',
  disabled: false,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const selectId = computed(() => props.id || `ds-select-${Math.random().toString(36).substring(2, 9)}`)
const isFocused = ref(false)

const selectClasses = computed(() => {
  const classes = ['ds-select']

  if (props.error) {
    classes.push('ds-select--error')
  }

  if (isFocused.value) {
    classes.push('ds-select--focused')
  }

  if (props.disabled) {
    classes.push('ds-select--disabled')
  }

  return classes.join(' ')
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
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
.ds-select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ds-select-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-neutral-700);
}

.ds-select-required {
  color: var(--color-danger-500);
}

.ds-select-container {
  position: relative;
}

.ds-select {
  width: 100%;
  padding: 0.625rem 2.5rem 0.625rem 0.875rem;
  font-size: 1rem;
  font-family: inherit;
  color: var(--color-neutral-800);
  background: white;
  border: 1px solid var(--color-neutral-300);
  border-radius: 0.5rem;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  cursor: pointer;
  appearance: none;
}

.ds-select:hover:not(:disabled) {
  border-color: var(--color-neutral-400);
}

.ds-select--focused {
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary-500), transparent 90%);
}

.ds-select--error {
  border-color: var(--color-danger-500);
}

.ds-select--error.ds-select--focused {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-danger-500), transparent 90%);
}

.ds-select--disabled {
  background: var(--color-neutral-100);
  cursor: not-allowed;
  opacity: 0.6;
}

.ds-select-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-neutral-500);
  pointer-events: none;
}

.ds-select-error {
  font-size: 0.875rem;
  color: var(--color-danger-500);
  margin: 0;
}

.ds-select-hint {
  font-size: 0.875rem;
  color: var(--color-neutral-500);
  margin: 0;
}
</style>
