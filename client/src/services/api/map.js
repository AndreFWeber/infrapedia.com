import $axios from '../axios'
import apiConfig from '../../config/apiConfig'
import { fCollectionFormat } from '../../helpers/featureCollection'

// eslint-disable-next-line
var url
var form

export const mapStatistics = async query => {
  url = `${apiConfig.url}/mps?${query}`
  const res = await $axios.get(url, {
    withCredentials: false
  })
  return res
}

export const getMyMap = async ({ user_id }) => {
  url = `${apiConfig.url}/auth/map/mymap`
  const res = await $axios.get(url, {
    withCredentials: true,
    headers: {
      userid: user_id,
      Authorization: 'Bearer ' + apiConfig.bearer()
    }
  })
  return res
}

export const setMyMap = async ({
  subdomain,
  googleID,
  facilities,
  cls,
  owners,
  techEmail,
  techPhone,
  saleEmail,
  salePhone,
  cables,
  logos,
  draw,
  ixps,
  config,
  user_id
}) => {
  url = `${apiConfig.url}/auth/map/mymap`
  form = new FormData()

  form.append('googleID', googleID)
  form.append('subdomain', subdomain)
  form.append('techEmail', techEmail)
  form.append('techPhone', techPhone)
  form.append('saleEmail', saleEmail)
  form.append('salePhone', salePhone)
  form.append('config', JSON.stringify(config))
  form.append('draw', JSON.stringify(fCollectionFormat(draw)))

  if (facilities && facilities.length) {
    facilities.forEach((fac, i) => form.append(`facilities[${i}]`, fac))
  } else form.append('facilities', [])

  if (owners && owners.length) {
    owners.forEach((fac, i) => form.append(`owners[${i}]`, fac))
  } else form.append('owners', [])

  if (ixps && ixps.length) {
    ixps.forEach((ixp, i) => form.append(`ixps[${i}]`, ixp))
  } else form.append('ixps', [])

  if (cls && cls.length) {
    cls.forEach((cls, i) => form.append(`cls[${i}]`, cls))
  } else form.append('cls', [])

  if (cables && cables.length) {
    cables.forEach((cable, i) => form.append(`cables[${i}]`, cable))
  } else form.append('cables', [])

  if (logos && logos.length) {
    logos.forEach((logo, i) => {
      form.append(`logos[${i}]`, logo)
    })
  } else form.append('logos', [])

  const res = await $axios.post(url, form, {
    withCredentials: true,
    headers: {
      userid: user_id,
      Authorization: 'Bearer ' + apiConfig.bearer()
    }
  })
  return res
}

export async function setupMyMapIxps(sub) {
  url = `${apiConfig.url}/map/ixps/${sub}`
  const res = await $axios.get(url)
  return res
}

export async function setupMyMapFacs(sub) {
  url = `${apiConfig.url}/map/facilities/${sub}`
  const res = await $axios.get(url)
  return res
}

export async function setupMyMapCLS(sub) {
  url = `${apiConfig.url}/map/cls/${sub}`
  const res = await $axios.get(url)
  return res
}

export async function setupMyMapDraw(sub) {
  url = `${apiConfig.url}/map/draw/${sub}`
  const res = await $axios.get(url)
  return res
}

export async function setupMyMapCables(sub) {
  url = `${apiConfig.url}/map/cables/${sub}`
  const res = await $axios.get(url)
  return res
}

export const setupMyMapArchives = async subdomain => {
  url = `${apiConfig.url}/map/ixps/${subdomain}`
  const res = await Promise.all([
    setupMyMapIxps(subdomain),
    setupMyMapCLS(subdomain),
    setupMyMapCables(subdomain),
    setupMyMapFacs(subdomain),
    setupMyMapDraw(subdomain)
  ])
  return res
}
