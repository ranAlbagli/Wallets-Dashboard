<script setup lang="ts">
import { useWallets } from '../composables/useWallets'
import WalletHeader from './WalletHeader.vue'
import WalletRow from './WalletRow.vue'
import type { Wallet, TableHeader } from '../types'

const {
  filterResult,
  wallets,
  totalCount,
  totalPages,
  visibleItems,
  itemsPerPage,
  currentPage,
  applyFilter,
  updatePagination,
  updatePaginationAfterPageClick,
  expanded,
  allExpanded,
  toggleAll,
  truncateText,
  headers,
  roundNumber,
} = useWallets()
</script>

<template>
  <div class="d-flex flex-column fill-height">
    <WalletHeader
      :filter-result="filterResult"
      :items-per-page="itemsPerPage"
      :all-expanded="allExpanded"
      @update:filters="applyFilter"
      @toggle:all="toggleAll"
    />

    <div class="d-flex flex-column flex-grow-1 overflow-auto w-100 pl-5 pr-4">
      <v-data-table
        :items="wallets"
        item-value="id"
        :items-per-page="itemsPerPage"
        hide-default-header
        hide-default-footer
        style="background-color: #FAFAFC"
      >
        <template #item="{ item }">
          <WalletRow
            :wallet="item"
            :expanded="expanded"
            :headers="headers"
            :truncate-text="truncateText"
            :round-number="roundNumber"
          />
        </template>
      </v-data-table>
    </div>
  </div>
</template>
