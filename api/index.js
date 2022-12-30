var express = require("express"),
	cors = require("cors"),
	app = express(),
	port = process.env.PORT || 8000,
	mongoose = require("mongoose"),
	bodyParser = require("body-parser");
var config = require("./config.js");

app.use(cors());
try {
	mongoose.connect(
	config.DBURL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);
} catch (error) {
	console.log(error)
}
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
   console.log("Connected succesfuly");
});

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());
var routes = require("./routes/StockRoute.js");
routes(app);

app.listen(port);
console.log("server running on" + port);
