import { container } from 'tsyringe'

import '@modules/users/providers/injectProviders'
import './providers/injectProviders'

import IAppointmentsRepository from '@modules/appointments/repositories/interfaces/IAppointmentsRepository'
import AppointmentsRepository from '@modules/appointments/repositories/implementations/AppointmentsRepository'

import IUsersRepository from '@modules/users/repositories/interfaces/IUsersRepository'
import UsersRepository from '@modules/users/repositories/implementations/UsersRepository'

import IUserTokensRepository from '@modules/users/repositories/interfaces/IUserTokensRepository'
import UserTokensRepository from '@modules/users/repositories/implementations/UserTokensRepository'

import INotificationsRepository from '@modules/notifications/repositories/interfaces/INotificationsRepository'
import NotificationsRepository from '@modules/notifications/repositories/implementations/NotificationsRepository'

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
)

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository
)
