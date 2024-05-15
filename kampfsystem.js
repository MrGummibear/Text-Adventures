const term = require("terminal-kit").terminal;
const { normalEnemys } = require("./enemy.js");
const locations = require("./locations.js");
const displayMenu = require("./main.js");

function getRandomEnemy() {
    const enemyKeys = Object.keys(normalEnemys); // Schlüssel (Namen) aller Gegner werden im Objekt normalEnemys in einem Array enemyKeys gespeichert.
    const randomIndex = Math.floor(Math.random() * enemyKeys.length); //  Zufallszahl zwischen 0 und der Anzahl der Gegner
    const randomEnemyKey = enemyKeys[randomIndex];
    return normalEnemys[randomEnemyKey];
}

async function startCombat(currentPlayer) {
    const enemy = getRandomEnemy();
    term.clear();
    term(
        `^BEin ^YGegner ^Bstellt sich dir in den weg\n^BDein ^YGegner: ^R${enemy.name}\n^BDer ^RKampf ^Bbeginnt ^Y!!!\n`
    );

    let playerHP = currentPlayer.hp;
    let enemyHP = enemy.hp;

    while (playerHP > 0 && enemyHP > 0) {
        // Spieler wählt eine Fähigkeit
        const abilityIndex = await currentPlayer.chooseAbility();
        const ability = currentPlayer.abilities[abilityIndex];
        const playerDamage = ability.damage + currentPlayer.attack;

        enemyHP -= playerDamage;

        if (enemyHP <= 0) {
            term.clear();
            term("\n^BDu hast den ^RGegner ^Gbesiegt!\n");
            setTimeout(() => {
                displayMenu.displayMenu();
            }, 2000);
        }

        const enemyAbilityIndex = Math.floor(
            Math.random() * enemy.abilities.length
        );
        const enemyAbility = enemy.abilities[enemyAbilityIndex];
        const enemyDamage = enemyAbility.damage + enemy.attack;

        playerHP -= enemyDamage;

        term.clear();
        term(
            `\n^B${currentPlayer.name} greift an mit ^Y${ability.name}^B:\n${ability.details} ^R${playerDamage} ^BSchaden.\n`
        );
        term(`^B${enemy.name} ^YHP: ^R${enemyHP}/${enemy.hp}\n`);
        term(
            `^B${enemy.name} greift an mit ^Y${enemyAbility.name} ^Bund verursacht ^R${enemyDamage} ^BSchaden.\n`
        );
        term(
            `^B${currentPlayer.name} ^YHP: ^R${playerHP}/${currentPlayer.hp}\n`
        );

        // Überprüfen, ob der Spieler besiegt wurde
        if (playerHP <= 0) {
            term.red("\nDu wurdest besiegt!\n");
        }
    }
}

module.exports = { startCombat: startCombat };
