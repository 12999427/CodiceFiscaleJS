import re

def genera_mappa_js(testo):
    
    pattern = r'^(\w+)\s+(.+?)\s+\((\w{2})\)\s+(\w{2})$' #formattazione con regex
    righe = testo.splitlines()
    
    mappa_js = "let mappa = new Map([\n"
    
    for riga in righe:
        
        match = re.match(pattern, riga)
        if match:
            codice_catastale, comune, codice_provincia, provincia = match.groups()
            chiave = f"{codice_provincia} {comune}"
            mappa_js += f'    ["{chiave}", "{codice_catastale}"],\n'
    
    mappa_js += "]);"
    return mappa_js

#input:
testo = """... dati copiati come testo piano da un pdf che ho trovato online..."""


mappa_js = genera_mappa_js(testo)
print(mappa_js) #copiata e incollata in dati.js