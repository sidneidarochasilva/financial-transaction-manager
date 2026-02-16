<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" class="ds-card-header">
      <slot name="header">
        <h3 class="ds-card-title">{{ title }}</h3>
      </slot>
    </div>
    
    <div class="ds-card-body">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="ds-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface DsCardProps {
  title?: string
  variant?: 'default' | 'bordered' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

const props = withDefaults(defineProps<DsCardProps>(), {
  variant: 'elevated',
  padding: 'md',
  hoverable: false,
})

const cardClasses = computed(() => {
  const classes = ['ds-card']

  classes.push(`ds-card--${props.variant}`)
  classes.push(`ds-card--padding-${props.padding}`)

  if (props.hoverable) {
    classes.push('ds-card--hoverable')
  }

  return classes.join(' ')
})
</script>

<style scoped>
.ds-card {
  background: white;
  border-radius: 0.75rem;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.ds-card--default {
  border: none;
}

.ds-card--bordered {
  border: 1px solid var(--color-neutral-200);
}

.ds-card--elevated {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.ds-card--hoverable:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Padding */
.ds-card--padding-none .ds-card-body {
  padding: 0;
}

.ds-card--padding-sm .ds-card-body {
  padding: 0.75rem;
}

.ds-card--padding-md .ds-card-body {
  padding: 1.25rem;
}

.ds-card--padding-lg .ds-card-body {
  padding: 1.75rem;
}

/* Header */
.ds-card-header {
  padding: 1.25rem 1.25rem 0.75rem;
  border-bottom: 1px solid var(--color-neutral-100);
}

.ds-card-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-neutral-800);
}

/* Footer */
.ds-card-footer {
  padding: 0.75rem 1.25rem 1.25rem;
  border-top: 1px solid var(--color-neutral-100);
}
</style>
