<script setup lang="ts">
import { TabsRoot, useForwardPropsEmits } from 'radix-vue'
import type { TabsRootEmits, TabsRootProps } from 'radix-vue'

const props = defineProps()
const emits = defineEmits()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <TabsRoot v-bind="forwarded">
    <slot />
  </TabsRoot>
</template>
