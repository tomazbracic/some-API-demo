var express    = require('express'),
    morgan     = require('morgan'),
    bodyParser = require('body-parser'),
    users      = require('./routes/users');


var app = express();

app.use(morgan());
app.use(bodyParser());



var demoUser = {
	userID: 1,
	firstName: 'Johnny',
	lastName: 'Bravo',
	email: 'johnny.bravo@gmail.com',
	phoneNumber: '0038641700700',
	layerAddress: 'naKoncuUlceDesnoDrugaVrataLevo'
}


app.get('/', function(req, res) { res.send("<h2>Oh... dude, you're soo lost!</h2>"); });
app.get('/demoUser', function(req, res) { res.send(demoUser) });

app.get('/users', users.findAll );
app.get('/users/:userID', users.findById );
app.post('/users', users.addUser );
app.put('/users/:userID', users.updateUser );
app.delete('/users/:userID', users.deleteUser );



app.listen(8080);


