import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListAppointmentsService from '../services/ListAppointments/ListAppointmentsService'

export default class ListAppointmentsController {
  public async index (request:Request, response: Response): Promise<Response> {
    const provider_id = request.user.id
    const { year, month, day } = request.body

    const listAppointments = container.resolve(ListAppointmentsService)

    const appointments = await listAppointments.execute({ provider_id, year, month, day })

    return response.json(appointments)
  }
}
