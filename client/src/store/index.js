import Vue from 'vue'
import Vuex from 'vuex'
import errors from '@/store/errors'
import expenses from '@/store/expenses'


Vue.use(Vuex)


/**
 * We are using a convention here wherein each "module" in our store has its own isolated state,
 * which is "namespaced" by the name of the module itself.  This way, the `expenses` module knows
 * it can read and write data in `state.expenses` and not interfere with other modules.
 */
const state = {
  expenses: expenses.state,
  errors: errors.state,
}

const actions = {
  ...expenses.actions,
  ...errors.actions,
}

const mutations = {
  ...expenses.mutations,
  ...errors.mutations,
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
})
