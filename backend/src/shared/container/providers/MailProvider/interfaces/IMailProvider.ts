import { ParserProps } from '@shared/container/providers/MailTemplates/interfaces/IMailTemplates'

interface MailContactProps {
  name: string
  email: string
}

export interface SendMailProps {
  to: MailContactProps
  from ?: MailContactProps
  subject: string
  templateData: ParserProps
}

export default interface IMailProvider {
  sendMail(data: SendMailProps): Promise<void>
}
