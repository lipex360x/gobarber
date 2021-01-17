import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import User from '@modules/users/entities/User'

import IEncryptProvider from '@modules/users/providers/EncryptProvider/interfaces/IEncryptProvider'
import IUsersRepository from '@modules/users/repositories/interfaces/IUsersRepository'

interface Request {
  user_id: string
  name: string
  email: string
  old_password?: string
  password?: string
}

@injectable()
export default class UpdateProfileService {
  constructor (
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('EncryptProvider')
    private encrypt: IEncryptProvider

  ) {}

  async execute ({ user_id, name, email, password, old_password }:Request): Promise<User> {
    const getUser = await this.repository.findById({ id: user_id })

    if (!getUser) {
      throw new AppError('User not found')
    }

    const getUserByEmail = await this.repository.findByEmail({ email })

    if (getUserByEmail && getUserByEmail.id !== getUser.id) {
      throw new AppError('This email has already been used')
    }

    if (password && old_password) {
      const getOldPassword = await this.encrypt.compare({
        password: old_password,
        hashed: getUser.password
      })

      if (!getOldPassword) {
        throw new AppError('Old Password does not match')
      }

      getUser.password = await this.encrypt.generate({ password })
    }

    getUser.name = name
    getUser.email = email

    await this.repository.save({ user: getUser })

    return getUser
  }
}
