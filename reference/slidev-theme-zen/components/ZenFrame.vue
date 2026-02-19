<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { useSlideContext } from '@slidev/client'

type ZenColor =
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'stone'
  | 'amber'
  | 'orange'
  | 'red'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'

const props = defineProps<{
  color?: ZenColor
  backgroundImage?: string
  bgBlur?: number | string
  class?: string
}>()

const { $frontmatter } = useSlideContext()
const slots = useSlots()

const colorAttr = computed(() => {
  return props.color || (($frontmatter.value as any)?.color as ZenColor) || 'slate'
})

const bg = computed(() => {
  const fm = $frontmatter.value as any
  return props.backgroundImage || fm?.backgroundImage || fm?.image || ''
})

const blur = computed(() => {
  const fm = $frontmatter.value as any
  return props.bgBlur ?? fm?.bgBlur ?? fm?.backgroundBlur
})

const styleVars = computed(() => {
  const vars: Record<string, string> = {}

  if (bg.value)
    vars['--zen-bg-image'] = `url("${bg.value}")`

  if (blur.value !== undefined && blur.value !== null && blur.value !== '') {
    const v = typeof blur.value === 'number' ? `${blur.value}px` : String(blur.value)
    vars['--zen-bg-blur'] = v
  }

  return vars
})

const hasTitle = computed(() => !!slots.title)
</script>

<template>
  <div
    class="slidev-layout zen-slide"
    :class="props.class"
    :data-zen-color="colorAttr"
    :data-zen-has-title="hasTitle ? 'true' : 'false'"
    :style="styleVars"
  >
    <div v-if="hasTitle" class="zen-titlebar">
      <div class="zen-title">
        <slot name="title" />
      </div>
    </div>

    <div class="zen-shell">
      <slot />
    </div>
  </div>
</template>
