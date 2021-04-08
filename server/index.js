const express = require("express");

const app = express();
const PORT = 3000;
const distFolder = `${__dirname}/../static/`;

app.use(express.static(distFolder));

app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT} !`);
});
