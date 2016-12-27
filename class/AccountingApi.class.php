<?php
namespace WAVE\Api;

use WAVE\Api\Settings;
use WAVE\Api\Logger;

class AccountingApi {

    public static function insert($db, $eId, $date, $category, $description, $pretax, $taxType, $taxAmount, $ts) {
        
        $date = date('Y-m-d', strtotime(str_replace('-', '/', $date)));

        $queries = parse_ini_file(Settings::INI_DIR . "accounting.ini");

        $query = $queries['CheckForDuplicate'];
        $params = array($eId, $date, $category, $description, $pretax);

        if(!$db->getUnique($query, 'isssdi', $params)) {

            $query = $queries['insert'];
            $params = array($eId, $date, $category, $description, $pretax, $taxType, $taxAmount, $ts);

            return  $db->insert($query, 'isssdsd', $params);
        }

        return null;
        
    }
    public static function getLatestData($db) {
        $queries = parse_ini_file(Settings::INI_DIR . "accounting.ini");

        $query = $queries['getLatestData'];

        $res = $db->getResult($query);

        if($res) {
            $out = array();
            foreach($res as $row) {
                if(!isset($out[$row['month']])) {
                    $out[$row['month']] = array();
                }
                array_push($out[$row['month']], $row);
            }

            return $out;
        } else {
            return null;
        }
        
    }
}