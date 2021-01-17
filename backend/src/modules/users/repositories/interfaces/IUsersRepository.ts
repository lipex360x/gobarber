import User from '../../entities/User'

export interface FindByIdProps {
  id: string
}

export interface FindByEmailProps {
  email: string
}

export interface FindAllProvidersProps {
  except_user_id?: string
}

export interface CreateProps {
  name: string
  email: string
  password: string
}

export interface SaveProps {
  user: User
}

export default interface IUsersRepository {
  findById(data: FindByIdProps): Promise<User>
  findByEmail(data: FindByEmailProps): Promise<User>
  findAllProviders(data: FindAllProvidersProps): Promise<User[]>
  create(data: CreateProps): Promise<User>
  save(data: SaveProps): Promise<User>
}
