import { Router } from 'express'

import AppointmentsRouter from '@modules/appointments/routes/appointments.routes'
import UsersRouter from '@modules/users/routes/Users.routes'
import ProvidersRouter from '@modules/appointments/routes/providers.routes'
import ProfileRouter from '@modules/users/routes/Profile.routes'
import PasswordRouter from '@modules/users/routes/Password.routes'
import SessionsRouter from '@shared/middlewares/sessions/routes/Sessions.routes'

const router = Router()

router.use('/appointments', AppointmentsRouter)
router.use('/users', UsersRouter)
router.use('/providers', ProvidersRouter)
router.use('/profile', ProfileRouter)
router.use('/password', PasswordRouter)
router.use('/sessions', SessionsRouter)

export default router
