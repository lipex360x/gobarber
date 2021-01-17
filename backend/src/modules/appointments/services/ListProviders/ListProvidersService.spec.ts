import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

import ListProvidersService from './ListProvidersService'

let fakeUsersRepository: FakeUsersRepository
let listProvidersService: ListProvidersService

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    listProvidersService = new ListProvidersService(fakeUsersRepository)
  })

  it('should be able to show all providers', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456'
    })

    await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@mail.com',
      password: '123456'
    })

    const user = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@mail.com',
      password: '123456'
    })

    const providers = await listProvidersService.execute({ except_user_id: user.id })

    expect(providers.length).toEqual(2)
  })
})
