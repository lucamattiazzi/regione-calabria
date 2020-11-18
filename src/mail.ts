import FormData from 'form-data'
import { UserData } from './types'
import { capitalize } from 'lodash'
import { config } from 'dotenv'
const mailgun = require('mailgun.js')

config()

const { MAILGUN_TOKEN, MAILGUN_DOMAIN } = process.env

const mg = mailgun.client({
  username: 'api',
  key: MAILGUN_TOKEN,
  url: 'https://api.eu.mailgun.net',
})

export function sendMail(userData: UserData) {
  const body = {
    to: `${userData.email}, sanita@regionecalabria.itaila.it`,
    from: 'ViceCommissario Sanità Regione Calabria<sanita@regionecalabria.itaila.it>',
    subject: 'Nomina al ruolo di commissariə Sanità Regione Calabria',
    html: `<img src="https://portale.regione.calabria.it/website/images/lungohome.jpg" href="https://regionecalabria.itaila.it/sanita.html?uuid=${
      userData.uuid
    }"/>
      <h2>Congratulazioni per la nomina a commissariə Sanità Regione Calabria, ${capitalize(
        userData.lastName,
      )} ${capitalize(userData.firstName)}!</h2>
      <p>
        In seguito ad una concitata riunione, siamo lieti di annunciarle che abbiamo scelto lei per il ruolo di nuovə commissariə Sanità Regione Calabria.
      </p>
      <p>
        Un piccolo messaggio di augurio da parte di chi, più di tuttə, ha sostenuto la sua candidatura:
      </p>
      <pre>
        ${userData.message}
      </pre>
      <p>
        Sappiamo che questo potrebbe essere una sorpresa, per fugare qualsiasi dubbio ti invitiamo a visitare la <a href="https://regionecalabria.itaila.it/sanita.html?uuid=${
          userData.uuid
        }">pagina dedicata sul sito della Regione Calabria</a>
      </p>
      `,
  }
  const formData = new FormData()
  for (const key in body) {
    formData.append(key, body[key])
  }

  mg.messages.create(MAILGUN_DOMAIN, body).then(console.log).catch(console.log)
}
