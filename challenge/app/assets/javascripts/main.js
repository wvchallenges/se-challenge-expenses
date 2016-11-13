$(function() {

  $('#expenses-import form input[type="file"]').change(function(e) {
    $(this).closest('form').trigger('submit');
    $(this).closest('form')[0].reset();
  });

});

