const express = require('express');
const path = require('path');
const app = express();
const ROOT = './src/site/';

app
    .set('port', (process.env.PORT || 5000))
    .get(['/', '/index.html', '/index'], (req,res) => {
        res.sendFile('index.html', {root: ROOT});
    })

    .get(['/Legacy_Site/index.html'], (req, res) => {
        res.sendFile('./Legacy_Site/index.html', {root: ROOT});
    })

    .use(express.static(ROOT))

    .listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'))
    })
