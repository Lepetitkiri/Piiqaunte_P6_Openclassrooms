const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);

const server = http.createServer(app);

server.listen(app.get('port'), () => {
    const port = server.address().port;
    console.log(`Listening on port ${port}`);
});