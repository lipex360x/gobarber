import 'reflect-metadata'
import 'dotenv/config'

import { errors } from 'celebrate'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'

import AppError from '@shared/errors/AppError'
import connectDB from '@shared/typeorm'
import routes from '@shared/routes'
import storageConfig from '@shared/container/providers/StorageProvider/config/storage.config'

import '@shared/container'

const app = express()
connectDB()

app.use(express.json())
app.use('/files', express.static(storageConfig.uploadFolder))

app.use(routes)

app.use(errors())
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message })
  }

  console.error(err)
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})
console.log()
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message })
  }
})

export default app
