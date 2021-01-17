import UserToken from '@modules/users/entities/UserToken'

export interface GenerateProps {
  user_id: string
}
export interface FindByTokenProps {
  token: string
}

export default interface IUserTokensRepository {
  generate(data: GenerateProps): Promise<UserToken>
  findByToken(data: FindByTokenProps): Promise<UserToken>
}
