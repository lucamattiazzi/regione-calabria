import { reject } from 'lodash'
import redis from 'redis'
import { UserData } from './types'
import { config } from 'dotenv'

config()

const client = redis.createClient({
  host: process.env.REDIS || 'localhost',
})

function promiseSet(key: string, value: string): Promise<any> {
  return new Promise<any>((resolve) => {
    client.set(key, value, resolve)
  })
}

function promiseGet(key: string): Promise<string> {
  return new Promise<any>((resolve) => {
    client.get(key, (err, val) => {
      err ? reject(err) : resolve(val)
    })
  })
}

export async function saveUser(userData: UserData): Promise<string> {
  try {
    const oldUserData = await getUserFromEmail(userData.email)
    if (oldUserData) throw new Error('Email già usata')
    await promiseSet(`email.${userData.email}`, JSON.stringify(userData))
    await promiseSet(`uuid.${userData.uuid}`, JSON.stringify(userData))
    return null
  } catch (err) {
    return err.message
  }
}

export async function getUserFromEmail(email: string): Promise<UserData> {
  const userData = await promiseGet(`email.${email}`)
  return JSON.parse(userData)
}

export async function getUserFromUuid(uuid: string): Promise<UserData> {
  const userData = await promiseGet(`uuid.${uuid}`)
  return JSON.parse(userData)
}
