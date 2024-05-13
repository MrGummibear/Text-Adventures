const normalEnemys = {
    Spinne: {
        name: "Spinne",
        hp: 300,
        attack: 10,
        defense: 5,
        abilities: [
            {
                name: "Biss",
                damage: 25,
                details:
                    "Beißt dich mit ihren spitzen Zähnen und verursacht: 25 Schaden",
            },
            {
                name: "Gift Faden",
                damage: 30,
                details:
                    "Verschießt kleine giftige Fäden und verursacht: 30 Schaden",
            },
            {
                name: "Spuck Ball",
                damage: 35,
                details:
                    "Verschießt ein Gemisch aus Speichel und Fäden und verursacht: 35 Schaden",
            },
        ],
    },
    Kobold: {
        name: "Kobold",
        hp: 450,
        attack: 12,
        defense: 5,
        abilities: [
            {
                name: "Hieb",
                damage: 25,
                details:
                    "Schlägt mit seinem Holzknüppel auf dich ein und verursacht: 25 Schaden",
            },
            {
                name: "Sturmangriff",
                damage: 30,
                details:
                    "Stürmt auf dich zu, schlägt mit seinem Holzknüppel sehr hart zu und verursacht: 30 Schaden",
            },
            {
                name: "Kopfstoß",
                damage: 35,
                details:
                    "Er packt dich an deinem Schultern, versetzt dir einen mächtigen Kopfstoß und verursacht: 35 Schaden",
            },
        ],
    },
    Wildschwein: {
        name: "Wildschwein",
        hp: 400,
        attack: 11,
        defense: 5,
        abilities: [
            {
                name: "Hieb",
                damage: 25,
                details:
                    "Schlägt mit seinen Hauern auf dich ein und verursacht: 25 Schaden",
            },
            {
                name: "Sturmangriff",
                damage: 30,
                details:
                    "Stürmt auf dich zu, schlägt mit seinen Hauern sehr hart zu und verursacht: 30 Schaden",
            },
            {
                name: "Biss",
                damage: 35,
                details:
                    "Beißt dich mit seinen Zähnen und verursacht: 35 Schaden",
            },
        ],
    },
    Wolf: {
        name: "Wolf",
        hp: 550,
        attack: 15,
        defense: 5,
        abilities: [
            {
                name: "Biss",
                damage: 30,
                details:
                    "Beißt dich mit seinen Zähnen und verursacht: 30 Schaden",
            },
            {
                name: "Klaue",
                damage: 35,
                details:
                    "Greift dich mit seinen Klauen an, fügt dir Wunden zu und verursacht: 35 Schaden",
            },
            {
                name: "Sprungangriff",
                damage: 40,
                details:
                    "Springt auf dich zu, fügt dir mit seinen Klauen tiefe Wunden zu und verursacht: 40 Schaden",
            },
        ],
    },
    Oger: {
        name: "Oger",
        hp: 600,
        attack: 17,
        defense: 5,
        abilities: [
            {
                name: "Hieb",
                damage: 35,
                details:
                    "Schlägt mit seinem Holzknüppel auf dich ein und verursacht: 35 Schaden",
            },
            {
                name: "Schultercheck",
                damage: 40,
                details:
                    "Stürmt auf dich zu, rammt seine Schulter gegen deinen Oberkörper und verursacht: 40 Schaden",
            },
            {
                name: "Schwerer Hieb",
                damage: 45,
                details:
                    "Schlägt mächtig mit seinem Holzknüppel auf dich ein und verursacht: 45 Schaden",
            },
        ],
    },
    Troll: {
        name: "Troll",
        hp: 650,
        attack: 18,
        defense: 5,
        abilities: [
            {
                name: "Wurfaxt",
                damage: 35,
                details: "Wirft seine Axt nach dir und verursacht: 35 Schaden",
            },
            {
                name: "Axthieb",
                damage: 40,
                details: "Schlägt mit seiner Axt zu und verursacht: 40 Schaden",
            },
            {
                name: "Axt Kombo",
                damage: 45,
                details:
                    "Schlägt schnell mehrfach mit der Axt zu und verursacht: 45 Schaden",
            },
        ],
    },
    Bär: {
        name: "Bär",
        hp: 600,
        attack: 16,
        defense: 5,
        abilities: [
            {
                name: "Biss",
                damage: 30,
                details:
                    "Beißt dich mit seinen Zähnen und verursacht: 30 Schaden",
            },
            {
                name: "Pranke",
                damage: 40,
                details:
                    "Greift dich mit seinen Pranke an, fügt dir Wunden zu und verursacht: 40 Schaden",
            },
            {
                name: "Schwerer Pranken Hieb",
                damage: 45,
                details:
                    "Holt weit aus, um mit seinen schweren Pranken zuzuschlagen und verursacht: 45 Schaden",
            },
        ],
    },
};

const endEnemys = {
    Wasserdrache: {
        name: "Wasserdrache",
        hp: 800,
        attack: 8,
        defense: 5,
        abilities: [
            {
                name: "Kreuzfahrerhieb",
                damage: 50,
                details:
                    "Umhüllt die Waffe mit heiliger Kraft, schlägt dann zu und verursacht: 50 Schaden",
            },
            {
                name: "Göttlicher Angriff",
                damage: 50,
                details:
                    "Bündelt seine heilige Kraft in einem Stahl, entfesselt diesen auf seinen Gegner und verursacht: 50 Schaden",
            },
            {
                name: "Göttliches Urteil",
                damage: 50,
                details:
                    "Bringt die Schandtaten des Gegners hervor und verursacht: 50 Schaden",
            },
        ],
    },
    Urwalddrache: {
        name: "Urwalddrache",
        hp: 800,
        attack: 8,
        defense: 5,
        abilities: [
            {
                name: "Kreuzfahrerhieb",
                damage: 50,
                details:
                    "Umhüllt die Waffe mit heiliger Kraft, schlägt dann zu und verursacht: 50 Schaden",
            },
            {
                name: "Göttlicher Angriff",
                damage: 50,
                details:
                    "Bündelt seine heilige Kraft in einem Stahl, entfesselt diesen auf seinen Gegner und verursacht: 50 Schaden",
            },
            {
                name: "Göttliches Urteil",
                damage: 50,
                details:
                    "Bringt die Schandtaten des Gegners hervor und verursacht: 50 Schaden",
            },
        ],
    },
};

module.exports = { normalEnemys, endEnemys };
