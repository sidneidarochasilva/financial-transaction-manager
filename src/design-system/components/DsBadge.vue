<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface DsBadgeProps {
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  outlined?: boolean
}

const props = withDefaults(defineProps<DsBadgeProps>(), {
  variant: 'neutral',
  size: 'md',
  outlined: false,
})

const badgeClasses = computed(() => {
  const classes = ['ds-badge']

  classes.push(`ds-badge--${props.variant}`)
  classes.push(`ds-badge--${props.size}`)

  if (props.outlined) {
    classes.push('ds-badge--outlined')
  }

  return classes.join(' ')
})
</script>

<style scoped>
.ds-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 9999px;
  white-space: nowrap;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Sizes */
.ds-badge--sm {
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
}

.ds-badge--md {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

.ds-badge--lg {
  padding: 0.375rem 1rem;
  font-size: 1rem;
}

/* Variants - Filled */
.ds-badge--primary {
  background: var(--color-primary-500);
  color: white;
}

.ds-badge--success {
  background: var(--color-success-500);
  color: white;
}

.ds-badge--danger {
  background: var(--color-danger-500);
  color: white;
}

.ds-badge--warning {
  background: var(--color-warning-500);
  color: white;
}

.ds-badge--neutral {
  background: var(--color-neutral-500);
  color: white;
}

/* Outlined variants */
.ds-badge--outlined.ds-badge--primary {
  background: transparent;
  color: var(--color-primary-500);
  border: 1px solid var(--color-primary-500);
}

.ds-badge--outlined.ds-badge--success {
  background: transparent;
  color: var(--color-success-500);
  border: 1px solid var(--color-success-500);
}

.ds-badge--outlined.ds-badge--danger {
  background: transparent;
  color: var(--color-danger-500);
  border: 1px solid var(--color-danger-500);
}

.ds-badge--outlined.ds-badge--warning {
  background: transparent;
  color: var(--color-warning-500);
  border: 1px solid var(--color-warning-500);
}

.ds-badge--outlined.ds-badge--neutral {
  background: transparent;
  color: var(--color-neutral-500);
  border: 1px solid var(--color-neutral-500);
}
</style>
