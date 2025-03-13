import wallets from "../mock-data/wallets.json" assert { type: "json" };

export const resolvers = {
  Query: {
    wallets: (
      _: unknown,
      {
        limit = 10,
        offset = 0,
        sortField = "name",
        sortOrder = "ASC",
        filter,
      }: {
        limit?: number;
        offset?: number;
        sortField?: string;
        sortOrder?: "ASC" | "DESC";
        filter?: { name?: string[]; asset?: string[]; network?: string[] };
      }
    ) => {
      let filteredWallets = [...wallets];

      // 🔹 Apply Filtering
      if (filter?.name && Array.isArray(filter.name) && filter.name.length > 0) {
        filteredWallets = filteredWallets.filter(wallet =>
          filter.name!.includes(wallet.name)
        );
      }

      if (filter?.network && Array.isArray(filter.network) && filter.network.length > 0) {
        filteredWallets = filteredWallets.filter(wallet =>
          wallet.assets.some(asset =>
            filter.network!.includes(asset.asset.network)
          )
        );
      }

      if (filter?.asset && Array.isArray(filter.asset) && filter.asset.length > 0) {
        filteredWallets = filteredWallets.filter(wallet =>
          wallet.assets.some(asset =>
            filter.asset!.includes(asset.name)
          )
        );
      }

      // 🔹 Apply Sorting
      if (sortField && filteredWallets.length > 0) {
        filteredWallets.sort((a, b) => {
          const valueA = a[sortField as keyof typeof a] ?? "";
          const valueB = b[sortField as keyof typeof b] ?? "";

          if (typeof valueA === "string" && typeof valueB === "string") {
            return sortOrder === "ASC" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
          } else if (typeof valueA === "number" && typeof valueB === "number") {
            return sortOrder === "ASC" ? valueA - valueB : valueB - valueA;
          }

          return 0; // Default no sorting if types don't match
        });
      }

      // 🔹 Apply Pagination
      const paginatedWallets = filteredWallets.slice(offset, offset + limit);

      return {
        wallets: paginatedWallets,
        totalCount: filteredWallets.length,
      };
    },

    getFilterOptions: () => {
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

      return {
        names: Array.from(names),
        assets: Array.from(assets),
        networks: Array.from(networks),
      };
    }
  }
};
