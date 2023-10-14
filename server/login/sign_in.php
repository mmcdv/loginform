<?php

  require_once '../connection.php';

  if($_SERVER['REQUEST_METHOD'] == "POST"){
    
    $username = $_POST['username'];
    $password = $_POST['password'];

    if($stmt = $con->prepare('SELECT username, password FROM users WHERE username = ?')){
      $stmt->bind_param('s', $username);
      $stmt->execute();
      $stmt->store_result();

      if($stmt->num_rows === 0) {
        echo json_encode(['status' => '300', 'message' => "User doesn't exist. Please create an account."]);
        exit;
      }
      else {
        $stmt->bind_result($username, $userpass);
        $stmt->fetch();

        if(password_verify($password, $userpass)) {       
          echo json_encode([
            'status' => '200', 
            'message' => 'Sign in successful!'            
          ]);
        }
        else {
          // Password is incorrect 
          echo json_encode(['status' => '300', 'message' => 'Password is incorrect. Please try again.']);
        }

      }

    }

  }