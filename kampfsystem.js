const term = require("terminal-kit").terminal;
const { normalEnemys, endEnemys } = require("./enemy.js");
const { Paladin, Mage, Waldläufer } = require("./klassen.js");
const locations = require("./locations.js");
const displayMenu = require("./main.js");

function getRandomWeightedIndex(weights) {
    const totalWeight = weights.reduce((acc, val) => acc + val, 0);
    const random = Math.random() * totalWeight;
    let sum = 0;

    for (let i = 0; i < weights.length; i++) {
        sum += weights[i];
        if (random < sum) {
            return i;
        }
    }

    return -1;
}

class Player {
    constructor(name, characterClass) {
        this.name = name;
        this.characterClass = characterClass;
        this.hp = 0;
        this.attack = 0;
        this.defense = 0;
        this.abilities = [];
    }

    setClassStats() {
        // Setze die Werte basierend auf der Klasse
        switch (this.characterClass) {
            case "Paladin":
                const paladin = new Paladin(this.name);
                this.hp = paladin.hp;
                this.attack = paladin.attack;
                this.defense = paladin.defense;
                this.abilities = paladin.abilities;
                this.damage = paladin.damage;
                break;
            case "Mage":
                const mage = new Mage(this.name);
                this.hp = mage.hp;
                this.attack = mage.attack;
                this.defense = mage.defense;
                this.abilities = mage.abilities;
                this.damage = mage.damage;
                break;
            case "Waldläufer":
                const waldläufer = new Waldläufer(this.name);
                this.hp = waldläufer.hp;
                this.attack = waldläufer.attack;
                this.defense = waldläufer.defense;
                this.abilities = waldläufer.abilities;
                this.damage = waldläufer.damage;
                break;
            default:
                break;
        }
    }

    chooseAbility() {
        // Menü für die Auswahl der Fähigkeiten
        const abilitiesMenu = this.abilities.map((ability, index) => {
            return ability.name;
        });

        return new Promise((resolve, reject) => {
            term.singleColumnMenu(abilitiesMenu, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response.selectedIndex);
                }
            });
        });
    }

    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp < 0) {
            this.hp = 0;
        }
    }
}

function performEnemyAttack(enemy) {
    // Wähle eine zufällige Fähigkeit des Gegners aus
    const randomIndex = Math.floor(Math.random() * enemy.abilities.length);
    const ability = enemy.abilities[randomIndex];
    const damage = ability.damage;
}

startCombat();
async function startCombat(player, enemy) {
    const enemyKeys = Object.keys(normalEnemys);
    const totalEnemies = enemyKeys.length;

    // Berechne die Wahrscheinlichkeiten für die Auswahl eines Gegners
    const probabilities = enemyKeys.map((enemy) => {
        const hp = normalEnemys[enemy].hp;
        // Setze die Wahrscheinlichkeit basierend auf der HP
        // Hier könntest du die Logik anpassen, um die Wahrscheinlichkeiten entsprechend deiner Anforderungen zu definieren
        return hp < 550 ? 0.6 : 0.4;
    });

    // Wähle einen zufälligen Index basierend auf den Wahrscheinlichkeiten
    const randomIndex = getRandomWeightedIndex(probabilities);
    const randomEnemy = enemyKeys[randomIndex];

    term(
        `^Y!!! ^RDer Kampf beginnt ^Y!!!\n^BDein Gegner: ^Y${randomEnemy.name}\n`
    );

    // Speichere den ursprünglichen HP-Wert des Spielers
    const originalPlayerHP = Player.hp;
    const originalEnemyHP = randomEnemy.hp;

    while (Player.hp > 0 && randomEnemy.hp > 0) {
        // Spieler wählt eine Fähigkeit
        const abilityIndex = await player.chooseAbility();
        const ability = player.abilities[abilityIndex];
        const playerDamage = ability.damage + player.attack;

        // Reduziere die HP des Gegners basierend auf dem Spielerangriff
        enemy.hp -= playerDamage;

        // Überprüfen, ob der Gegner besiegt wurde
        if (enemy.hp <= 0) {
            term.green("\nDu hast den Gegner besiegt!\n");
            break; // Beende die Schleife, da der Kampf vorbei ist
        }

        // Gegner greift an
        performEnemyAttack(enemy, player);

        // Berechne den Schaden, den der Gegner verursacht
        const enemyAbility =
            enemy.abilities[Math.floor(Math.random() * enemy.abilities.length)];
        const enemyDamage = enemyAbility.damage + enemy.attack;

        // Reduziere die HP des Spielers basierend auf dem Gegnerangriff
        player.takeDamage(enemyDamage);

        // Anzeige von Kampfaktionen
        term.clear();
        term(
            `\n^B${player.name} greift an mit ^Y${ability.name}^B:\n${ability.details} ^R${playerDamage} ^BSchaden.\n`
        );
        term(`^B${enemy.name} ^YHP: ^R${enemy.hp}/${originalEnemyHP}\n`);
        term(
            `^B${enemy.name} greift an mit ^Y${enemyAbility.name} ^Bund verursacht ^R${enemyDamage} ^BSchaden.\n`
        );

        // Anzeige des aktuellen und ursprünglichen HP-Werts des Spielers
        term(`^B${player.name} ^YHP: ^R${player.hp}/${originalPlayerHP}\n`);

        // Überprüfen, ob der Spieler besiegt wurde
        if (player.hp <= 0) {
            term.red("\nDu wurdest besiegt!\n");
        }
    }
}

const normalEnemysKeys = Object.keys(normalEnemys);
const randomIndex = Math.floor(Math.random() * normalEnemysKeys.length);
const randomEnemyKey = normalEnemysKeys[randomIndex];
const randomEnemy = normalEnemys[randomEnemyKey];

function startCombatAtLocation(location) {
    if (location && location.enemy) {
        const player = Player; // Spieler erstellen
        player.setClassStats();

        const enemyName = location.enemy;
        const enemy = randomEnemy[enemyName];

        term(`Ein Kampf beginnt hier: ${location.name}\n`);

        startCombat(player, enemy).then(() => {
            // Nach dem Kampf wieder das Hauptmenü anzeigen
            displayMenu();
        });
    } else {
        term("Diese Location hat keinen Gegner.\n");
    }
}

module.exports = startCombatAtLocation;
