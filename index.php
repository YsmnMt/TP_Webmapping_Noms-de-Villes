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

Flight::route('/carte_villes', function() {
    Flight::render('carte_villes');
});

// Route /Autocomplétion AJAX

Flight::route('/villes', function () {
    $link = Flight::get('link');

    $recherche = $_GET['recherche']; 

    $sql = "SELECT nom, insee FROM communes WHERE nom LIKE '$recherche%' LIMIT 10";
    $requete = mysqli_query($link, $sql);
    $villes = [];
    foreach ($requete as $ville)
        $villes[] = $ville;

       Flight::json($villes);
});

Flight::start();

?>