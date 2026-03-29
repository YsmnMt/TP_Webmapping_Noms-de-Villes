<?php 

// Lancer Flight Framework 

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

require ('flight/Flight.php');

// Connexion mysql 

$server = 'localhost';
$user = 'root';
$pass = 'root';
$db = 'geobase';

$link = mysqli_connect($server, $user, $pass, $db);

if (!$link) {
    die("Erreur de connexion : " . mysqli_connect_error());  
}

mysqli_set_charset($link, "utf8");
Flight::set('link', $link);

// Route page d'accueil carte

Flight::route('/', function() {
    Flight::render('carte_villes');
});

// Route completion 3 types 

Flight::route('/villes', function () {
    $link = Flight::get('link');
    $recherche = $_GET['recherche'] ?? ''; 
    $type = $_GET['type'] ?? 'contient';

    if ($type === 'commence') {
        $like = $recherche . '%';
    } elseif ($type === 'finit') {
        $like = '%' . $recherche;
    } else {
        $like = '%' . $recherche . '%';
    }        

    $stmt = mysqli_prepare($link, "SELECT nom, insee, 
    ST_X(ST_GeomFromText(ST_AsText(ST_Centroid(geometry)), 4326)) AS lon,
    ST_Y(ST_GeomFromText(ST_AsText(ST_Centroid(geometry)), 4326)) AS lat
    FROM communes WHERE nom LIKE ? LIMIT 100");
    mysqli_stmt_bind_param($stmt, "s", $like);
    mysqli_stmt_execute($stmt);
    $requete = mysqli_stmt_get_result($stmt);
    

    $villes = [];
    foreach ($requete as $ville) {
        $villes[] = $ville;
    }

       Flight::json($villes);
});

Flight::start();

?>