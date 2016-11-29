import { get, post, upload } from 'utils/fetcher';

export function getExpenses(id) {
  let url = '/expenses';
  if (id) {
    url = url + '/' + id;
  }
  return get(url);
}

export function postExpense(expense) {
  let url = '/expenses';
  return post(url, expense);
}

export function uploadCSV(csv) {
  let url = '/csv';
  return upload(url, csv);
}
