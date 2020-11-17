const GET_ENDPOINT = '/invite'
const FALLBACK = '/'

function main() {
  const url = `${GET_ENDPOINT}/${window.location.search}`
  window
    .fetch(url)
    .then((res) => res.json())
    .then((userData) => {
      // if (!userData) return window.location.replace(FALLBACK)
      const title = document.getElementById('sanita-title')
      const message = document.getElementById('sanita-message')
      title.innerText = `${userData.lastName} ${userData.firstName}`
      message.innerText = `${userData.message}`
    })
}

main()
