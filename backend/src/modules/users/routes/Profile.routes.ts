import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import sessionStarted from '@shared/middlewares/sessions/sessionStarted'

import UpdateProfileController from '../controller/UpdateProfileController'
import ShowProfileController from '../controller/ShowProfileController'

const updateProfileController = new UpdateProfileController()
const showProfileController = new ShowProfileController()

const router = Router()

router.use(sessionStarted)

router.get('/', showProfileController.show)

router.put('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    old_password: Joi.string(),
    password: Joi.string(),
    password_confirmation: Joi.string().valid(Joi.ref('password'))
  }
}), updateProfileController.update)

export default router
