require("rootpath")();
var express = require("express");
const path = require("path");
var app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./_middleware/error-handler");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// global error handler
app.use(errorHandler);
//serve production build files from public folder
app.use(express.static(path.join(__dirname, "public")));

//serve production build
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4040;
server.listen(port, () => console.log("Server listening on port " + port));