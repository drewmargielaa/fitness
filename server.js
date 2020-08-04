
// Dependencies
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Setting up Express App
const app = express();
const PORT = process.env.PORT || 3005;

app.use(morgan("dev"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}
else {app.use(express.static('public'));}
// setting up mongo db
var mongoDB_uri = process.env.mongoDB_uri || "mongodb://drewmargielaa:Dedehood@#$8@ds163480.mlab.com:63480/heroku_437vz6xc";
mongoose.connect(mongoDB_uri, {
    useNewUrlParser: true,
    useFindAndModify: false
})

//routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//  Starts the server to begin listening
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });