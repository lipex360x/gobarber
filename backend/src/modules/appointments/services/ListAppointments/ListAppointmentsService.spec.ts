import ListAppointmentsService from './ListAppointmentsService'
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

let fakeAppointmentsRepository:FakeAppointmentsRepository
let fakeUsersRepository: FakeUsersRepository
let listAppointmentsService: ListAppointmentsService

describe('ListAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeUsersRepository = new FakeUsersRepository()
    listAppointmentsService = new ListAppointmentsService(fakeAppointmentsRepository)
  })

  it('should be able to list appointments on a specific day', async () => {
    const provider = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'john@mail.com',
      password: '123456'
    })

    await fakeAppointmentsRepository.create({
      provider_id: provider.id,
      user_id: 'user_id',
      date: new Date(2020, 4, 21, 10, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: provider.id,
      user_id: 'user_id',
      date: new Date(2020, 4, 21, 12, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: provider.id,
      user_id: 'user_id',
      date: new Date(2020, 4, 21, 15, 0, 0)
    })

    const appointments = await listAppointmentsService.execute({
      provider_id: provider.id,
      year: 2020,
      month: 5,
      day: 21
    })

    expect(appointments.length).toEqual(3)
  })
})
