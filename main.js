const term = require("terminal-kit").terminal;
const readline = require("readline");
const { Paladin, Mage, Waldläufer, Player } = require("./klassen.js");
const { normalEnemys, endEnemys } = require("./enemy.js");
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
            term.green(`- ${item.name}\n`);
        });
        term("\n");
        term.singleColumnMenu(["Einpacken"], (error, response) => {
            if (response.selectedText.trim() === "Einpacken") {
                term.clear();
                term.cyan(`Gegenstände wurden in dein Inventar gepackt\n`);
                this.displayMenu();
                this.player.inventory.push(...chestContents);
            }
        });
    }

    displayMenu() {
        const options = ["Inventar", "Umsehen", "Bewegen"];
        term.clear();
        term.cyan(
            `Standort: ${this.locations[this.player.currentLocation].entery}\n`
        );
        term.green(this.moveCounter);
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

   const playerInv =  this.player.inventory.map((item) => item.name)
        console.log( "Benutze etwas ... " )
        const options = ["zurück"];
        console.log( this.player.inventory)
        term.singleColumnMenu(
            [...playerInv, ...options],
            (error, response) => {
              //  console.log("xxx ",response);
                const choice = response.selectedText.trim();
                if (choice === "zurück") {
                    this.displayMenu();
                } else {
                   const x =  this.player.inventory.filter((item) => {
                        return item.name == choice
                   })
                    console.log("xxx ",  this.player);
                    if(x[0]?.atk > 0) {
                        //console.info("waffe")
                        this.startItem = x
                    } else if(x[0]?.hp > 0) {
                       // console.info("heil")
                        this.player.hp = this.player.hp + x[0].hp
                    }
                    console.log(this.player);

                }
            }
        );
    }


    move(direction) {
        move.call(direction);
    }

    startCombat() {
        startCombat.call(this);
    }

    lookAround() {
        lookAround.call(this);
    }

    moveMenu() {
        this.moveCounter += Math.floor(Math.random() * 3) + 1;
        if (this.moveCounter >= 10) {
            startCombat(this.player);
        } else {
            moveMenu.call(this);
        }
    }

    startGame() {
        this.displayLocation(this.player.currentLocation);
        this.displayMenu();
    }
}
const game = new Game(term);
game.startGameWithClassSelection();

module.exports.displayMenu = game.displayMenu;
