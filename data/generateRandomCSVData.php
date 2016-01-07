<?php

for($i = 0; $i < 90; $i++)
{
	$d = $i;
  //$d = $i + mt_rand(-1, 1);
  //if($d < 0) $d = 0;
  echo date("n/j/Y", strtotime("today - 1 year + " . $d . " days"));
  echo ",";
	//  echo mt_rand(0, 18);
	echo $i;
  echo "\n";
}