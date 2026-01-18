#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((request, response) => {
    switch (request.url) {
        case '/':
            loadPage('index.html', 200);
            break;
        case '/about':
            loadPage('about.html', 200);
            break;
        case '/contact-me':
            loadPage('contact-me.html', 200);
            break;
        default:
            loadPage('404.html', 404);
    }
    
    function loadPage(fileName, statusCode) {
        fs.readFile(fileName, (error, data) => {
            if (error) {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.write('404.html');
            } else {
                response.writeHead(statusCode, { 'Content-Type': 'text/html' });
                response.write(data);
            }
            response.end();
        });
    }
});

server.listen(port, error => {
    if (error) {
        Error.log(error.message);
    } else {
        console.log('Server is listening on port ' + port);
    }
});