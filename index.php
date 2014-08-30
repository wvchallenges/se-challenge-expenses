<?php
session_start();
?>

<!DOCTYPE html>
<html>
    <head>
        <title>
            Supload - the simple upload
        </title>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
        <link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>
        <div class="container container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <h1> Simple File Upload </h1>
                    <p>Just upload your financial csv file and your data will both be stored in a relational database and outputted to you with expenses calculated for the month. Enjoy!</p>

                    
                    <form action="processexpensefile.php" method="post" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="expense_file">Expense File</label>
                            <input type="file" name="expense_file" id="expense_file"/>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-default btn-success"> <span class="glyphicon glyphicon-import"></span> Submit</button>
                        </div>
                    </form>
                    
                    <?php
                    if (isset($_GET['error'])){
                        if ($_GET['error']=='0') {
                            echo "<p class='error-msg'>Upload error</p>";
                        }elseif ($_GET['error']=='4'){
                            echo "<p class='error-msg'>Please upload a file</p>";
                        }elseif ($_GET['error']=='csv'){
                            echo "<p class='error-msg'>Please only upload csv files</p>";
                        }elseif ($_GET['error']=='time'){
                            echo "<p class='error-msg'>Invalid timestamp - please only use YYYY-MM-DD</p>";
                        }
                    }else if(isset($_GET['success']) && $_GET['success']=='1' && isset($_SESSION['display_array']) && $_SESSION['display_array']!=''){
                    ?>
                        <p class='success-msg'>I present you your table.</p>
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Year-Month</th>
                                        <th>Pre-Tax Total</th>
                                        <th>Tax Total</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <?php
                                    foreach($_SESSION['display_array'] as $row){
                                        echo '<tr>';
                                        foreach($row as $td){
                                            echo '<td>'.$td.'</td>';
                                        }
                                        echo '</tr>';
                                    }
                                ?>
                                </tbody>
                            </table>
                        </div>
                        <?php
                        $_SESSION['display_array'] = '';
                    }
                    ?>                    
                </div>
            </div>
        </div>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script><!--<script src="javascript/jquery.js"></script>-->
        <script src="http://cdnjs.cloudflare.com/ajax/libs/knockout/3.1.0/knockout-min.js"></script><!--<script src="javascript/knockout.js"></script>-->
        <script src="javascript/interact.js"></script>
    </body>
</html>