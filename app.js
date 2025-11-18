require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const mainRouter = require("./routes/index");
const { NotFoundError } = require("./utils/notFoundError");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use("/", mainRouter);

app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

app.use(errors());

app.use(errorLogger);

app.use(errorHandler);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB error:", err);
    process.exit(1);
  });
