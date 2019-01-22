const express = require('express');

const resize = require('./resize');
const appData = require('./appData.json');

const app = express();
const port = 3001;

app .use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    })
    .get('/list', (req, res) => {
        const catsList = Object.keys(appData).map((key) => appData[key]);
        res.send(catsList);
    })
    .get('/cat/:id', (req, res) => {
        const id = req.params.id;
        res.send(appData[id]);
    })
    .get('/thumbnail/:id', (req, res) => {
        const imageId = req.params.id;
        const name = appData[imageId].src;
        resize(`${__dirname}/images/${name}.jpg`, 220, 150).pipe(res);
    })
    .get('/picture/:id', (req, res) => {
        const imageId = req.params.id;
        const name = appData[imageId].src;
        resize(`${__dirname}/images/${name}.jpg`, 1200, 900).pipe(res);
    });

app .listen(port, () => console.log(`Example app listening on port ${port}!`))