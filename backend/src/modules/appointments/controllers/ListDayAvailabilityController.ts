import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListDayAvailabilityService from '../services/ListDayAvailability/ListDayAvailabilityService'

export default class ListDayAvailabilityController {
  public async index (request:Request, response: Response): Promise<Response> {
    const { provider_id } = request.params
    const { year, month, day } = request.body

    const listDayAvailability = container.resolve(ListDayAvailabilityService)

    const availability = await listDayAvailability.execute({ provider_id, year, month, day })

    return response.json(availability)
  }
}
