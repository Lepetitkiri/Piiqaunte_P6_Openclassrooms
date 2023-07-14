const express = require('express');
const app = express();

app.use((req, res) => {
res.statusCode = 200;
res.end("Test");
});

module.exports = app;