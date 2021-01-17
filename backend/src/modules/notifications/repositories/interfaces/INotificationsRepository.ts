import Notification from '@modules/notifications/schemas/Notification'

export interface CreateProps {
  content: string
  recipient_id: string
}

export default interface INotificationsRepository {
  create(data: CreateProps): Promise<Notification>
}
