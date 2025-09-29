const serverless = require("serverless-http");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../views"));

// Static files
app.use(express.static(path.join(__dirname, "../../public")));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/chocolate", (req, res) => {
  let myCookie = req.cookies.myValue;

  if (!myCookie) {
    res.cookie("myValue", -1, { httpOnly: true, path: "/chocolate" });
    myCookie = -1;
  }

  if (parseInt(myCookie) === 350) {
    res.render("flag");
  } else {
    res.render("chocolate");
  }
});

// Export for Netlify
module.exports.handler = serverless(app);
