# Expense Monster

[ ![Codeship Status for hungryzi/se-challenge](https://codeship.com/projects/15dbab60-8a38-0134-e269-5a7c9acf56e8/status?branch=submission-zi)](https://codeship.com/projects/184407)

### *Omnomnom must eat expenses!*
A simple Rails app that imports expenses data from CSV to PostgreSQL database and shows a quick summary of expenses by month.

## Setup

### Requirements

- `ruby 2.3.0`
- `bundler` gem.
- `PostgreSQL`

### Setup commands

```
git clone git@github.com:hungryzi/se-challenge.git
cd se-challenge
git checkout submission-zi
bundle install
bundle exec rails db:setup
```

### Run app

```
bundle exec rails server
```

After that command runs successfully, the app should be running on [http://localhost:3000](http://localhost:3000)

### Run test

```
bundle exec rspec spec
```



