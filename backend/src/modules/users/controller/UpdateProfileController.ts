import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { classToClass } from 'class-transformer'

import UpdateProfileService from '../services/UpdateProfile/UpdateProfileService'

export default class UpdateAvatarController {
  async update (request: Request, response: Response): Promise<Response> {
    const { name, email, old_password, password } = request.body
    const { id } = request.user

    const updateProfile = container.resolve(UpdateProfileService)

    const updatedUser = await updateProfile.execute({
      user_id: id,
      name,
      email,
      old_password,
      password
    })

    return response.json(classToClass(updatedUser))
  }
}
