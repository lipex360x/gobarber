import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import User from '@modules/users/entities/User'

import IUsersRepository from '@modules/users/repositories/interfaces/IUsersRepository'

interface Request {
  user_id: string
}

@injectable()
export default class UpdateProfileService {
  constructor (
    @inject('UsersRepository')
    private repository: IUsersRepository
  ) {}

  async execute ({ user_id }:Request): Promise<User> {
    const getUser = await this.repository.findById({ id: user_id })

    if (!getUser) {
      throw new AppError('User not found')
    }

    return getUser
  }
}
