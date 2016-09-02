<%inherit file="./_base.mako"/>

<%block name="styles">
<link href="${request.static_url('expenses:static/css/home.css')}"
      rel="stylesheet">
</%block>

<p class="text-center">Select a .csv file to upload.</p>


<form action="${request.route_path('expenses save')}"
      enctype="multipart/form-data"
      method="POST">
  <span class='csv-form__filename label label-info'>
  </span><br/>
  <label class="csv-form__file-label btn btn-success btn-lg"
         for="csv-form__file-input">
    <input id="csv-form__file-input"
           type="file"
           name="file">
    Select File
  </label>
  
  <button class="csv-form__upload-btn btn btn-primary btn-lg"
          type="submit">
      Upload
  </button>
</form>

<%block name="scripts">
  <script>
    $('#csv-form__file-input').change(function () {
      $('.csv-form__filename').addClass('csv-form__filename--shown').html($(this).val());      
    });
  </script>
</%block>