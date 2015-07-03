exports.seed = (knex, Promise) => {
  return knex('expenses').del().then(() => Promise.all([
    knex('expenses').insert({
      date: '2016-10-11',
      category: 'flying',
      name: 'john doe',
      address: '123 some street',
      description: 'booze',
      pretax: 350,
      taxname: 'NYC',
      tax: 430.50,
    }),
  ]));
};
