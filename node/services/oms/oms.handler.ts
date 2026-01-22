import { ServiceContext } from '@vtex/api'

import type { Clients } from '../../clients'

export async function getOrdersByOrderGroup(ctx: ServiceContext<Clients>) {
  const { orderGroup } = ctx.vtex.route.params as { orderGroup: string }

  if (!orderGroup) {
    ctx.status = 400
    return { message: 'orderGroup is required' }
  }

  const orders = await ctx.clients.omsApi.getOrdersByOrderGroup(ctx, orderGroup)

  if (!orders || orders.length === 0) {
    ctx.status = 404
    return {
      message: 'Order group not found',
      orderGroup,
    }
  }

  const shippingInfo = orders.map((order: any) => {
    const sellerName = order.items?.[0]?.seller ?? 'unknown'

    const shippingTotal =
      order.totals?.find((t: any) => t.id.toLowerCase() === 'shipping')
        ?.value ?? 0

    return {
      orderId: order.orderId,
      sellerName,
      shippingTotal,
    }
  })

  const couponsDiscounts = orders.map((order: any) => {
    const coupon = order.marketingData?.coupon ?? null

    const promotionName =
      order.ratesAndBenefitsData?.rateAndBenefitsIdentifiers?.[0]?.name ?? null

    const hasItemDiscount = order.items?.some(
      (item: any) => item.price !== item.sellingPrice
    )

    const orderDiscount =
      order.totals?.find((t: any) => t.id === 'Discounts')?.value ?? 0

    const shipping = order.shippingData?.logisticsInfo?.[0]
    const shippingOriginal = shipping?.listPrice ?? 0
    const shippingPaid = shipping?.sellingPrice ?? 0
    const shippingDiscount = shippingOriginal - shippingPaid

    let couponType: 'TOTAL' | 'ITEM' | 'SHIPPING' | 'NONE' = 'NONE'
    let discountAmount = 0

    if (shippingDiscount > 0) {
      couponType = 'SHIPPING'
      discountAmount = shippingDiscount
    } else if (hasItemDiscount) {
      couponType = 'ITEM'
      discountAmount = order.items.reduce((sum: number, item: any) => {
        return sum + (item.price - item.sellingPrice)
      }, 0)
    } else if (orderDiscount < 0) {
      couponType = 'TOTAL'
      discountAmount = Math.abs(orderDiscount)
    }

    return {
      orderId: order.orderId,
      couponType,
      promotionName,
      coupon,
      discountAmount,
    }
  })

  ctx.status = 200
  return {
    result: orders,
    shippingInfo,
    couponsDiscounts,
  }
}
