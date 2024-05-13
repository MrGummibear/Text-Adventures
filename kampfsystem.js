const term = require("terminal-kit").terminal;
const { normalEnemys, endEnemys } = require("./enemy.js");
const { Paladin, Mage, Waldläufer } = require("./klassen.js");

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
                break;
            case "Mage":
                const mage = new Mage(this.name);
                this.hp = mage.hp;
                this.attack = mage.attack;
                this.defense = mage.defense;
                this.abilities = mage.abilities;
                break;
            case "Waldläufer":
                const waldläufer = new Waldläufer(this.name);
                this.hp = waldläufer.hp;
                this.attack = waldläufer.attack;
                this.defense = waldläufer.defense;
                this.abilities = waldläufer.abilities;
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

function performEnemyAttack(enemy, player) {
    // Wähle eine zufällige Fähigkeit des Gegners aus
    const randomIndex = Math.floor(Math.random() * enemy.abilities.length);
    const ability = enemy.abilities[randomIndex];
    const damage = ability.damage;

    // Führe den Angriff aus und aktualisiere die Spieler-HP
    player.takeDamage(damage);
}

async function startCombat(player, enemy) {
    term(`^Y!!! ^RDer Kampf beginnt ^Y!!!\n^BDein Gegner: ^Y${enemy.name}\n`);

    while (player.hp > 0 && enemy.hp > 0) {
        // Spieler wählt eine Fähigkeit
        const abilityIndex = await player.chooseAbility();
        const ability = player.abilities[abilityIndex];
        const playerDamage = ability.damage;

        // Gegner greift an
        performEnemyAttack(enemy, player);

        // Anzeige von Kampfaktionen
        term(
            `\n^Y${player.name} greift an mit ^B${ability.name} ^Yund verursacht ^R${playerDamage} ^YSchaden.\n`
        );
        term(
            `^B${enemy.name} greift an mit ^Y${ability.name} ^Bund verursacht ^R${ability.damage} ^BSchaden.\n`
        );

        // Überprüfen, ob jemand besiegt wurde
        if (player.hp <= 0) {
            term.red("\nDu wurdest besiegt!\n");
        } else if (enemy.hp <= 0) {
            term.green("\nDu hast den Gegner besiegt!\n");
        }
    }
}

const player = new Player("Max", "Paladin");
player.setClassStats();

const normalEnemysKeys = Object.keys(normalEnemys);
const randomIndex = Math.floor(Math.random() * normalEnemysKeys.length);
const randomEnemyKey = normalEnemysKeys[randomIndex];
const randomEnemy = normalEnemys[randomEnemyKey];

startCombat(player, randomEnemy);
