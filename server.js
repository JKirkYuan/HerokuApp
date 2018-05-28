const express = require('express');
const path = require('path');
const app = express();
const request = require('request');
const ROOT = './src/site/';


function ping() {
    request('http://www.kirkyuan.com', (err, res, body) => {
        console.log("Pinging dyno");
    });
}

app
    .set('port', (process.env.PORT || 5000))

    .use('*', (req, res, next) => {
        console.log(req.method + " request for " + req.url);
        next();
    })

    .get(['/', '/index.html', '/index'], (req,res) => {
        res.sendFile('index.html', {root: ROOT});
    })

    .get(['/Legacy_Site/index.html'], (req, res) => {
        res.sendFile('./Legacy_Site/index.html', {root: ROOT});
    })

    .get(['/shopifyf18'], (req,res) => {
        res.sendFile('./ShopifyF18/index.html', {root: ROOT});
    })

    .get(['/.well-known/acme-challenge/Aoo1rN1sZs2rAf-qaEdU5Y-KhhXG3OvjAvuqZwMe7fU'], (req,res) => {
        res.sendFile('./acme', {root: ROOT});
    })

    .use(express.static(ROOT))

    .listen(app.get('port'), () => {
        console.log('Node app is running on port', app.get('port'));
        ping();
        setInterval(() => {
            ping();
        }, 1500000);
    })
