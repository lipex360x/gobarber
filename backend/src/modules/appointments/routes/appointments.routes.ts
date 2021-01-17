import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import sessionStarted from '@shared/middlewares/sessions/sessionStarted'
import CreateAppointmentsController from '../controllers/CreateAppointmentsController'
import ListAppointmentsController from '../controllers/ListAppointmentsController'

const createAppointmentsController = new CreateAppointmentsController()
const listAppointmentsController = new ListAppointmentsController()

const router = Router()

router.use(sessionStarted)

router.post('/', celebrate({
  [Segments.BODY]: {
    provider_id: Joi.string().uuid().required(),
    date: Joi.date().required()
  }
}), createAppointmentsController.create)

router.get('/me', listAppointmentsController.index)

export default router
