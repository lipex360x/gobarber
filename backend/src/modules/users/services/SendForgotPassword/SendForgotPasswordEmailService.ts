import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import path from 'path'

import IUsersRepository from '@modules/users/repositories/interfaces/IUsersRepository'
import IMailProvider from '@shared/container/providers/MailProvider/interfaces/IMailProvider'
import IUserTokensRepository from '@modules/users/repositories/interfaces/IUserTokensRepository'

interface Request {
  email: string
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor (
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userToken: IUserTokensRepository
  ) {}

  async execute ({ email }:Request): Promise<void> {
    const getUser = await this.repository.findByEmail({ email })

    if (!getUser) {
      throw new AppError('User does not exists')
    }

    const { token } = await this.userToken.generate({ user_id: getUser.id })

    const forgotTemplate = path.resolve(__dirname, '..', '..', 'templates', 'forgot_password.hbs')

    await this.mailProvider.sendMail({
      to: {
        name: getUser.name,
        email: getUser.email
      },
      subject: '[GoBarber] Recovery Password',
      templateData: {
        file: forgotTemplate,
        variables: {
          name: getUser.name,
          link: `${process.env.APP_URL}/reset_password?token=${token}`
        }
      }
    })
  }
}
