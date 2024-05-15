const term = require("terminal-kit").terminal;

function move(direction) {
    // Diese Funktion bewegt den Spieler in eine bestimmte Richtung und überprüft, ob die neue Position gültig ist.
    const [row, col] = this.player.currentLocation.split("."); // enthält die aktuelle Position des Spielers im Format Reihe.Spalte (z.B. "i.3"). row und col werden getrennt.
    let newRow = row.charCodeAt(0); //  wird in einen ASCII-Wert umgewandelt (ASCII-Wert ist eine numerische Repräsentation eines Zeichens z.b A = 65, B = 66,)
    let newCol = parseInt(col); //  wird in eine Zahl umgewandelt

    if (direction === "gehe nach norden") {
        newCol--; // Norden: newCol wird um 1 verringert.
    } else if (direction === "gehe nach süden") {
        newCol++; // Süden: newCol wird um 1 erhöht.
    } else if (direction === "gehe nach osten") {
        newRow++; // Osten: newRow wird um 1 erhöht.
    } else if (direction === "gehe nach westen") {
        newRow--; // Westen: newRow wird um 1 verringert.
    }

    const newLocation = `${String.fromCharCode(newRow)}.${newCol}`; // wandelt den numerischen ASCII-Wert zurück in das entsprechende Zeichen

    if (this.locations[newLocation]) {
        // Wenn die neue Position gültig ist (this.locations[newLocation] existiert)
        this.player.currentLocation = newLocation; // Die Position des Spielers wird aktualisiert.
        this.displayLocation(newLocation); // Die neue Position wird angezeigt
        if (this.locations[newLocation].chest) {
            // Wenn an der neuen Position eine Truhe (chest) vorhanden ist:
            const choiceItems = ["Aufschließen", "Weitermachen"];
            term.singleColumnMenu(choiceItems, (error, response) => {
                //Es wird ein Menü angezeigt, in dem der Spieler wählen kann,
                if (response.selectedText === "Aufschließen") {
                    // ob er die Truhe öffnen oder weitermachen möchte.
                    this.openChest(newLocation);
                } else {
                    this.displayMenu(); // Je nach Auswahl wird die Truhe geöffnet oder das Menü angezeigt.
                }
            });
        } else {
            this.displayMenu(); // Wenn keine Truhe vorhanden ist, wird direkt das Menü angezeigt.
        }
    } else {
        // Wenn die neue Position nicht gültig ist
        term.clear();
        term.red(`Der Weg ist blockiert. Bitte wähle einen anderen!\n`); // Eine Fehlermeldung wird angezeigt, dass der Weg blockiert ist.
        setTimeout(() => {
            this.displayMenu();
        }, 2000); // Nach einer Verzögerung von 2000 Millisekunden (2 Sekunden) wird das Menü angezeigt.
    }
}

function lookAround() {
    // Diese Funktion zeigt an, was sich in den vier Himmelsrichtungen um den Spieler herum befindet.
    const currentLocation = this.player.currentLocation; //Aktuelle Position des Spielers ermitteln
    const directions = ["Norden", "Osten", "Süden", "Westen"];
    term.clear();
    term.cyan("Du siehst dich um und siehst:\n");

    directions.forEach((direction) => {
        // Positionen in alle Richtungen berechnen und anzeigen:
        const [row, col] = currentLocation.split("."); // enthält die aktuelle Position des Spielers im Format Reihe.Spalte (z.B. "i.3"). row und col werden getrennt.
        let newRow = row.charCodeAt(0); //  wird in einen ASCII-Wert umgewandelt (ASCII-Wert ist eine numerische Repräsentation eines Zeichens z.b A = 65, B = 66,)
        let newCol = parseInt(col); //  wird in eine Zahl umgewandelt

        if (direction === "Norden") {
            newCol--; // Norden: newCol wird um 1 verringert.
        } else if (direction === "Süden") {
            newCol++; // Süden: newCol wird um 1 erhöht.
        } else if (direction === "Osten") {
            newRow++; // Osten: newRow wird um 1 erhöht.
        } else if (direction === "Westen") {
            newRow--; // Westen: newRow wird um 1 verringert.
        }

        const newLocation = `${String.fromCharCode(newRow)}.${newCol}`; // wandelt den numerischen ASCII-Wert zurück in das entsprechende Zeichen

        if (this.locations[newLocation]) {
            term.green(`- ${direction}: ${this.locations[newLocation].name}\n`); // Wenn die neue Position gültig ist und ein weg exestiert
        } else {
            term.red(`- ${direction}: Blockiert\n`); // Wenn die neue Position ungültig ist und kein weg exestiert
        }
    });

    term.singleColumnMenu(["Zurück"], (error, response) => {
        // menü mit zurück button um zurück zum displayMenu zu kommen
        this.displayMenu();
    });
}

function moveMenu() {
    // Diese Funktion zeigt ein Menü an, in dem der Spieler eine Richtung wählen kann, um sich zu bewegen.
    const direction = [
        // Die möglichen Bewegungsrichtungen und die Option "zurück" werden im Menü angezeigt.
        `gehe nach norden`,
        "gehe nach osten",
        "gehe nach süden",
        "gehe nach westen",
        "zurück",
    ];
    term.clear();
    term.singleColumnMenu(direction, (error, response) => {
        const choice = response.selectedText.trim();
        if (choice === "zurück") {
            this.displayMenu(); // Wenn "zurück" gewählt wird, wird das Hauptmenü angezeigt.
        } else {
            move.call(this, choice); // Wenn eine Richtung gewählt wird, wird die move-Funktion aufgerufen, um den Spieler in diese Richtung zu bewegen.
        }
    });
}

module.exports = {
    move: move,
    lookAround: lookAround,
    moveMenu: moveMenu,
};
