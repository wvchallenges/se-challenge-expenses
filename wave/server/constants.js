const CSV_KEYS = [
  'date',
  'category',
  'employee name',
  'employee address',
  'expense description',
  'pre-tax amount',
  'tax name',
  'tax amount',
];

const DB_KEYS = [
  'date',
  'category',
  'name',
  'address',
  'description',
  'pretax',
  'taxname',
  'tax',
];

const CSV_DB_MAP = {
  'date': 'date',
  'category': 'category',
  'employee name': 'name',
  'employee address': 'address',
  'expense description': 'description',
  'pre-tax amount': 'pretax',
  'tax name': 'taxname',
  'tax amount': 'tax',
}

module.exports = { CSV_KEYS, DB_KEYS, CSV_DB_MAP };
