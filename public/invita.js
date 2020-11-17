const POST_ENDPOINT = '/invite'

const form = document.getElementById('form')
const emailInput = document.getElementById('emailInput')
const firstNameInput = document.getElementById('firstNameInput')
const lastNameInput = document.getElementById('lastNameInput')
const messageInput = document.getElementById('lastNameInput')
const submit = document.getElementById('submit')

function main() {
  form.onsubmit = (e) => {
    e.preventDefault()
    const email = emailInput.value
    const firstName = firstNameInput.value
    const lastName = lastNameInput.value
    const message = messageInput.value
    const body = { email, firstName, lastName, message }
    window
      .fetch(POST_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then(console.log)
  }
}

main()
