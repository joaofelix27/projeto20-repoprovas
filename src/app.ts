import express, { json } from 'express'
import cors from 'cors'

const app = express ()

app.use (json(),cors())


export default app;