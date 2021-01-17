import UserToken from '@modules/users/entities/UserToken'
import IUserTokensRepository, { FindByTokenProps, GenerateProps } from '../interfaces/IUserTokensRepository'
import { getRepository, Repository } from 'typeorm'

export default class FakeUserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserToken>

  constructor () {
    this.repository = getRepository(UserToken)
  }

  async generate ({ user_id }:GenerateProps): Promise<UserToken> {
    const userToken = this.repository.create({ user_id })

    await this.repository.save(userToken)

    return userToken
  }

  async findByToken ({ token }:FindByTokenProps): Promise<UserToken> {
    const getToken = this.repository.findOne({ where: { token } })

    return getToken
  }
}
