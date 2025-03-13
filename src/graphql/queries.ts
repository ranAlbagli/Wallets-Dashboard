import { gql } from "@apollo/client/core";

export const GET_WALLETS = gql`
  query GetWallets($limit: Int, $offset: Int, $sortField: String, $sortOrder: SortOrder, $filter: WalletFilterInput) {
    wallets(limit: $limit, offset: $offset, sortField: $sortField, sortOrder: $sortOrder, filter: $filter) {
      wallets {
        id
        name
        identifier
        createdAt
        totalUsdValue
        assets {
          id
          name
          assetAmount
          assetUsdValue {
            value
          }
          asset {
            identifier
            network
            symbol
          }
        }
      }
      totalCount
    }
  }
`;

export const GET_FILTER_OPTIONS = gql`
    query GetFilterOptions {
        getFilterOptions {
            names
            assets
            networks
        }
    }
`;
