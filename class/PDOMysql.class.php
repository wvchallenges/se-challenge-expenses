<?php
/**
* @file
* mysqli DB connector
*
* @author: Tracy Lauren
*/

namespace WAVE\Api;

use WAVE\Api\Settings;
use WAVE\Api\Logger;
//require_once __DIR__ . '/Database.interface.php';

//class DBMysqli implements Database {
class PDOMysql {
    /**
    * The host URL where the mysql server resides.
    * can be 'localhost'
    *
    * This information is found at
    * @link /ini/sitevars.inc under the apropriate domain (MYSQL_HOST)
    */

    private $host = "";

    /**
    * The Username needed to connect to the mysql server with permissions to read.
    *
    * This information is found at
    * @link /ini/sitevars.inc under the apropriate domain (MYSQL_USER)
    */

    private $user = "";

    /**
    * The Password needed to connect to the mysql server related to username
    * with permissions to read.
    *
    * This information is found at
    * @link /ini/sitevars.inc under the apropriate domain (MYSQL_PASS)
    */

    private $pass = "";

    /**
    * The Default Database to connect to on the mysql server. Username/Password must
    * have at least read permissions to connect to this database.
    *
    * This information is found at
    * @link /ini/sitevars.inc under the apropriate domain (MYSQL_DB)
    */


    private $db = "";

    /**
    * Debug Flag.
    * Used to spit out the queries at run time when desired.
    *
    * This information is found at
    * @link /ini/sitevars.inc under the apropriate domain (MYSQL_DEBUG)
    */

    private $debug = "";

    /**
    * STATIC $dbh. This array will ensure connections will not step on each other
    * if more than one API is being called within a request cycle.
    *
    */
    protected $dbh;


    /**
    * Constructor
    *
    * Summary: just creating this class will establish a connection that can be used to connect to a mysql
    * server.
    *
    * @return void
    * does not return anything
    *
    */
    public function __construct() {
        // explicitly set the values
        $this->host = Settings::SQL_DB_HOST;
        $this->user = Settings::SQL_DB_USER;
        $this->pass = Settings::SQL_DB_PASS;
        $this->db = Settings::SQL_DB_NAME;
        $this->debug = Settings::SQL_DB_DEBUG;

        $this->connect();

    }
    public function connect() {
        $dsn = "mysql:dbname=".$this->db.";host=".$this->host;
        try {
            $opt = [
                \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
                \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
                \PDO::ATTR_EMULATE_PREPARES   => true, /// LEAVE THIS ON ... WITHOUT IT THE WORLD ENDS
                \PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true
            ];

            $this->dbh = new \PDO($dsn, $this->user, $this->pass, $opt);

        } catch (\PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
        }
    }

    public function prepareQuery($sql, $params) {
        try {
            if($params) {
                $statement = $this->dbh->prepare($sql);
                $statement->execute($params);
            } else {
                $statement = $this->dbh->query($sql, \PDO::FETCH_ASSOC);
            }
            return $statement->fetchAll(); // Use fetchAll() 
        } catch (\PDOException $e) {
            $this->handleError($sql, $params, $e);
            return array('status' => 'error', 'error' =>$e);
        }
    }

    public function getResult($query, $typeDef=null, $params=null) {
        return $this->prepareQuery($query, $params);
    }

    public function getUnique($query, $typeDef=null, $params=null) {


        $res = $this->prepareQuery($query, $params);

        if($res) { return $res[0]; }

        else { return null; }
    }
    private function handleError($sql, $params, $exception) {
        $output = "----------------------------------------\n";
        $output .= "---------    SQL ERROR    -------------\n";
        $output .= "---------------------------------------\n";
        $output .= "\nQuery: " . $sql;
        $output .= "\nParams: " . print_r($params, true);
        $output .= "\nError: " . print_r($exception, true);

        Logger::log($output);
    }
    private function exec($query, $typeDef, $params) {
        //print_r($params);
        $statement = $this->dbh->prepare($query);
        try {
            $statement->execute($params);
           return $statement->rowCount();
        } catch (\PDOException $e) {
            $this->handleError($query, $params, $e);
            return array('status' => 'error', 'error' =>$e);
        }
    }

    public function update($query, $typeDef=null, $params=null) {
        return $this->exec($query, $typeDef, $params);

    }

    public function insert($query, $typeDef=null, $params=null) {
        $this->exec($query, $typeDef, $params);
        return $this->dbh->lastInsertId();
    }

    public function delete($query, $typeDef=null, $params=null) {
        return $this->exec($query, $typeDef, $params);
    }
}