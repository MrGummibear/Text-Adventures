const term = require("terminal-kit").terminal;
const readline = require("readline");
const { Paladin, Mage, Waldläufer, Player } = require("./klassen.js");
const enemys = require("./enemy.js");
const locations = require("./locations.js");
const items = require("./items.js");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

class Game {
    constructor() {
        this.player = null;
        this.locations = locations;
        this.objects = items;
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
        term.cyan(
            `Dein aktueller Standort ist: ${
                this.locations[this.player.currentLocation].description
            }\n`
        );
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
            "zurück",
        ];
        term.clear();
        term.singleColumnMenu(direction, (error, response) => {
            const choice = response.selectedText.trim();
            if (choice === "zurück") {
                this.displayMenu();
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
