import { ExternalClient } from '@vtex/api'
import type { InstanceOptions, IOContext, Context } from '@vtex/api'

import type { Clients } from './types'
import type { VTEXContext } from '../types'
import { getVtexAppSettings } from '../utils'

export default class OmsClient extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(
      `https://${ctx.account}.vtexcommercestable.com.br/api/oms`,
      ctx,
      options
    )
  }

  public async getOrdersByOrderGroup(
    context: Context<Clients>,
    orderGroup: string
  ) {
    const settings = await getVtexAppSettings(context as VTEXContext)

    const { omsAppKey, omsAppToken } = settings

    if (!omsAppKey || !omsAppToken) {
      throw new Error('OMS credentials missing in app settings')
    }

    return this.http.get(`/pvt/orders/order-group/${orderGroup}`, {
      headers: {
        'X-VTEX-API-AppKey': omsAppKey.trim(),
        'X-VTEX-API-AppToken': omsAppToken.trim(),
        'X-VTEX-Use-HTTPS': 'true',
      },
    })
  }
}
