var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	ObjectId = mongo.ObjectId;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('recipedb', server);

db.open(function(err, db) {
	if (!err) {
		console.log("Connected to 'recipedb' database");
		db.collection('recipes', {strict:true}, function(err, collection) {
			if (err) {
				console.log("'recipes' collection doesn't exist. Creating it with samples...");
				populateDB();
			}
		});
	}
});


exports.findAll = function(req, res) {
	db.collection('recipes', function(err, collection) {
		collection.find().toArray(function(err, items) {
			//res.send(items);
			if (err) {
				res.status(500).json({'error':'Error occurred while trying to fetch all recipes'});
			} else {
				res.status(200).json(items);
			}
		});
	});
};

exports.findById = function(req, res) {
	var id = req.params.id;
	console.log("Retrieving recipe: " + id);
	db.collection('recipes', function(err, collection) {
		if (err) {
               		res.status(500).json({'error':'An error has occurred - ' + err});
		} else {
	               collection.find({'_id':new BSON.ObjectID(id)}).toArray(function(err, items) {
                        if (err) {
                                res.status(500).json({'error':'An error has occurred - ' + err});
                        } else if (items.length < 1) {
                                res.status(404).json({'error':'recipe not found id:' + id});
                        } else {
				res.status(200).json(item[0]);
			}
		});
		}
	});
};

exports.addRecipe = function(req, res) {
	var recipe = req.body;
	console.log("Adding Recipe: " + JSON.stringify(recipe));
	db.collection('recipes', function(err, collection) {
		collection.insert(recipe, {safe:true}, function(err, result) {
			if (err) {
				res.status(500).json({'error':'An error occurred'});
			} else {
				console.log('Success: '+JSON.stringify(result[0]));
				res.status(500).json(201, result[0]);
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
		collection.find({'_id':new BSON.ObjectID(id)}).toArray(function(err, items) {
			if (err) {
				res.status(500).json({'error':'An error has occurred - ' + err});
			} else if (items.length < 1) {
				res.status(404).json({'error':'recipe not found id:' + id});
			} else {
				collection.update({'_id':new BSON.ObjectID(id)}, recipe, {safe:true}, function(err, result) {
					if (err) {
						console.log('Error updating recipe: ' + err);
						res.status(500).json({'error':'An error has occurred'});
					} else {
						console.log('' + result + ' document(s) updated');
						res.status(200).json(recipe);
					}
				});
			}
		});
	});
}

exports.deleteRecipe = function(req, res) {
	var id = req.params.id;
	console.log('Deleting recipe: ' + id);
	db.collection('recipes', function(err, collection) {
		collection.find({'_id':new BSON.ObjectID(id)}).toArray(function(err, items) {
			if (err) {
				res.status(500).json({'error':'An error has occurred - ' + err});
			} else if (items.length < 1) {
				res.status(404).json({'error':'recipe not found id:' + id});
			} else {
				collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
					if (err) {
						res.status(500).json({'error':'An error has occurred - ' + err});
					} else {
						console.log('' + result + ' recipes(s) deleted');
						//res.send(req.body);
						res.status(204);
					}
				});
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
		"name": "Mousse au chocolat",
		"temperature": 170,
		"duration": 200,
		"ingredients":
		[
                	{"quantity": 200, "unit":"gram", "name":"chocolate"},
                	{"quantity": 6,   "unit":"unit", "name":"egg"},
                	{"quantity": 1,   "unit":"pinch", "name":"salt"}
		],
		"instructions":
		[
			{"step": 1, "desc": "melt chocolate in a double boiler"},
			{"step": 2, "desc": "beat the egg whites until they form stiff peaks"},
		]
		},
		{
                "name": "Tarte au fraises",
                "temperature": 170,
                "duration": 200,
                "ingredients":
                [
                        {"quantity": 400, "unit":"gram", "name":"fraises"},
                        {"quantity": 1,   "unit":"", "name":"pie crust"}
                ],
                "instructions":
                [
                        {"step": 1, "desc": "Put teh crust in a plate"},
                        {"step": 2, "desc": "place the fraises in the plates"},
                ]
	    }];

	db.collection('recipes', function(err, collection) {		
		collection.insert(recipes, {safe:true}, function(err, result) {});
	});
};
