const express = require("express");
const mongoose = require("mongoose");
const { getAllUsers, getUserById, createUser } = require("./controllers/users");
const userRouter = require("./routes/users");

const app = express();
app.use(express.json());

const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB error:", err));

// app.get("/", (req, res) => {
//   res.send("Hello Worlds!");
// });


app.get("/users", getAllUsers);
app.get("/users/:userid", getUserById);
app.post("/users", createUser);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
