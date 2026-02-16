import type { ServiceContext } from '@vtex/api'
import type { Clients } from '../clients'

export type OrderLine = {
  productName: string
  productUrl?: string // Optional: product page link
  imageUrl?: string // Optional: product image URL
  ref?: string // Optional: product reference, e.g. "Ref.: 3084 size 6"
  warehouse?: string // Optional: warehouse info, e.g. "Warehouse: 1,1"
  type: 'order' | 'preorder' // Indicates whether it's a regular order or a pre-order
  price: number // Unit price (decide if tax included or excluded)
  qty: number // Quantity ordered
  totalWithTax: number // Total price including tax
  totalPrice: number // Total price
  preorderCharge?: number // Optional: if present, show “Charged for pre-order: …”
  discount?: {
    name: string
    amount: number // IMPORTANT: in dollars (already /100), same as you pass to template
  }
}
export type OrderTotals = {
  itemsTotal?: number
  discounts?: number // "Discounts Total"
  shipping?: number // "Shipping Total"
  tax?: number // "Tax Total"
  grandTotal?: number // "Grand total" (bold)
}
export interface CouponDiscount {
  orderId: string
  couponType: string
  promotionName: string
  coupon: string
  discountAmount: number
}

export type OrderEmailPayload = {
  orderNumber: string // Order identifier, e.g. "WHL-1551870522505-01"
  status: string // Order status, e.g. "Handling shipping"
  createdAt: string // Order creation date and time
  clientName: string // Name of the client
  organization?: string // Optional: organization name
  phone?: string // Optional: phone number
  currency: string // Currency code, e.g. "AUD"
  currencySymbol?: string // Optional: symbol or currency label, e.g. "$" or "AUD"
  items: OrderLine[] // List of order line items
  totals?: OrderTotals
  couponByOrderId?: CouponDiscount
}

export type VTEXContext = ServiceContext<Clients>
