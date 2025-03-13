export interface Asset {
  name: string
  asset: {
    network: string
  }
  assetAmount: number
  assetUsdValue: {
    value: number
  }
}

export interface Wallet {
  id: string
  name: string
  identifier: string
  totalUsdValue: number
  createdAt: string
  assets: Asset[]
}

export interface FilterOption {
  text: string
  value: string
}

export interface FilterResult {
  getFilterOptions: {
    names: FilterOption[]
    assets: FilterOption[]
    networks: FilterOption[]
  }
}

export interface TableHeader {
  text: string
  value: string
  sortable?: boolean
  align?: 'start' | 'center' | 'end'
} 