<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  itemsPerPage: number;
  visibleItems: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  onItemsPerPageUpdate: (value: number) => void;
  onPageUpdate: (value: number) => void;
}

const props = defineProps<Props>();

const modelItemsPerPage = computed({
  get: () => props.itemsPerPage,
  set: (value) => props.onItemsPerPageUpdate(value)
});

const modelCurrentPage = computed({
  get: () => props.currentPage,
  set: (value) => {
    console.log('Page Update:', value);
    props.onPageUpdate(value);
  }
});
</script>

<template>
  <v-footer
    height="80"
    app
    style="background-color: #FAFAFC; color: #8E8F98"
    class="pl-5 pr-14 d-flex justify-space-between w-100"
  >
    <div class="d-flex align-center">
      <span class="text-body-2 mr-2">View</span>
      <v-select
        v-model="modelItemsPerPage"
        :items="[5, 10, 25, 50]"
        density="compact"
        variant="outlined"
        hide-details
        flat
        width="70"
      >
        <template #selection="{ item }">
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
        v-model="modelCurrentPage"
        :length="totalPages"
        density="compact"
        :total-visible="5"
        size="small"
        tile
        variant="text"
      />
    </div>
  </v-footer>
</template>
