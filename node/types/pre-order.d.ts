import { EstimatedFulfillment } from './sku'

export type PreOrderClient = {
  firstName: string
  lastName: string
  phone: string
  email: string
  corporateName: string
  corporatePhone: string
}

export type PreOrderItem = {
  orderItemId: string
  skuId: number
  name: string
  imageUrl: string
  fulfilledAt?: string
  cancelledAt?: string
  soonestFulfillment?: string | EstimatedFulfillment
}

export type PreOrderItemAdditional = PreOrderItem & {
  skuReferenceId: string
}

export type PreOrderDto = {
  sellerId: string
  orderId: string
  client: PreOrderClient
  items: PreOrderItem[]
  latestItemFulfillment?: string | EstimatedFulfillment
  status: string
  value: number
}

export type PreOrderAdditionalDto = PreOrderDto & {
  items: PreOrderItemAdditional[]
}

export type PagedResponse<T> = {
  data: T[]
  count: number
  total: number
  page: number
  pageCount: number
}

export type RegisterPreOrderRequestDto = {
  orderId: PreOrderDto['orderId']
  items: Array<Pick<PreOrderItem, 'skuId' | 'name'>>
  client: PreOrderClient
  value: number
}

export type FulfillPreOrderItemsRequestDto = {
  orderId: PreOrderDto['orderId']
  sellerId: string
  items: Array<{
    skuId: number
    quantity: number
  }>
}

export type RegisterPreOrderResponseDto = PreOrderDto

export type GetTotalsResponseDto = {
  totalCount: number
  pendingCount: number
  cancelledCount: number
  totalValue: number
}

export type GetFiltersResponseDto = {
  customers: string[]
}

export type EstimatedFulfillment = {
  month: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  year: number
  partOfMonth: 'start' | 'mid' | 'end'
}
