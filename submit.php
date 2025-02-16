<?php
// Database configuration
$servername = "localhost";
$username = "root"; // or your MySQL username
$password = "0908005518"; // replace with your root password
$dbname = "studentDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and bind the SQL statement
$stmt = $conn->prepare("INSERT INTO students (name, studentId, date) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $studentId, $date);

// Retrieve form data via POST
$name = $_POST['name'];
$studentId = $_POST['studentId'];
$date = $_POST['date'];

// Execute the statement and provide feedback
if ($stmt->execute()) {
    echo "New record created successfully!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
