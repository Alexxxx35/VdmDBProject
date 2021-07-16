const express = require("express");
//const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json()); // parse requests of content-type - application/json

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});



// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to zgeg application." });
});


require("./app/routes/buyer.routes")(app);
require("./app/routes/spectator.routes")(app);
require("./app/routes/game.routes")(app);
require("./app/routes/price.routes")(app);
require("./app/routes/booking.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});