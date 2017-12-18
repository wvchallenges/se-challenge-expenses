import * as act from '@/store/actions'
import * as mut from '@/store/mutations'
import request from 'request-promise'

/**
 * Send a request to the server to have a CSV file parsed.
 */
const uploadExpenseReport = ({ commit }, { file }) => {
  const reader = new FileReader()
  reader.onload = (event) => {
    console.log('Making request with data', event.target.result, '\ntype', typeof event.target.result)
    request({
      url: 'http://127.0.0.1:9001/report',
      method: 'POST',
      body: event.target.result,
    })
    .then((response) => {
      const body = typeof response === 'string' ? JSON.parse(response) : response
      console.log('Got a response', body)
      if (body.error !== null) {
        commit(mut.ERROR, { error: body.error })
      } else {
        console.log('Dates', body.expenses.map(({ date }) => date))
        commit(mut.RECORD_EXPENSE_REPORT, { expenses: body.expenses })
      }
    })
    .catch((ex) => {
      console.log('Got an error: ', ex)
      commit(mut.ERROR, { error: ex.message })
    })
  }
  reader.readAsText(file)
}

/**
 * Record information about expenses parsed from an uploaded CSV file that has been processed
 * by the server.
 */
const recordExpenseReport = (state, { expenses }) => {
  state.expenses.expenses = expenses
}


const state = {
  // An array of expense objects containing data parsed from a CSV file containing expense reports
  // that had been uploaded by the user and parsed by our server.
  expenses: [],
}

const actions = {
  [act.UPLOAD_EXPENSE_REPORT]: uploadExpenseReport,
}

const mutations = {
  [mut.RECORD_EXPENSE_REPORT]: recordExpenseReport,
}

export default {
  state,
  actions,
  mutations,
}
