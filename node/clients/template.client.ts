import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export default class TemplateClient extends JanusClient {
  private url = `http://${this.context.account}.myvtex.com/api/template-render/pvt/templates`

  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        ...options?.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Vtex-Use-Https': 'true',
        VtexIdclientAutCookie: context.adminUserAuthToken ?? context.authToken,
      },
    })
  }

  public async getTemplate(
    templateName: string,
    emailTemplate: string
  ): Promise<boolean> {
    return this.http
      .getRaw(`${this.url}/${templateName}`)
      .then(
        res =>
          res.status === 200 &&
          res.data.Templates.email.Message === emailTemplate
      )
      .catch(() => false)
  }

  public async createTemplate(templateName: string, emailTemplate: string) {
    return this.http.post(this.url, {
      Name: templateName,
      FriendlyName: 'Whola Preorder Payment',
      Description: null,
      IsDefaultTemplate: false,
      AccountId: null,
      AccountName: null,
      ApplicationId: null,
      IsPersisted: true,
      IsRemoved: false,
      Type: '',
      Templates: {
        email: {
          To: '{{to.email}}',
          CC: null,
          BCC: null,
          Subject: '{{to.subject}}',
          Message: emailTemplate,
          Type: 'E',
          ProviderId: '00000000-0000-0000-0000-000000000000',
          ProviderName: null,
          IsActive: true,
          withError: false,
        },
        sms: {
          Type: 'S',
          ProviderId: null,
          ProviderName: null,
          IsActive: false,
          withError: false,
          Parameters: [],
        },
      },
    })
  }
}
