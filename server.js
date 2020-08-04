
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
app.use(express.static('public'));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

// setting up mongo db
var mongoDB_uri = process.env.mongoDB_uri || "mongodb://drewmargielaa:Dedehood@#$8@ds015879.mlab.com:15879/heroku_rm8qwd8w";
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