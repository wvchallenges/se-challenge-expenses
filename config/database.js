// libraries
var mysql = require('mysql');

var DB_CONSTANTS = {
  HOST: 'localhost',
  PORT: '3306',
  USER: 'root',
  PASSWORD: 'root',
  DB: 'wave',
  CONNECTIONS: 10
}

var SETUP_CONNECTION = mysql.createConnection({
  host: DB_CONSTANTS.HOST,
  user: DB_CONSTANTS.USER,
  password: DB_CONSTANTS.PASSWORD,
});

SETUP_CONNECTION.query([
  "CREATE SCHEMA IF NOT EXISTS `"+DB_CONSTANTS.DB+"`",
  "DEFAULT CHARACTER SET utf8"
  ].join(' '), function(error, rows) {
    if (error) {
      console.log(error);
      SETUP_CONNECTION.destroy();
    }

    SETUP_CONNECTION.query([
      "CREATE TABLE IF NOT EXISTS `"+DB_CONSTANTS.DB+"`.`category` (",
      "  `idcategory` INT NOT NULL AUTO_INCREMENT,",
      "  `name` VARCHAR(45) NOT NULL,",
      "  PRIMARY KEY (`idcategory`),",
      "  UNIQUE INDEX `name_UNIQUE` (`name` ASC))",
      "ENGINE = InnoDB;"
    ].join(' '), function(error, rows) {
      if (error) {
        console.log(error);
        SETUP_CONNECTION.destroy();
      }

      SETUP_CONNECTION.query([
        "CREATE TABLE IF NOT EXISTS `"+DB_CONSTANTS.DB+"`.`employee` (",
        "  `idemployee` INT NOT NULL AUTO_INCREMENT,",
        "  `name` VARCHAR(45) NOT NULL,",
        "  `address` VARCHAR(45) NOT NULL,",
        "  PRIMARY KEY (`idemployee`),",
        "  UNIQUE INDEX `employee_UNIQUE` (`name` ASC, `address` ASC))",
        "ENGINE = InnoDB;"
      ].join(' '), function(error, rows) {
        if (error) {
          console.log(error);
          SETUP_CONNECTION.destroy();
        }

        SETUP_CONNECTION.query([
          "CREATE TABLE IF NOT EXISTS `"+DB_CONSTANTS.DB+"`.`tax` (",
          "  `idtax` INT NOT NULL AUTO_INCREMENT,",
          "  `name` VARCHAR(45) NOT NULL,",
          "  PRIMARY KEY (`idtax`),",
          "  UNIQUE INDEX `name_UNIQUE` (`name` ASC))",
          "ENGINE = InnoDB;",
        ].join(' '), function(error, rows) {
          if (error) {
            console.log(error);
            SETUP_CONNECTION.destroy();
          }

          SETUP_CONNECTION.query([
            "CREATE TABLE IF NOT EXISTS `"+DB_CONSTANTS.DB+"`.`expenses` (",
            "  `idexpenses` INT NOT NULL AUTO_INCREMENT,",
            "  `date` DATETIME NOT NULL,",
            "  `category_id` INT NOT NULL,",
            "  `employee_id` INT NOT NULL,",
            "  `description` VARCHAR(45) NOT NULL,",
            "  `amount` FLOAT NOT NULL,",
            "  `tax_amount` FLOAT NOT NULL,",
            "  `tax_id` INT NOT NULL,",
            "  PRIMARY KEY (`idexpenses`),",
            "  INDEX `FKcategory_idx` (`category_id` ASC),",
            "  INDEX `FKemployee_idx` (`employee_id` ASC),",
            "  INDEX `FKtax_idx` (`tax_id` ASC),",
            "  CONSTRAINT `FKcategory`",
            "    FOREIGN KEY (`category_id`)",
            "    REFERENCES `"+DB_CONSTANTS.DB+"`.`category` (`idcategory`)",
            "    ON DELETE RESTRICT",
            "    ON UPDATE CASCADE,",
            "  CONSTRAINT `FKemployee`",
            "    FOREIGN KEY (`employee_id`)",
            "    REFERENCES `"+DB_CONSTANTS.DB+"`.`employee` (`idemployee`)",
            "    ON DELETE RESTRICT",
            "    ON UPDATE CASCADE,",
            "  CONSTRAINT `FKtax`",
            "    FOREIGN KEY (`tax_id`)",
            "    REFERENCES `"+DB_CONSTANTS.DB+"`.`tax` (`idtax`)",
            "    ON DELETE RESTRICT",
            "    ON UPDATE CASCADE)",
            "ENGINE = InnoDB;"
          ].join(' '), function(error, rows) {
            if (error) {
              console.log(error);
              SETUP_CONNECTION.destroy();
            }

            console.log('DB initialized');
            SETUP_CONNECTION.destroy();
          });
        });
      });
    });
  });

var DB_CONNECTION = mysql.createPool({
    connectionLimit: DB_CONSTANTS.CONNECTIONS,
    host: DB_CONSTANTS.HOST,
    user: DB_CONSTANTS.USER,
    password: DB_CONSTANTS.PASSWORD,
    database: DB_CONSTANTS.DB
  });

module.exports = DB_CONNECTION;
