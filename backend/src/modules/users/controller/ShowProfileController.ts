import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { classToClass } from 'class-transformer'

import ShowProfileService from '../services/ShowProfile/ShowProfileService'

export default class ShowProfileController {
  async show (request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const profile = container.resolve(ShowProfileService)

    const getUser = await profile.execute({ user_id })

    return response.json(classToClass(getUser))
  }
}
