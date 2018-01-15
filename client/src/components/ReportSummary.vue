<template>
<table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Total expenses</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="row in rows" :key="row.date">
      <td>{{ row.date }}</td>
      <td>{{ row.totalExpenses }}</td>
    </tr>
  </tbody>
</table>
</template>

<script>
import { mapState } from 'vuex'


/**
 * Initial data for the component.
 */
const init = {}

/**
 * Given an array of values and a function that transforms any given value into some form that can be compared
 * for equality, computes a sub-array of `values` with only unique values.
 *
 * This function runs in linear- i.e. O(N)- time, where N is the length of the array of values.
 *
 * # Examples
 *
 * ```
 * unique([1,2,3,1,3,2], x => x) === [1,2,3]
 * ```
*/
const unique = (values, identity) => {
  let recorded = {}
  for (const value of values) {
    recorded[identity(value)] = value
  }
  return Object.values(recorded)
}

/**
 * Format a dollar value, such as `123.45` into a string representation to show to the user.
 */
const formatDollarValue = dollarValue => {
  const twoDecimalPlaces = Math.round(dollarValue * 100) / 100.0
  const [dollars, cents] = `${twoDecimalPlaces}`.split('.')
  const fmtCents = cents === undefined ? '00' : cents.padStart(2, '0')
  return `$${dollars}.${fmtCents}`
}

/**
 * Given the component's list of expenses, compute an array of objects that can be represented by
 * the component in a table.
 *
 * It returns an array of objects that each have the following shape:
 *
 * ```
 * {
 *   date: string,
 *   totalExpenses: string,
 * }
 * ```
 */
const rows = ({ expenses: { expenses } }) => {
  const dates = expenses.map(({ date }) => new Date(date))
  const uniqueDates = unique(dates, date => `${date.getUTCMonth() + 1}/${date.getFullYear()}`)
  let records = []

  for (const date of uniqueDates) {
    const expensesForMonth = expenses.filter(expense => {
      const expDate = new Date(expense.date)
      const yearsEqual = expDate.getFullYear() === date.getFullYear()
      const monthsEqual = expDate.getUTCMonth() === date.getUTCMonth()
      return yearsEqual && monthsEqual
    })
    const totalExpenses = expensesForMonth.reduce((total, { preTaxAmount, taxAmount }) => {
      return total + preTaxAmount + taxAmount
    }, 0)

    records.push({
      date,
      totalExpenses: formatDollarValue(totalExpenses),
    })
  }

  return records.sort((r1, r2) => r1.date < r2.date)
}

export default {
  name: 'ReportSummary',
  data: () => init,
  computed: {
    ...mapState(['expenses']),
    rows () {
      return rows(this)
    },
  },
}
</script>

<style>
</style>
