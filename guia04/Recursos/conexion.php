<?php

function retornarConexion() {
  $con=mysqli_connect("mysql.webcindario.com","guia4dps08l","10119849@miarroba","guia4dps08l");
  return $con;
}  
?>