import axios from 'axios'
const apiUrl = process.env.NEXT_PUBLIC_BASE_URL
console.log(apiUrl)
export const api = axios.create({
  baseURL: `${apiUrl}`,
})
