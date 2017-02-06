<table>
<?php
	mysql_connect("localhost", "root", "") or
    die("Could not connect: " . mysql_error());
	mysql_select_db("db");

$result = mysql_query("SELECT * FROM EXPENSE");

while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    ?>
<tr>
    <td><?=$row['id']; ?></td>
    <td><?=$row['name']; ?></td>
</tr>    
<?
}

mysql_free_result($result);
?>
</table>