<template>
  <v-menu
    v-model="menuOpen"
    :close-on-content-click="false"
    location="bottom"
    offset="4"
  >
    <template #activator="{ props }">
      <v-btn
        base-color="#D2D3D7"
        height="31"
        density="comfortable"
        v-bind="props"
        rounded="xl"
        variant="outlined"
        class="px-3"
      >
        <v-icon
          color="#8E8F98"
          start
          size="17"
        >
          {{ icon }}
        </v-icon>
        <div
          style="font-size: 14px; color: #1F1F1F; letter-spacing: 0; font-weight: 400"
          class="text-capitalize mx-0 px-0"
        >
          {{ title }}
        </div>
        <v-icon
          color="#8E8F98"
          size="11"
          end
        >
          mdi-chevron-down
        </v-icon>
      </v-btn>
    </template>

    <v-card width="350">
      <div class="text-body-2 d-flex justify-space-between align-center border-b px-3 py-2">
        <div>{{ title }}</div>
        <v-btn
          density="comfortable"
          icon
          variant="plain"
          @click="menuOpen = false"
        >
          <v-icon
            color="grey"
            size="22"
          >
            mdi-close
          </v-icon>
        </v-btn>
      </div>

      <v-text-field
        v-model="searchQuery"
        density="compact"
        hide-details
        variant="solo"
        class="pa-3"
        :bg-color="searchQuery.length > 0 ? '#EFF4FF' : '#F6F6F9'"
        placeholder="Search"
        flat
        single-line
        clearable
        clear-icon="mdi-close"
        @click:clear="clearMessage"
      >
        <template #prepend-inner>
          <v-icon size="16">
            mdi-magnify
          </v-icon>
        </template>
      </v-text-field>

      <v-container class="py-0">
        <v-row
          no-gutters
          dense
          align="center"
          class="ga-2"
        >
          <v-col cols="1">
            <v-checkbox
              v-model="allSelected"
              hide-details
              base-color="#D2D3D7"
              color="#3E00FF"
              density="compact"
              @change="toggleSelectAll"
            />
          </v-col>
          <v-col cols="9">
            <span class="text-body-2">Select All ({{ filteredItems?.length }})</span>
          </v-col>
        </v-row>
      </v-container>


      <v-divider />

      <v-container
        class="overflow-y-auto py-0"
        style="max-height: 200px"
      >
        <v-row
          v-for="(item, index) in filteredItems"
          :key="index"
          no-gutters
          dense
          align="center"
          class="ga-2"
        >
          <v-col cols="1">
            <v-checkbox
              v-model="selectedItems"
              hide-details
              base-color="#D2D3D7"
              color="#3E00FF"
              :value="item"
              density="compact"
            />
          </v-col>
          <v-col cols="9">
            <span class="text-body-2">{{ item }}</span>
          </v-col>
        </v-row>
      </v-container>

      <v-divider />

      <v-container
        style="background-color: #FAFAFC"
        class="py-2"
      >
        <v-row
          no-gutters
          dense
          align="center"
        >
          <v-col cols="12">
            <div class="text-caption">
              {{ selectedItems.length }}  Selected
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-divider />
      <v-card-actions class="justify-space-between">
        <v-btn
          class="text-capitalize"
          slim
          variant="plain"
          color="#3E00FF"
          :disabled="selectedItems?.length === 0"
          @click="clearAll"
        >
          Clear All
        </v-btn>
        <v-btn
          class="text-capitalize"
          slim
          variant="plain"
          ripple
          color="#3E00FF"
          :disabled="selectedItems?.length === 0"
          @click="applyFilters"
        >
          Apply
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup>
import { defineProps, ref, computed, defineEmits } from "vue";

const props = defineProps({
  title: String,
  filterItems: Array,
  icon: String
});

const emit = defineEmits(["updateFilters"]);

const menuOpen = ref(false);
const searchQuery = ref("");
const selectedItems = ref([]);

const filteredItems = computed(() =>
  props.filterItems.filter(item =>
    item.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const allSelected = computed(() => selectedItems.value.length === filteredItems.value.length);

const toggleSelectAll = () => {
  if (allSelected.value) {
    selectedItems.value = [];
  } else {
    selectedItems.value = [...filteredItems.value];
  }
};
const clearAll = () => {
  selectedItems.value = [];
};
const clearMessage = () => {
  searchQuery.value = "";
};
const applyFilters = () => {
  emit("updateFilters", selectedItems.value);
  menuOpen.value = false;
};
</script>
