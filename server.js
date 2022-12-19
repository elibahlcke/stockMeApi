var express = require("express"),
	cors = require("cors"),
	app = express(),
	port = process.env.PORT || 8000,
	mongoose = require("mongoose"),
	bodyParser = require("body-parser");

app.use(cors());
mongoose.connect(
	"mongodb+srv://toska:eliana2022@cluster0.7mzia7h.mongodb.net/stockMe?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);
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
var routes = require("./api/routes/StockRoute");
routes(app);

app.listen(port);
console.log("server running on" + port);
