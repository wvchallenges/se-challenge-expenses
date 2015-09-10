<!DOCTYPE html>
<html lang="en" ng-app="ChallengeApp">
    <head>
        <!-- inject:css -->
        <link rel="stylesheet" href="/public/css/all.css">
        <!-- endinject -->
    </head>

    <body>
        <?php echo View::make('partials.expense-list', ['data' => $data]) ?>
        <!-- inject:js -->
        <script src="/public/js/all.js"></script>
        <!-- endinject -->
    </body>
</html>