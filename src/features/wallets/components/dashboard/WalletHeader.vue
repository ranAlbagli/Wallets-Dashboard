<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import WalletFilters from '../components/WalletFilters.vue'
import type { FilterResult } from '../types'

interface Props {
  filterResult: FilterResult
  itemsPerPage: number
  allExpanded: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:filters', type: string, value: string): void
  (e: 'toggle:all'): void
}>()

const applyFilter = (type: string, value: string) => {
  emit('update:filters', type, value)
}

const toggleAll = () => {
  emit('toggle:all')
}
</script>

<template>
  <v-app-bar
    height="170"
    flat
    density="compact"
    style="background-color: #FAFAFC"
  >
    <div class="w-100">
      <div
        style="border-bottom: 1px #DEEAFF solid"
        class="text-lg font-weight-bold pl-5 py-4"
      >
        Accounts
      </div>

      <div class="w-100 d-flex ga-2 pt-4 pl-5">
        <WalletFilters
          title="Name/ Identifier"
          icon="$hash"
          :filter-items="filterResult?.getFilterOptions?.names"
          @update-filters="(val) => applyFilter('name', val)"
        />
        <WalletFilters
          title="Asset"
          icon="$asset"
          :filter-items="filterResult?.getFilterOptions?.assets"
          @update-filters="(val) => applyFilter('asset', val)"
        />
        <WalletFilters
          title="Network"
          icon="$shape"
          :filter-items="filterResult?.getFilterOptions?.networks"
          @update-filters="(val) => applyFilter('network', val)"
        />
      </div>

      <div class="d-flex justify-space-between align-center pt-4 px-5 ga-0 mx-0 text-capitalize text-caption text-grey-darken-1">
        <div
          class="d-flex align-center cursor-pointer"
          @click="toggleAll"
        >
          <v-icon size="40">
            {{ allExpanded ? "$chevron-down" : "$chevron-right" }}
          </v-icon>
          <div class="">
            {{ allExpanded ? "Collapse all" : "Expand all" }}
          </div>
        </div>
        <div class="pr-14">
          {{ itemsPerPage }} wallets
        </div>
      </div>
    </div>
  </v-app-bar>
</template> 