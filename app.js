var express = require("express");
var app = express();
var request = require("request");


//Add this to serve the public folder
app.use(express.static("public"));

//Add this to make .ejs files the default (can leave off the .ejs)
app.set("view engine", "ejs");

app.get("/", function(req,res) {
	res.render("search");
});

app.get("/results", function(req, res) {
	var query = req.query.search;

	var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
	request(url, function(error, response, body) {
		if(!error && response.statusCode == 200) {
			var parsedData = JSON.parse(body);
			res.render("results", {data: parsedData, query:query});
		} else {
			console.log("There was an error : " + error);
		}
	});
});







app.listen(3000, function() {
	console.log("Server is now listening on port 3000");
});