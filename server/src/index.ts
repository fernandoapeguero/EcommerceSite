import express from "express";
import { listings } from "../listing";

const port = 9000;
const app = express();

// middleware to parse json from request.
app.use(express.json());

// /listings route
app.get("/listing", (_req, res) => {
  res.send(listings);
});

// /delete listing route
app.post("/delete-listing", (req, res) => {
  const { id }: { id: string } = req.body;

  for (let i = 0; i < listings.length; i++) {
    if (listings[i].id === id) {
      return res.send(listings.splice(i, 1));
    }
  }

  return res.send("failed to find item.");
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
