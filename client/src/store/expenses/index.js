import * as act from '@/store/actions'
import * as mut from '@/store/mutations'
import { request } from 'request-promise'

/**
 * Send a request to the server to have a CSV file parsed.
 */
const uploadExpenseReport = async ({ commit }, { file }) => {
  try {
    const response = await request({
      url: 'http://127.0.0.1:9001/report',
      method: 'POST',
      json: true,
      formData: {
        report: file,
      },
    })
    if (response.body.error !== null) {
      commit(mut.ERROR, { error: response.body.error })
    } else {
      commit(mut.RECORD_EXPENSE_REPORT, { expenses: response.body.expenses })
    }
  } catch (ex) {
    commit(mut.ERROR, { error: ex.message })
  }
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
