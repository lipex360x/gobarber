import AppError from '@shared/errors/AppError'
import { addHours, isAfter } from 'date-fns'
import { inject, injectable } from 'tsyringe'

import IUsersRepository from '@modules/users/repositories/interfaces/IUsersRepository'
import IUserTokensRepository from '@modules/users/repositories/interfaces/IUserTokensRepository'
import IEncryptProvider from '@modules/users/providers/EncryptProvider/interfaces/IEncryptProvider'

interface Request {
  token: string
  password: string
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor (
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('UserTokensRepository')
    private userToken: IUserTokensRepository,

    @inject('EncryptProvider')
    private encrypt: IEncryptProvider
  ) {}

  async execute ({ token, password }:Request): Promise<void> {
    const getUserToken = await this.userToken.findByToken({ token })

    if (!getUserToken) {
      throw new AppError('User Token does not exists')
    }
    const getUser = await this.repository.findById({ id: getUserToken.user_id })

    if (!getUser) {
      throw new AppError('User does not exists')
    }

    const tokenCreatedAt = getUserToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired')
    }

    getUser.password = await this.encrypt.generate({ password })

    await this.repository.save({ user: getUser })
  }
}
