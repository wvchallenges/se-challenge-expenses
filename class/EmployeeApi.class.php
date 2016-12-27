<?php
namespace WAVE\Api;

use WAVE\Api\Settings;
use WAVE\Api\Logger;

class EmployeeApi {

    public static function getId ($db, $name) {
        $queries = parse_ini_file(Settings::INI_DIR . "employee.ini");

        $query = $queries['getId'];

        $id =  $db->getUnique($query, 's', array($name));

        return $id['id'];
    }

    public static function create($db, $name, $address) {
        
        $queries = parse_ini_file(Settings::INI_DIR . "employee.ini");

        $query = $queries['create'];

        return  $db->insert($query, 'ss', array($name, $address));

    }
}
