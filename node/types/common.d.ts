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
  preorderCharge?: number // Optional: if present, show “Charged for pre-order: …”
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
  // Optional: global order totals
  totals?: {
    subtotal?: number // Subtotal amount (before tax/shipping)
    tax?: number // Tax amount
    shipping?: number // Shipping cost
    grandTotal?: number // Final total amount
  }
}
