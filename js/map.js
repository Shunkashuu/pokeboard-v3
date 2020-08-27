// class Map, grille, génération aléatoire des player, weapon, obstacles

class Map {
    constructor(jeu) {
        // objet jeu à mettre mais "jeu.initialisation(); is not a function" quand il est dedans
    }
}

let joueur1 = {};
let joueur2 = {};

// objet jeu regroupant toutes les fonctions de la map à transformer en class ensuite
var jeu = {
    nbColonne : 10,
    nbLigne : 10,
    grille : [],

    // initialisation des éléments et de la grille via la toolbox
    initialisation() {
        this.grille = toolbox.initialiserTableauVide(this.nbLigne,this.nbColonne,0);
        this.positionnerJ1(1,1);
        this.positionnerJ2(1,2);
        this.positionnerObstacles(15, 3)
        this.positionnerArmes(1, 4)
        this.positionnerArmes(1, 5)
        this.positionnerArmes(1, 6)
        this.positionnerArmes(1, 7)
    },

    // fonctions globales, utilisées plusieurs fois
    getCase(xAlea,yAlea) {
        var cellule = {};
        cellule.x = xAlea;
        cellule.y = yAlea;
        return cellule;
    },

    verifCaseVide(caseB) {
        if(this.grille[caseB.x][caseB.y] === 0){
            return true;
        } else {
            return false;
        } 
    },
    
    afficherGrille() {
        const jeu = document.querySelector("#jeu");
        jeu.innerHTML = "";
        
        var content = "<table>";
            for(var i=0; i < this.nbLigne;i++){
                content += "<tr>";
                for(var j=0 ; j < this.nbColonne;j++){
                    content += "<td class='border border-dark text-center' style='width:60px;height:60px'>";
                    if(this.grille[i][j]=== 0){
                       
                    } 
                    if(this.grille[i][j]=== 1){
                        content += "<img src='/img/J1.png' class='bg-danger rounded-circle' style='width:50px;height:50px' />";
                    } 
                    if(this.grille[i][j]=== 2){
                        content += "<img src='/img/J2.png' class='bg-info rounded-circle' style='width:50px;height:50px' />";
                    }
                    if(this.grille[i][j]=== 3){
                        content += "<img src='/img/roche.png' style='width:50px;height:50px'/>";
                    }
                    if(this.grille[i][j]=== 4){
                        content += "<img src='/img/weapon1.png' style='width:40px;height:40px'/>";
                    }
                    if(this.grille[i][j]=== 5){
                        content += "<img src='/img/weapon2.png' style='width:40px;height:40px'/>";
                    }
                    if(this.grille[i][j]=== 6){
                        content += "<img src='/img/weapon3.png' style='width:40px;height:40px'/>";
                    }
                    if(this.grille[i][j]=== 7){
                        content += "<img src='/img/weapon4.png' style='width:40px;height:40px'/>";
                    }
                    content += "</td>";
                }
                content += "</tr>";
            }
        content += "</table>";
        jeu.innerHTML = content;
    },

    positionnerJ1(nombre, joueur) {
        for(var i =0 ; i < nombre ; i++){
            let xAlea = Math.floor(Math.random() * (this.nbLigne-1)); // de base : this.nbLigne(nombre-1) pour prendre en compte bord du tableau et nombre du bateau
            let yAlea = Math.floor(Math.random() * (this.nbColonne-1));

            let posJoueur = {};
                posJoueur["case"+i] = this.getCase(xAlea, yAlea);
                joueur1 = posJoueur["case"+i];
                console.log(joueur1);

            let isCaseVide = this.verifCaseVide(posJoueur["case"+i]);
            if(isCaseVide == true) {
                this.enregistrerGrilleJoueur(posJoueur,joueur);
            } else {
                i--;
            }
        }
    },

    positionnerJ2(nombre, joueur) {
        let i = 0;
        while(i < nombre) {
            i = 0;
            let xAlea = Math.floor(Math.random() * (this.nbLigne-1)); // de base : this.nbLigne(nombre-1) pour prendre en compte bord du tableau et nombre du bateau
            let yAlea = Math.floor(Math.random() * (this.nbColonne-1));
        
            let posJoueur = {};
            posJoueur["case"+i] = this.getCase(xAlea, yAlea);
            joueur2 = posJoueur["case"+i];

            let isCaseVide = this.verifCaseVide(posJoueur["case"+i]);
            console.log(joueur2);

            if(isCaseVide == true && (Math.abs(joueur2.x - joueur1.x) >= 1 
            && Math.abs(joueur2.y - joueur1.y))) { //verifie l'écart absolue entre les lignes et colonnes des deux joueurs
                console.log("true");
                this.enregistrerGrilleJoueur(posJoueur,joueur);
                i++;
            } else {
                console.log(false);
                joueur2 = [''];
                i--;
            }
        }
    },

    enregistrerGrilleJoueur(posJoueur,joueur) {
        for(var cellule in posJoueur){
            this.grille[posJoueur[cellule].x][posJoueur[cellule].y] = joueur;
        }
    },

    positionnerObstacles(nombre,obstacles) {
        var posObstacles = {}; //objet
        var xAlea = 0;
        var yAlea = 0;
        var isCaseVide = true;

        for(var i =1 ; i <= nombre ; i++){
            xAlea = Math.floor(Math.random() * (this.nbLigne-1));
            yAlea = Math.floor(Math.random() * (this.nbColonne-1));
            
            posObstacles["case"+i] = this.getCase(xAlea, yAlea);
            isCaseVide = this.verifCaseVide(posObstacles["case"+i]);
            if(isCaseVide == true) {
                this.enregistrerGrilleObstacles(posObstacles,obstacles);
            } else {
                i--;
            }    
        }
    },

    enregistrerGrilleObstacles(posObstacles,obstacles) {
        for(var cellule in posObstacles){
            this.grille[posObstacles[cellule].x][posObstacles[cellule].y] = obstacles;
        }
    },

    // il faudra faire un système différent car il y a 4 armes différentes
    positionnerArmes(nombre,armes) {
        var posArmes = {}; //objet
        var xAlea = 0;
        var yAlea = 0;
        var isCaseVide = true;

        for(var i =1 ; i <= nombre ; i++){
            xAlea = Math.floor(Math.random() * (this.nbLigne-1));
            yAlea = Math.floor(Math.random() * (this.nbColonne-1));
            
            posArmes["case"+i] = this.getCase(xAlea, yAlea);
            isCaseVide = this.verifCaseVide(posArmes["case"+i]);
            if(isCaseVide == true) {
            this.enregistrerGrilleObstacles(posArmes,armes);
            } else {
                i--;
            }    
        }
    },

    enregistrerGrilleArmes(posArmes,armes) {
        for(var cellule in posArmes){
            this.grille[posArmes[cellule].x][posArmes[cellule].y] = armes;
        }
    },
}

// initialisation de la map
jeu.initialisation();
jeu.afficherGrille();