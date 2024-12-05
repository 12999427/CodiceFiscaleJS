function cerca (div) {
    let list;
    if (div.id == "div_comune") {
        list = codiciComuni;
    } else if (div.id = "div_paese") {
        list = codiciPaesi;
    } else {
        alert(":("); // non dovrebbe succedere
    }
    let htmlelemento = "";
    list.forEach( (valore, i) => {
        htmlelemento += `<div class='spaziatura'> ${valore} <button onclick='select(${div.id}, ${valore})'> + </button> </div><br> `;
    });
    document.getElementById("risultato_" + div.id).innerHTML = htmlelemento;
}

function carica (div) {

}