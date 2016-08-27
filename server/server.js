import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello from express');
});

const server = app.listen(3000, () => {
    console.log('Express is listening to http://localhost:3000');
});