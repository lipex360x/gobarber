import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import CreateSessionController from '../controllers/CreateSessionController'

const createSessionController = new CreateSessionController()

const router = Router()

router.post('/', celebrate({
  [Segments.BODY]: {
    email: Joi.string().required().email(),
    password: Joi.string().required()
  }
}), createSessionController.create)

export default router
