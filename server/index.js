const express = require("express");
const app = express();
const mongoose = require("mongoose");
const env = require('dotenv').config();
const cors = require("cors");
const IndexRouter = require('./routes/index.js')
const cookieParser = require("cookie-parser");
const path = require('path')


app.use(
  cors({
    origin: [`${process.env.ORIGIN_LINK}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser())
mongoose
  .connect(`${process.env.MONGO_LINK}`)
  .then((res) => { console.log("MongoDB connected") })
  .catch((err) => console.log("MongoDb Connection Failed", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/static" , express.static(path.join(__dirname, "/public/")));
app.use("/api", IndexRouter);
app.get("/", (req, res) => {
  res.json("hello")
})

app.listen(process.env.PORT, () => { console.log(`Listening on http://127.0.0.1:${process.env.PORT}`); console.log(process.env.MONGO_LINK) });