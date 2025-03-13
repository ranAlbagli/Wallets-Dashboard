<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { FilterOption } from '../types'

interface Props {
  title: string
  icon: string
  filterItems: FilterOption[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:filters', value: string): void
}>()

const updateFilters = (value: string) => {
  emit('update:filters', value)
}
</script>

<template>
  <v-combobox
    :items="filterItems"
    :label="title"
    variant="outlined"
    density="compact"
    hide-details
    class="filter-combobox"
    @update:model-value="updateFilters"
  >
    <template #prepend-inner>
      <v-icon :icon="icon" />
    </template>
  </v-combobox>
</template>

<style scoped>
.filter-combobox {
  max-width: 200px;
}
</style> 