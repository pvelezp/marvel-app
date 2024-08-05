import axios from 'axios'
import { BASE_URL, HASH, PUBLIC_KEY } from '../config/config'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    ts: 1,
    apikey: PUBLIC_KEY,
    hash: HASH,
  },
  headers: { 'Content-Type': 'application/json' },
})

axiosInstance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          console.error('Forbidden: You do not have the right permissions.')
          break
        case 404:
          console.error('Not Found: The requested resource could not be found.')
          break
        case 500:
          console.error('Internal Server Error: Please try again later.')
          break
        default:
          console.error(`Error: ${error.response.status} - ${error.response.data}`)
      }
    } else if (error.request) {
      console.error('Network Error: Please check your connection.')
    } else {
      console.error('Error:', error.message)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
