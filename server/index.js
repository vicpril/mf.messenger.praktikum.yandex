const express = require('express');

const { controller } = require('./controller');

const app = express();
const PORT = 3000;

app.use(express.static('./'));

app.listen(PORT, function () {
   console.log(`Example app listening on port ${PORT}!`);
});