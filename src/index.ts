import * as crypto from 'crypto'
import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { v4 } from 'uuid'
import validator from 'validator'
import { getUserFromUuid, saveUser } from './db'
import { UserData } from './types'
import { sendMail } from './mail'
const xss = require('xss')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))

function hashKey(key: string): string {
  const hashed = crypto.createHash('md5').update(key).digest('hex')
  return hashed
}

function validateBody(body: Omit<UserData, 'uuid'>): void {
  const { email, firstName, lastName, message } = body
  if (!email) throw new Error('Email mancante')
  if (!firstName) throw new Error('Nome mancante')
  if (!lastName) throw new Error('Cognome mancante')
  if (!validator.isEmail(email)) throw new Error('Email non valida')
  if (xss(firstName) !== firstName) throw new Error('Eddai non si fanno gli XSS')
  if (xss(lastName) !== lastName) throw new Error('Eddai non si fanno gli XSS')
  if (xss(email) !== email) throw new Error('Eddai non si fanno gli XSS')
  if (xss(message) !== message) throw new Error('Eddai non si fanno gli XSS')
}

app.post('/invite', (req, res) => {
  try {
    validateBody(req.body)
    const { firstName, lastName, message } = req.body
    const uuid = v4()
    const email = hashKey(req.body.email)
    saveUser({ email, firstName, lastName, uuid, message }).then((error) => {
      if (error) return res.json({ success: false, error: error })
      res.json({ success: true }).end()
      return sendMail({ email: req.body.email, firstName, lastName, uuid, message })
    })
  } catch (err) {
    res.json({ success: false, error: err.message })
  }
})

app.get('/invite', (req, res) => {
  const { uuid } = req.query
  getUserFromUuid(uuid as string).then((userData) => {
    res.json(userData)
  })
})

app.listen(3000, () => {
  console.log('started!')
})
