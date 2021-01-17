import { v4 as uuid } from 'uuid'
import { isEqual, getMonth, getYear, getDate } from 'date-fns'

import Appointment from '@modules/appointments/entities/Appointment'

import InterfaceRepository, {
  CreateProps,
  FindAllInDayProps,
  FindByDateProps,
  FindProvidersInMonthProps
} from '../interfaces/IAppointmentsRepository'

export default class AppointmentsRepository implements InterfaceRepository {
  private appointments: Appointment[] = [];

  async create ({ provider_id, user_id, date }:CreateProps): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, {
      id: uuid(),
      date,
      provider_id,
      user_id
    })

    this.appointments.push(appointment)

    return appointment
  }

  async findProvidersInMonth ({ provider_id, year, month }:FindProvidersInMonthProps): Promise<Appointment[]> {
    const filterAppointments = this.appointments.filter(appointment =>
      appointment.provider_id === provider_id &&
      getYear(appointment.date) === year &&
      getMonth(appointment.date) + 1 === month
    )

    return filterAppointments
  }

  async findAllInDay ({ provider_id, year, month, day }:FindAllInDayProps): Promise<Appointment[]> {
    const filterAppointments = this.appointments.filter(appointment =>
      appointment.provider_id === provider_id &&
      getYear(appointment.date) === year &&
      getDate(appointment.date) === day &&
      getMonth(appointment.date) + 1 === month
    )

    return filterAppointments
  }

  async findByDate ({ date }:FindByDateProps): Promise<Appointment> {
    const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date))

    return findAppointment
  }
}
