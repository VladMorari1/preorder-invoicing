import { Apps } from '@vtex/api'
import { AxiosBasicCredentials } from 'axios'

import { VTEXContext } from '../types'

interface PreOrderAppSettings {
  api__accessUser: string
  api__accessPassword: string
  stripe__pk: string
}

export async function getVtexAppSettings(
  ctx: VTEXContext
): Promise<PreOrderAppSettings> {
  const apps = new Apps(ctx.vtex)

  const settings = await apps.getAppSettings(ctx.vtex.userAgent)

  return settings
}

export async function getMongoCredentials(
  context: VTEXContext
): Promise<AxiosBasicCredentials> {
  const {
    api__accessUser: username,
    api__accessPassword: password,
  } = await getVtexAppSettings(context)

  return {
    username,
    password,
  }
}
