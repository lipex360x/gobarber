import { ObjectID } from 'mongodb'

import Notification from '@modules/notifications/schemas/Notification'
import INotificationsRepository, { CreateProps } from '../interfaces/INotificationsRepository'

export default class FakeNotificationsRepository implements INotificationsRepository {
  private notifications:Notification[] = []

  async create ({ recipient_id, content }:CreateProps): Promise<Notification> {
    const notification = new Notification()

    Object.assign(notification, {
      id: new ObjectID(),
      recipient_id,
      content
    })

    this.notifications.push(notification)

    return notification
  }
}
