# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
$(function(){
  $('#file_form_id').submit(function (e) {
    if ($(this).find('input[name="file"]').val() == '') { 
      e.preventDefault();
      alert('select a file');
    }     
  });
})