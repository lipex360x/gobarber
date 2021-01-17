import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProvidersService from '../services/ListProviders/ListProvidersService'

export default class ListProvidersController {
  public async index (request:Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const listProviders = container.resolve(ListProvidersService)

    const providers = await listProviders.execute({ except_user_id: user_id })

    return response.json(providers)
  }
}
