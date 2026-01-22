import { IOClients } from '@vtex/api'

import NotificationClient from './notification.client'
import TemplateClient from './template.client'
import EmailClient from './email.client'
import OmsClient from './oms.client'

export class Clients extends IOClients {
  public get notificationApi(): NotificationClient {
    return this.getOrSet('notificationApi', NotificationClient)
  }

  public get templatesApi(): TemplateClient {
    return this.getOrSet('templatesApi', TemplateClient)
  }

  public get emailApi(): EmailClient {
    return this.getOrSet('emailApi', EmailClient)
  }

  public get omsApi(): OmsClient {
    return this.getOrSet('omsApi', OmsClient)
  }
}
