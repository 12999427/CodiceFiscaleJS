function cerca (div) {
    let list;
    let container;
    let input;

    list = div.id == "comune" ? codiciComuni : codiciPaesi;
    list = Array.from( list.keys() );
    container = document.getElementById("risultati_" + div.id);
    input = document.getElementById("cerca_" + div.id);
    
    document.getElementById("risultati_" + div.id).innerHTML = "";

    if (input.value == "") {
        return;
    }

    list.forEach( (valore) => {
        
        if (valore.includes(input.value.toUpperCase())) {

            let contained = document.createElement("div");
            let text_content = valore.substring(valore.indexOf(" ")+1, valore.length) + " ";
            text_content = document.createTextNode(text_content);
            contained.appendChild(text_content);
            let puls = document.createElement("button");
            puls.innerText = "+";
            puls.onclick = function () {
                document.getElementById("CF_luogo").value = valore;
                Array.from ( document.querySelectorAll("input[name='estero']") ).forEach ( ( element ) => {
                    element.checked = div.id == "comune" && element.value=="Italia" || 
                                        div.id == "paese" && element.value == "Straniero";
                });
            };
            luogo();

            contained.appendChild(puls);
            document.getElementById("risultati_" + div.id).appendChild(contained);
        }
    });
}

function carica (div) {

}

function genera_codice () {
    let nome = document.getElementById("CF_nome").value;
    let cognome = document.getElementById("CF_cognome").value;
    let annoNascita = parseInt(document.getElementById("CF_data").value.split("-", 0));
    let meseNascita = parseInt(document.getElementById("CF_data").value.split("-", 1));
    let giornoNascita = parseInt(document.getElementById("CF_data").value.split("-", 2));
    let bMaschio = document.getElementById("CF_sesso").value == "M";
    let bNatoInItalia = document.getElementById("estero_italia").checked;
    
    document.getElementById("CF_CF").value = genera();
}

function luogo () {
    document.getElementById("CF_luogo_label").innerText =
        document.querySelector("input[name='estero']:checked").value=="Italia" ? 
        "Comune" : "Paese";
}