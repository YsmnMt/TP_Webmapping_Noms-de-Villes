let map = L.map('map').setView([48.85, 2.35], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/* Marqueur, cercle et polygone 
let marker = L.marker([48.85, 2.35]).addTo(map);

let circle = L.circle([48.85, 2.35], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

let polygon = L.polygon([
    [48.85, 2.35],
    [48.86, 2.37],
    [48.84, 2.33]
]).addTo(map);

*/

let geoJsonLayer = L.geoJSON().addTo(map);


Vue.createApp({
    data() {
        return {
            recherche: '',
            donnees: [],
            villes: []
        };
    },

    computed: {

    }, 

    methods: {

        geocode() {

            console.log(this.recherche);

            let url = this.recherche;

            fetch(`https://data.geopf.fr/geocodage/search?q=${url}`)
                .then(result => result.json())
                .then(donnees => {
                    console.log(donnees);

                    /* Version prof

                    L.geoJSON(donnees).bindPopup(function (layer) {
                        return layer.feature.properties;
                    }).addTo(map);

                    */

                    geoJsonLayer.clearLayers();
                    geoJsonLayer.addData(donnees);

                    let bounds = geoJsonLayer.getBounds();
                    map.fitBounds(bounds);
            })

            .catch(error => {
                console.error('Erreur:', error);
            });
        },

        autocomplete() {
            console.log(this.recherche);

            let url ='/villes?recherche=' + this.recherche;

            fetch(url)
                .then(result => result.json())
                .then(donnees => {
                    this.villes = donnees;
                });

        }
        
    }

}).mount('#entete');

