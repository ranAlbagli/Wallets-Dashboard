<script setup lang="ts">
interface Props {
  headers: any[];
  assets: any[];
  roundNumber: (num: number, decimals?: number) => string;
}

defineProps<Props>();
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="assets"
    hide-default-footer
    style="border: 1px solid #DEEAFF"
  >
    <template #headers>
      <tr>
        <th
          v-for="header in headers"
          :key="header.value"
          class="w-33"
          style="border-right: 1px solid #DEEAFF"
        >
          <div class="text-grey-darken-1">
            {{ header.text }}
          </div>
        </th>
      </tr>
    </template>
    <template #item="{ item: innerItem }">
      <tr>
        <td colspan="1">
          <div class="d-flex ga-2 align-center">
            <v-icon size="16">
              $coin
            </v-icon>
            <div>{{ innerItem?.name }}</div>
          </div>
        </td>
        <td colspan="1">
          <div class="d-flex ga-2 align-center">
            <v-icon size="14">
              $network
            </v-icon>
            <div>{{ innerItem?.asset?.network }}</div>
          </div>
        </td>
        <td colspan="1">
          <div class="d-flex flex-column">
            <div>{{ roundNumber(innerItem?.assetAmount, 0) }} SOL</div>
            <div class="d-flex align-center ga-1">
              <v-icon size="16">
                $asset
              </v-icon>
              <div class="text-grey">
                {{ roundNumber(innerItem?.assetUsdValue?.value, 0) }} USD
              </div>
            </div>
          </div>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
