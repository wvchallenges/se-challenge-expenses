<?php
session_start();

/*------*/
errorHandling(1);
execute();
/*------*/

function errorHandling ($time) {
    if ($time == FALSE){
        header('Location: index.php?error=time');
        die();
    }
    
    if ($_FILES["expense_file"]["error"] > 0) {
        if ($_FILES["expense_file"]["error"] == 4){
            header('Location: index.php?error=4');
            die();
        }else{
            header('Location: index.php?error=0');
            die();
        }    
    }
    
    /*
    This is not a complete check to see if the file is a true csv file
    Other measures to consider include virus scanning the content, checking the data in a sandbox, etc.
    */
    $ext = pathinfo($_FILES["expense_file"]["name"], PATHINFO_EXTENSION);
    if ($ext != 'csv') {
            header('Location: index.php?error=csv');
            die();
    }   
    
}

function execute() {
    $mysqli = mysqli_connect("localhost","root","","wave_challenge");

    displayFileParameters();
    $filename = storeFile();
    $_SESSION['display_array'] = processFileData($filename, $mysqli);

    mysqli_close($mysqli);

    header('Location: index.php?success=1');
    die();
}


function displayFileParameters () {
    echo "Upload: " . $_FILES["expense_file"]["name"] . "<br>";
    echo "Type: " . $_FILES["expense_file"]["type"] . "<br>";
    echo "Size: " . ($_FILES["expense_file"]["size"] / 1024) . " kB<br>";
    echo "Stored in: " . $_FILES["expense_file"]["tmp_name"] . " <br>";    
}

function storeFile () {
    date_default_timezone_set('UTC');
    $uploadtime = date('YmdHis').rand(1,100);
    $filename = "expense_files/" . $uploadtime . $_FILES["expense_file"]["name"];
    move_uploaded_file($_FILES["expense_file"]["tmp_name"], $filename);
    echo "Stored in: " . $filename.'<br/>';
    
    return $filename;
}

function processFileData ($filename, $mysqli) {
    date_default_timezone_set('UTC');
    $currentdatetime = date('Y-m-d H:i:s');
    echo $currentdatetime;
    
    $row = 1;
    $date_array = array();
    $pre_tax_array = array();
    $tax_array = array();
    $expenses_array = array();
    $display_array = array();

    $columns = "datestamp, expense_date, category, employee_name, employee_address, expense_description, pretax_amount, tax_name, tax_amount";
    $query = "INSERT INTO employee_expenses (".$columns.") VALUES (?,?,?,?,?,?,?,?,?)";
    $dbcommand = $mysqli -> prepare($query);
    
    if (($handle = fopen($filename, 'r')) !== FALSE) {
        
        //form all related array
        while (($data = fgetcsv($handle, 1000, ',')) !== FALSE) {
            if ($row != 1){
                
                $expense_date = $data[0];
                $time=strtotime($expense_date);
                errorHandling($time);
                
                $yearmonth=intval(date("Y",$time).date("m",$time));
                
                $expense_pre_tax = floatval(str_replace(',', '', $data[5]));
                $expense_tax = floatval(str_replace(',', '', $data[7]));
                $expense_val = $expense_pre_tax + $expense_tax;
                
                $index = array_search($yearmonth, $date_array);
                if ($index===FALSE){
                    $date_array[] = $yearmonth;
                    $pre_tax_array[] = $expense_pre_tax;
                    $tax_array[] = $expense_tax;
                    $expenses_array[] = $expense_val;
                }else{
                    $pre_tax_array[$index] += $expense_pre_tax;
                    $tax_array[$index] += $expense_tax;
                    $expenses_array[$index] += $expense_val;
                }
                
                $datetime=date('Y', $time).date('m', $time).date('d', $time);
                $currentdatetime = 
                $dbcommand -> bind_param('ssssssisi', $currentdatetime, $datetime, $data[1], $data[2], $data[3], $data[4], $expense_pre_tax, $data[6], $expense_tax);
                $dbcommand -> execute();
            }            
            $row++;
        }
        
        //sort array by date
        array_multisort($date_array, $pre_tax_array, $tax_array, $expenses_array);
        
        //combine arrays into MD array
        $date_array_length = count($date_array);
        for ($i = 0; $i < $date_array_length; $i++){
            $year = substr($date_array[$i], 0, 4);
            $month = substr($date_array[$i], 4, 2);
            if ($month == '01'){
                $month = 'Jan';
            }else if ($month == '02'){
                $month = 'Feb';
            }else if ($month == '03'){
                $month = 'Mar';
            }else if ($month == '04'){
                $month = 'Apr';
            }else if ($month == '05'){
                $month = 'May';
            }else if ($month == '06'){
                $month = 'Jun';
            }else if ($month == '07'){
                $month = 'Jul';
            }else if ($month == '08'){
                $month = 'Aug';
            }else if ($month == '09'){
                $month = 'Sept';
            }else if ($month == '10'){
                $month = 'Oct';
            }else if ($month == '11'){
                $month = 'Nov';
            }else if ($month == '12'){
                $month = 'Dec';
            }
            
            $display_array[] = array($month.'-'.$year, '$'.number_format($pre_tax_array[$i], 2, '.', ','), '$'.number_format($tax_array[$i], 2, '.', ','), '$'.number_format($expenses_array[$i], 2, '.', ','));            
        }
        
        fclose($handle);
    }
    return $display_array;
}
?>

