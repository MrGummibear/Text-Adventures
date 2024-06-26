const term = require("terminal-kit").terminal;
const readline = require("readline");
const { Paladin, Mage, Waldläufer, Player } = require("./klassen.js");
const locations = require("./locations.js");
const items = require("./items.js");
const { move, lookAround, moveMenu } = require("./movesystem.js");
const { startCombat } = require("./kampfsystem.js");

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
        this.moveCounter = 1;
    }

    startGameWithClassSelection() {
        term.clear();
        term.cyan(`^BHallo, ^YFremdling^B, du hast mich ^Rerschreckt!!\n`);
        term.cyan(`^BWie ist dein ^YName?\n`);
        rl.question("", (name) => {
            this.player = new Player(name);
            term.clear();
            term.cyan(
                `^GWillkommen, ^Y${this.player.name}! ^BTeile uns doch mit,\nin welchem ^YHandwerk ^Bdu besonders bewandert bist!!\n`
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
        term.cyan(
            `^GWillkommen ^Bim Dorf der ^YAnfänge^B, ${this.player.name}!\n`
        );
        term.cyan(`^BMöchtest du deine ^YReise ^Bbeginnen?`);
        term.singleColumnMenu(["Ja", "Nein"], (error, response) => {
            if (response.selectedText.trim() === "Ja") {
                term.clear();
                term.cyan(`Viel Erfolg auf deinen Reisen!\n`);
                this.startGame();
            } else {
                term.cyan(`Bis bald!\n`);
                process.exit();
            }
        });
    }

    displayLocation() {
        term.clear();
        term.blue(this.locations[this.player.currentLocation].entry + "\n");
        if (this.locations[this.player.currentLocation].chest) {
            term(`^Bund entdeckst eine ^YTruhe!\n`);
        }
    }

    openChest() {
        const chestContents =
            this.locations[this.player.currentLocation].chest.contents;
        term(`\n^BDu ^Möffnest ^Bdie ^YTruhe ^Bund findest:\n`);
        chestContents.forEach((item) => {
            term.green(`- ${item.name}\n`);
        });
        term("\n");
        term.singleColumnMenu(["Einpacken"], (error, response) => {
            if (response.selectedText.trim() === "Einpacken") {
                term.clear();
                term.cyan(
                    `^YGegenstände ^Bwurden in dein ^CInventar ^Bgepackt\n`
                );
                this.player.inventory.push(...chestContents);
                this.displayMenu();
            }
        });
    }

    displayMenu() {
        const options = ["Inventar", "Umsehen", "Bewegen"];
        term.clear();
        term(
            `^YStandort: ^B${
                this.locations[this.player.currentLocation].entry
            }\n`
        );
        //term.green(this.moveCounter);
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

    displayInventory() {
        term.clear();
        const playerInv = this.player.inventory.map((item) => item.name);
        console.log("Benutze etwas ... ");
        const options = ["zurück"];
        //console.log(this.player.inventory);
        term.singleColumnMenu([...playerInv, ...options], (error, response) => {
            const choice = response.selectedText.trim();
            if (choice === "zurück") {
                this.displayMenu();
            } else {
                const x = this.player.inventory.filter(
                    (item) => item.name == choice
                );
                console.log("xxx ", this.player);
                if (x[0]?.atk > 0) {
                    this.startItem = x;
                } else if (x[0]?.hp > 0) {
                    this.player.hp += x[0].hp;
                }
                console.log(this.player);
            }
        });
    }

    move(direction) {
        move.call(this, direction);
    }

    lookAround() {
        lookAround.call(this);
    }

    moveMenu() {
        this.moveCounter += Math.floor(Math.random() * 3) + 1;
        const noCombatPositions = ["i.2", "i.3", "i.4"];
        if (
            this.moveCounter >= 10 &&
            !noCombatPositions.includes(this.player.currentLocation)
        ) {
            startCombat(this.player);
            this.moveCounter = 1;
        } else {
            moveMenu.call(this);
        }
    }

    startGame() {
        this.displayLocation();
        this.displayMenu();
    }
}

const game = new Game(term);
game.startGameWithClassSelection();

module.exports.displayMenu = game.displayMenu.bind(game);
