import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import sessionStarted from '@shared/middlewares/sessions/sessionStarted'

import ListProvidersController from '../controllers/ListProvidersController'
import ListDayAvailabilityController from '../controllers/ListDayAvailabilityController'
import ListMonthAvailabilityController from '../controllers/ListMonthAvailabilityController'

const listProvidersController = new ListProvidersController()
const listDayAvailabilityController = new ListDayAvailabilityController()
const listMonthAvailabilityController = new ListMonthAvailabilityController()

const router = Router()

router.use(sessionStarted)
router.get('/', listProvidersController.index)

router.get('/:provider_id/month-availability', celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required()
  }
}), listMonthAvailabilityController.index)

router.get('/:provider_id/day-availability', celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required()
  }
}), listDayAvailabilityController.index)

export default router
