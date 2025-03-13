<script setup lang="ts">
import DashboardHeader from "./DashboardHeader.vue";
import WalletList from "./WalletList.vue";
import DashboardFooter from "./DashboardFooter.vue";
import { useWallets } from "../composables/useWallets.ts";

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
} = useWallets();
</script>

<template>
  <DashboardHeader
    :filter-result="filterResult"
    :items-per-page="itemsPerPage"
    :all-expanded="allExpanded"
    :on-filter-update="applyFilter"
    :on-toggle-all="toggleAll"
  />
  <WalletList
    :wallets="wallets"
    v-model:expanded="expanded"
    :headers="headers"
    :round-number="roundNumber"
    :truncate-text="truncateText"
    :items-per-page="itemsPerPage"
  />
  <DashboardFooter
    :items-per-page="itemsPerPage"
    :visible-items="visibleItems"
    :total-count="totalCount"
    :current-page="currentPage"
    :total-pages="totalPages"
    :on-items-per-page-update="updatePagination"
    :on-page-update="updatePaginationAfterPageClick"
  />
</template>

<style scoped>
::v-deep(.v-data-table td) {
  border-right: 1px solid #DEEAFF;
}

::v-deep(.v-data-table td:last-child) {
  border-right: none;
}
::v-deep(.v-expansion-panel-text__wrapper) {
  padding: 0 !important;
}
</style>
