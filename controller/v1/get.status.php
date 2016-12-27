<?php

use WAVE\Api\PayloadBuilder;
use WAVE\Api\Settings;
use WAVE\Api\Logger;


$start = time();

$data = array('Auth' => 'public' );

$data['connection'] = 'success';

$app->resp = PayloadBuilder::get( (time()-$start), $data);

Logger::log($_SERVER['HTTP_USER_AGENT']);

$app->response->setStatus(200);

?>