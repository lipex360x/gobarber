import { MongoRepository, getMongoRepository } from 'typeorm'

import Notification from '@modules/notifications/schemas/Notification'
import INotificationsRepository, { CreateProps } from '../interfaces/INotificationsRepository'

export default class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>

  constructor () {
    this.ormRepository = getMongoRepository(Notification, 'mongo')
  }

  async create ({ recipient_id, content }:CreateProps): Promise<Notification> {
    const notification = this.ormRepository.create({ recipient_id, content })

    await this.ormRepository.save(notification)

    return notification
  }
}
