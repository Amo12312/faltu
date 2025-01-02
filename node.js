const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
const http = require('http');


const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

app.get('/', (req, res) => {
  res.send('Hello, secure world!');
});

https.createServer(options, app).listen(443, () => {
  console.log('Server running securely on https://localhost');
});

http.createServer((req, res) => {
    res.writeHead(301, { 'Location': 'https://' + req.headers['host'] + req.url });
    res.end();
}).listen(80);