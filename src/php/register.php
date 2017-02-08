<?php
	include 'DBHelper.php';
	include 'format.php';

	//判断当前 email 是否已存在数据表中
	function formant(){
    	$args=func_get_args();
    	
    }
	$Check = format("select*from register where username='{0}'", $_POST["username"]);
	$result = query($Check);
	//当前 email 不存在，执行插入操作
	if(count($result) < 1){
		$sql = format("insert into register(username, password) values('{0}', '{1}')", $_POST["username"], $_POST["password"]);
		//跳转页面
		$excute = excute($sql);
		if($excute){
			echo "{state: true}";
		} else {
			echo "{state: false, message: '插入失败！！！'}";
		}
	} else {
		echo "{state: false, message: '该手机或邮箱已被注册'}";
		
	}

	
?>