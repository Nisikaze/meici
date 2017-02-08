<?php 
    //初始化连接对象方法
    function connect(){
        $servername = "localhost";//
        $username = "root";
        $password = "root";
        $dbname = 'login'; 
        //初始化连接，返回一个连接对象(包含所连接数据库的信息)
        $con = mysqli_connect($servername,$username,$password,$dbname); 

        //获取连接对象的错误信息
        if (mysqli_connect_error($con)) 
        { 
            echo "连接 MySQL 失败: " . mysqli_connect_error();
            return null;
        }
        return $con;
    }
    
    //执行查询数据方法
    function query($sql){
        //初始化连接
        $conn = connect();
        //执行 sql 脚本，也叫数据库脚本，返回一个结果集（对象）
        $result = mysqli_query($conn,$sql);
        //定义了一个数组
        $jsonData = array();           
        if ($result)
        {
            
            //在结果集中获取对象(逐行获取)
            while ($obj = mysqli_fetch_object($result))
            {
                //$jsonData.push($obj)
                $jsonData[] = $obj;
                // print_r($obj->email);
            }   
            //将对象转换成 json 格式的字符并打印出来
            //JSON.stringify()            
            // if(!$isCheck){
                // echo json_encode($jsonData, JSON_UNESCAPED_UNICODE);
            // }
            // 释放结果集
            mysqli_free_result($result);
        } 
        //关闭连接
        mysqli_close($conn);   
        return $jsonData;
    }

    //执行逻辑语句
    function excute($sql){
        //初始化连接
        $conn = connect();
        //执行 sql 脚本，也叫数据库脚本，返回一个结果集（对象）
        //返回一个布尔值，true|false，不用释放
        $result = mysqli_query($conn,$sql);
        //关闭连接
        mysqli_close($conn);
        return $result;
    }
    //查询语句，只是呈现结果，不改变数据
    $sql = "SELECT * FROM register;";//返回一个结果集，存放在内存当中，用完要释放
    //逻辑语句，改变数据
    //insert into, update, delete // 返回一个布尔值，true|false，不用释放
    // $insert = "insert into dk(name) values('" . $_POST["name"] . "')";

    // excute($insert);
    query($sql);

?>