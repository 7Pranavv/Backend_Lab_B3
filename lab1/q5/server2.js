// server2.js
//5: Reading a text file on the server using http and fs module.
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    fs.readFile('sample.txt', 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end("File not found!");
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
    });
}).listen(3000);

console.log("Server running at http://localhost:3000/");
