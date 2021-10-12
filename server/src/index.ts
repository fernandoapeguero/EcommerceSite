import express from "express";

const port = 9000;
const app = express();

const one: number = 10;
const two: number = 2;
const three: boolean = true;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
