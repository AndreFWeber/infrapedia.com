import $axios from '../axios'
import apiConfig from '../../config/apiConfig'

// eslint-disable-next-line
var url
var form

export const searchIxps = async ({ s, user_id }) => {
  url = `${apiConfig.url}/auth/ixps/search?s=${s}`
  const res = await $axios.get(url, {
    withCredentials: true,
    headers: {
      userid: user_id,
      Authorization: apiConfig.bearer()
    }
  })

  return res
}

export const viewIxps = async ({ user_id, _id }) => {
  url = `${apiConfig.url}/auth/ixps/view/${_id}`
  const res = await $axios.get(url, {
    withCredentials: true,
    headers: {
      userid: user_id,
      Authorization: apiConfig.bearer()
    }
  })
  return res
}

export const viewIxpsBBox = async ({ user_id, _id }) => {
  url = `${apiConfig.url}/ixps/box/${_id}`
  const res = await $axios.get(url, {
    withCredentials: true,
    headers: {
      userid: user_id,
      Authorization: apiConfig.bearer()
    }
  })
  return res
}

export const getIxpsGeom = async ({ user_id, _id }) => {
  url = `${apiConfig.url}/ixps/geom/${_id}`
  const res = await $axios.get(url, {
    withCredentials: true,
    headers: {
      userid: user_id,
      Authorization: apiConfig.bearer()
    }
  })

  return res
}

export const getIxpsGeoms = async ({ user_id, ids }) => {
  url = `${apiConfig.url}/ixps/geoms`
  form = new FormData()

  if (ids && ids.length) {
    ids.forEach((id, i) => {
      form.append(`ids[${i}]`, id)
    })
  } else form.append('ids', '')

  const res = await $axios.post(url, form, {
    withCredentials: true,
    headers: {
      userid: user_id,
      Authorization: apiConfig.bearer()
    }
  })

  return res
}

export const getIxps = async ({ user_id, page }) => {
  url = `${apiConfig.url}/auth/ixps/all?p=${page}`
  const res = await $axios.get(url, {
    withCredentials: true,
    headers: {
      userid: user_id,
      Authorization: apiConfig.bearer()
    }
  })

  return res
}

export const viewIXPOwner = async ({ user_id, _id }) => {
  url = `${apiConfig.url}/auth/ixps/owner/${_id}`
  const res = await $axios.get(url, {
    withCredentials: true,
    headers: {
      userid: user_id,
      Authorization: apiConfig.bearer()
    }
  })
  return res
}

export const editIXP = async ({ user_id }) => {
  url = `${apiConfig.url}/auth/ixps/edit`
  form = new FormData()

  const res = await $axios.put(url, form, {
    withCredentials: true,
    headers: {
      userid: user_id,
      Authorization: apiConfig.bearer()
    }
  })
  return res
}

export const createIXP = async ({ user_id }) => {
  url = `${apiConfig.url}/auth/ixps/edit`
  form = new FormData()

  const res = await $axios.post(url, form, {
    withCredentials: true,
    headers: {
      userid: user_id,
      Authorization: apiConfig.bearer()
    }
  })
  return res
}
