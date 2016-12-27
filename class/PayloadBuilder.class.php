<?php

namespace WAVE\Api;

use WAVE\Api\Settings;
// Ensures all the output follows the same format
class PayloadBuilder {
    
    private static function localstats($render) {
        // get information about current position
        $ls = array();
        $ls['render'] = $render . " seconds";
        $ls['connection'] = "success";
        $ls['request_time'] = $_SERVER['REQUEST_TIME_FLOAT'];
        $ls['request_method'] = $_SERVER['REQUEST_METHOD'];
        $ls['request_host'] = $_SERVER['REQUEST_URI'];
        $ls['request_port'] = $_SERVER['REMOTE_PORT'];
        if(isset($_SERVER['QUERY_STRING']))
        $ls['request_queryString'] = $_SERVER['QUERY_STRING'];

        $ls['remote_address'] = $_SERVER['REMOTE_ADDR'];
        return $ls;
    }

    public static function get($render, $data) {
        $out = array();
        $out['meta'] = self::localstats($render);
        $out['payload'] = array();
        $out['payload']['data'] = $data;

        return $out;
    }
}