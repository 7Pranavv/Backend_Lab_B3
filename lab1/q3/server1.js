// server1.js
//3: Writing to the server using request-response statements as a callback in createServer() function.
const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("Hello! This is a Node.js server responding to your request.");
    res.end();
}).listen(3000);

console.log("Server running at http://localhost:3000/");
