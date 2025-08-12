import {
  ExternalClient,
  InstanceOptions,
  IOContext,
  ServiceContext,
} from '@vtex/api'

import { Clients } from '.'
import { orderEmailTemplate } from '../templates/email.template'
import { OrderEmailPayload } from '../types/common'

export default class NotificationClient extends ExternalClient {
  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super(`http://${ctx.account}.vtexcommercestable.com.br`, ctx, {
      ...opts,
      headers: {
        ...opts?.headers,
        VtexIdclientAutCookie: ctx.authToken,
      },
    })
  }

  public async sendEmailNotification(
    body: {
      toName: string
      toEmail: string
      subject: string
      payload: OrderEmailPayload
    },
    context: ServiceContext<Clients>
  ) {
    const {
      clients: { templatesApi, emailApi },
    } = context
    const templateName = 'order-test-invoice-s2'

    const exists = await templatesApi.getTemplate(
      templateName,
      orderEmailTemplate
    )

    if (!exists) {
      try {
        await templatesApi.createTemplate(templateName, orderEmailTemplate)
      } catch (e) {
        // If we don't have permission to create, try to proceed with sending.
        const status = e?.response?.status || e?.status
        if (status !== 403) {
          throw e
        }
      }
    }

    const emailJson = {
      subject: body.subject,
      ...body.payload,
      items: body.payload.items.map(i => ({
        ...i,
        isPreorder: i.type === 'preorder',
        currency: body.payload.currency,
      })),
    }

    return emailApi.sendMail({
      TemplateName: templateName,
      applicationName: context.vtex.userAgent,
      logEvidence: false,
      jsonData: {
        to: {
          name: body.toName,
          email: body.toEmail,
          subject: body.subject,
        },
        ...emailJson,
      },
    })
  }
}
