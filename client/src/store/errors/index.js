import * as mut from '@/store/mutations'


/**
 * Record an error message to display to the user.
 */
const recordError = (state, { error }) => {
  state.errors.error = error
}


const state = {
  error: '',
}

const actions = {
}

const mutations = {
  [mut.ERROR]: recordError,
}


export default {
  state,
  actions,
  mutations,
}
