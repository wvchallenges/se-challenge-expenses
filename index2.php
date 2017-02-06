<html>
<body>
<table>
<?php
	mysql_connect("localhost", "root", "") or
    die("Could not connect: " . mysql_error());
	mysql_select_db("db");

$result = mysql_query("SELECT * FROM EXPENSE");

while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    ?>
<tr>
    <td><?=$row['SALE_DATE']; ?></td>
    <td><?=$row['CATEGORY']; ?></td>
    <td><?=$row['EMPLOYEE_NAME']; ?></td>
    <td><?=$row['PRE_TAX_AMOUNT']; ?></td>
    <td><?=$row['TAX_AMOUNT']; ?></td>
</tr>    
<?
}

mysql_free_result($result);
?>
</table>
</body>
</html>
