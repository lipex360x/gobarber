import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeEncryptProvider from '@modules/users/providers/EncryptProvider/fakes/FakeEncryptProvider'

import UpdateProfileService from './UpdateProfileService'

let fakeUsersRepository: FakeUsersRepository
let fakeEncryptProvider: FakeEncryptProvider

let updateProfileService: UpdateProfileService

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeEncryptProvider = new FakeEncryptProvider()

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeEncryptProvider
    )
  })

  it('should be able to update user data', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456'
    })

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'tre@email.com'
    })

    expect(updatedUser.name).toBe('John Tre')
    expect(updatedUser.email).toBe('tre@email.com')
  })

  it('should not be able to update a non-existing user', async () => {
    await expect(updateProfileService.execute({
      user_id: 'non-exists',
      name: 'John Tre',
      email: 'tre@email.com'
    })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update user data with email has already been used', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456'
    })

    const user = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'test@mail.com',
      password: '123456'
    })

    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'john@mail.com'
    })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456'
    })

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'tre@email.com',
      old_password: '123456',
      password: '112233'
    })

    expect(updatedUser.password).toBe('112233')
  })

  it('should be able to update user password if old_password is wrong', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456'
    })

    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'john@mail.com',
      old_password: '111111',
      password: '112233'
    })
    ).rejects.toBeInstanceOf(AppError)
  })
})
