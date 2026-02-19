import { ServiceContext } from '@vtex/api'

import type { Clients } from '../../clients'

type CouponType = 'TOTAL' | 'ITEM' | 'SHIPPING' | 'NONE'

type OrderTotal = { id?: string; value?: number }
type PriceTag = { name?: string; value?: number; identifier?: string | null }
type OrderItem = {
  id?: string
  name?: string
  seller?: string
  price?: number
  listPrice?: number
  sellingPrice?: number
  priceTags?: PriceTag[]
}
type LogisticsInfo = { listPrice?: number; sellingPrice?: number }
type OrderLike = {
  orderId?: string
  totals?: OrderTotal[]
  items?: OrderItem[]
  marketingData?: { coupon?: string | null }
  ratesAndBenefitsData?: {
    rateAndBenefitsIdentifiers?: Array<{ name?: string | null }>
  }
  shippingData?: { logisticsInfo?: LogisticsInfo[] }
}

export async function getOrdersByOrderGroup(ctx: ServiceContext<Clients>) {
  const { orderGroup } = ctx.vtex.route.params as { orderGroup: string }

  if (!orderGroup) {
    ctx.status = 400
    return { message: 'orderGroup is required' }
  }

  const orders = (await ctx.clients.omsApi.getOrdersByOrderGroup(
    ctx,
    orderGroup
  )) as OrderLike[]

  if (!orders || orders.length === 0) {
    ctx.status = 404
    return {
      message: 'Order group not found',
      orderGroup,
    }
  }

  const shippingInfo = orders.map(order => {
    const sellerName = order.items?.[0]?.seller ?? 'unknown'
    const shippingTotal =
      order.totals?.find(t => String(t.id).toLowerCase() === 'shipping')
        ?.value ?? 0

    return {
      orderId: order.orderId ?? null,
      sellerName,
      shippingTotal,
    }
  })

  const couponsDiscounts = orders.map(order => {
    const coupon = order.marketingData?.coupon ?? null
    const promotion =
      order.ratesAndBenefitsData?.rateAndBenefitsIdentifiers?.[0] ?? null
    const promotionName = promotion?.name ?? null

    const totalDiscountValue =
      order.totals?.find(t => String(t.id).toLowerCase() === 'discounts')
        ?.value ?? 0
    const totalDiscount = Math.max(0, Math.abs(totalDiscountValue))

    const logistics = order.shippingData?.logisticsInfo ?? []
    const shippingOriginal = logistics.reduce(
      (sum, li) => sum + (li?.listPrice ?? 0),
      0
    )
    const shippingPaid = logistics.reduce(
      (sum, li) => sum + (li?.sellingPrice ?? 0),
      0
    )
    const shippingDiscount = Math.max(0, shippingOriginal - shippingPaid)

    const itemsDiscounts =
      order.items
        ?.map(item => {
          const listPrice = item?.listPrice ?? item?.price ?? 0
          const sellingPrice = item?.sellingPrice ?? 0
          const priceDeltaDiscount = Math.max(0, listPrice - sellingPrice)

          const tags =
            item.priceTags?.filter(t =>
              String(t.name).toLowerCase().startsWith('discount')
            ) ?? []

          const tagDiscount = tags.reduce(
            (sum, t) => sum + Math.max(0, Math.abs(t.value ?? 0)),
            0
          )

          const discount = Math.max(priceDeltaDiscount, tagDiscount)
          if (!discount) return null

          return {
            itemId: item.id ?? null,
            name: item.name ?? null,
            discount,
            identifiers: tags
              .map(t => t.identifier)
              .filter(Boolean) as string[],
          }
        })
        .filter(Boolean) ?? []

    const itemsTotalDiscount = itemsDiscounts.reduce(
      (s, i) => s + (i?.discount ?? 0),
      0
    )

    const orderLevelDiscount = Math.max(
      0,
      totalDiscount - itemsTotalDiscount - shippingDiscount
    )

    let couponType: CouponType = 'NONE'
    let discountAmount = 0

    if (
      shippingDiscount > 0 &&
      itemsTotalDiscount === 0 &&
      orderLevelDiscount === 0
    ) {
      couponType = 'SHIPPING'
      discountAmount = shippingDiscount
    } else if (itemsTotalDiscount > 0) {
      couponType = 'ITEM'
      discountAmount = itemsTotalDiscount
    } else if (orderLevelDiscount > 0) {
      couponType = 'TOTAL'
      discountAmount = orderLevelDiscount
    }

    return {
      orderId: order.orderId ?? null,
      couponType,
      promotionName,
      coupon,
      discountAmount,
      itemsDiscounts: itemsDiscounts.length ? itemsDiscounts : null,

      totalsDiscount: totalDiscount,
      shippingDiscount,
      itemsTotalDiscount,
      orderLevelDiscount,
    }
  })

  ctx.status = 200
  return {
    result: orders,
    shippingInfo,
    couponsDiscounts,
  }
}
