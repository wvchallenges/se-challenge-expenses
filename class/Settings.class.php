<?php
namespace WAVE\Api;

use WAVE\Api\Logger;

/**
* we use this class to define some constants which we use instead of
* magic data throughout the code.    and also all the settings for the system side of the app
**/
class Settings {
    
    const ABS_PATH = "/opt/se-challenge-expenses";

    const INI_DIR = "/opt/se-challenge-expenses/ini/";
    
    const FILE_UPLOAD_PATH = "/opt/se-challenge-expenses/uploads/";

    const MAX_FILE_SIZE = 1000000;

    const LOG_DIR = "/opt/se-challenge-expenses/logs/";

    const ENVIRONMENT = "dev";

    const SQL_DB_NAME = 'se_challenge_expenses';
    const SQL_DB_USER = 'root';
    const SQL_DB_PASS = '';
    const SQL_DB_HOST = '127.0.0.1';
    const SQL_DB_PORT = '8000';
    const SQL_DB_DEBUG = false;

    const DISABLE_LOGGING = false;
}
