# Implementation of the Wave Software Development Challenge
This is one implementation of the [Wave Software Development Challenge](https://github.com/wvchallenges/se-challenge) using Node.JS and styled with Google Material Design Lite. A live demo is running at my [rhcloud site](http://sec-esco.rhcloud.com/).

## Installation
First install [Node.JS](https://nodejs.org/), I was developping under v0.10.32 but the latest should work.
```sh
$ git clone https://github.com/pigjr/se-challenge.git
$ cd se-challenge
$ npm install
```

Fill in your mysql test server configuration in se-challenge/app/routes.js then you can start the server by:

```sh
$ node server.js
```

The included [data_example.csv](https://github.com/pigjr/se-challenge/blob/master/data_example.csv) is for test upload.

## What's Special of This Implementation

1. Node.JS backend
2. UI is clean and easy-to-use
3. Able to view summaries of previously uploads
