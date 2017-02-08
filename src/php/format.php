<?php
	function format() {   
		 $args = func_get_args();  
		   
		 if (count($args) == 0) { return;}  
		   
		 if (count($args) == 1) { return $args[0]; }
		     
		 $str = array_shift($args);    
		     
		 $str = preg_replace_callback('/\\{(0|[1-9]\\d*)\\}/', create_function('$match', '$args = '.var_export($args, true).'; return isset($args[$match[1]]) ? $args[$match[1]] : $match[0];'), $str);
		     
		 return $str;
	}
?>