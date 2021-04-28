const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;
const distFolder = `${__dirname}/../static/`;

app.use(express.static(distFolder));

app.use((request, response) => {
   response.sendFile(path.resolve(`${distFolder}index.html`));
});

app.listen(PORT, () => {
   console.log(
      `Example app listening on port ${PORT}! http://localhost:${PORT}/`
   );
});
