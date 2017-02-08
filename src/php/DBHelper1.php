<?php

    function connect(){
        $servername = "localhost";
        $username = "root";
        $password = "root";
        $db = 'meiciproduct';
        $conn = mysqli_connect($servername,$username,$password,$db); 
        if (mysqli_connect_errno($conn)) 
        { 
            echo "连接 MySQL 失败: " . mysqli_connect_error();
            return null;
        }
        return $conn;
    }
     
    function query($sql){
        $conn = connect();
        if ($result = mysqli_query($conn,$sql))
        {
            $jsonData = array();   
            while ($obj = mysqli_fetch_object($result))
            {
                $jsonData[] = $obj;
            }               
            echo json_encode($jsonData, JSON_UNESCAPED_UNICODE);
            // 释放结果集
            mysqli_free_result($result);
        } 
        mysqli_close($conn);       
    }

?>