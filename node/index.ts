import type { ClientsConfig } from '@vtex/api'
import { LRUCache, Service, method } from '@vtex/api'

import { Clients } from './clients'
import { buildErrorHandler } from './middlewares/error.middleware'
import { sendPaymentNotification } from './services/notification/notification.handler'
import { getOrdersByOrderGroup } from './services/oms/oms.handler'

const TIMEOUT_MS = 1000 * 10

const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

export default new Service({
  clients,
  events: {},
  routes: {
    sendNotification: method({
      POST: [buildErrorHandler(sendPaymentNotification)],
    }),
    getOrdersByOrderGroup: method({
      GET: [buildErrorHandler(getOrdersByOrderGroup)],
    }),
  },
})
