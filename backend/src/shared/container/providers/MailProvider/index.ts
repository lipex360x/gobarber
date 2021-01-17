import { container } from 'tsyringe'

import IMailProvider from './interfaces/IMailProvider'
import EtherialProvider from './implementations/EtherialProvider'

const providers = {
  ethereal: container.resolve(EtherialProvider)
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers.ethereal
)
