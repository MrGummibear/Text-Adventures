class Spinne {
    constructor() {
        this.hp = 300;
        this.attack = 10;
        this.defense = 5;
        this.abilities = [
            {
                name: "Biss",
                damage: 25,
                details: `Beißt dich mit ihren spitzen Zähnen und verursachst: ${this.damage} Schaden`,
            },
            {
                name: "Gift Faden",
                damage: 30,
                details: `Verschießt kleine giftige Fäden und verursachst: ${this.damage} Schaden`,
            },
            {
                name: "Spuck Ball",
                damage: 35,
                details: `Verschießt ein Gemisch aus Speichel und Fäden und verursachst: ${this.damage} Schaden`,
            },
        ];
        this.damage = this.attack + this.abilities[0].damage; // Beispiel: Zugriff auf den Schaden des ersten Angriffs
    }
}
class Kobold {
    constructor() {
        this.hp = 450;
        this.attack = 12;
        this.defense = 5;
        this.abilities = [
            {
                name: "Hieb",
                damage: 25,
                details: `Schlägt mit seinem Holzknüppel auf dich ein und verursachst: ${this.damage} Schaden`,
            },
            {
                name: "Sturmangriff",
                damage: 30,
                details: `Stürmt auf dich zu, schlägt mit seinem Holzknüppel sehr hart zu und verursachst: ${this.damage} Schaden`,
            },
            {
                name: "Kopfstoß",
                damage: 35,
                details: `Er packt dich an deinem schultern, versetzt dir einen mächtigen Kopfstoß und verursachst: ${this.damage} Schaden`,
            },
        ];
        this.damage = this.attack + this.abilities[0].damage; // Beispiel: Zugriff auf den Schaden des ersten Angriffs
    }
}
class Wildschwein {
    constructor() {
        this.hp = 400;
        this.attack = 11;
        this.defense = 5;
        this.abilities = [
            {
                name: "Hieb",
                damage: 25,
                details: `Schlägt mit seinen Hauern auf dich ein und verursachst: ${this.damage} Schaden`,
            },
            {
                name: "Sturmangriff",
                damage: 30,
                details: `Stürmt auf dich zu, schlägt mit seinen Hauern sehr hart zu und verursachst: ${this.damage} Schaden`,
            },
            {
                name: "Biss",
                damage: 35,
                details: `Beißt dich mit seinen Zähnen und verursachst: ${this.damage} Schaden`,
            },
        ];
        this.damage = this.attack + this.abilities[0].damage; // Beispiel: Zugriff auf den Schaden des ersten Angriffs
    }
}
class Wolf {
    constructor() {
        this.hp = 550;
        this.attack = 15;
        this.defense = 5;
        this.abilities = [
            {
                name: "Biss",
                damage: 30,
                details: `Beißt dich mit seinen Zähnen und verursachst: ${this.damage} Schaden`,
            },
            {
                name: "Klaue",
                damage: 35,
                details: `Greift dich mit seinen klauen an, fügt dir wunden zu und verursachst: ${this.damage} Schaden`,
            },
            {
                name: "Sprungangriff",
                damage: 40,
                details: `Springt auf dich zu, fügt dir mit dienen Klauen tiefe Wunden zu und verursachst: ${this.damage} Schaden`,
            },
        ];
        this.damage = this.attack + this.abilities[0].damage; // Beispiel: Zugriff auf den Schaden des ersten Angriffs
    }
}
class Oger {
    constructor() {
        this.hp = 600;
        this.attack = 17;
        this.defense = 5;
        this.abilities = [
            {
                name: "Hieb",
                damage: 35,
                details: `Schlägt mit seinem Holzknüppel auf dich ein und verursachst: ${this.damage} Schaden`,
            },
            {
                name: "Schultercheck",
                damage: 40,
                details: `Stürmt auf dich zu, rammt seine schulter gegen deinen Oberkörper und verursachst: ${this.damage} Schaden`,
            },
            {
                name: "Schwerer Hieb",
                damage: 45,
                details: `Schlägt mächtig mit seinem Holzknüppel auf dich ein und verursachst: ${this.damage} Schaden`,
            },
        ];
        this.damage = this.attack + this.abilities[0].damage; // Beispiel: Zugriff auf den Schaden des ersten Angriffs
    }
}
class Troll {
    constructor() {
        this.hp = 650;
        this.attack = 18;
        this.defense = 5;
        this.abilities = [
            {
                name: "Wurfaxt",
                damage: 35,
                details: `Wirft seine Axt nach dir und verursachst: ${this.damage} Schaden`,
            },
            {
                name: "Axthieb",
                damage: 40,
                details: `Schlägt mit seiner Axt zu und verursachst: ${this.damage} Schaden`,
            },
            {
                name: "Axt Kombo",
                damage: 45,
                details: `Schlägt schnell mehrfach mit der Axt zu und verursachst: ${this.damage} Schaden`,
            },
        ];
        this.damage = this.attack + this.abilities[0].damage; // Beispiel: Zugriff auf den Schaden des ersten Angriffs
    }
}
class Bär {
    constructor() {
        this.hp = 600;
        this.attack = 16;
        this.defense = 5;
        this.abilities = [
            {
                name: "Biss",
                damage: 30,
                details: `Beißt dich mit seinen Zähnen und verursachst: ${this.damage} Schaden`,
            },
            {
                name: "Pranke",
                damage: 40,
                details: `Greift dich mit seinen Pranke an, fügt dir wunden zu und verursachst: ${this.damage} Schaden`,
            },
            {
                name: "Schwerer Pranken Hieb",
                damage: 45,
                details: `Holt weit aus, um mit seinen schweren Pranken zuzuschlagen und verursachst: ${this.damage} Schaden`,
            },
        ];
        this.damage = this.attack + this.abilities[0].damage; // Beispiel: Zugriff auf den Schaden des ersten Angriffs
    }
}
class Urwalddrache {
    constructor() {
        this.hp = 900;
        this.attack = 8;
        this.defense = 5;
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
        ];
        // Die Schadens- und Heilungswerte können erst nach der Initialisierung der Fähigkeiten berechnet werden
        this.damage = this.attack + this.abilities[0].damage; // Beispiel: Zugriff auf den Schaden des ersten Angriffs
        this.heal = this.abilities[3].heal; // Beispiel: Zugriff auf die Heilung der letzten Fähigkeit
    }
}
class Wasserdrache {
    constructor() {
        this.hp = 900;
        this.attack = 8;
        this.defense = 5;
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
        ];
        // Die Schadens- und Heilungswerte können erst nach der Initialisierung der Fähigkeiten berechnet werden
        this.damage = this.attack + this.abilities[0].damage; // Beispiel: Zugriff auf den Schaden des ersten Angriffs
        this.heal = this.abilities[3].heal; // Beispiel: Zugriff auf die Heilung der letzten Fähigkeit
    }
}

module.exports = {
    Spinne,
    Kobold,
    Wildschwein,
    Wolf,
    Oger,
    Troll,
    Bär,
    Urwalddrache,
    Wasserdrache,
};
