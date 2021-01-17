import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeEncryptProvider from '@modules/users/providers/EncryptProvider/fakes/FakeEncryptProvider'
import CreateUserService from './CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let fakeEncryptProvider: FakeEncryptProvider
let createUserService: CreateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeEncryptProvider = new FakeEncryptProvider()
    createUserService = new CreateUserService(fakeUsersRepository, fakeEncryptProvider)
  })

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123'
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a user with repeated email', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123'
    })

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'john@mail.com',
        password: '123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
