import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeEncryptProvider from '@modules/users/providers/EncryptProvider/fakes/FakeEncryptProvider'
import CreateSessionService from './CreateSessionService'

let fakeUsersRepository: FakeUsersRepository
let fakeEncryptProvider: FakeEncryptProvider
let createSessionService: CreateSessionService

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeEncryptProvider = new FakeEncryptProvider()
    createSessionService = new CreateSessionService(fakeUsersRepository, fakeEncryptProvider)
  })

  it('should be able to create a session', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456'
    })

    const response = await createSessionService.execute({
      email: 'john@mail.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
  })

  it('should not be able to create a session with non existing user', async () => {
    await expect(createSessionService.execute({
      email: 'john@mail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('not be able to create a session with password is wrong', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456'
    })

    await expect(createSessionService.execute({
      email: 'john@mail.com',
      password: '112233'
    })).rejects.toBeInstanceOf(AppError)
  })
})
