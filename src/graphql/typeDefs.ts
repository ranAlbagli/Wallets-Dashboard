import { gql } from "graphql-tag";

export const typeDefs = gql`
  enum SortOrder {
    ASC
    DESC
  }

  input WalletFilterInput {
    name:  [String]
    asset: [String]
    network: [String]
  }

  type Asset {
    id: ID!
    name: String!
    asset: AssetDetail!
    assetAmount: Float!
    assetUsdValue: AssetUsdValue
  }

  type AssetDetail {
    identifier: String!
    network: String!
    symbol: String!
  }

  type AssetUsdValue {
    value: Float!
  }

  type Wallet {
    id: ID!
    name: String!
    identifier: String!
    createdAt: String!
    totalUsdValue: Float!
    assets: [Asset!]!
  }

  type WalletsResponse {
    wallets: [Wallet!]!
    totalCount: Int!
  }

  type FilterOptions {
    names: [String!]!
    assets: [String!]!
    networks: [String!]!
  }

  type Query {
    wallets(limit: Int, offset: Int, sortField: String, sortOrder: SortOrder, filter: WalletFilterInput): WalletsResponse!
    getFilterOptions: FilterOptions!
  }
`;
