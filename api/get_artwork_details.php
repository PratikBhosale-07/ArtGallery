<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once '../config/database.php';

$database = new Database();
$db = $database->connect();

// Get artwork ID from query parameter
$art_id = isset($_GET['id']) ? $_GET['id'] : null;

if (!$art_id) {
    echo json_encode([
        'success' => false,
        'message' => 'Artwork ID is required'
    ]);
    exit;
}

try {
    $query = "SELECT a.*, ar.full_name as artist_name, ar.username as artist_username, 
              ar.bio as artist_bio, ar.profile_photo as artist_photo
              FROM artworks a 
              LEFT JOIN artists ar ON a.artist_id = ar.artist_id 
              WHERE a.art_id = :art_id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':art_id', $art_id);
    $stmt->execute();
    $artwork = $stmt->fetch();
    
    if ($artwork) {
        echo json_encode([
            'success' => true,
            'data' => $artwork
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Artwork not found'
        ]);
    }
    
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>
