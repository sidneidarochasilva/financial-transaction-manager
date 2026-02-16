<template>
  <Transition name="alert">
    <div v-if="modelValue" :class="alertClasses" role="alert">
      <svg class="ds-alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          v-if="variant === 'success'"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
        <path
          v-else-if="variant === 'error'"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
        <path
          v-else-if="variant === 'warning'"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
        <path
          v-else
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <div class="ds-alert-content">
        <p class="ds-alert-title" v-if="title">{{ title }}</p>
        <p class="ds-alert-message">
          <slot>{{ message }}</slot>
        </p>
      </div>

      <button
        v-if="dismissible"
        class="ds-alert-close"
        type="button"
        aria-label="Dismiss"
        @click="handleDismiss"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface DsAlertProps {
  modelValue?: boolean
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  message?: string
  dismissible?: boolean
}

const props = withDefaults(defineProps<DsAlertProps>(), {
  modelValue: true,
  variant: 'info',
  dismissible: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  dismiss: []
}>()

const alertClasses = computed(() => {
  const classes = ['ds-alert']
  classes.push(`ds-alert--${props.variant}`)
  return classes.join(' ')
})

const handleDismiss = () => {
  emit('update:modelValue', false)
  emit('dismiss')
}
</script>

<style scoped>
.ds-alert {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid;
}

.ds-alert--info {
  background: var(--color-primary-50);
  border-color: var(--color-primary-500);
  color: var(--color-primary-900);
}

.ds-alert--success {
  background: var(--color-success-50);
  border-color: var(--color-success-500);
  color: var(--color-success-900);
}

.ds-alert--warning {
  background: var(--color-warning-50);
  border-color: var(--color-warning-500);
  color: var(--color-warning-900);
}

.ds-alert--error {
  background: var(--color-danger-50);
  border-color: var(--color-danger-500);
  color: var(--color-danger-900);
}

.ds-alert-icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.125rem;
}

.ds-alert--info .ds-alert-icon {
  color: var(--color-primary-500);
}

.ds-alert--success .ds-alert-icon {
  color: var(--color-success-500);
}

.ds-alert--warning .ds-alert-icon {
  color: var(--color-warning-500);
}

.ds-alert--error .ds-alert-icon {
  color: var(--color-danger-500);
}

.ds-alert-content {
  flex: 1;
}

.ds-alert-title {
  margin: 0 0 0.25rem 0;
  font-weight: 600;
  font-size: 0.875rem;
}

.ds-alert-message {
  margin: 0;
  font-size: 0.875rem;
}

.ds-alert-close {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.ds-alert-close:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* Transitions */
.alert-enter-active,
.alert-leave-active {
  transition: all 0.3s ease;
}

.alert-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.alert-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
