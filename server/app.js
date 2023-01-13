const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const fs = require("fs");

app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));

app.get("/", (req, res) => {
  fs.readFile("./stack.json", "utf8", (err, jsonString) => {
    if (err) {
      return;
    }
    try {
      const customer = JSON.parse(jsonString);
      customer;
      res.send(customer);
    } catch (err) {
      res.send(err);
    }
  });
});

app.post("/", async (req, res) => {
  fs.writeFile("./stack.json", JSON.stringify(req.body), (err) => {
    if (err) {
      res.send(err);
      return;
    }
  });
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
