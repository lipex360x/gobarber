// index, show, create, update, delete
import { Request, Response } from 'express'
import { classToClass } from 'class-transformer'
import { container } from 'tsyringe'

import CreateSessionService from '../services/CreateSession/CreateSessionService'

export default class CreateSessionController {
  async create (request:Request, response: Response): Promise<Response> {
    const createSession = container.resolve(CreateSessionService)

    const { email, password } = request.body

    const { user, token } = await createSession.execute({ email, password })

    return response.json({ user: classToClass(user), token })
  }
}
