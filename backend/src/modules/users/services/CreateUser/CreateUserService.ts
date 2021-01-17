import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

import User from '@modules/users/entities/User'
import IEncryptProvider from '@modules/users/providers/EncryptProvider/interfaces/IEncryptProvider'
import IUsersRepository from '@modules/users/repositories/interfaces/IUsersRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/interfaces/ICacheProvider'

interface Request {
  name: string
  email: string
  password: string
}

@injectable()
export default class CreateUserService {
  constructor (
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('EncryptProvider')
    private encrypt: IEncryptProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute ({ name, email, password }:Request): Promise<User> {
    const getUser = await this.repository.findByEmail({ email })

    if (getUser) {
      throw new AppError('Email address already used')
    }

    const passwordEncrypt = await this.encrypt.generate({ password })

    const newUser = this.repository.create({
      name,
      email,
      password: passwordEncrypt
    })

    await this.cacheProvider.deletePrefix({ key: 'providers-list' })

    return newUser
  }
}
