// Import App Error
import AppError from '@shared/errors/AppError'

// Import Fakes
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'

// Import Services
import CreateAppointmentService from './CreateAppointmentService'

// let fakes: Fakes
let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakeNotificationsRepository: FakeNotificationsRepository

// let services: Services
let createAppointmentService: CreateAppointmentService

describe('CreateAppointment', () => {
  beforeEach(() => {
    // Fake Instances
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeNotificationsRepository = new FakeNotificationsRepository()

    // Service Instances
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository
    )
  })

  // its ...
  it('should be able to create an appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 12).getTime()
    })

    // Service Execute...
    const appointment = await createAppointmentService.execute({
      date: new Date(2021, 4, 10, 14),
      user_id: 'user_id',
      provider_id: 'provider_id'
    })

    // Expect Results
    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('provider_id')
  })

  it('should not be able to two appointments in same date and hour', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 10).getTime()
    })

    const appointmentDate = new Date(2020, 5, 10, 11)

    // Service Execute...
    await createAppointmentService.execute({
      date: appointmentDate,
      user_id: 'user_id',
      provider_id: 'provider_id'
    })

    // Expect Results
    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        user_id: 'user_id',
        provider_id: 'provider_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('shound not be able to create an appointment on past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 12).getTime()
    })

    await expect(
      createAppointmentService.execute({
        date: new Date(2021, 4, 10, 11),
        user_id: 'user_id',
        provider_id: 'provider_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('shound not be able to create an appointment for himself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 12).getTime()
    })

    await expect(
      createAppointmentService.execute({
        date: new Date(2021, 4, 10, 13),
        user_id: 'user_id',
        provider_id: 'user_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('shound not be able to create an appointment out of hour', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 12).getTime()
    })

    await expect(
      createAppointmentService.execute({
        date: new Date(2021, 4, 11, 7),
        user_id: 'user_id',
        provider_id: 'provider_id'
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointmentService.execute({
        date: new Date(2021, 4, 11, 18),
        user_id: 'user_id',
        provider_id: 'provider_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
