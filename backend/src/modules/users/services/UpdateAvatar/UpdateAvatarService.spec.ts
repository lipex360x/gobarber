import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'

import UpdateAvatarService from './UpdateAvatarService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeStorageProvider: FakeStorageProvider

let updateAvatarService: UpdateAvatarService

describe('UpdateAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeStorageProvider = new FakeStorageProvider()

    updateAvatarService = new UpdateAvatarService(fakeUsersRepository, fakeStorageProvider)
  })

  it('shoud be able to update the user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456'
    })

    await updateAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    })

    expect(user.avatar).toBe('avatar.jpg')
  })

  it('shoud not be able to update a non-existing user', async () => {
    await expect(updateAvatarService.execute({
      user_id: 'non-existing',
      avatarFilename: 'avatar.jpg'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('shoud be able to delete old user avatar version', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456'
    })

    await updateAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    })

    await updateAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg'
    })

    expect(deleteFile).toHaveBeenCalledWith({ file: 'avatar.jpg' })
    expect(user.avatar).toBe('avatar2.jpg')
  })
})
