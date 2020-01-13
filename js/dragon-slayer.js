'use strict'; // Mode strict du JavaScript

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/

var game = {};

const EASY_LEVEL = 1;
const MEDIUM_LEVEL = 2;
const HARD_LEVEL = 3;

const PLAYER = "player";
const DRAGON = "dragon";
/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/



function throwDice(throws, sides) {
    var somme = 0;

    for (var i = 0; i < throws; i++) {
        somme += randomNumber(1, sides);
    }


    return somme;
}

function init() {
    game.round = 0;
    game.difficulte = demanderUnEntier(
        "donnez la difficulté\n" +
        "1- facile 2-moyen 3-difficile",
        1,
        3
    )

    switch (game.difficulte) {
        case EASY_LEVEL:
            game.pvPlayer = 100 + throwDice(10, 10)
            game.pvDragon = 100 + throwDice(5, 10)
            break;
        case MEDIUM_LEVEL:
            game.pvPlayer = 100 + throwDice(10, 10)
            game.pvDragon = 100 + throwDice(10, 10)
            break;
        case HARD_LEVEL:
            game.pvPlayer = 100 + throwDice(7, 10)
            game.pvDragon = 100 + throwDice(10, 10)
            break;

        default:
            break;
    }
    // AFFICHAGE 

}


function affichageInit() {

    document.write(`<li class='game-state'>
    <figure>
    <img src='images/knight.png' alt='Chevalier'>
    <figcaption>` + game.pvPlayer + ` PV</figcaption>
    </figure>
         <figure>
             <img src="images/dragon.png" alt="Dragon">
             <figcaption>` + game.pvDragon + ` PV</figcaption>
    </figure>
</li>`)
}

function initiative() {
    var player;
    var dragon;
    do {
        player = throwDice(10, 6);
        dragon = throwDice(10, 6);
        if (player > dragon) {
            return PLAYER
        } else {
            return DRAGON;
        }
    } while (player == dragon)
}

function attackPlayer() {
    var ptDamage = throwDice(3, 6);
    switch (game.difficulte) {
        case EASY_LEVEL:
            ptDamage += Math.round(ptDamage * (throwDice(2, 6) / 100))
            break;
        case HARD_LEVEL:
            ptDamage -= Math.round(ptDamage * (throwDice(1, 6) / 100))
            break;

    }
    game.pvDragon -= ptDamage;
    return ptDamage;
}

function attackDragon() {
    var ptDamage = throwDice(3, 6);
    switch (game.difficulte) {
        case EASY_LEVEL:
            ptDamage -= Math.round(ptDamage * (throwDice(2, 6) / 100))
            break;
        case HARD_LEVEL:
            ptDamage += Math.round(ptDamage * (throwDice(1, 6) / 100))
            break;

    }
    game.pvPlayer -= ptDamage;
    return ptDamage;
}


function loop() {
    var attacker;
    var ptDamage;

    while (game.pvDragon > 0 && game.pvPlayer > 0) {
        attacker = initiative();
        if (attacker == PLAYER) {
            ptDamage = attackPlayer()

        } else {
            // dans le cas ou l'initiative est au dragon
            ptDamage = attackDragon()

        }
        game.round++;
        affichageRound(ptDamage, attacker)
    }

    // AFFICHAGE DU Résultat
}

function affichageRound(damage, attacker) {
    var message, image, classe;

    if (attacker == PLAYER) {
        classe = "player-attacks"
        image = "<img src='images/knight-winner.png' alt='chevalier'>"
        message = "Vous êtes le plus rapide, vous attaquez le dragon et lui infligez"
    } else {
        classe = "dragon-attacks"
        image = "<img src='images/dragon-winner.png' alt='dragon'>"
        message = "Le dragon prend l'initiative, vous attaque et vous inflige";
    }

    document.write(`<li class="round-log ` + classe + `">
                        <h2 class="subtitle">Tour n°` + game.round + `</h2>
                        ` + image + `
                        <p>` + message + ` ` + damage + ` points de dommage !</p>
                    </li>

                    <!-- Etat du jeu -->
                    <li class="game-state">
                        <figure>
                            <img src="images/knight.png" alt="Chevalier"><figcaption>`)
    if (game.pvPlayer <= 0) {
        document.write('GAME OVER')
    } else {
        document.write(+game.pvPlayer + " PV")
    }
    document.write(`</figcaption></figure>
                        <figure>
                            <img src="images/dragon.png" alt="Dragon">
                            <figcaption>`)
    if (game.pvDragon <= 0) {
        document.write('GAME OVER')
    } else {
        document.write(+game.pvDragon + " PV")
    }
    document.write(`</figcaption>
                        </figure>
                    </li>`)
}

function affichageGameOver() {
    var message, image;
    if (game.pvPlayer > 0) {
        image = `<img src="images/knight-winner.png" alt="Player">`
        message = "Vous avez gagné, vous êtes un OUF"
    } else {
        image = `<img src="images/dragon-winner.png" alt="Dragon">`
        message = "Vous avez perdu le combat, le dragon vous a carbonisé !"
    }
    document.write(`<li class="game-end">
                        <p class="title">Fin de la partie</p>
                        <p>` + message + `</p>
                        ` + image + `
                    </li>`)
}

function playDragonSlayer() {
    init();
    affichageInit();
    loop();
    affichageGameOver()
}

/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/

playDragonSlayer();