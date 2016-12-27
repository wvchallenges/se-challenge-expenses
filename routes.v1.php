<?php
require_once 'vendor/autoload.php';

/**
* loads a controller based on the path and action we want, and extract any extra variables into scope
*
* @param (object) $app the slimphp instantiation
* @param (string) $group the name of the controller group we want to use
* @param (string) $action the http verb the controller we want to load is meant to handle
* @param (null|array) additional parameters that are extracted into current scope
**/


function getController($app, $version, $action, $param = null) {
    

    if (!is_null($param)) { 
        extract($param); 
    }
    


    $file = __dir__ . "/controller/" . $version . "/" . $action . ".php";

    if (file_exists($file)) {
        require $file;
    } else {
        throw new Exception($file . " does not exist.");
    }
}


$app->get('/status', function () use ($app) { 
    getController($app, 'v1', 'get.status');
});

$app->get('/latestEmployeeSpendingData', function () use ($app) { 
    getController($app, 'v1', 'get.latestEmployeeSpendingData');
});

$app->post('/feedhopper/employeeSpending', function () use ($app) { 
    getController($app, 'v1', 'post.employeespending');
});

 
