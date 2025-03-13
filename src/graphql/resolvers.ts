import wallets from "../mock-data/wallets.json" assert { type: "json" };

// Types
interface Wallet {
  id: string;
  name: string;
  assets: Asset[];
}

interface Asset {
  name: string;
  asset: {
    network: string;
  };
}

interface FilterOptions {
  name?: string[];
  asset?: string[];
  network?: string[];
}

interface QueryArgs {
  limit?: number;
  offset?: number;
  sortField?: string;
  sortOrder?: "ASC" | "DESC";
  filter?: FilterOptions;
}

interface PaginatedResponse<T> {
  wallets: T[];
  totalCount: number;
}

// Cache for filter options
let filterOptionsCache: { names: string[]; assets: string[]; networks: string[] } | null = null;

/**
 * Applies filters to the wallet list
 * @param wallets - List of wallets to filter
 * @param filter - Filter options
 * @returns Filtered wallet list
 */
function applyFilters(wallets: Wallet[], filter?: FilterOptions): Wallet[] {
  if (!filter) return wallets;

  return wallets.filter(wallet => {
    // Name filter
    if (filter.name?.length && !filter.name.includes(wallet.name)) {
      return false;
    }

    // Network filter
    if (filter.network?.length && !wallet.assets.some(asset =>
      filter.network!.includes(asset.asset.network)
    )) {
      return false;
    }

    // Asset filter
    return !(filter.asset?.length && !wallet.assets.some(asset =>
      filter.asset!.includes(asset.name)
    ));


  });
}

/**
 * Sorts the wallet list based on the specified field and order
 * @param wallets - List of wallets to sort
 * @param sortField - Field to sort by
 * @param sortOrder - Sort order (ASC/DESC)
 * @returns Sorted wallet list
 */
function applySorting(wallets: Wallet[], sortField?: string, sortOrder: "ASC" | "DESC" = "ASC"): Wallet[] {
  if (!sortField || wallets.length === 0) return wallets;

  return [...wallets].sort((a, b) => {
    const valueA = a[sortField as keyof Wallet] ?? "";
    const valueB = b[sortField as keyof Wallet] ?? "";

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "ASC"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder === "ASC" ? valueA - valueB : valueB - valueA;
    }

    return 0;
  });
}

/**
 * Validates query arguments
 * @param args - Query arguments to validate
 * @throws Error if arguments are invalid
 */
function validateQueryArgs(args: QueryArgs): void {
  if (args.limit !== undefined && (args.limit < 1 || args.limit > 100)) {
    throw new Error("Limit must be between 1 and 100");
  }
  if (args.offset !== undefined && args.offset < 0) {
    throw new Error("Offset must be non-negative");
  }
}

/**
 * Gets unique filter options from wallets
 * @returns Object containing unique names, assets, and networks
 */
function getFilterOptions(): { names: string[]; assets: string[]; networks: string[] } {
  if (filterOptionsCache) return filterOptionsCache;

  const names = new Set<string>();
  const assets = new Set<string>();
  const networks = new Set<string>();

  wallets.forEach(wallet => {
    names.add(wallet.name);
    wallet.assets.forEach(asset => {
      assets.add(asset.name);
      networks.add(asset.asset.network);
    });
  });

  filterOptionsCache = {
    names: Array.from(names),
    assets: Array.from(assets),
    networks: Array.from(networks),
  };

  return filterOptionsCache;
}

export const resolvers = {
  Query: {
    wallets: (_: unknown, args: QueryArgs): PaginatedResponse<Wallet> => {
      try {
        validateQueryArgs(args);

        const {
          limit = 10,
          offset = 0,
          sortField = "name",
          sortOrder = "ASC",
          filter,
        } = args;

        // Apply filters
        let filteredWallets = applyFilters(wallets, filter);

        // Apply sorting
        filteredWallets = applySorting(filteredWallets, sortField, sortOrder);

        // Apply pagination
        const paginatedWallets = filteredWallets.slice(offset, offset + limit);

        return {
          wallets: paginatedWallets,
          totalCount: filteredWallets.length,
        };
      } catch (error) {
        console.error("Error in wallets query:", error);
        throw error;
      }
    },

    getFilterOptions: () => {
      try {
        return getFilterOptions();
      } catch (error) {
        console.error("Error in getFilterOptions query:", error);
        throw error;
      }
    }
  }
};
