import { inject, injectable } from 'tsyringe'
import { sign } from 'jsonwebtoken'

import sessionConfig from '@shared/middlewares/sessions/config/session.config'

import AppError from '@shared/errors/AppError'
import User from '@modules/users/entities/User'
import IEncryptProvider from '@modules/users/providers/EncryptProvider/interfaces/IEncryptProvider'
import IUsersRepository from '@modules/users/repositories/interfaces/IUsersRepository'

interface Request {
  email: string
  password: string
}

interface Response{
  user: User
  token: string
}

@injectable()
export default class CreateSessionService {
  constructor (
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('EncryptProvider')
    private encrypt: IEncryptProvider
  ) { }

  async execute ({ email, password }:Request): Promise<Response> {
    const getUser = await this.repository.findByEmail({ email })

    if (!getUser) {
      throw new AppError('Combination user/password is wrong', 401)
    }

    const passwordMached = await this.encrypt.compare({ password, hashed: getUser.password })
    if (!passwordMached) {
      throw new AppError('Combination user/password is wrong', 401)
    }

    const { secret, expiresIn } = sessionConfig.jwt
    const token = sign({}, secret, {
      subject: getUser.id,
      expiresIn: expiresIn
    })

    return {
      user: getUser,
      token
    }
  }
}
