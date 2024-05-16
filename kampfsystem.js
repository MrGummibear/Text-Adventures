const term = require("terminal-kit").terminal;
const { normalEnemys } = require("./enemy.js");
const locations = require("./locations.js");
const displayMenu = require("./main.js");

function getRandomEnemy() {
    const enemyKeys = Object.keys(normalEnemys); // Schlüssel (Namen) aller Gegner werden im Objekt normalEnemys in einem Array enemyKeys gespeichert.
    const randomIndex = Math.floor(Math.random() * enemyKeys.length); //  Zufallszahl zwischen 0 und der Anzahl der Gegner
    const randomEnemyKey = enemyKeys[randomIndex]; // zufällig erzeugten Index wird ein zufälliger Schlüssel (Name eines Gegners) aus dem Array enemyKeys ausgewählt.
    return normalEnemys[randomEnemyKey];
}

async function startCombat(currentPlayer) {
    const enemy = getRandomEnemy(); // wählt einen zufälligen Gegner aus einer Liste aus.
    term.clear();
    term(
        `^BEin ^YGegner ^Bstellt sich dir in den weg\n^BDein ^YGegner: ^R${enemy.name}\n^BDer ^RKampf ^Bbeginnt ^Y!!!\n`
    );

    let playerHP = currentPlayer.hp; // hp festlegen
    let enemyHP = enemy.hp; // hp festlegen

    while (playerHP > 0 && enemyHP > 0) {
        // Spieler wählt eine Fähigkeit
        const abilityIndex = await currentPlayer.chooseAbility(); // wartet auf Fähigkeiten auswahl
        const ability = currentPlayer.abilities[abilityIndex]; // speichert die gewählte Fähigkeit.
        const playerDamage = ability.damage + currentPlayer.attack; // schadens Berechnung

        enemyHP -= playerDamage; //verrringerung der HP durch berechneten schaden

        if (enemyHP <= 0) {
            //Wenn die Lebenspunkte des Gegners auf 0 oder weniger sinken,
            term.clear(); //wird der Bildschirm gelöscht und eine Nachricht angezeigt, dass der Gegner besiegt wurde.
            term("\n^BDu hast den ^RGegner ^Gbesiegt!\n");
            setTimeout(() => {
                displayMenu.displayMenu(); //Nach 2 Sekunden wird das displayMenu wieder angezeigt.
            }, 2000);
        }

        const enemyAbilityIndex = Math.floor(
            Math.random() * enemy.abilities.length //Der Gegner wählt zufällig eine seiner Fähigkeiten aus.
        );
        const enemyAbility = enemy.abilities[enemyAbilityIndex]; // speichert die gewählte Fähigkeit des Gegners
        const enemyDamage = enemyAbility.damage + enemy.attack; // schadens Berechnung

        playerHP -= enemyDamage; //verrringerung der HP durch berechneten schaden

        //aktuelle Zustand des Kampfes wird angezeigt
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
