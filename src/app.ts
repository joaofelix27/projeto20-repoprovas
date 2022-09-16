import express, { json } from 'express'
import cors from 'cors'
import "express-async-errors"
import router from './routers'
import errorHandler from './middlewares/errorHandlerMiddleware'


const app = express ()

app.use (json(),cors())
app.use(router)
app.use(errorHandler)


export default app;