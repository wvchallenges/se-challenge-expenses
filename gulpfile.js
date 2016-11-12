'use strict'

const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const chalk = require('chalk')
process.env.NODE_ENV = 'test'
const ExpenseTests = require('./server/api/expense/expense.test')

/**
 * Run in Develop with auto-reload
 */
gulp.task('default', function() {
    nodemon({
        script: 'server/app',
        env: { 'NODE_ENV': 'development' },
        nodeArgs: ['--debug'],
    })
})

gulp.task('test', function() {
    ExpenseTests.start()
    .then(function(){
        console.log(chalk.green('Test Suite Complete - All Tests Passed'))
    })
    .catch(function(err){
        console.log(chalk.red(err))
    })
    .finally(function(){
        process.exit(0)
    })
})