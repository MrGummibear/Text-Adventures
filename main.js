const term = require("terminal-kit").terminal;
const readline = require("readline");
const { Paladin, Mage, Waldläufer, Player } = require("./klassen.js");
const locations = require("./locations.js");
const items = require("./items.js");
const { move, lookAround, moveMenu } = require("./movesystem.js");
const { startCombat } = require("./kampfsystem.js");

const rl = readline.createInterface({
    input: process.stdin, //  Kommandozeile Eingegeben / stdin = (standard input stream)
    output: process.stdout, // Kommandozeile Ausgabe / stddout = (standard output stream)
});

class Game {
    constructor(term) {
        this.term = term;
        this.player = null; // Den aktuellen Spieler, der anfänglich auf null gesetzt ist.
        this.locations = locations; //  Die Orte im Spiel.
        this.objects = items; //  Die Gegenstände im Spiel.
        this.moveCounter = 1; // Einen Zähler für die Anzahl der Bewegungen. counter für kampf system.
    }

    startGameWithClassSelection() {
        term.clear();
        term.cyan(`^BHallo, ^YFremdling^B, du hast mich ^Rerschreckt!!\n`);
        term.cyan(`^BWie ist dein ^YName?\n`);
        rl.question("", (name) => {
            // Fragt den Spieler nach seinem Namen und erstellt ein neues Player-Objekt.
            this.player = new Player(name);
            term.clear();
            term.cyan(
                // Zeigt eine Begrüßungsnachricht
                `^GWillkommen, ^Y${this.player.name}! ^BTeile uns doch mit,\nin welchem ^YHandwerk ^Bdu besonders bewandert bist!!\n`
            );
            this.displayClassMenu(); // Ruft displayClassMenu auf, um die Auswahl der Spielerklasse anzuzeigen.
        });
    }

    displayClassMenu() {
        // Zeigt ein Menü zur Auswahl der Spielerklasse an.
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
            } // Je nach Auswahl wird ein entsprechendes Spielerobjekt (Paladin, Mage, Waldläufer) erstellt.
            term.clear();
            this.confirmStart(); // Ruft confirmStart auf, um das Spiel zu starten.
        });
    }

    confirmStart() {
        term.clear();
        term.cyan(
            `^GWillkommen ^Bim Dorf der ^YAnfänge^B, ${this.player.name}!\n`
        ); //Begrüßt den Spieler im Dorf der Anfänge.
        term.cyan(`^BMöchtest du deine ^YReise ^Bbeginnen?`); // Fragt den Spieler, ob er seine Reise beginnen möchte.
        term.singleColumnMenu(["Ja", "Nein"], (error, response) => {
            // Wenn ja, startet das Spiel, andernfalls wird das Spiel beendet.
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
        term.blue(this.locations[this.player.currentLocation].entry + "\n"); // Zeigt die aktuelle Position des Spielers an.
        if (this.locations[this.player.currentLocation].chest) {
            term(`^Bund entdeckst eine ^YTruhe!\n`); // Wenn an der Position eine Truhe vorhanden ist, wird eine Nachricht angezeigt.
        }
    }

    openChest() {
        const chestContents =
            this.locations[this.player.currentLocation].chest.contents;
        term.clear();
        term(`\n^BDu ^Möffnest ^Bdie ^YTruhe ^Bund findest:\n`);
        chestContents.forEach((item) => {
            // Öffnet eine Truhe und zeigt deren Inhalt an.
            term.green(`- ${item.name}\n`);
        });
        term("\n");
        term.singleColumnMenu(["Einpacken"], (error, response) => {
            // Fügt die Gegenstände dem Inventar des Spielers hinzu, wenn dieser "Einpacken" wählt.
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
        // Zeigt ein Menü mit den Optionen "Inventar", "Umsehen" und "Bewegen" an.
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
        }); // Je nach Auswahl wird die entsprechende Methode (displayInventory, lookAround, moveMenu) aufgerufen.
    }

    displayInventory() {
        // Zeigt das Inventar des Spielers an.
        term.clear();
        const playerInv = this.player.inventory.map((item) => item.name);
        console.log("Benutze etwas ... ");
        const options = ["zurück"];
        //console.log(this.player.inventory);
        term.singleColumnMenu([...playerInv, ...options], (error, response) => {
            // Erlaubt dem Spieler, Gegenstände zu benutzen oder zurück zum Menü zu gehen.
            const choice = response.selectedText.trim();
            if (choice === "zurück") {
                this.displayMenu();
            } else {
                const x = this.player.inventory.filter(
                    (item) => item.name == choice
                );
                // console.log("xxx ", this.player);
                if (x[0]?.atk > 0) {
                    // Wenn der gewählte Gegenstand Angriff (atk) oder Lebenspunkte (hp) erhöht, wird dies entsprechend angepasst.
                    this.startItem = x;
                } else if (x[0]?.hp > 0) {
                    this.player.hp += x[0].hp;
                }
                console.log(this.player);
            }
        });
    }

    move(direction) {
        move.call(this, direction); // Ruft die move-Funktion mit der angegebenen Richtung auf, um den Spieler zu bewegen.
    }

    lookAround() {
        lookAround.call(this); // Ruft die lookAround-Funktion auf, um die Umgebung des Spielers anzuzeigen.
    }

    moveMenu() {
        // Zeigt ein Menü zur Bewegungsrichtung an.
        this.moveCounter += Math.floor(Math.random() * 3) + 1;
        const noCombatPositions = ["i.2", "i.3", "i.4"];
        if (
            // Zählt die Bewegungen und startet einen Kampf, wenn der Zähler 10 erreicht und der Spieler nicht in einer kampffreien Zone ist.
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
        // Zeigt die aktuelle Position des Spielers an und zeigt dann das Hauptmenü.
        this.displayLocation();
        this.displayMenu();
    }
}

const game = new Game(term);
game.startGameWithClassSelection(); // Erstellt ein neues Game-Objekt und startet das Spiel mit der Klassenauswahl.

module.exports.displayMenu = game.displayMenu.bind(game);
