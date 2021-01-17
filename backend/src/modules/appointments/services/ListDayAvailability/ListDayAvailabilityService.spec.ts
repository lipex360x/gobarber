import ListDayAvailabilityService from './ListDayAvailabilityService'
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'

let fakeAppointmentsRepository:FakeAppointmentsRepository
let listDayAvailabilityService: ListDayAvailabilityService

describe('ListDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listDayAvailabilityService = new ListDayAvailabilityService(fakeAppointmentsRepository)
  })

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 14, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 15, 0, 0)
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 21, 11).getTime()
    })

    const availability = await listDayAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 21
    })

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 9, available: false },
      { hour: 10, available: false },
      { hour: 12, available: true },
      { hour: 14, available: false },
      { hour: 15, available: false },
      { hour: 16, available: true }

    ]))
  })
})
