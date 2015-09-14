<!DOCTYPE html>
<html lang="en" ng-app="ChallengeApp">
    <head>
        <!-- inject:css -->
        <link rel="stylesheet" href="/css/all.css">
        <!-- endinject -->
    </head>
    <base href="/">

    <body>
        <div ng-controller="AppCtrl">
            <?php echo View::make('partials.expense-list', ['data' => $data]) ?>
        </div>
        <!-- inject:js -->
        <script src="/js/all.js"></script>
        <!-- endinject -->
    </body>
</html>