let zmones = [];

async function getZmones() {
    try {
        const res = await fetch('/json/zmogus');
        if (res.ok) {
            zmones = await res.json();
            showZmones();
        }
    } catch (err) {
        console.error(err);
    }
}

function showZmones() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    const table = document.createElement('table');
    let tr, td;
    for (const zmogus of zmones) {
        tr = document.createElement('tr');
        td = document.createElement('td');
        td.appendChild(document.createTextNode(zmogus.vardas));
        tr.appendChild(td);
       
        td = document.createElement('td');
        td.appendChild(document.createTextNode(zmogus.pavarde));
        tr.appendChild(td);

        td = document.createElement('td');
        td.appendChild(document.createTextNode(zmogus.alga));
        tr.appendChild(td);
        let button;
        button = document.createElement('button');
        button.appendChild(document.createTextNode('X'));
        button.zmogusId = zmogus.id;
        button.onclick = delZmogus;
        tr.appendChild(button);
        button = document.createElement('button');
        button.zmogusId = zmogus.id;
        button.zmogus = zmogus;
        button.appendChild(document.createTextNode('Edit'));
        button.onclick = editZmogus;
        tr.appendChild(button);

        table.appendChild(tr);    
    }
    app.appendChild(table);    
}

function addZmogus() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    let input;

    app.appendChild(document.createTextNode('Vardas'));
    input = document.createElement('input');
    input.id = 'vardas';
    app.appendChild(input);
    app.appendChild(document.createElement('br'));

    app.appendChild(document.createTextNode('Pavarde'));
    input = document.createElement('input');
    input.id = 'pavarde';
    app.appendChild(input);
    app.appendChild(document.createElement('br'));

    app.appendChild(document.createTextNode('Alga'));
    input = document.createElement('input');
    input.id = 'alga';
    app.appendChild(input);
    app.appendChild(document.createElement('br'));

    let button;

    button = document.createElement('button');
    button.appendChild(document.createTextNode('Save'));
    button.onclick = saugomZmogu;
    app.appendChild(button);

    button = document.createElement('button');
    button.appendChild(document.createTextNode('Back'));
    button.onclick = getZmones;
    app.appendChild(button);
}

async function saugomZmogu() {
    let vardas = document.getElementById('vardas').value;
    let pavarde = document.getElementById('pavarde').value;
    let alga = parseFloat(document.getElementById('alga').value);
    const zmogus = {
        vardas,
        pavarde,
        alga
    };

    try {
        const res = await fetch('/json/zmogus', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(zmogus)
        });
        if (!res.ok) {
            console.log('Save failed with status: ' + res.status);
        }
    } catch (err) {
        console.error(err);
    }
    getZmones();
}

async function delZmogus(event) {
    if (event && event.target && event.target.zmogusId) {
        const index = zmones.findIndex(zm => zm.id === event.target.zmogusId);
        const zmogus = zmones[index];
        try {
            const res = await fetch('/json/zmogus/' + zmogus.id, {
                method: "DELETE"
            });
            if (!res.ok) {
                console.log('Save failed with status: ' + res.status);
            }
        } catch (err) {
            console.error(err);
        }
    }
    getZmones();    
}

async function editZmogus(event) {
    const app = document.getElementById('app');
    app.innerHTML = '';
    let input;

    app.appendChild(document.createTextNode('Vardas'));
    input = document.createElement('input');
    input.value = event.target.zmogus.vardas;
    input.id = 'vardas';
    app.appendChild(input);
    app.appendChild(document.createElement('br'));

    app.appendChild(document.createTextNode('Pavarde'));
    input = document.createElement('input');
    input.value = event.target.zmogus.pavarde;
    input.id = 'pavarde';
    app.appendChild(input);
    app.appendChild(document.createElement('br'));

    app.appendChild(document.createTextNode('Alga'));
    input = document.createElement('input');
    input.value = event.target.zmogus.alga;
    input.id = 'alga';
    app.appendChild(input);
    app.appendChild(document.createElement('br'));

    let button;

    button = document.createElement('button');
    button.appendChild(document.createTextNode('Save'));
    button.zmogusId = event.target.zmogusId;
    button.onclick = editZmogu;
    app.appendChild(button);

    button = document.createElement('button');
    button.appendChild(document.createTextNode('Back'));
    button.onclick = getZmones;
    app.appendChild(button);
}

async function editZmogu(event) {
    let vardas = document.getElementById('vardas').value;
    let pavarde = document.getElementById('pavarde').value;
    let alga = parseFloat(document.getElementById('alga').value);
    const zmogus = {
        id: parseFloat(event.target.zmogusId),
        vardas: vardas,
        pavarde: pavarde,
        alga: alga,
    };
    if (event && event.target && event.target.zmogusId) {
        try {
            const res = await fetch('/json/zmogus/' + zmogus.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(zmogus)
            });
            if (!res.ok) {
                console.log('Save failed with status: ' + res.status);
            }
        } catch (err) {
            console.error(err);
        }
    }
    getZmones();
}