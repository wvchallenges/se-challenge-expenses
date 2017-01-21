<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Wave App</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css" integrity="sha384-XdYbMnZ/QjLh6iI4ogqCTaIjrFk87ip+ekIjefZch0Y+PvJ8CDYtEs1ipDmPorQ+" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:100,600" type="text/css">

    <!-- Styles -->
    <link href="/css/bootstrap/bootstrap.min.css" rel="stylesheet" type="text/css">

    @stack('styles')
</head>
<body>

    <div class="container">

        @yield('content')

    </div>

    <!-- JavaScripts -->
    <script src="/js/jquery/jquery-3.1.1.min.js"></script>
    <script src="/js/bootstrap/bootstrap.min.js"></script>

    @stack('scripts')

</body>
</html>
