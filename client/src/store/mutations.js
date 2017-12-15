/**
 * record-expense-report
 *
 * This mutation should be committed when the server responds to a CSV expense report upload.
 * The response will contain the data parsed out of the CSV.
 *
 * # Data
 *
 * ```
 * {
 *   expenses: []{
 *     date: string,
 *     preTaxAmount: number,
 *     taxAmount: number,
 *   },
 * }
 * ```
 */
export const RECORD_EXPENSE_REPORT = 'record-expense-report'
