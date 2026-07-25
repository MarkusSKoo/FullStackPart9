import axios from 'axios'
import type { Entry, NewEntry } from '../types'

const baseUrl = 'http://localhost:3000/api/diaries'

const getAll = () => {
  return axios.get<Entry[]>(baseUrl).then(response => response.data)
}

const create = async (object: NewEntry) => {
  const response = await axios.post<Entry>(baseUrl, object)
  return response.data;
}

export default { getAll, create }
