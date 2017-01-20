/**
 * Created by bharath on 2017-01-12.
 */
'use strict';

module.exports.init = function(req,res,next) {
    res.render('index', { title: 'Wave Software Development Challenge', project: 'Migrate Expense Report' });
};
