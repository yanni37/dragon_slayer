'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* *********************************** FONCTIONS UTILITAIRES *********************************** */
/*************************************************************************************************/

function demanderUnEntier(message, min, max) {
    var difficulte;
    do {
        difficulte = parseInt(prompt(message));
    } while (isNaN(difficulte) || difficulte < min || difficulte > max)

    return difficulte;
}

function randomNumber(min, max) {
    var result;
    result = Math.floor(Math.random() * (max - min + 1)) + min;

    return result;
}