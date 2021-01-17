import { inject, injectable } from 'tsyringe'

import User from '@modules/users/entities/User'
import ICacheProvider from '@shared/container/providers/CacheProvider/interfaces/ICacheProvider'
import IUsersRepository from '@modules/users/repositories/interfaces/IUsersRepository'

interface Request {
  except_user_id?: string
}

@injectable()
export default class ListProvidersService {
  constructor (
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute ({ except_user_id }:Request): Promise<User[]> {
    let getUser = await this.cacheProvider.getCache<User[]>({
      key: `providers-list:${except_user_id}`
    })

    if (!getUser) {
      getUser = await this.repository.findAllProviders({ except_user_id })

      await this.cacheProvider.setCache({
        key: `providers-list:${except_user_id}`,
        value: getUser
      })
    }
    return getUser
  }
}
