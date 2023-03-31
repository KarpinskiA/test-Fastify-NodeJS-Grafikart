# Test du framework [Fastify](https://www.fastify.io/) (Node.js) (tuto Grafikart)

### Prérequis

Vous avez besoin : 
- Node.js et `npm` d'installé sur votre machine
- L'extension SQLite de VScode
- SQLite d'installer sur votre machine si vous êtes sous Linux. Si vous avez un problème, référez-vous à la [vidéo de Grafikart](https://grafikart.fr/tutoriels/sqlite-vscode-1981)
```SHEL
// Ubuntu
sudo apt-get install sqlite3 libsqlite3-dev

// In VsCode Ctrl+Shift+P search settings.json and set
"sqlite.sqlite3": "/usr/bin/sqlite3"
```

### Installation du back end

Cloner le repo. Dans le dossier du projet:
- installer les dépendances
```sh
npm install
``` 

- lancer le serveur avec 
```sh
npm run dev
```

### Accéder à la page

Ouvrez votre navigateur à cette adresse [http://localhost:3000/](http://localhost:3000/) pour accéder au projet.
</br>
Pour accéder à la partie utilisateur [http://localhost:3000/login](http://localhost:3000/login) avec comme identifiant: admin et mot de passe: admin.

