import { isBefore, getHours, format } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Appointment from '@modules/appointments/entities/Appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/interfaces/IAppointmentsRepository'
import INotificationsRepository from '@modules/notifications/repositories/interfaces/INotificationsRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/interfaces/ICacheProvider'

interface Request {
  user_id: string
  provider_id: string
  date: Date
}

@injectable()
export default class CreateAppointmentService {
  constructor (
    @inject('AppointmentsRepository')
    private repository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notifications: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute ({ user_id, provider_id, date }:Request): Promise<Appointment> {
    if (isBefore(date, Date.now())) {
      throw new AppError("You can't create an appointment on past date")
    }

    const findAppointment = await this.repository.findByDate({ date })

    if (findAppointment) {
      throw new AppError('This appointment is already booked')
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with himself")
    }

    if (getHours(date) < 8 || getHours(date) > 17) {
      throw new AppError('You can only create an appointment between 8am and 17pm')
    }

    const appointment = await this.repository.create({ user_id, provider_id, date })

    const dateFormatted = format(date, "dd/MM/yyyy 'às' HH:mm")

    await this.notifications.create({
      recipient_id: user_id,
      content: `Novo agendamento para o dia ${dateFormatted}`
    })

    const cacheKey = `appointments-list:${provider_id}:${format(date, 'yyyy-M-d')}`

    await this.cacheProvider.delCache({ key: cacheKey })

    return appointment
  }
}
