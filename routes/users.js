var mongo = require('mongodb');

var Server = mongo.Server,
    Db     = mongo.Db,
    BSON   = mongo.BSONPure;

var server = new Server('localhost', 27017, { auto_reconnect: true });
var db = new Db('usersdb', server);


db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'usersdb' database");
        db.collection('users', { strict: true }, function(err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
                //populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
	var id = parseInt(req.params.userID);
	console.log('Retrieving user: ' + id);
	db.collection('users', function(err, collection) {
		//collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, item) {
		collection.findOne({ 'userID': id }, function(err, item) {
            res.send(item);
        });
    });
};


exports.findAll = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addUser = function(req, res) {
    var user = req.body;
    console.log(user);
    console.log('Adding user: ' + JSON.stringify(user));
    db.collection('users', function(err, collection) {
        collection.insert(user, { safe: true }, function(err, result) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateUser = function(req, res) {
    var id = parseInt(req.params.userID);
    var user = req.body;
    console.log('Updating user: ' + id);
    console.log(JSON.stringify(user));
    db.collection('users', function(err, collection) {
        //collection.update({'_id':new BSON.ObjectID(id)}, user, { safe: true }, function(err, result) {
        collection.update({userID : id}, user, { safe: true }, function(err, result) {
            if (err) {
                console.log('Error updating user: ' + err);
                res.send({ 'error': 'An error has occurred' });
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(user);
            }
        });
    });
}


exports.deleteUser = function(req, res) {
    var id = parseInt(req.params.userID);
    console.log('Deleting user: ' + id);
    db.collection('users', function(err, collection) {
        //collection.remove({'_id':new BSON.ObjectID(id)}, { safe: true }, function(err, result) {
        collection.remove({userID : id}, { safe: true }, function(err, result) {
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
// var populateDB = function() {
 
//     var users = [
//     {
// 	 	userID: 1,
// 		firstName: 'Johnny',
// 		lastName: 'Bravo',
// 		email: 'johnny.bravo@gmail.com',
// 		phoneNumber: '0038641700700',
// 		layerAddress: 'naKoncuUlceDesnoDrugaVrataLevo'
//     },
//     {
// 		userID: 2,
// 		firstName: 'Janez',
// 		lastName: 'Novak',
// 		email: 'janez.novak@gmail.com',
// 		phoneNumber: '0038641800800',
// 		layerAddress: 'doKoncaInNazaj'
//     }];
 
//     db.collection('users', function(err, collection) {
//         collection.insert(users, { safe: true}, function(err, result) {});
//     });
 
// };


