<?php

require_once '../connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  $email = $_POST['email'];
  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  if($stmt = $con->prepare('SELECT username, password FROM users WHERE username = ?')) {
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
      echo json_encode(['status' => '300', 'message' => 'Username/email already exist.']);
      die;
    } else {
        if($stmt = $con->prepare("INSERT INTO users (email, username, password) VALUES (?, ?, ?)")) {

          $stmt->bind_param('sss', $email, $username, $password);

          if($stmt->execute()) {
            echo json_encode([
              'status' => '200', 
              'message' => 'Registration successful! Please sign in.'
            ]);
          } 
          else {
            echo json_encode([
              'status' => '400', 
              'message' => 'Registration failed. Please try again.'
            ]);
          }
        }
      }
  }
}