const term = require("terminal-kit").terminal;
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

class Player {
    constructor(name, characterClass) {
        this.name = name;
        this.characterClass = characterClass;
        this.currentLocation = "i.3"; // Startort des Spielers
        this.inventory = []; // Inventar des Spielers
    }

    pickUp(item) {
        this.inventory.push(item);
        console.log(`Du hast ${item} aufgenommen.`);
    }

    examine(item) {
        console.log(`Du untersuchst ${item}.`);
    }
}

class Paladin extends Player {
    constructor(name) {
        super(name, "Paladin");
        this.hp = 900;
        this.attack = 8;
        this.defense = 5;
        this.startItem = "Langschwert";
        this.abilities = [
            {
                name: "Kreuzfahrerhieb",
                damage: 50,
                details: `Umhüllt die Waffe mit heiliger kraft, schlägt dann zu und verursachst: ${this.damage} Schaden`,
            },
            {
                name: "Göttlicher Angriff",
                damage: 50,
                details: `Bündelt seine heilige Kraft in einem Stahl, entfesselt diesen auf seinen Gegner und verursachst: ${this.damage} Schaden`,
            },
            {
                name: "Göttliches Urteil",
                damage: 50,
                details: `Bringt die Schandtaten des Gegners hervor und verursachst: ${this.damage} Schaden`,
            },
            {
                name: "Heilige Hand",
                heal: 50,
                details: `Heilt sich selbst mit seiner heilige macht um ${this.heal} HP`,
            },
        ];
        // Die Schadens- und Heilungswerte können erst nach der Initialisierung der Fähigkeiten berechnet werden
        this.damage = this.attack + this.abilities[0].damage; // Beispiel: Zugriff auf den Schaden des ersten Angriffs
        this.heal = this.abilities[3].heal; // Beispiel: Zugriff auf die Heilung der letzten Fähigkeit
    }
}

class Mage extends Player {
    constructor(name) {
        super(name, "Magier");
        this.hp = 600;
        this.attack = 6;
        this.defense = 4;
        this.startItem = "Stab";
        this.abilities = [];
    }
}

class Waldläufer extends Player {
    constructor(name) {
        super(name, "Waldläufer");
        this.hp = 800;
        this.attack = 5;
        this.defense = 6;
        this.startItem = "Bogen";
        this.abilities = [];
    }
}

class Game {
    constructor() {
        this.player = null;
        this.locations = {
            "i.2": { description: "Du betrittst den Shop." },
            "i.3": { description: "Du befindest dich im Dorf der Anfänge." },
            "i.4": { description: "Du betrittst den Kreuzung." },
            "j.4": { description: "Du betrittst den Wald." },
            "k.4": { description: "Du betrittst die Wald 2" },
            "k.3": { description: "Du betrittst die Wald 3" },
            "k.2": { description: "Du betrittst die Wald 4" },
            "l.4": { description: "Du betrittst die Wald 5" },
            "l.3": { description: "Du betrittst die Wald 6" },
            "l.2": { description: "Du betrittst die Wald 7" },
            "m.4": { description: "Du betrittst die Wald 8" },
            "m.3": { description: "Du betrittst die Wald 9" },
            "m.2": { description: "Du betrittst die Wald 10" },
            "n.4": { description: "Du betrittst die Wald 11" },
            "n.3": { description: "Du betrittst die Wald 12" },
            "n.2": { description: "Du betrittst die Wald 13" },
            "n.5": { description: "Du betrittst die Wald 14" },
            "o.5": { description: "Du betrittst die Wald 15" },
            "p.5": { description: "Du betrittst die Wald 16" },
            "h.4": { description: "Du betrittst die Höhle" },
            "g.4": { description: "Du betrittst die Höhle 2" },
            "g.3": { description: "Du betrittst die Höhle 3" },
            "g.2": { description: "Du betrittst die Höhle 4" },
            "f.4": { description: "Du betrittst die Höhle 5" },
            "f.3": { description: "Du betrittst die Höhle 6" },
            "f.2": { description: "Du betrittst die Höhle 7" },
            "e.4": { description: "Du betrittst die Höhle 8" },
            "e.3": { description: "Du betrittst die Höhle 9" },
            "e.2": { description: "Du betrittst die Höhle 10" },
            "d.4": { description: "Du betrittst die Höhle 11" },
            "d.3": { description: "Du betrittst die Höhle 12" },
            "d.2": { description: "Du betrittst die Höhle 13" },
            "d.5": { description: "Du betrittst die Höhle 14" },
            "c.5": { description: "Du betrittst die Höhle 15" },
            "b.5": { description: "Du betrittst die Höhle 16" },
            "i.5": {
                description: "Du betrittst die Stadt 1",
                chest: {
                    contents: ["Heiltrank", "Goldmünzen", "Schwert"],
                },
            },
            "i.6": { description: "Du betrittst die Stadt 2" },
            "i.7": { description: "Du betrittst die Stadt 3" },
            "i.8": { description: "Du betrittst die Stadt 4" },
            "j.6": { description: "Du betrittst die Stadt 5" },
            "j.7": { description: "Du betrittst die Stadt 6" },
            "j.8": { description: "Du betrittst die Stadt 7" },
            "k.6": { description: "Du betrittst die Stadt 8" },
            "k.7": { description: "Du betrittst die Stadt 9" },
            "k.8": { description: "Du betrittst die Stadt 10" },
            "l.6": { description: "Du betrittst die Stadt 11" },
            "l.7": { description: "Du betrittst die Stadt 12" },
            "l.8": { description: "Du betrittst die Stadt 13" },
            "l.9": { description: "Du betrittst die Stadt 14" },
            "m.9": { description: "Du betrittst die Stadt 15" },
            "n.9": { description: "Du betrittst die Stadt 16" },
        };
        this.objects = {
            sword: {
                name: "Schwert",
                atk: 10,
                goldPrice: 50,
            },
            staff: {
                name: "Stab",
                atk: 8,
                goldPrice: 40,
            },
            dagger: {
                name: "Dolch",
                atk: 6,
                goldPrice: 30,
            },

            healPotion: {
                name: "Heiltrank",
                hp: 35,
                goldPrice: 20,
            },
        };
    }

    startGameWithClassSelection() {
        term.clear();
        term.cyan("Hallo, Fremdling, du hast mich erschreckt!!\n");
        term.cyan("Wie ist dein Name?\n");
        rl.question("", (name) => {
            this.player = new Player(name); // Spieler erstellen
            term.clear();
            term.cyan(
                `Willkommen, ${this.player.name}! Teile uns doch mit,\nin welchem Handwerk du besonders bewandert bist!!\n`
            );
            this.displayClassMenu(); // Klassenmenü anzeigen
        });
    }

    displayClassMenu() {
        const classes = ["Paladin", "Magier/in", "Waldläufer/in"];
        term.singleColumnMenu(classes, (error, response) => {
            const chosenClass = response.selectedText.trim();
            switch (chosenClass) {
                case "Paladin":
                    this.player = new Paladin(this.player.name);
                    break;
                case "Magier/in":
                    this.player = new Mage(this.player.name);
                    break;
                case "Waldläufer/in":
                    this.player = new Waldläufer(this.player.name);
                    break;
                default:
                    console.log("Ungültige Auswahl.");
                    return;
            }
            term.clear();
            this.confirmStart();
        });
    }

    confirmStart() {
        term.clear();
        term.cyan(`Willkommen im Dorf der Anfänge, ${this.player.name}!\n`);
        term.cyan(`Möchtest du deine Reise beginnen?`);
        term.singleColumnMenu(["Ja", "Nein"], (error, response) => {
            if (response.selectedText.trim() === "Ja") {
                term.clear();
                term.cyan(`Viel Erfolg auf deinen Reisen!\n`);
                this.displayMenu();
            } else {
                term.cyan(`Bis bald!\n`);
                process.exit();
            }
        });
    }

    displayLocation(location) {
        term.clear();
        term.cyan(this.locations[location].description + "\n");
        if (this.locations[location].chest) {
            term("Du entdeckst eine Truhe!\n");
        }
    }

    openChest(location) {
        const chestContents = this.locations[location].chest.contents;
        term("\nDu öffnest die Truhe und findest:\n");
        chestContents.forEach((item) => {
            term.green(`- ${item}\n`);
        });
        term("\n");
        term.singleColumnMenu(["Einpacken"], (error, response) => {
            if (response.selectedText.trim() === "Einpacken") {
                term.clear();
                term.cyan(`Gegenstände wurden in dein Inventar gepackt\n`);
                this.displayMenu();
            }
        });
    }

    move(direction) {
        const [row, col] = this.player.currentLocation.split(".");
        let newRow = row.charCodeAt(0);
        let newCol = parseInt(col);

        if (direction === "gehe nach norden") {
            newCol--;
        } else if (direction === "gehe nach süden") {
            newCol++;
        } else if (direction === "gehe nach osten") {
            newRow++;
        } else if (direction === "gehe nach westen") {
            newRow--;
        }

        const newLocation = `${String.fromCharCode(newRow)}.${newCol}`;

        if (this.locations[newLocation]) {
            this.player.currentLocation = newLocation;
            this.displayLocation(newLocation);
            if (this.locations[newLocation].chest) {
                const choiceItems = ["Aufschließen", "Weitermachen"];
                term.singleColumnMenu(choiceItems, (error, response) => {
                    if (response.selectedText === "Aufschließen") {
                        this.openChest(newLocation);
                    } else {
                        this.displayMenu();
                    }
                });
            } else {
                this.displayMenu();
            }
        } else {
            term.red(`Der Weg ist blockiert. Bitte wähle einen anderen!\n`);
            this.displayMenu();
        }
    }

    lookAround() {
        const currentLocation = this.player.currentLocation;
        const directions = ["Norden", "Osten", "Süden", "Westen"];
        term.clear();
        term.cyan("Du siehst dich um und siehst:\n");

        directions.forEach((direction) => {
            const [row, col] = currentLocation.split(".");
            let newRow = row.charCodeAt(0);
            let newCol = parseInt(col);

            if (direction === "Norden") {
                newCol--;
            } else if (direction === "Süden") {
                newCol++;
            } else if (direction === "Osten") {
                newRow++;
            } else if (direction === "Westen") {
                newRow--;
            }

            const newLocation = `${String.fromCharCode(newRow)}.${newCol}`;
            if (this.locations[newLocation]) {
                term.green(
                    `- ${direction}: ${this.locations[newLocation].description}\n`
                );
            } else {
                term.red(`- ${direction}: Blockiert\n`);
            }
        });

        term.singleColumnMenu(["Zurück"], (error, response) => {
            this.displayMenu();
        });
    }

    displayMenu() {
        const options = ["Inventar", "Umsehen", "Bewegen"];
        term.clear();
        term.singleColumnMenu(options, (error, response) => {
            const choice = response.selectedText.trim();
            if (choice === "Inventar") {
                this.displayInventory();
            } else if (choice === "Umsehen") {
                this.lookAround();
            } else {
                this.moveMenu();
            }
        });
    }
    moveMenu() {
        const direction = [
            "gehe nach norden",
            "gehe nach osten",
            "gehe nach süden",
            "gehe nach westen",
            "Inventar",
            "umsehen",
        ];
        term.clear();
        term.singleColumnMenu(direction, (error, response) => {
            const choice = response.selectedText.trim();
            if (choice === "Inventar") {
                this.displayInventory();
            } else {
                this.move(choice);
            }
        });
    }

    startGame() {
        this.displayLocation(this.player.currentLocation);
        this.displayMenu(); // Menü anzeigen
    }
}
const game = new Game();
game.startGameWithClassSelection();
