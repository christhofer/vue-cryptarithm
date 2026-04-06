<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{
    icon: string,
    fixedWidth?: boolean,
  }>()

  const iconName = computed(() => {
    return props.icon.replace(/^i-fa[srltb]-/, '')
  })
</script>

<template>
  <span
    :class="['fa-icon', icon, { 'w-1.2em': fixedWidth }]"
    :title="iconName"></span>
</template>

<style>
  [title] .fa-icon {
    pointer-events: none; /* so that the icon name not obstructing parent */
  }
</style>
