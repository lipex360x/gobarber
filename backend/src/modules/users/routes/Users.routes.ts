import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import multer from 'multer'

import storageConfig from '@shared/container/providers/StorageProvider/config/storage.config'
import sessionStarted from '@shared/middlewares/sessions/sessionStarted'

import UsersController from '../controller/CreateUserController'
import UpdateAvatarController from '../controller/UpdateAvatarController'

const usersController = new UsersController()
const updateAvatarController = new UpdateAvatarController()

const router = Router()
const upload = multer(storageConfig)

router.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  }
}), usersController.create)

router.use(sessionStarted)
router.patch('/avatar', upload.single('avatar'), updateAvatarController.update)

export default router
