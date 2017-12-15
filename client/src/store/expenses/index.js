import * as act from '@/store/actions'
import * as mut from '@/store/mutations'


/**
 * Send a request to the server to have a CSV file parsed.
 */
const uploadExpenseReport = ({ commit }, { file }) => {
  // TODO - Talk to the server.
  console.log('Uploading file', file.name)
  commit(mut.RECORD_EXPENSE_REPORT, {
    expenses: [
      {
        date: '12/1/2017',
        preTaxAmount: 312.32,
        taxAmount: 31.45,
      },
      {
        date: '12/24/2017',
        preTaxAmount: 1015.82,
        taxAmount: 200.0,
      },
      {
        // Careful with the year!
        date: '12/5/2016',
        preTaxAmount: 45.62,
        taxAmount: 5.50,
      },
      {
        date: '2/19/2017',
        preTaxAmount: 89.10,
        taxAmount: 10.64,
      },
      {
        date: '2/27/2015',
        preTaxAmount: 100.0,
        taxAmount: 12.50,
      },
    ],
  })
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
