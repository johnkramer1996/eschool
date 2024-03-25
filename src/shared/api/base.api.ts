import _axios from 'axios'
import { config } from 'shared/lib/config'

export const axios = _axios.create({
  baseURL: config.API_ENDPOINT,
})
