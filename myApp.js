// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();
function isValidDate(d) {
	return d instanceof Date && !isNaN(d);
}
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp/:date_string?", (req, res) => {
	if (req.params.date_string) {
		const date = new Date(
			parseInt(req.params.date_string) == req.params.date_string
				? parseInt(req.params.date_string)
				: req.params.date_string
		);
		if (isValidDate(date)) {
			res.json({ unix: date.getTime(), utc: date.toUTCString() });
		} else {
			res.json({
				error: "Invalid Date"
			});
		}
	} else {
		const date = new Date();
		res.json({ unix: date.getTime(), utc: date.toUTCString() });
	}
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
	console.log("Your app is listening on port " + listener.address().port);
});
