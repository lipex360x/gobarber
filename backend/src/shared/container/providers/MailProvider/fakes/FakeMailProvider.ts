import ISendMails, { SendMailProps } from '../interfaces/IMailProvider'

export default class FakeMailProvider implements ISendMails {
  private messages: SendMailProps[] = []

  async sendMail (message:SendMailProps): Promise<void> {
    this.messages.push(message)
  }
}
