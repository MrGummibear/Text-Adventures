const term = require("terminal-kit").terminal;

function move(direction) {
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

function lookAround() {
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
            term.green(`- ${direction}: ${this.locations[newLocation].name}\n`);
        } else {
            term.red(`- ${direction}: Blockiert\n`);
        }
    });

    term.singleColumnMenu(["Zurück"], (error, response) => {
        this.displayMenu();
    });
}

function moveMenu() {
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
            move.call(this, choice);
        }
    });
}

module.exports = {
    move: move,
    lookAround: lookAround,
    moveMenu: moveMenu,
};
