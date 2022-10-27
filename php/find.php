<?php
try {
    $x = (int)$_POST["x"];
    $y = (float)$_POST["y"];
    $r = (float)$_POST["r"];
    $timezone = $_POST["timezone"];
} catch (Exception $e) {
    exit();
}
$cords = "( $x, $y, $r )";
$time = date('H:i:s', time() - $timezone * 60);
$execution = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);
if (valid($x, $y, $r)) {
    $result = in_surface($r, $x, $y) ? "Попадание" : "Мимо";
}
else{
    exit();
}
$jsonData = "{" .
    "\"cords\":\"$cords\"," .
    "\"time\":\"$time\"," .
    "\"exec\":\"$execution\"," .
    "\"result\":\"$result\"" .
    "}";
echo $jsonData;

function in_surface($r, $x, $y){
    if ($x>=0 && $y>=0){
        if ($x*$x + $y*$y <= $r*$r){
            return true;
        }
        else {
            return false;
        }
    }
    else if ($x<=0 && $y>=0){
        if ($x==0 || $y==0){
            return true;
        }
        else{
            return false;
        }
    }
    else if ($x>=0 && $y<=0){
        if ($x<= $r && $y>=($r*(-1))){
            return true;
        }
        else{
            return false;
        }
    }
    else if ($x<=0 && $y<=0){
        $b = (-1 * $r) / 2;
        $k = $b/$r;
        $xm = ($y-$b)/$k;
        if ($xm<=$x){
            return true;
        }
        else{
            return false;
        }
    }
    return false;
}

function valid($x, $y, $r){
    if (in_array($x, [-4, -3, -2, -1, 0, 1, 2, 3, 4]) && $y>=-3 && $y<=3 && $r>=-4 && $r<=4){
        return true;
    }
    else{
        return false;
    }
}