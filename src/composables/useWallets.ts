import { ref, computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_WALLETS, GET_FILTER_OPTIONS } from "../graphql/queries.ts";

export function useWallets() {
  // Filters and Sorting
  const filter = ref({ name: [], asset: [], network: [] });
  const offset = ref(0);
  const sortField = ref("name");
  const sortOrder = ref("ASC");
  const itemsPerPage = ref(10);
  const currentPage = ref(1);

  const headers = [
    { text: "ASSET", value: "name" },
    { text: "NETWORK", value: "asset.network" },
    { text: "CURRENT BALANCE", value: "assetAmount" },
  ];

  // Compute query options
  const queryOptions = computed(() => ({
    limit: itemsPerPage.value,
    offset: offset.value,
    sortField: sortField.value,
    sortOrder: sortOrder.value,
    filter: {
      name: filter.value.name.length > 0 ? filter.value.name : null,
      asset: filter.value.asset.length > 0 ? filter.value.asset : null,
      network: filter.value.network.length > 0 ? filter.value.network : null,
    },
  }));

  // Fetch wallets
  const { result, refetch } = useQuery(GET_WALLETS, queryOptions.value);

  // Fetch filter options
  const { result: filterResult } = useQuery(GET_FILTER_OPTIONS);

  // Computed properties
  const wallets = computed(() => result.value?.wallets?.wallets || []);
  const totalCount = computed(() => result.value?.wallets?.totalCount || 0);
  const totalPages = computed(() => Math.ceil(totalCount.value / itemsPerPage.value));
  const visibleItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value + 1;
    const end = Math.min(currentPage.value * itemsPerPage.value, totalCount.value);
    return `${start} - ${end}`;
  });

  // Apply filter
  const applyFilter = (filterType: keyof typeof filter.value, selectedValues: string[]) => {
    filter.value[filterType] = selectedValues.length > 0 ? selectedValues : [];
    offset.value = 0;
    currentPage.value = 1;
    refetch(queryOptions.value);
  };

  // Update Pagination
  const updatePagination = (newItemsPerPage: number) => {
    itemsPerPage.value = newItemsPerPage;
    currentPage.value = 1;
    offset.value = 0;
    refetch(queryOptions.value);
  };

  const updatePaginationAfterPageClick = (newPage: number) => {
    console.log('Pagination Debug:', {
      currentPage: currentPage.value,
      newPage,
      itemsPerPage: itemsPerPage.value,
      currentOffset: offset.value,
      calculation: `(${newPage} - 1) * ${itemsPerPage.value} = ${(newPage - 1) * itemsPerPage.value}`,
      explanation: `Skip ${(newPage - 1) * itemsPerPage.value} records and start from record ${(newPage - 1) * itemsPerPage.value + 1}`
    });
    
    currentPage.value = newPage;
    offset.value = (newPage - 1) * itemsPerPage.value;
    
    console.log('After Update:', {
      currentPage: currentPage.value,
      newPage,
      itemsPerPage: itemsPerPage.value,
      newOffset: offset.value,
      queryExplanation: `DB Query: Skip ${offset.value} records, return ${itemsPerPage.value} records starting from record ${offset.value + 1}`
    });
    
    refetch(queryOptions.value);
  };

  // Table Expansion Logic
  const expanded = ref([]);
  const allExpanded = computed(() => expanded.value.length === wallets.value.length);
  const toggleAll = () => {
    expanded.value = allExpanded.value ? [] : wallets.value.map(wallet => wallet.id);
  };

  // Text Truncate Helper
  const truncateText = (text: string) => {
    const maxLength = 16;
    if (text.length <= maxLength) return text;
    const charsToShow = Math.floor(maxLength / 2) - 2;
    return `${text.slice(0, charsToShow)}...${text.slice(-charsToShow)}`;
  };

  const roundNumber = (num, maximumFractionDigits = 5 ) => {
    if (!num) return "0";
    return num.toLocaleString("en-US", { maximumFractionDigits });
  };

  return {
    filter,
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
  };
}
