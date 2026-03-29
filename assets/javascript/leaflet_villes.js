let map = L.map('map').setView([46.5, 2.5], 6);

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
                    .on('click', function() { map.setView(this.getLatLng(), 10) })
                    .addTo(marqueurs)
                });

                //Implémentation d'un barycentre 

                let latMoyen = donnees.reduce((moy, ville) => moy + parseFloat(ville.lat), 0)/donnees.length;
                let lonMoyen = donnees.reduce((moy, ville) => moy + parseFloat(ville.lon), 0)/donnees.length;

                L.marker([latMoyen, lonMoyen]).bindPopup('Barycentre').addTo(marqueurs);

                if (donnees.length === 1) {
                    map.setView([parseFloat(donnees[0].lat), parseFloat(donnees[0].lon)], 10);
                } else {
                    map.fitBounds(marqueurs.getBounds());
                }

            })

            .catch(error => {
                console.error('Erreur:', error);
            });
        },

        selectionVille(ville) {
            this.recherche = ville.nom;
            this.villes = [];
            marqueurs.clearLayers();

            let circle = L.circle([parseFloat(ville.lat), parseFloat(ville.lon)], { radius: 500 })
                .bindPopup(ville.nom)
                .addTo(marqueurs);

            map.setView([parseFloat(ville.lat), parseFloat(ville.lon)], 15);
            circle.openPopup();
        },

        autocomplete() {
            console.log(this.recherche);

            let url ='/villes?recherche=' + this.recherche + '&type=' + this.type;

            if(!this.recherche) {
                this.villes = [];
                return;
            };

            fetch(url)
                .then(result => result.json())
                .then(donnees => {
                    this.villes = donnees;
                });

        }
    }

}).mount('#entete');

