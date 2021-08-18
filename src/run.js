import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import exphbs from 'express-handlebars';

const SERVER_PORT = 3000;
const WEB_DIR = 'web';
const DATA_FILE = 'zmones.json';

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static(WEB_DIR, {
    index: false
}));

app.use(express.urlencoded({
    extended: true
}));

// for json parse (for body with "Content-Type": "application/json")
app.use(express.json());

app.get('/',  async (req, res) => {
    try {
        let zmones = await readFile(DATA_FILE, {
            encoding: 'utf-8'
        });
        zmones = JSON.parse(zmones);
        
        res.render('zmones', { zmones, title: 'Visi zmones' });
    } catch (err) {
        res.status(500).end(`<html><body><h1>Ivyko klaida: ${err.message}</h1></body></html>`);
    }
});

app.get('/json/zmogus', async (req, res) => {
    try {
        let zmones = await readFile(DATA_FILE, {
            encoding: 'utf-8'
        });
        zmones = JSON.parse(zmones);
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(zmones));
        
    } catch (err) {
        res.status(500).end(`<html><body><h1>Ivyko klaida: ${err.message}</h1></body></html>`);
    }
});

app.post('/json/zmogus', async (req, res) => {
    try {
        let zmones = await readFile(DATA_FILE, {
            encoding: 'utf-8'
        });
        zmones = JSON.parse(zmones);

        let nextId = 0;
        for (const zmogus of zmones) {
            if (zmogus.id > nextId) {
                nextId = zmogus.id;
            }            
        }
        nextId++;

        let zmogus = {
            id: nextId,
            vardas: req.body.vardas,
            pavarde: req.body.pavarde,
            alga: parseFloat(req.body.alga),
        }

        zmones.push(zmogus);

        await writeFile(DATA_FILE, JSON.stringify(zmones, null, 2), {
            encoding: 'utf-8'
        });

        res.status(201).end();

    } catch (err) {
        res.status(500).end(`<html><body><h1>Ivyko klaida: ${err.message}</h1></body></html>`);
    }
});

app.listen(SERVER_PORT);
console.log(`Server started on port: ${SERVER_PORT}`);