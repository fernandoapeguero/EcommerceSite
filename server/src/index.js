const express = require("express");

const port = 9000;
const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
