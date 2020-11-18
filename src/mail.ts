// import sgMail from '@sendgrid/mail'
import mailgun from 'mailgun-js'
import { UserData } from './types'
import { capitalize } from 'lodash'
import { config } from 'dotenv'
import got from 'got'

config()

const mg = mailgun({ apiKey: process.env.MAILGUN_TOKEN, domain: process.env.MAILGUN_DOMAIN })

// sgMail.setApiKey(process.env.SENDGRID_TOKEN)

export function sendMail(userData: UserData) {
  const body = {
    to: userData.email,
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
        Sappiamo che questo potrebbe essere una sorpresa, per fugare qualsiasi dubbio ti invitiamo a visitare la <a href="https://regionecalabria.itaila.it/sanita.html?uuid=${
          userData.uuid
        }">pagina dedicata sul sito della Regione Calabria</a>
      </p>
      `,
  }

  // got.post(process.env.MAILGUN_DOMAIN, {
  //   headers: {
  //     Authorization: 'Basic ' + Buffer.from(`'api:${process.env.MAILGUN_TOKEN}`).toString('base64'),
  //   },
  //   body,
  // })

  mg.messages().send(body).then(console.log)
}

sendMail({
  email: 'tanke88@gmail.com',
  firstName: 'luca',
  lastName: 'mattiazzi',
  message: 'stocazzo',
})

// const data = {
//   from: 'Excited User <me@samples.mailgun.org>',
//   to: 'tanke88@gmail.com',
//   subject: 'Hello',
//   text: 'Testing some Mailgun awesomness!',
// }
// mg.messages().send(data, function (error, body) {
//   console.log(error)
//   console.log(body)
// })
