<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once '../config/database.php';

$database = new Database();
$db = $database->connect();

try {
    $query = "SELECT artist_id, full_name, username, email, bio, profile_photo, joined_at 
              FROM artists 
              ORDER BY joined_at DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $artists = $stmt->fetchAll();
    
    // Get artwork count for each artist
    foreach ($artists as &$artist) {
        $countQuery = "SELECT COUNT(*) as artwork_count FROM artworks WHERE artist_id = :artist_id";
        $countStmt = $db->prepare($countQuery);
        $countStmt->bindParam(':artist_id', $artist['artist_id']);
        $countStmt->execute();
        $count = $countStmt->fetch();
        $artist['artwork_count'] = $count['artwork_count'];
    }
    
    echo json_encode([
        'success' => true,
        'data' => $artists
    ]);
    
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>
