const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.end("Test");
});

server.listen(process.env.PORT || 3000);