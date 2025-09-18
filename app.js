const express = require('express');
const mongoose = require("mongoose");

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.get('/', (req, res) => {
  res.send('Hello Worlds!');
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});