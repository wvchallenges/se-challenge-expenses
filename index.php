<?php

require __DIR__ . '/vendor/autoload.php';

use WAVE\Api\Settings;
use WAVE\Api\PDOMysql;

date_default_timezone_set('America/Toronto');

$app = new \Slim\Slim();
$app->sql = new PDOMysql();

// default return
$app->response->setStatus(200);

$corsOptions = array(
    'origin' => '*',
    'maxAge' => 86400,
    'allowCredentials' => true,
    'allowMethods' => array('POST, GET, DELETE, PUT, OPTIONS, PATCH'),
    'allowHeaders' => array('Accept, Authorization, Host, Origin, Content-Type')
);

$app->add(new \CorsSlim\CorsSlim($corsOptions));

$app->group('/v1', function () use ($app) {
    require 'routes.v1.php';
});

$app->run();

if (isset($app->resp)) {
   $app->response->headers->set('Content-Type', 'application/json');
   $app->response->headers->set('Cache-Control', 'no-cache');
    header('Content-Type: application/json');
   echo json_encode($app->resp);
}
