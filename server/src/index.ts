import express from "express";

const port = 9000;
const app = express();

const one = 10;
const two = 2;
const three = true;

app.get("/", (_req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
