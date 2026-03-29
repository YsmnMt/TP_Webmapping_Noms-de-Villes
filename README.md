# Noms de Villes en France 

## Description de l'application 

Il s'agit d'une application web cartographique qui propose une interface de visualisation des villes françaises. 
L'utilisateur écrit dans la barre de recherche les caractères présents dans le nom des villes qu'il recherche. 
Une liste des villes correspondant à sa recherche se déroule, et lorsqu'une des villes est sélectionnée elle apparaît sur la carte.

<img width="1438" height="812" alt="Capture d’écran 2026-03-29 à 22 59 16" src="https://github.com/user-attachments/assets/c167f30d-47c3-430a-8c88-cd9ed4ba7abf" />


### Technologies utilisées 

- FrontEnd : HTML5, CSS3, JavaScript (Vue.Js) 
- Webmapping : Leaflet 
- Backend : PHP (Flight framework)
- Base de données : MySQL (geobase)
- Serveur local : MAMP (Apache)

### Fonctionnalités 

- Une barre de recherche.
- Un menu déroulant qui permet de choisir entre trois types de recherche : commence par, contient, finit par.
- Une liste déroulante des villes correspondant à la recherche, à partir de laquelle l'utilisateur peut sélectionner la ville de son choix.
- Une carte fournie par les services de Leaflet qui permet de visualiser les villes sélectionnées.

<img width="1440" height="809" alt="Capture d’écran 2026-03-29 à 23 00 39" src="https://github.com/user-attachments/assets/6d3aa33d-f1d2-4b2e-8c82-04c681dca0ff" />

### Fonctionnalité différenciante (le barycentre)

- L'application calcule un barycentre en faisant la moyenne des latitudes et longitudes de toutes les villes trouvées. Un marqueur est placé à ce point central sur la carte, permettant de visualiser en un coup d'oeil la zone géographique concentrant nos résultats.

### Lancement 

- Cloner le dépôt : git clone https://github.com/YsmnMt/TP_Webmapping_Noms-de-Villes.git
- Utiliser MAMP (Apache) avec comme racine le dossier "TP_Webmapping_Noms-de-villes".
- Ouvrir le local host (localhost:8888/) sur le navigateur web de votre choix (testé sur Safari v.18, Chrome v.146 et Firefox v.149).
- Écrire dans la barre de recherche le nom ou les caractères de la ville recherchée, cliquer sur celle qui vous convient dans la liste et elle apparaît sur l'interface cartographique.

### Autrice

Yasmine Moutchou 

