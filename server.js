var express = require('express');
var recipes = require('./routes/recipes');

var app = express();

app.configure(function() {
	app.use(express.static('static'));
	app.use(express.logger('dev'));	/* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser());
}

// my static photography website
app.get('/', function(req, res){
	console.log("Get request on home page");
	res.sendFile(__dirname + "/index.html");
});

// the REST API family recipe database
app.get('/recipes', recipes.findAll);
app.get('/recipes/:id', recipes.findById);
app.post('recipes', recipes.addRecipe);
app.put('recipes/:id', recipes.updateRecipe);
app.delete('recipes/:id', recipes.deleteRecipe);

var server = app.listen(8081, function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log("App listening on http://%s:%s", host, port);
});
