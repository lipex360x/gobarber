import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository'
import FakeEncryptProvider from '@modules/users/providers/EncryptProvider/fakes/FakeEncryptProvider'

import ResetPasswordService from './ResetPasswordService'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeEncryptProvider: FakeEncryptProvider

let resetPasswordService: ResetPasswordService

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeEncryptProvider = new FakeEncryptProvider()

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeEncryptProvider
    )
  })

  it('should be able to reset the password', async () => {
    let user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456'
    })

    const { token } = await fakeUserTokensRepository.generate({ user_id: user.id })

    user = await fakeUsersRepository.findByEmail({ email: user.email })

    const encryptPassword = jest.spyOn(fakeEncryptProvider, 'generate')

    await resetPasswordService.execute({
      token,
      password: '123123'
    })

    expect(user.password).toBe('123123')
    expect(encryptPassword).toHaveBeenCalledWith({ password: '123123' })
  })

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing',
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate({ user_id: 'non-existing-user' })

    await expect(
      resetPasswordService.execute({
        token: token,
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456'
    })

    const { token } = await fakeUserTokensRepository.generate({ user_id: user.id })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date()

      return customDate.setHours(customDate.getHours() + 3)
    })

    await expect(
      resetPasswordService.execute({
        token,
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
