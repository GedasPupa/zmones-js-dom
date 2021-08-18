async function getZmones() {
    try {
        const res = await fetch('/json/zmogus');
        if (res.ok) {
            const zmones = await res.json();
            const app = document.getElementById('app');
            app.innerHTML = '';
            const ul = document.createElement('ul');
            for (const zmogus of zmones) {
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(zmogus.vardas));
                ul.appendChild(li);            
            }
            app.appendChild(ul);
        }
    } catch (err) {
        console.error(err);
    }
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