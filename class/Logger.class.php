<?php
namespace WAVE\Api;

use WAVE\Api\Settings;

class Logger {
    public static $accountIdContext = null;
    public static $locationContext = null;

    /**
    * gets the name of the initial script that was running when the Logger class was invoked
    *
    * @return string 
    **/
    private static function _getRunningScript() {
        
        if(isset($_SERVER["REQUEST_URI"])) {
            $tmp = preg_split('[/]', $_SERVER["REQUEST_URI"]);
            
            $script = $tmp[2];
            
            if (trim($script) == "") {
                $script = "system";
            } else {
                $script = str_replace("./", "", $script);
                $script = str_replace(".php", "", $script); 
            }

            return $script . ".log";
        } else {
            return "unittest.log";
        }
    }

    /**
    * figures out what method we were called from (if any!)
    **/
    private static function _getMethod() {
        $classMethods = get_class_methods('Logger');

        $tmp = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 3);

        if (count($tmp) == 3) {
            do {
                if (count($tmp)) {
                    $last = array_pop($tmp);

                    $ret = $last['function'];
                } else {
                    $ret = null;

                    break;
                }
            } while (in_array($ret, array('{closure}', 'log', '_getMethod', '_getRunningScript')));

            if (!is_null($ret) && $ret) {
                return "$ret()";
            }
        }

        return null;
    }

    /**
    * writes the provided message to a logfile!
    *
    * @param string $msg
    **/
    public static function log($msg) {
        if (Settings::DISABLE_LOGGING) {
            return;
        }

        if(isset($_SERVER['REMOTE_ADDR']))
            $full = date("Y-m-d H:i:s") . " " . $_SERVER['REMOTE_ADDR'] . " - $msg\r\n";
        else
            $full = date("Y-m-d H:i:s") . " CLI - $msg\r\n";

        $script = static::_getRunningScript();

        //check of the log folder exists
        if (!file_exists(Settings::LOG_DIR)) {
            mkdir(Settings::LOG_DIR, 0755, true);
        }

        if (!file_exists(Settings::LOG_DIR . "/" .$script)) {
            touch(Settings::LOG_DIR . $script);
        }

        file_put_contents(Settings::LOG_DIR . "/" .$script, $full, FILE_APPEND);

        if (!is_null(static::$accountIdContext)) {
            $accountId = static::$accountIdContext;

            if (!file_exists(Settings::LOG_DIR . "/" . $accountId)) {
                mkdir(Settings::LOG_DIR . "/" . $accountId);
            }

            file_put_contents(Settings::LOG_DIR . "/" . $accountId . "/" . $script, $full, FILE_APPEND);
        } 
    }


}
