<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once '../config/database.php';

$database = new Database();
$db = $database->connect();

// Get category from query parameter
$category = isset($_GET['category']) ? $_GET['category'] : null;

try {
    if ($category) {
        $query = "SELECT a.*, ar.full_name as artist_name, ar.username as artist_username 
                  FROM artworks a 
                  LEFT JOIN artists ar ON a.artist_id = ar.artist_id 
                  WHERE a.category = :category 
                  ORDER BY a.upload_date DESC";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':category', $category);
    } else {
        $query = "SELECT a.*, ar.full_name as artist_name, ar.username as artist_username 
                  FROM artworks a 
                  LEFT JOIN artists ar ON a.artist_id = ar.artist_id 
                  ORDER BY a.upload_date DESC";
        $stmt = $db->prepare($query);
    }
    
    $stmt->execute();
    $artworks = $stmt->fetchAll();
    
    echo json_encode([
        'success' => true,
        'data' => $artworks
    ]);
    
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>
