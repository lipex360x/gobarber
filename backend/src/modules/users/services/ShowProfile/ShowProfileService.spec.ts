import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

import ShowProfileService from './ShowProfileService'

let fakeUsersRepository: FakeUsersRepository
let showProfileService: ShowProfileService

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    showProfileService = new ShowProfileService(fakeUsersRepository)
  })

  it('should be able to show user data', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456'
    })

    const profile = await showProfileService.execute({ user_id: user.id })

    expect(profile.email).toBe('john@mail.com')
  })

  it('should not be able to show a non-existing user', async () => {
    await expect(
      showProfileService.execute({ user_id: 'non-existing-user' })
    ).rejects.toBeInstanceOf(AppError)
  })
})
