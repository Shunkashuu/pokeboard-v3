// class Map, grille, génération aléatoire des player, weapon, obstacles

class Map {
    constructor(jeu) {
        // objet jeu à mettre mais "jeu.initialisation(); is not a function" quand il est dedans
    }
}

// objet jeu regroupant toutes les fonctions de la map à transformer en class ensuite
var jeu = {
    nbColonne : 10,
    nbLigne : 10,
    grille : [],

    nbCaseJ1 : 0,
    nbCaseJ2 : 0,

    // initialisation des éléments et de la grille via la toolbox
    initialisation() {
        this.grille = toolbox.initialiserTableauVide(this.nbLigne,this.nbColonne,0);
        this.positionnerJoueur(1,1);
        this.positionnerJoueur(1,2);
        this.positionnerObstacles(10, 3)
        this.positionnerArmes(4, 4)
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

    // ne fonctionne pas encore, permet de vérifier que les persos ne sont pas cote a cote
    /*verifCaseJoueur(caseA) {
        if(this.grille[caseA.x+1][caseA.y] === 1 || this.grille[caseA.x-1][caseA.y] === 1 ||
            this.grille[caseA.x][caseA.y+1] === 1 || this.grille[caseA.x][caseA.y-1] === 1 ){
            return true;
        } else {
            return false;
        }
    },*/

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
                    // pour au moins afficher les armes
                    if(this.grille[i][j]=== 4){
                        content += "<img src='/img/weapon0.png' style='width:50px;height:50px'/>";
                    }
                    content += "</td>";
                }
                content += "</tr>";
            }
        content += "</table>";
        jeu.innerHTML = content;
    },

    // positionner les joueurs
    positionnerJoueur(taille,joueur) {
        var posJoueur = {}; //objet
        var xAlea = 0;
        var yAlea = 0;
        var isCaseVide = true;
        var isCaseJoueur = false;
        
        for(var i =0 ; i < taille ; i++){
            xAlea = Math.floor(Math.random() * (this.nbLigne-1));
            yAlea = Math.floor(Math.random() * (this.nbColonne-1));
        
            posJoueur["case"+i] = this.getCase(xAlea, yAlea);
            isCaseVide = this.verifCaseVide(posJoueur["case"+i]);
            //isCaseJoueur = this.verifCaseJoueur(posJoueur["case"+i]);
            if(isCaseVide == true && isCaseJoueur == false) {
                this.enregistrerGrilleJoueur(posJoueur,joueur);
            }else {
                i--;
            }    
        }
    },

    enregistrerGrilleJoueur(posJoueur,joueur) {
        for(var cellule in posJoueur){
            this.grille[posJoueur[cellule].x][posJoueur[cellule].y] = joueur;
        }
    },

    positionnerObstacles(taille,obstacles) {
        var posObstacles = {}; //objet
        var xAlea = 0;
        var yAlea = 0;
        var isCaseVide = true;

        for(var i =1 ; i <= taille ; i++){
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
    positionnerArmes(taille,armes) {
        var posArmes = {}; //objet
        var xAlea = 0;
        var yAlea = 0;
        var isCaseVide = true;

        for(var i =1 ; i <= taille ; i++){
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