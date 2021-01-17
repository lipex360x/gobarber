import { v4 as uuid } from 'uuid'

import UserToken from '@modules/users/entities/UserToken'
import IUserTokensRepository, { FindByTokenProps, GenerateProps } from '../interfaces/IUserTokensRepository'

export default class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens:UserToken[] = []

  async generate ({ user_id }:GenerateProps): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, {
      user_id,
      token: uuid(),
      created_at: new Date(),
      updated_at: new Date()
    })

    this.userTokens.push(userToken)

    return userToken
  }

  async findByToken ({ token }:FindByTokenProps): Promise<UserToken> {
    const getToken = this.userTokens.find(findToken => findToken.token === token)

    return getToken
  }
}
