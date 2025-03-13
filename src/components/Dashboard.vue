<script setup>
import Filters from "./Filters.vue";
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
        <Filters
          title="Name/ Identifier"
          icon="$hash"
          :filter-items="filterResult?.getFilterOptions?.names"
          @update-filters="(val) => applyFilter('name', val)"
        />
        <Filters
          title="Asset"
          icon="$asset"
          :filter-items="filterResult?.getFilterOptions?.assets"
          @update-filters="(val) => applyFilter('asset', val)"
        />
        <Filters
          title="Network"
          icon="$shape"
          :filter-items="filterResult?.getFilterOptions?.networks"
          @update-filters="(val) => applyFilter('network', val)"
        />
      </div>

      <div class="d-flex justify-space-between align-center pt-4 px-5 ga-0 mx-0 text-capitalize text-caption text-grey-darken-1">
        <div
          class=" d-flex align-center cursor-pointer"
          @click="toggleAll"
        >
          <v-icon
            size="40"
          >
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
  <div class="d-flex flex-column fill-height pl-5 pr-4">
    <div class="d-flex flex-column flex-grow-1 overflow-auto w-100">
      <v-data-table
        :items="wallets"
        item-value="id"
        :items-per-page="itemsPerPage"
        hide-default-header
        hide-default-footer
        style="background-color: #FAFAFC"
      >
        <template #item="{ item }">
          <v-expansion-panels
            v-model="expanded"
            multiple
            flat
            class="pr-14 w-100"
          >
            <v-expansion-panel
              :value="item.id"
              style="border: 1px solid #DEEAFF"
              class="my-2"
            >
              <v-expansion-panel-title
                class="pa-0"
                collapse-icon=""
                expand-icon=""
              >
                <v-container>
                  <v-row
                    no-gutters
                    align="center"
                    style="border-bottom: 1px solid #DEEAFF"
                    class="pb-3"
                  >
                    <v-col
                      cols="6"
                      class="d-flex align-center ga-5"
                    >
                      <v-icon>$network</v-icon>
                      <div class="d-flex flex-column ga-2">
                        <strong>{{ item.name }}</strong>
                        <div class="d-flex ga-2 align-center">
                          <v-icon size="13">
                            $hash
                          </v-icon>
                          <v-tooltip
                            location="bottom"
                            :text="item.identifier"
                          >
                            <template #activator="{ props }">
                              <span class="d-flex align-center ga-1">
                                <div class="text-body-2 text-grey truncate-middle">
                                  {{ truncateText(item.identifier) }}
                                </div>
                                <v-icon
                                  v-bind="props"
                                  size="14"
                                  color="grey"
                                >
                                  mdi-information-outline
                                </v-icon>
                              </span>
                            </template>
                          </v-tooltip>
                        </div>
                      </div>
                    </v-col>
                    <v-col
                      cols="6"
                      class="text-right"
                    >
                      <v-tooltip
                        location="top"
                        :text="roundNumber(item.totalUsdValue)"
                      >
                        <template #activator="{ props }">
                          <span class="d-flex justify-end align-center ga-1">
                            <strong>{{ roundNumber(item.totalUsdValue, 0) }} USD</strong>
                            <v-icon
                              v-bind="props"
                              size="14"
                              color="grey"
                            >
                              mdi-information-outline
                            </v-icon>
                          </span>
                        </template>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col
                      cols="12"
                      class="text-grey pt-3"
                    >
                      <div class="d-flex ga-3 align-center">
                        <div
                          style="font-size: 14px"
                          class="text-black"
                        >
                          Added: {{ new Date(item.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "2-digit",
                          }) }}
                        </div>
                        |
                        <v-chip
                          label
                          size="small"
                        >
                          <div class="text-caption text-black">
                            {{ item.assets.length }} {{ item.assets.length === 1 ? 'Asset' : 'Assets' }}
                          </div>
                        </v-chip>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-data-table
                  :headers="headers"
                  :items="item.assets"
                  hide-default-footer
                  style="border: 1px solid #DEEAFF"
                >
                  <template #headers>
                    <tr>
                      <th
                        v-for="header in headers"
                        :key="header.value"
                        style="border-right:  1px solid #DEEAFF"
                      >
                        <div class="text-grey-darken-1">
                          {{ header.text }}
                        </div>
                      </th>
                    </tr>
                  </template>
                  <template #item="{ item:innerItem, index}">
                    <tr>
                      <td colspan="1">
                        <div class="d-flex ga-2 align-center">
                          <v-icon size="16">
                            $coin
                          </v-icon>
                          <div>{{ innerItem.name }}</div>
                        </div>
                      </td>
                      <td colspan="1">
                        <div class="d-flex ga-2 align-center">
                          <v-icon size="14">
                            $network
                          </v-icon>
                          <div>{{ innerItem.asset.network }}</div>
                        </div>
                      </td>
                      <td colspan="1">
                        <div class="d-flex flex-column">
                          <div> {{ roundNumber(innerItem.assetAmount, 0) }} SOL</div>
                          <div class="d-flex align-center ga-1">
                            <v-icon size="16">
                              $asset
                            </v-icon>
                            <div class="text-grey">
                              {{ roundNumber(innerItem.assetUsdValue.value, 0) }} USD
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr
                      v-if="index === item.assets.length - 1"
                      style="background-color: #EFF4FF"
                    >
                      <td colspan="1">
                        <div class="d-flex align-center ga-2">
                          <div class="text-black">
                            {{ item.assets.length }} {{ item.assets.length === 1 ? 'Asset' : 'Assets' }}
                          </div>
                          <v-chip
                            label
                            color="blue"
                            size="small"
                          >
                            <div class="text-caption text-black">
                              Summary
                            </div>
                          </v-chip>
                        </div>
                      </td>
                      <td colspan="1" />
                      <td
                        colspan="1"
                        class="border-right"
                      >
                        <div class="d-flex align-center ga-1">
                          <v-icon size="16">
                            $asset
                          </v-icon>
                          <strong>{{ roundNumber(item.totalUsdValue, 0) }} USD</strong>
                        </div>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
      </v-data-table>
    </div>
  </div>
  <v-footer
    height="80"
    app
    style="background-color: #FAFAFC; color: #8E8F98"
    class="pl-5 pr-14 d-flex justify-space-between w-100"
  >
    <div class="d-flex align-center">
      <span class="text-body-2 mr-2">View</span>
      <v-select
        v-model="itemsPerPage"
        :items="[5, 10, 25, 50]"
        density="compact"
        variant="outlined"
        hide-details
        flat
        width="70"
        @update:model-value="updatePagination"
      >
        <template #selection="{item}">
          <div style="font-size: 10px">
            {{ item.value }}
          </div>
        </template>
      </v-select>
      <span class="text-body-2 ml-2">per page</span>
    </div>


    <div class="d-flex align-center">
      <span class="text-body-2 mr-3">Showing {{ visibleItems }} out of {{ totalCount }} results</span>
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        density="compact"
        :total-visible="5"
        size="small"
        tile
        variant="text"
        @update:model-value="updatePaginationAfterPageClick"
      />
    </div>
  </v-footer>
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
