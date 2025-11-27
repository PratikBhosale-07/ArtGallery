<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../../config/database.php';

$database = new Database();
$db = $database->connect();

// Get posted data
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->username) || !isset($data->email) || !isset($data->password) || !isset($data->full_name)) {
    echo json_encode([
        'success' => false,
        'message' => 'All fields are required'
    ]);
    exit;
}

$user_type = isset($data->user_type) ? $data->user_type : 'buyer';

try {
    // Check if username or email already exists
    $checkQuery = "SELECT username FROM buyers WHERE username = :username OR email = :email
                   UNION
                   SELECT username FROM artists WHERE username = :username OR email = :email";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':username', $data->username);
    $checkStmt->bindParam(':email', $data->email);
    $checkStmt->execute();
    
    if ($checkStmt->rowCount() > 0) {
        echo json_encode([
            'success' => false,
            'message' => 'Username or email already exists'
        ]);
        exit;
    }
    
    // Hash password
    $password_hash = password_hash($data->password, PASSWORD_DEFAULT);
    
    if ($user_type === 'artist') {
        $query = "INSERT INTO artists (full_name, username, email, password_hash, bio) 
                  VALUES (:full_name, :username, :email, :password_hash, :bio)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':full_name', $data->full_name);
        $stmt->bindParam(':username', $data->username);
        $stmt->bindParam(':email', $data->email);
        $stmt->bindParam(':password_hash', $password_hash);
        $bio = isset($data->bio) ? $data->bio : '';
        $stmt->bindParam(':bio', $bio);
    } else {
        $query = "INSERT INTO buyers (full_name, username, email, password_hash) 
                  VALUES (:full_name, :username, :email, :password_hash)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':full_name', $data->full_name);
        $stmt->bindParam(':username', $data->username);
        $stmt->bindParam(':email', $data->email);
        $stmt->bindParam(':password_hash', $password_hash);
    }
    
    $stmt->execute();
    
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful'
    ]);
    
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>
