let map = L.map('map').setView([48.85, 2.35], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marqueurs = L.geoJson().addTo(map);


Vue.createApp({
    data() {
        return {
            recherche: '',
            donnees: [],
            villes: [],
            type: 'contient'
        };
    },

    computed: {

    }, 

    methods: {

        geocode() {

            console.log(this.recherche);

            let url = '/villes?recherche=' + this.recherche + '&type=' + this.type;

            fetch(url)
                .then(result => result.json())
                .then(donnees => {
                    console.log(donnees);

                    marqueurs.clearLayers();

                    if (donnees.length === 0) {
                        alert('Aucune ville trouvée pour votre recherche.');
                        return;
                    }

                donnees.forEach(ville => {
                    let circle = L.circle([ville.lat, ville.lon], {radius : 500})
                    .bindPopup(ville.nom)
                    .addTo(marqueurs)
                });

                let bounds = marqueurs.getBounds();
                map.fitBounds(bounds);
            })

            .catch(error => {
                console.error('Erreur:', error);
            });
        },

        autocomplete() {
            console.log(this.recherche);

            let url ='/villes?recherche=' + this.recherche + '&type=' + this.type;

            fetch(url)
                .then(result => result.json())
                .then(donnees => {
                    this.villes = donnees;
                });

        }
    }

}).mount('#entete');

