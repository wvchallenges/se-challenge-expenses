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
/**
 * Initial data for the component.
 */
const init = {
  // An array of objects containing information uploaded about expenses from a CSV file.
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
}

/**
 * Compute the month recorded in a date stored as a string formatted like 'mm/dd/yyyy'.
 *
 * # Example
 *
 * ```
 * month('12/20/2017') === 12
 * ```
 */
const month = dateString => parseInt(dateString.split('/')[0], 10)

/**
 * Compute the year recorded in a date stored as a string formatted like 'mm/dd/yyyy'.
 *
 * # Example
 *
 * ```
 * year('12/20/2017') === 2017
 * ```
 */
const year = dateString => parseInt(dateString.split('/')[2], 10)

/**
 * Compares two dates for the purposes of sorting them in descending order such that dates farther in
 * the future appear before those farther into the past.
 */
const compareDates = (dateStr1, dateStr2) => {
  const d1 = dateStr1.split('/').reverse().map(value => parseInt(value, 10))
  const d2 = dateStr2.split('/').reverse().map(value => parseInt(value, 10))
  const maxIndex = Math.max(d1.length, d2.length)
  for (let index = 0; index < maxIndex; index++) {
    if (d1[index] < d2[index]) {
      return true
    }
  }
  return false
}

/**
 * Format a dollar value, such as `123.45` into a string representation to show to the user.
 */
const formatDollarValue = dollarValue => {
  const twoDecimalPlaces = Math.round(dollarValue * 100) / 100.0
  let [dollars, cents] = `${twoDecimalPlaces}`.split('.')
  if (typeof cents === 'undefined') {
    cents = '00'
  } else {
    cents = cents.padStart(2, '0')
  }
  return `$${dollars}.${cents}`
}

/**
 * Given the component's list of expenses, compute an array of objects that can be represented by
 * the component in a table.
 *
 * This function expects `expenses` to be an array of objects with the following shape:
 *
 * ```
 * {
 *   date: string,
 *   preTaxAmount: number,
 *   taxAmount: number,
 * }
 * ```
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
const rows = ({ expenses }) => {
  const dates = expenses.map(({ date }) => {
    const [mm, yyyy] = [month(date), year(date)]
    return `${mm}/${yyyy}`
  })
  const uniqueDates = Array.from(new Set(dates))
  let records = []

  for (const date of uniqueDates) {
    const expensesForMonth = expenses.filter(expense => {
      const expenseDate = `${month(expense.date)}/${year(expense.date)}`
      return date === expenseDate
    })
    const totalExpenses = expensesForMonth.reduce((total, { preTaxAmount, taxAmount }) => {
      return total + preTaxAmount + taxAmount
    }, 0)
    records.push({
      date,
      totalExpenses: formatDollarValue(totalExpenses),
    })
  }

  return records.sort((r1, r2) => compareDates(r1.date, r2.date))
}

export default {
  name: 'ReportSummary',
  data: () => init,
  computed: {
    rows () {
      return rows(this)
    },
  },
}
</script>

<style>
</style>
