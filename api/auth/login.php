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

if (!isset($data->username) || !isset($data->password)) {
    echo json_encode([
        'success' => false,
        'message' => 'Username and password are required'
    ]);
    exit;
}

try {
    // Check in buyers table
    $query = "SELECT buyer_id as id, username, email, full_name, password_hash, 'buyer' as user_type 
              FROM buyers WHERE username = :username OR email = :username";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':username', $data->username);
    $stmt->execute();
    $user = $stmt->fetch();
    
    // If not found in buyers, check in artists table
    if (!$user) {
        $query = "SELECT artist_id as id, username, email, full_name, password_hash, 'artist' as user_type, bio, profile_photo 
                  FROM artists WHERE username = :username OR email = :username";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':username', $data->username);
        $stmt->execute();
        $user = $stmt->fetch();
    }
    
    // If not found in artists, check in admin table
    if (!$user) {
        $query = "SELECT admin_id as id, username, email, password_hash, 'admin' as user_type 
                  FROM admin WHERE username = :username OR email = :username";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':username', $data->username);
        $stmt->execute();
        $user = $stmt->fetch();
    }
    
    if ($user && password_verify($data->password, $user['password_hash'])) {
        // Remove password from response
        unset($user['password_hash']);
        
        // Start session
        session_start();
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_type'] = $user['user_type'];
        $_SESSION['username'] = $user['username'];
        
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => $user
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid username or password'
        ]);
    }
    
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>
