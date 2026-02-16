<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    :type="type"
    @click="handleClick"
  >
    <span v-if="loading" class="ds-button__loader"></span>
    <span :class="['ds-button__content', { 'opacity-0': loading }]">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface DsButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

const props = withDefaults(defineProps<DsButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
  fullWidth: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const classes = ['ds-button']

  // Variant
  classes.push(`ds-button--${props.variant}`)

  // Size
  classes.push(`ds-button--${props.size}`)

  // Full width
  if (props.fullWidth) {
    classes.push('ds-button--full-width')
  }

  // Loading
  if (props.loading) {
    classes.push('ds-button--loading')
  }

  return classes.join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.ds-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-weight: 500;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.ds-button__content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.ds-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Sizes */
.ds-button--sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  height: 2rem;
}

.ds-button--md {
  padding: 0.625rem 1.25rem;
  font-size: 1rem;
  height: 2.5rem;
}

.ds-button--lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  height: 3rem;
}

/* Variants */
.ds-button--primary {
  background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-600) 100%);
  color: white;
}

.ds-button--primary:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-700) 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--color-primary-500), transparent 70%);
}

.ds-button--secondary {
  background: var(--color-neutral-100);
  color: var(--color-neutral-800);
}

.ds-button--secondary:hover:not(:disabled) {
  background: var(--color-neutral-200);
  transform: translateY(-1px);
}

.ds-button--success {
  background: linear-gradient(135deg, var(--color-success-500) 0%, var(--color-success-600) 100%);
  color: white;
}

.ds-button--success:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--color-success-600) 0%, var(--color-success-700) 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--color-success-500), transparent 70%);
}

.ds-button--danger {
  background: linear-gradient(135deg, var(--color-danger-500) 0%, var(--color-danger-600) 100%);
  color: white;
}

.ds-button--danger:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--color-danger-600) 0%, var(--color-danger-700) 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--color-danger-500), transparent 70%);
}

.ds-button--ghost {
  background: transparent;
  color: var(--color-neutral-600);
}

.ds-button--ghost:hover:not(:disabled) {
  background: var(--color-neutral-100);
}

/* Full width */
.ds-button--full-width {
  width: 100%;
}

/* Loading */
.ds-button__loader {
  position: absolute;
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
