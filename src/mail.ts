import sgMail from '@sendgrid/mail'
import { UserData } from './types'
import { capitalize } from 'lodash'
import { config } from 'dotenv'

config()

sgMail.setApiKey(process.env.SENDGRID_TOKEN)

export function sendMail(userData: UserData) {
  const msg = {
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
  sgMail.send(msg).then(console.log).catch(console.error)
}
