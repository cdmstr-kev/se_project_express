const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB error:", err));

app.use((req, res, next) => {
  req.user = {
    _id: '68cb6ce66bf065adb68546f0'
  };
  next();
});
app.use("/", mainRouter);


app.use((req, res) => {
  res.status(404).json({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
