import { json } from 'co-body'
import type { ServiceContext } from '@vtex/api'
import type { Clients } from '../../clients'

interface EmailRequest {
  toName: string
  toEmail: string
  subject: string
  payload: Record<string, any>
}

export async function sendPaymentNotification(ctx: ServiceContext<Clients>) {

  const body = (await json(ctx.req)) as EmailRequest

  const result = await ctx.clients.notificationApi.sendEmailNotification(
    body,
    ctx
  )

  ctx.status = 200
  ctx.body = result
  return result
}
