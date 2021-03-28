const express = require('express');

const { controller } = require('./controller');

const app = express();
const PORT = 3000;
const dist_folder = (__dirname + '/../static/');

app.use(express.static(dist_folder));

app.listen(PORT, function () {
   console.log(`Example app listening on port ${PORT}!`);
});