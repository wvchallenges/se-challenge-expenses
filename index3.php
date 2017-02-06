<!--  
Author:      Jouni Juntunen  
Date:        8/2009  
Description: Prints out the contents of server configuration file.  
-->  
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">  
<html>  
<head>  
<title>PHP-Info example</title>  
</head>  
<body>  
<h2>PHP-info example</h2>  
<?  
//Call phpinfo()-function, which prints out the contents of server configuration file.  
phpinfo();  
?>  
<br /><br /><a href="index.htm">Back to examples</a>  
</body>  
</html> 

<!--  

<?php
    $mysql = new mysqli("localhost", "root");
    echo "MySQL Server info: ".$mysql->host_info;
?>
-->  
