import { Apps } from '@vtex/api'

import type { VTEXContext } from '../types'

export interface AppSettings {
  api__accessUser?: string
  api__accessPassword?: string
  stripe__pk?: string

  // OMS
  omsAppKey?: string
  omsAppToken?: string
}

export async function getVtexAppSettings(
  ctx: VTEXContext
): Promise<AppSettings> {
  const apps = new Apps(ctx.vtex)
  const settings = await apps.getAppSettings(ctx.vtex.userAgent)

  return settings as AppSettings
}
