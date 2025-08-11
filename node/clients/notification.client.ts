import {ExternalClient, InstanceOptions, IOContext, ServiceContext} from '@vtex/api'
import {Clients} from '../clients'
import {testEmailTemplate} from "../templates/email.template";

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
      payload: Record<string, any>
    },
    context: ServiceContext<Clients>
  ) {

    const {
      clients: { templatesApi,emailApi },
    } = context

    const templateName = 'test-dynamic-template'

    const isTemplateAvailable = await templatesApi.getTemplate(
      templateName,
      testEmailTemplate
    )

    if (!isTemplateAvailable) {
      await templatesApi.createTemplate(templateName, testEmailTemplate)
    }

    const emailJson = {
      text: body.payload.text,
    }
    return emailApi.sendMail({
      TemplateName: templateName,
      applicationName: context.vtex.userAgent,
      logEvidence: false,
      jsonData: {
        to: {
          name:'TEST',
          email: 'vmorari@fusionworks.md',
          subject: 'New Order',
        },
        ...emailJson,
      },
    })
  }
}
