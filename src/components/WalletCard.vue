<script setup lang="ts">
import AssetTable from './AssetTable.vue';

interface Props {
  wallet: any;
  headers: any[];
  roundNumber: (num: number, decimals?: number) => string;
  truncateText: (text: string) => string;
}

defineProps<Props>();
</script>

<template>
  <v-expansion-panel
    :value="wallet.id"
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
              <strong>{{ wallet.name }}</strong>
              <div class="d-flex ga-2 align-center">
                <v-icon size="13">
                  $hash
                </v-icon>
                <v-tooltip
                  location="bottom"
                  :text="wallet.identifier"
                >
                  <template #activator="{ props }">
                    <span class="d-flex align-center ga-1">
                      <div class="text-body-2 text-grey truncate-middle">
                        {{ truncateText(wallet.identifier) }}
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
              :text="roundNumber(wallet.totalUsdValue)"
            >
              <template #activator="{ props }">
                <span class="d-flex justify-end align-center ga-1">
                  <strong>{{ roundNumber(wallet.totalUsdValue, 0) }} USD</strong>
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
                Added: {{ new Date(wallet.createdAt).toLocaleDateString("en-US", {
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
                  {{ wallet.assets.length }} {{ wallet.assets.length === 1 ? 'Asset' : 'Assets' }}
                </div>
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <AssetTable
        :headers="headers"
        :assets="wallet.assets"
        :round-number="roundNumber"
      />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template> 