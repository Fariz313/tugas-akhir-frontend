<script setup lang="ts">
import { SelectItemText, type SelectItemTextProps } from 'radix-vue'

const props = defineProps()
</script>

<template>
  <SelectItemText v-bind="props">
    <slot />
  </SelectItemText>
</template>
