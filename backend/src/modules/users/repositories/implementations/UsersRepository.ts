import { Repository, getRepository, Not } from 'typeorm'
import IUsersRepository, { FindByEmailProps, FindByIdProps, CreateProps, SaveProps, FindAllProvidersProps } from '../interfaces/IUsersRepository'

import User from '@modules/users/entities/User'

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor () {
    this.ormRepository = getRepository(User)
  }

  async findByEmail ({ email }:FindByEmailProps): Promise<User> {
    const getUser = await this.ormRepository.findOne({ where: { email } })

    return getUser
  }

  async findById ({ id }:FindByIdProps): Promise<User> {
    const getUser = await this.ormRepository.findOne(id)

    return getUser
  }

  async findAllProviders ({ except_user_id }:FindAllProvidersProps):Promise<User[]> {
    let users: User[]

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id)
        }
      })
    } else {
      users = await this.ormRepository.find()
    }

    return users
  }

  async create ({ name, email, password }:CreateProps): Promise<User> {
    const user = this.ormRepository.create({ name, email, password })

    await this.ormRepository.save(user)

    return user
  }

  async save ({ user }:SaveProps): Promise<User> {
    return this.ormRepository.save(user)
  }
}
