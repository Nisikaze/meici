<?php
	include 'DBHelper.php';
	include 'format.php';

	//判断当前 email 是否已存在数据表中
	function formant(){
    	$args=func_get_args();
    	
    }
		//判断当前 email 是否已存在数据表中
	$sql = format("select*from register where username='{0}' and password='{1}'", $_POST["username"], $_POST["password"]);
	$result = query($sql);
	//当前 email 不存在，执行插入操作
	if(count($result) < 1){
		echo "{state: false, message: '该用户不存在'}";
	} else {
		echo "{state: true, message: '登录成功！！！'}";
		session_start();
    	$_SESSION["login_name"] = $result[0]->username;
	}
			
?>