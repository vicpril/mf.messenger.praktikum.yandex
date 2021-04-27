const express = require("express");

const app = express();
const PORT = 3000;
const distFolder = `${__dirname}/../static/`;

app.use(express.static(distFolder));

app.get("*", (req, res) => {
   res.sendFile(`${distFolder}index.html`);
});

app.listen(PORT, () => {
   console.log(`Example app listening on port ${PORT}!`);
});
