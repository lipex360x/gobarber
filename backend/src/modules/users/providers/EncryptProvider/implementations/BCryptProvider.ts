import { hash, compare } from 'bcryptjs'

import IEncryptProvider, { CompareProps, GenerateProps } from '../interfaces/IEncryptProvider'

export default class BCryptProvider implements IEncryptProvider {
  async generate ({ password }:GenerateProps): Promise<string> {
    return hash(password, 8)
  }

  async compare ({ password, hashed }:CompareProps): Promise<boolean> {
    return compare(password, hashed)
  }
}
