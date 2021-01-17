import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListMonthAvailabilityService from '../services/ListMonthAvailability/ListMonthAvailabilityService'

export default class ListMonthAvailabilityController {
  public async index (request:Request, response: Response): Promise<Response> {
    const { provider_id } = request.params
    const { year, month } = request.body

    const listMonthAvailability = container.resolve(ListMonthAvailabilityService)

    const availability = await listMonthAvailability.execute({ provider_id, year, month })

    return response.json(availability)
  }
}
