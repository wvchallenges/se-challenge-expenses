CREATE TABLE `employeePayroll` (
 `date` date NOT NULL,
 `category` varchar(100) NOT NULL,
 `employeeName` varchar(100) NOT NULL,
 `employeeAddress` varchar(150) NOT NULL,
 `expenseDescription` varchar(150) NOT NULL,
 `preTaxAmount` float NOT NULL,
 `taxName` varchar(50) NOT NULL,
 `taxAmount` float NOT NULL,
 `id` bigint(20) NOT NULL AUTO_INCREMENT,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1
