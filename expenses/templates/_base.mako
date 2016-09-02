<%namespace name="components" file="_components.mako" inheritable="True" />\
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <link rel="icon" href="${request.static_url('expenses:static/favicon.ico')}">
    <link href="${request.static_url('expenses:static/css/vendor/bootstrap.min.css')}"
          rel="stylesheet">
    <%block name="styles">
    </%block>
  </head>
  <body>

    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            ${title}
          </a>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <%self:components.flash_msg/>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          ${next.body()}
        </div>
      </div>
    </div>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js">
    </script>
    <script src="${request.static_url('expenses:static/js/vendor/bootstrap.min.js')}">
    </script>
    <%block name="scripts">
    </%block>
  </body>
</html>