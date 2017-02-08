<?php
       	session_start();

       	if(isset($_SESSION['login_name'])){
       	       $res = "'".(string)$_SESSION['login_name']."'";
       		 echo "{'state':true,'clientName':".$res."}";
       	}else {
       		echo "{'state':false}";
       		exit;
       	}
?>