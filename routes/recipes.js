var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('recipedb', server);

db.open(function(err, db){
		if(!err) {
		console.log("Connected to 'recipedb' database");
		db.collection('recipes', {strict:true}, function(err, collection){
				if(err) {
				console.log("'recipes' collection doesn't exist. Creating it with samples...");
				populateDB();
				}
				});
		}
		});


exports.findAll = function(req, res) {
	db.collection('recipes', function(err, collection) {
			collection.find().toArray(function(err, items) {
					res.send(items);
					});
			});
};

exports.findById = function(req, res) {
	var id = req.params.id;
	console.log("Retrieving recipe: " + id);
	db.collection('recipes', function(err, collection) {
			collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
					res.send(item);
					});
			});
};

exports.addRecipe = function(req, res) {
	var recipe = req.body;
	console.log("Adding Recipe: " + JSON.stringify(recipe));
	db.collection('recipes', function(err, collection) {
			collection.insert(recipe, {safe:true}, function(err, result) {
				if(err){
				    res.send({'error':'An error occurred'});
				} else {
				    console.log('Success: '+JSON.stringify(result[0]));
				    res.send(result[0]);
				}
			});
	});
}

exports.updateRecipe = function(req, res) {
	var id = req.params.id;
	var recipe = req.body;

	console.log('Updating recipe: ' + id);
	console.log(JSON.stringify(recipe));
	db.collection('recipes', function(err, collection) {
			collection.update({'_id':new BSON.ObjectID(id)}, recipe, {safe:true}, function(err, result) {
				if (err) {
				    console.log('Error updating recipe: ' + err);
				    res.send({'error':'An error has occurred'});
				} else {
				    console.log('' + result + ' document(s) updated');
				    res.send(recipe);
				}
			});
	});
}

exports.deleteRecipe = function(req, res) {
	var id = req.params.id;
	console.log('Deleting recipe: ' + id);
	db.collection('recipes', function(err, collection) {
			collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
				if (err) {
					res.send({'error':'An error has occurred - ' + err});
				} else {
					console.log('' + result + ' document(s) deleted');
					res.send(req.body);
				}
			});
	});
}


/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

	var recipes = [
	    {
            name: "gateau au chocolat",
            ingredients: ["",""]
            grapes: "Grenache / Syrah",
            country: "France",
            region: "Southern Rhone",
            description: "The aromas of fruit and spice...",
            picture: "saint_cosme.jpg"
        },
        {
            name: "LAN RIOJA CRIANZA",
            year: "2006",
            grapes: "Tempranillo",
            country: "Spain",
            region: "Rioja",
            description: "A resurgence of interest in boutique vineyards...",
            picture: "lan_rioja.jpg"
	    }];

	db.collection('recipes', function(err, collection) {
			collection.insert(recipes, {safe:true}, function(err, result) {});
			});

};
