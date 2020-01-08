import $axios from '../axios'
import apiConfig from '../../config/apiConfig'
// eslint-disable-next-line
var url
var form

export const uploadOrgLogo = async ({ logo, user_id }) => {
  url = `${apiConfig.url}/auth/upload/logo`
  form = new FormData()
  form.append('file', logo)
  const res = await $axios.post(url, form, {
    withCredentials: true,
    headers: {
      user_id,
      Authorization:
        'Bearer ' + window.localStorage.getItem('auth.token-session')
    }
  })
  return res
}

export const uploadKmz = async ({ file, user_id }) => {
  url = `${apiConfig.url}/auth/upload/kmz`
  form = new FormData()
  form.append('file', file[0])
  const res = await $axios.post(url, form, {
    withCredentials: true,
    headers: {
      user_id,
      'Content-Type': 'multipart/form-data',
      Authorization:
        'Bearer ' + window.localStorage.getItem('auth.token-session')
    }
  })
  return res
}

export const kmzToJSON = async ({ link, user_id }) => {
  url = `${apiConfig.url}/auth/kmz/togeojson`
  form = new FormData()
  form.append('link', link)
  const res = await $axios.post(url, form, {
    withCredentials: true,
    headers: {
      user_id,
      Authorization:
        'Bearer ' + window.localStorage.getItem('auth.token-session')
    }
  })
  return res
}
