import { container } from 'tsyringe'

import IEncryptProvider from './interfaces/IEncryptProvider'
import BCryptProvider from './implementations/BCryptProvider'

const providers = {
  bcrypt: BCryptProvider
}

container.registerSingleton<IEncryptProvider>(
  'EncryptProvider',
  providers.bcrypt
)
