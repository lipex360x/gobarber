import nodemailer, { Transporter } from 'nodemailer'
import { inject, injectable } from 'tsyringe'

import IMailProvider, { SendMailProps } from '../interfaces/IMailProvider'
import IMailTemplates from '../../MailTemplates/interfaces/IMailTemplates'

@injectable()
export default class EtherialProvider implements IMailProvider {
  private client: Transporter

  constructor (
    @inject('MailTemplate')
    private mailTemplate: IMailTemplates
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: 587,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })

      this.client = transporter
    })
  }

  public async sendMail ({ to, subject, from, templateData }:SendMailProps): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Gobarber',
        address: from?.email || 'contact@gobarber.com'
      },

      to: {
        name: to.name,
        address: to.email
      },

      subject,
      html: await this.mailTemplate.parser(templateData)
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
