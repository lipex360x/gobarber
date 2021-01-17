import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import SendForgotPasswordController from '../controller/SendForgotPasswordController'
import ResetPasswordController from '../controller/ResetPasswordController'

const router = Router()

const sendForgotPasswordController = new SendForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

router.post('/forgot', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required()
  }
}), sendForgotPasswordController.create)

router.post('/reset', celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password'))
  }
}), resetPasswordController.create)

export default router
