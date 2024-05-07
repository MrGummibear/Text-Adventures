const term = require("terminal-kit").terminal;
const readline = require("readline");
const { Paladin, Mage, Waldläufer, Player } = require("./klassen.js");
const enemys = require("./enemy.js");
const locations = require("./locations.js");
const items = require("./items.js");
const { move, lookAround, moveMenu } = require("./movesystem.js");
const fight = require("./kampfsystem.js");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

class Game {
    constructor(term) {
        this.term = term;
        this.player = null;
        this.locations = locations;
        this.objects = items;
    }

    startGameWithClassSelection() {
        term.clear();
        term.cyan("Hallo, Fremdling, du hast mich erschreckt!!\n");
        term.cyan("Wie ist dein Name?\n");
        rl.question("", (name) => {
            this.player = new Player(name);
            term.clear();
            term.cyan(
                `Willkommen, ${this.player.name}! Teile uns doch mit,\nin welchem Handwerk du besonders bewandert bist!!\n`
            );
            this.displayClassMenu();
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

    move(direction) {
        move.call(direction);
    }

    lookAround() {
        lookAround.call(this);
    }

    moveMenu() {
        moveMenu.call(this);
    }

    startGame() {
        this.displayLocation(this.player.currentLocation);
        this.displayMenu(); // Menü anzeigen
    }
}
const game = new Game(term);
game.startGameWithClassSelection();
