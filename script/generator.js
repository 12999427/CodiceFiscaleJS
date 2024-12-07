//import { codiciPaesi, valoriMesi, vocali, codiciComuni, checkDispari } from "./dati.js";

let err;

function genera (nome, cognome, annoNascita, meseNascita, giornoNascita, bMaschio, cittaNascita, bNatoItalia, paeseStraniero) {
    err = "";

    nome = nome.toUpperCase();
    cognome = cognome.toUpperCase();
    cittaNascita = cittaNascita.toUpperCase();

    let out = calcolaCognome(cognome);
    out += calcolaNome(nome);
    out += calcolaAnno(annoNascita);
    out += calcolaMese(meseNascita);
    out += calcolaGiornoESesso(giornoNascita, bMaschio, meseNascita, annoNascita);
    out += calcolaCitta(cittaNascita, bNatoItalia, paeseStraniero);
    out += calcolaCheck(out);
    return (out);
}

function calcolaCognome (cognome) {
    output = "";
    for (let lettera of cognome) {
        let ascii = lettera.charCodeAt(0);
        if (ascii>90 || ascii<65) {
            err += "\nCaratteri invalidi nel cognome";
        } else {
            if (!vocali.includes(ascii) && output.length < 3) {
                output += lettera;
            }
        }
    }
    if (output.length == 3) {
        return output;
    }
    for (let lettera of cognome) {
        let ascii = lettera.charCodeAt(0);
        if (vocali.includes(ascii) && output.length < 3) {
            output += lettera;
        }
    }
    if (output.length == 3) {
        return output;
    } else {
        return riempiConZ(output, 3);
    }
}

function riempiConZ (txt, len) {
    for (let i = 0; i<(len-txt.length); i++) {
        txt += "X";
    }
    return txt;
}

function calcolaNome (nome) {
    output = "";
    let numCons = 0;
    for (let lettera of nome) {
        let ascii = lettera.charCodeAt(0);
        if (ascii>90 || ascii<65) {
            err += "\nCaratteri invalidi nel nome";
        } else {
            if (!vocali.includes(ascii)) {
                numCons++;
            }
        }
    }
    if (numCons <= 3) {
        for (let lettera of nome) {
            let ascii = lettera.charCodeAt(0);
            if (!vocali.includes(ascii)) {
                output += lettera;
            }
        }
        output = riempiConZ(output, 3);
    } else {
        let saltaCons = true;
        for (let lettera of nome) {
            let ascii = lettera.charCodeAt(0);
            if (!vocali.includes(ascii) && (output.length == 1 ? !saltaCons : true)) {
                output += (output.length<3 ? lettera : "");
            } else if (!vocali.includes(ascii) && output.length == 1 && saltaCons == true) {
                saltaCons = false;
            }
        }
    }
    return output;
}

function calcolaAnno (anno) {
    if (!isNaN(parseInt(anno))) {
        return ((anno%100)<10 ? "0" + (anno%100).toString() : anno%100); //nel caso la parte dell'anno del CF sia solo una cifra
    } else {
        err += "\nAnno incorretto";
    }
}

function calcolaMese (mese) {
    if (mese>12 || mese<0) {
        err += "\nMese incorretto";
    }
    return valoriMesi[mese-1];
}

function calcolaGiornoESesso (giorno, bMaschio, mese, anno) {
    if (dataValida(giorno, mese, anno)) {
        return ((bMaschio ? 0 : 40) + giorno);
    } else {
        err += "\nGiorno incorretto";
    }
}

function dataValida(giorno, mese, anno) {
    mese -= 1;
    const date = new Date(anno, mese, giorno);
    
    return (
        date.getFullYear() === anno &&
        date.getMonth() === mese &&
        date.getDate() === giorno
    );
}

function calcolaCitta (cittaNascita, bNatoItalia, paeseStraniero) {
    if (!bNatoItalia) {
        let codicePaese = codiciPaesi.get(paeseStraniero);
        if (codicePaese != undefined) {
            return ("Z" + codicePaese);
        } else {
            err += "\nPaese invalido";
        }
    } else {
        let codiceComune = codiciComuni.get(cittaNascita);
        if (codiceComune != undefined) {
            return (codiceComune);
        } else {
            err += "\nComune o provincia invalidi";
        }
    }
}

function calcolaCheck (codice) {
    let somma = 0;

    let i = 0;
    for (let carattere of codice) {
        let ascii = carattere.charCodeAt(0);
        if (i%2 != 0) { //pari contando da 1
            if (ascii>=48 && ascii<=57) { //è un numero
                somma += parseInt(carattere);
            } else {
                somma += ascii-65;
            }
        } else {
            somma += checkDispari.get(carattere)
        }
        i++;
    }

    let asciiCheck = somma%26;

    return String.fromCharCode(65+asciiCheck);
}