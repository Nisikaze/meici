<?php
	include 'DBHelper1.php';
     $page = (int)$_POST["page"];
     $pageNum = ($page-1)*45;
     $sql = ("SELECT * FROM  productlist limit $pageNum,45");
     query($sql);
?>