export type PaymentData = {
  shippingAmount: string
  paymentId: string
  orderId: string
  paymentDetails: {
    paymentMethodId: string
    paymentIntentId: string
    paymentIntentClientSecret: string
    currency: string
    customer: string
  }
  paidAmount: string
  products: DbProduct[]
  sellersCharge: Array<{
    sellerId: string | number
    lastChargeId: string
  }>
}

export interface OrderProducts extends DbProduct {
  itemPrice: number
  rechargeValue: number
  rechargeCommission: number
}

export type DbProduct = {
  percent: number
  skuId: string
  fullPrice: string | number // this price is already calculated (initialPrice * quantity)
  remainingCharge: string | number
  sellerStockKeepingUnitId: string
  sellerId: string
  refunded: boolean
  charged: string | number // charged is already calculated (initialPrice * quantity)
  quantity: number
  commission: number // commission in % per item
}

export type TransferInfo = {
  transactionId: string
  orderLink: string
  sellerId: string
  orderId: string
  type: string
  amount: string
  currency: string
  description: string
  createdAt: string
}

export type TransferInfoResponse = {
  data: TransferInfo[]
  meta: {
    total: number
    limit: number
    offset: number
  }
}

export type TransferInfoPost = Omit<TransferInfo, 'createdAt'>
