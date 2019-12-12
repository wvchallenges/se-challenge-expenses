// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require tether
//= require bootstrap
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(function() {
  $(".custom-file-input").on("change", function() {
    var input             = $(this),
        placeholder       = $(input).parents(".custom-file").find(".custom-file-control"),
        originalFilename  = $(input).parents(".custom-file").find(".original-filename"),
        content           = $(input).val().replace(/\\/g, '/').replace(/.*\//, '');

    placeholder.attr("data-content", content);
    originalFilename.val(content);
  });
});
