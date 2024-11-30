function genera (nome, cognome, annoNascita, meseNascita, giornoNascita, bMaschio, luogoNascita, siglaProvincia) {
    let vocali = [65, 69, 73, 79, 85];
    let err = false;

    nome = "Giovanni";
    cognome = "Peruzzi";
    annoNascita = 2008;
    meseNascita = 12;
    giornoNascita = 24;
    bMaschio = true;
    luogoNascita = "Vicenza";
    siglaProvincia = "VI";

    nome = nome.toUpperCase();
    cognome = cognome.toUpperCase();

    let out = calcolaCognome(cognome);
    out += calcolaNome(nome);
    out += calcolaAnno(annoNascita);
    out += calcolaMese(meseNascita);
    out += calcolaGiornoESesso(giornoNascita, bMaschio, mese, anno);
    out += calcolaCitta(luogoNascita, siglaProvincia);
    out += calcolaCheck(out);

    return (out);
}

function calcolaCognome (cognome) {
    output = "";
    for (let lettera of cognome) {
        let ascii = lettera.charCodeAt(0);
        if (ascii>90 || ascii<65) {
            err = true;
        } else {
            if (!vocali.contains(ascii) && output.length < 3) {
                output += lettera;
            }
        }
    }
    if (output.length == 3) {
        return output;
    }
    for (let lettera of cognome) {
        let ascii = lettera.charCodeAt(0);
        if (vocali.contains(ascii) && output.length < 3) {
            output += lettera;
        }
    }
    if (output.length == 3) {
        return output;
    } else {
        for (let i = 0; i<(3-output.length); i++) {
            output += "X";
        }
        return output;
    }
}

function calcolaNome (nome) {
    output = "";
    let numCons = 0;
    for (let lettera of nome) {
        let ascii = lettera.charCodeAt(0);
        if (ascii>90 || ascii<65) {
            err = true;
        } else {
            if (!vocali.contains(ascii)) {
                numCons++;
            }
        }
    }
    if (numCons <= 3) {
        for (let lettera of nome) {
            let ascii = lettera.charCodeAt(0);
            if (!vocali.contains(ascii)) {
                output += lettera;
            }
        }
        if (output.length != 3) {
            for (let i = 0; i<(3-output.length); i++) {
                output += "X";
            }
        }
    } else {
        let saltaCons = true;
        for (let lettera of nome) {
            let ascii = lettera.charCodeAt(0);
            if (!vocali.contains(ascii) && (output.length == 2 ? !saltaCons : true)) {
                output += lettera;
            }
            if (output.length == 2 && saltaCons == true) {
                saltaCons = false;
            }
        }
    }
}

function calcolaAnno (anno) {
    if (!isNaN(parseInt(anno))) {
        return anno%100;
    } else {
        err = true;
    }
}

function calcolaMese (mese) {
    if (mese>12 || mese<0) {
        err = true;
    }
    let mappaValori = new Map ([
        [1, "A"],
        [2, "B"],
        [3, "C"],
        [4, "D"],
        [5, "E"],
        [6, "H"],
        [7, "L"],
        [8, "M"],
        [9, "P"],
        [10, "R"],
        [11, "S"],
        [12, "T"],
    ]);
    return mappaValori.get(mese);
}

function calcolaGiornoESesso (giorno, bMaschio, mese, anno) {
    if (giorno<)
}