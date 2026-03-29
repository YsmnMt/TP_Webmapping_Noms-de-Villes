<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Noms de Villes</title>
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" 
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
</head>

<body>

<h1>Noms de Villes en France</h1>

<div id="app">
    <div id="entete">
        <form action="" @submit.prevent="geocode">
            <input 
                type="text" 
                class="form-control fs-2 me-2" 
                v-model="recherche"
                @input="autocomplete"
                >
            <button class="btn btn-primary">Recherche</button>
            <ul id="villes" v-if="villes.length">
                <li v-for="ville in villes" @click= "recherche = ville.nom">
                    {{ ville.nom }}
                </li>
            </ul>
            <select v-model="type">
                <option value="contient">Contient</option>
                <option value="commence">Commence par</option>
                <option value="finit">Finit par</option>
            </select>
        </form>
    </div>
    <div id="map"></div>
</div>

<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="/assets/javascript/leaflet_villes.js"></script>

</body>
</html>