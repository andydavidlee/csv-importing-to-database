//  const sampledata = require('sampledata.csv')
const fs = require("fs");
const CSVToJSON = require('csvtojson')

const express = require('express');
const path = require('path');

const JsonService = require('./service/jsonservice.js');

const jsonService = new JsonService('./data/sampledata.json');

const routes = require('./routes/route');

const app = express();

const port = 3000;

CSVToJSON().fromFile('./data/sampledata.csv')
    .then(users => {
        // users is a JSON array
        // Write JSON array to a file
        fs.writeFile('./data/sampledata.json', JSON.stringify(users, null, 4), (err) => {
            if (err) {
                throw err;
            }
        });

    }).catch(err => {
    });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(async (req, res, next) => {

    try {
        const list = await jsonService.getList();
        res.locals.csvList = list;
        return next();
    } catch (err) {
        return next(err);
    }
});

app.use('/', routes({
    jsonService
}));


app.listen(port, () => {
    console.log(`Express server listening on port ${port}!`);
});