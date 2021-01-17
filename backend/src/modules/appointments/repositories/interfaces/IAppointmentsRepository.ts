import Appointment from '@modules/appointments/entities/Appointment'

export interface CreateProps {
  provider_id: string
  user_id: string
  date: Date
}

export interface FindByDateProps {
  date: Date
}

export interface FindProvidersInMonthProps{
  provider_id: string
  month: number
  year: number
}

export interface FindAllInDayProps {
  provider_id: string
  month: number
  year: number
  day: number
}

export default interface IAppointmentsRepository {
  findByDate(data:FindByDateProps): Promise<Appointment>
  findProvidersInMonth(data: FindProvidersInMonthProps): Promise<Appointment[]>
  findAllInDay(data: FindAllInDayProps): Promise<Appointment[]>
  create(data: CreateProps): Promise<Appointment>
}
