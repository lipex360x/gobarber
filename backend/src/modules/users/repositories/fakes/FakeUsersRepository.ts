import { v4 as uuid } from 'uuid'
import IUsersRepository, { FindByEmailProps, FindByIdProps, CreateProps, SaveProps, FindAllProvidersProps } from '../interfaces/IUsersRepository'

import User from '@modules/users/entities/User'

export default class UsersRepository implements IUsersRepository {
  private users:User[] = []

  async findByEmail ({ email }:FindByEmailProps): Promise<User> {
    const getUser = this.users.find(user => user.email === email)

    return getUser
  }

  async findById ({ id }:FindByIdProps): Promise<User> {
    const getUser = this.users.find(user => user.id === id)

    return getUser
  }

  async findAllProviders ({ except_user_id }:FindAllProvidersProps):Promise<User[]> {
    let getUsers = this.users

    if (except_user_id) {
      getUsers = this.users.filter(user => user.id !== except_user_id)
    }

    return getUsers
  }

  async create ({ name, email, password }:CreateProps): Promise<User> {
    const user = new User()

    Object.assign(user, {
      id: uuid(),
      name,
      email,
      password
    })

    this.users.push(user)

    return user
  }

  async save ({ user }:SaveProps): Promise<User> {
    const getIndex = this.users.findIndex(getUser => getUser.id === user.id)

    this.users[getIndex] = user

    return user
  }
}
