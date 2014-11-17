define(['csvUploader/main'], function (csvUploader) {
  'use strict';
  console.log('start.js: App started.');

  var $main = $('.main')
  csvUploader.render($main);
});
