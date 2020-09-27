import $axios from '../axios'

const token = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN

export async function searchGeocodingReverse([lng, lat]) {
  const res = await $axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      `${lng},${lat}`
    )}.json?access_token=${token}`
  )
  return res
}

export async function searchGeocodingForward(query) {
  const res = await $axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query.trim()
    )}.json?access_token=${token}`
  )
  return res
}
