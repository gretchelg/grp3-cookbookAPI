const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool();

const port = process.env.PORT || 5001;

app.get('/', (req, res) => {
res.send('Welcome to our API');
});

app.get('/api/allrecipes', (req, res) => {
    pool.query('SELECT * FROM cookbook')
    .then((data) => res.json(data.rows))
    .catch((e) => {
        console.error('Error executing query 1:', e);
        res.sendStatus(500);
    });
});

app.get('/api/:type', (req, res) => {
    const { type } = req.params;
    console.log("type:", type)
    pool.query('SELECT * FROM cookbook WHERE type=$1;', [type])
    .then((data) => res.json(data.rows))
    .catch((e) => {
        console.error('Error executing query 2:', e);
        res.sendStatus(500);
    });
});

app.get('/api/:type/:id', (req, res) => {
    const {id, type} = req.params;
    pool.query('SELECT * FROM cookbook WHERE id=$1;', [id])
    .then((data) => res.json(data.rows))
    .catch((e) => {
        console.error('Error executing query 3:', e);
        res.sendStatus(500);
    });
});

// Listen to PORT 5000
app.listen(port , () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
