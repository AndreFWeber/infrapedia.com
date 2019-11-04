import $axios from '../axios'

const ID_PARAM_ERROR = { message: "YOU'RE MISSING THE ID PARAMETER" }

// MAP CABLE SELECTION
export const getSelectionData = async id => {
  if (!id) throw ID_PARAM_ERROR
  const res = await $axios.get(`/cable/byid/${id}`)
  return res
}

// MAP FACILITY SELECTION - Buildings and dots
export const getFacility = async id => {
  if (!id) throw ID_PARAM_ERROR
  const res = await $axios.get(`/facility/byid/${id}`)
  return res
}

// NAVBAR OPTIONS GETTERS
export const getPremium = async () => {
  const res = await $axios.get('/org/premium')
  return res
}

export const getSubsea = async () => {
  const res = await $axios.get('/cable/subsea')
  return res
}

export const getDataCenters = async () => {
  const res = await $axios.get('/facility')
  return res
}

export const getIxps = async () => {
  const res = await $axios.get('/ix/withFacility')
  return res
}

export const getNetworks = async () => {
  const res = await $axios.get('/network/withFacility')
  return res
}

// --- NAVBAR PREMIUM LIST ITEM SELECTION --- START
export const getPremiumSelectedBounds = async id => {
  if (!id) throw ID_PARAM_ERROR
  const res = await $axios.get(`/org/childbbox/${id}`)
  return res
}

export const getPremiumSelectedFeatures = async id => {
  if (!id) throw ID_PARAM_ERROR
  const res = await $axios.get(`/org/childPoints/${id}`)
  return res
}

export const getOrganization = async id => {
  if (!id) throw ID_PARAM_ERROR
  const res = await $axios.get(`/cable/byorg/${id}`)
  return res
}
// --- NAVBAR PREMIUM LIST ITEM SELECTION --- END

// --- NAVBAR SUBMARINE CABLE SELECTION --- START

export const getSubseaCableBounds = async id => {
  if (!id) throw ID_PARAM_ERROR
  const res = await $axios.get(`/cable/bboxbyid/${id}`)
  return res
}

// --- NAVBAR SUBMARINE CABLE SELECTION --- END
