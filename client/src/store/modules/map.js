import { getFacility } from '../../services/api/data'
import { viewCable } from '../../services/api/cables'

const state = {
  bounds: [],
  points: [],
  focus: null,
  filter: ['all'],
  easePoint: null,
  hasToEase: false,
  currentSelection: null
}

const mutations = {
  CURRENT_SELECTION(state, selection) {
    state.currentSelection = selection
  },
  CURRENT_MAP_FILTER(state, filter) {
    state.filter = filter
  },
  MAP_BOUNDS(state, bounds) {
    state.bounds = bounds
  },
  MAP_FOCUS_ON(state, focus) {
    state.focus = focus
  },
  MAP_POINTS(state, points) {
    state.points = points
  },
  HAS_TO_EASE_TO(state, bool) {
    state.hasToEase = bool
  },
  EASE_POINT(state, easePoint) {
    state.easePoint = easePoint
  }
}

const actions = {
  async getCurrentSelectionData({ commit }, { user_id, _id }) {
    const res = await viewCable({
      user_id,
      _id
    })
    if (res && res.data.r && res.data.r.length) {
      commit('CURRENT_SELECTION', res.data.r[0])
    }
  },
  async getFacilityData({ commit }, id) {
    const res = await getFacility(id)
    if (res && res.length) commit('CURRENT_SELECTION', res)
    return res
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
