// class Weapon et ses attributs

class Armes {
    constructor(id, nom, degats, url) {
        this.id = id,
        this.nom = nom,
        this.degats = degats,
        this.url = url
    }
}

const listeArmes = [weapon0 = new Armes(0, 'Charge', 10, './img/weapon0.png'),
                    weapon1 = new Armes(1, 'Force', 20, './img/weapon1.png'),
                    weapon2 = new Armes(2, 'Cage Eclair', 30, './img/weapon2.png'),
                    weapon3 = new Armes(3, 'Noeud Herbe', 40, './img/weapon3.png'),
                    weapon4 = new Armes(4, 'Surf', 50, './img/weapon4.png')]
