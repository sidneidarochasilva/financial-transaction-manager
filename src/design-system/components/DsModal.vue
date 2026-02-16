<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="ds-modal-overlay" @click.self="handleClose">
        <div :class="modalClasses" role="dialog" aria-modal="true">
          <div v-if="$slots.header || title" class="ds-modal-header">
            <slot name="header">
              <h2 class="ds-modal-title">{{ title }}</h2>
            </slot>
            <button
              v-if="closable"
              class="ds-modal-close"
              type="button"
              aria-label="Fechar"
              @click="handleClose"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="ds-modal-body">
            <slot />
          </div>

          <div v-if="$slots.footer" class="ds-modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

export interface DsModalProps {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
  closeOnOverlay?: boolean
}

const props = withDefaults(defineProps<DsModalProps>(), {
  size: 'md',
  closable: true,
  closeOnOverlay: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const modalClasses = computed(() => {
  const classes = ['ds-modal']
  classes.push(`ds-modal--${props.size}`)
  return classes.join(' ')
})

const handleClose = () => {
  if (props.closable && props.closeOnOverlay) {
    emit('update:modelValue', false)
    emit('close')
  }
}

// Prevent body scroll when modal is open
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}, { immediate: true })
</script>

<style scoped>
.ds-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  padding: 1rem;
}

.ds-modal {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease-out;
}

.ds-modal--sm {
  width: 100%;
  max-width: 24rem;
}

.ds-modal--md {
  width: 100%;
  max-width: 32rem;
}

.ds-modal--lg {
  width: 100%;
  max-width: 48rem;
}

.ds-modal--xl {
  width: 100%;
  max-width: 64rem;
}

.ds-modal--full {
  width: 100%;
  max-width: 95vw;
  height: 95vh;
  max-height: 95vh;
}

.ds-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-neutral-100);
}

.ds-modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-neutral-800);
}

.ds-modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0.375rem;
  color: var(--color-neutral-500);
  cursor: pointer;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.ds-modal-close:hover {
  background: var(--color-neutral-100);
  color: var(--color-neutral-800);
}

.ds-modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.ds-modal-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--color-neutral-100);
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .ds-modal,
.modal-leave-active .ds-modal {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .ds-modal,
.modal-leave-to .ds-modal {
  transform: scale(0.95);
  opacity: 0;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
