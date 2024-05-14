const items = require("./items.js");
const term = require("terminal-kit").terminal;

class Player {
    constructor(name, characterClass) {
        this.name = name;
        this.characterClass = characterClass;
        this.currentLocation = "i.3";
        this.inventory = [];
    }

    pickUp(item) {
        this.inventory.push(item);
        console.log(`Du hast ${item} aufgenommen.`);
    }

    examine(item) {
        console.log(`Du untersuchst ${item}.`);
    }

    chooseAbility() {
        const abilitiesMenu = this.abilities.map((ability, index) => {
            return ability.name;
        });

        return new Promise((resolve, reject) => {
            term.singleColumnMenu(abilitiesMenu, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response.selectedIndex);
                }
            });
        });
    }
}

class Paladin extends Player {
    constructor(name) {
        super(name, "Paladin");
        this.hp = 900;
        this.startItem = items.sword;
        this.attack = 8 + this.startItem.atk;
        this.defense = 5;
        this.abilities = [
            {
                name: "Kreuzfahrerhieb",
                damage: 40,
                details: `Umhüllt die Waffe mit heiliger kraft, schlägt dann zu und verursachst:`,
            },
            {
                name: "Göttlicher Angriff",
                damage: 50,
                details: `Bündelt seine heilige Kraft in einem Stahl, entfesselt diesen auf seinen Gegner und verursachst:`,
            },
            {
                name: "Göttliches Urteil",
                damage: 60,
                details: `Bringt die Schandtaten des Gegners hervor und verursachst:`,
            },
            {
                name: "Sühne",
                damage: 70,
                details: `Lässt den gegner für seine Vergehen bühsen und verursachst:`,
            },
        ];
        this.damage = this.attack + this.abilities[0].damage; // Beispiel: Zugriff auf den Schaden des ersten Angriffs
        console.log(this.attack);
    }
}
new Paladin("Peter");

class Mage extends Player {
    constructor(name) {
        super(name, "Magier");
        this.hp = 600;
        this.startItem = items.staff;
        this.attack = 6 + this.startItem.atk;
        this.defense = 4;
        this.abilities = [
            {
                name: "Blitz schlag",
                damage: 60,
                details: `Ihr sammelt magische kraft entfesselt dies blitzartig, ein Blitz schlägt auf euren Feind ein und verursachst:`,
            },
            {
                name: "Feuerball",
                damage: 70,
                details: `Ihr schleudert einen Ball aus Feuer auf euren Gegner und verursachst:`,
            },
            {
                name: "Frost Orb",
                damage: 80,
                details: `Ihr sammelt das Wasser aus der Luft, wandelt es mithilfe eurer magischen Kraft in einen eisigen Kristall, feuert diesen ab und verursachst:`,
            },
            {
                name: "Elementarer Orkan",
                damage: 90,
                details: `Ihr manifestiert eure magische kraft, sammelt dies an und entfesselt diese in einem Orkan und verursachst:`,
            },
        ];
        this.damage = this.attack + this.abilities[0].damage; // Beispiel: Zugriff auf den Schaden des ersten Angriffs
    }
}

class Waldläufer extends Player {
    constructor(name) {
        super(name, "Waldläufer");
        this.hp = 750;
        this.startItem = items.bow;
        this.attack = 5 + this.startItem.atk;
        this.defense = 6;
        this.abilities = [
            {
                name: "Wuchtpfeil",
                damage: 50,
                details: `Feuert einen mächtigen Pfeil ab und verursachst:`,
            },
            {
                name: "Pfeil Salve",
                damage: 60,
                details: `Feuert 4 Pfeile nacheinander ab und verursachst:`,
            },
            {
                name: "Tosender Schuss",
                damage: 70,
                details: `Ladet Euren Pfeil mit Energie der Waldgeister auf bevor Ihr diesen abfeuert und verursachst:`,
            },
            {
                name: "Bindender Pfeil",
                damage: 80,
                details: `Feuert einen Schlingenpfeil ab, der Ranken aus der Erde erscheinen lässt, der getroffene Feinde umschlingt und verursachst:`,
            },
        ];
        this.damage = this.attack + this.abilities[0].damage; // Beispiel: Zugriff auf den Schaden des ersten Angriffs
    }
}

module.exports = { Paladin, Mage, Waldläufer, Player };
