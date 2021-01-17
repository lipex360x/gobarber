import { container } from 'tsyringe'

import IMailTemplates from './interfaces/IMailTemplates'
import HandlebarsMailTemplate from './implementations/HandlebarsMailTemplate'

const providers = {
  HandleBars: HandlebarsMailTemplate
}

container.registerSingleton<IMailTemplates>(
  'MailTemplate',
  providers.HandleBars
)
