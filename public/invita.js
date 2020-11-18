const POST_ENDPOINT = '/invite'

const form = document.getElementById('form')
const emailInput = document.getElementById('emailInput')
const firstNameInput = document.getElementById('firstNameInput')
const lastNameInput = document.getElementById('lastNameInput')
const messageInput = document.getElementById('messageInput')
const submit = document.getElementById('submit')

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
    .then((res) => {
      console.log('res.success', res.success)
      if (!res.success) {
        $('#error-modal-body').text(res.error)
        $('#error-modal').modal('show')
      } else {
        $('#success-modal-visit-page').attr('href', `/sanita.html?uuid=${res.uuid}`)
        $('#success-modal').modal('show')
      }
    })
}
