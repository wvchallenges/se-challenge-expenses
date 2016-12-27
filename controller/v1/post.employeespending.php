<?php

use WAVE\Api\PayloadBuilder;
use WAVE\Api\Settings;
use WAVE\Api\Logger;

use WAVE\Api\EmployeeApi;
use WAVE\Api\AccountingApi;

$start = time();

foreach($_FILES as $FILE) {

    Logger::log(print_r($FILE, true));

    // save for posterity
    $filename = Settings::FILE_UPLOAD_PATH . time() . "_" . $FILE['name'];

    @move_uploaded_file($FILE['tmp_name'], $filename)
        or Logger::log('receiving directory insuffiecient permission');

    $row = 1;
    $count = 0;
    $newEmp = 0;
    if (($handle = fopen($filename, "r")) !== FALSE) {
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
            if($row > 1) {
                $eId = EmployeeApi::getId($app->sql, $data[2]);
                if(!$eId) {
                    $eId = EmployeeApi::create($app->sql, $data[2], $data[3]);
                    $newEmp++;
                }
                if(AccountingApi::insert($app->sql, $eId, trim($data[0]), trim($data[1]), trim($data[4]), trim($data[5]), trim($data[6]), trim($data[7]), $start)) {
                    $count++;
                }
            }
            $row++;
        }
        fclose($handle);
    }


    $data = array('Auth' => 'public' );

    $data['connection'] = 'success';
    $data['fileinfo'] = $FILE;
    $data['upload'] = 'success';
    $data['New_Employees'] = $newEmp;
    $data['accounting_imported'] = $count;

    $app->resp = PayloadBuilder::get( (time()-$start), $data);

    Logger::log($_SERVER['HTTP_USER_AGENT']);

    $app->response->setStatus(200);

 }

