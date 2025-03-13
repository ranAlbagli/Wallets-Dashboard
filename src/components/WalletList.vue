<script setup lang="ts">
import WalletCard from './WalletCard.vue';
import { computed } from 'vue';

interface Props {
  wallets: any[];
  expanded: any[];
  headers: any[];
  roundNumber: (num: number, decimals?: number) => string;
  truncateText: (text: string) => string;
  itemsPerPage: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:expanded']);

const modelValue = computed({
  get: () => props.expanded,
  set: (value) => emit('update:expanded', value)
});
</script>

<template>
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
            v-model="modelValue"
            multiple
            flat
            class="pr-14 w-100"
          >
            <WalletCard
              :wallet="item"
              :headers="headers"
              :round-number="roundNumber"
              :truncate-text="truncateText"
            />
          </v-expansion-panels>
        </template>
      </v-data-table>
    </div>
  </div>
</template> 