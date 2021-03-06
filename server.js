var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var request = require('request');
var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var sessionsModule = require('client-sessions')
var Twitter = require('twitter');
var secrets = require('./secrets.js');

mongoose.connect('mongodb://localhost/final-proj', function(mongooseErr) {
    if( mongooseErr ) { console.error(mongooseErr) } 
    else { console.info('Mongoose initilized!') }
})

var UserSchema = new mongoose.Schema({
    username:  String,
    password: String,
    created: {
        type: Date,
        default: function(){ return new Date() }
    }
});
var UserModel = mongoose.model('User', UserSchema)

var checkIfLoggedIn = function(req, res, next){
    if ( req.session._id ) {
        console.log("user is logged in")
        next()
    }
    else {
        console.log("no one is logged in")
        res.redirect('/')
    }
}

var checkIfLoggedInForAjax = function(req, res, next){
    if ( req.session._id ) {
        console.log("user is logged in")
        next()
    }
    else {
        console.log("no one is logged in")
        res.send({failure:'not logged in'})
    }
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('./'))

app.use(sessionsModule({
    cookieName: 'auth-cookie',  // front-end cookie name
    secret: 'DR@G0N$',        // the encryption password : keep this safe
    requestKey: 'session',    // we can access our sessions at req.session,
    duration: (86400 * 1000) * 7, // one week in milliseconds
    cookie: {
        ephemeral: false,     // when true, cookie expires when browser is closed
        httpOnly: true,       // when true, the cookie is not accesbile via front-end JavaScript
        secure: false         // when true, cookie will only be read when sent over HTTPS
    }
})) // encrypted cookies!


app.use(function(req, res, next){
    console.log('session? ', req.session)
    next()
})

app.get('/', function(req, res){
    res.sendFile('./login.html', {root:'.'})
})

app.get('/', function(req, res){
    res.sendFile('./wishlist.html', {root:'.'})
})

//so there aren't two files pointing to the home page
//app.get('/', function(req, res){
//    res.sendFile('./dashboard.html', {root:'.'})
//})

app.get('/session-test', function(req, res){
    console.log('session? ', req.session)
    if ( !req.session.counter ) {
        req.session.counter = 1
    }
    else {
        req.session.counter++
    }
    res.send('session counter: ' + req.session.counter)
})




//===============================================================================
//COINBASE API - EXCHANGE RATE
var Client = require('coinbase').Client;
var client = new Client({'apiKey': 'coinbase_key', 
                         'apiSecret': 'coinbase_secret'});

function getExchangeRate(req, res){
//    console.log("hello");
    client.getExchangeRates({'currency': 'BTC'}, function(err, rates) {
        console.log(rates);
        res.send(rates)
    })
}
//then send data up to frontend...
app.get('/exchange', function(req, res){
    getExchangeRate(req, res);
    
})
//===============================================================================
//COINBASE API - BUYING PRICE
var Client = require('coinbase').Client;
var client = new Client({'apiKey': 'coinbase_key',
                         'apiSecret': 'coinbase_secret'});

function getBuyPrice(req, res){
    client.getBuyPrice({'currencyPair': 'BTC-USD'}, function(err, price) {
      console.log(price);
      res.send(price)
    });
}
//then send data up to frontend...
app.get('/buy', function(req, res){
    getBuyPrice(req, res);
    
})

//COINBASE API - SELLING PRICE
var Client = require('coinbase').Client;
var client = new Client({'apiKey': 'coinbase_key',
                         'apiSecret': 'coinbase_secret'});

function getSellPrice(req, res){
    client.getSellPrice({'currencyPair': 'BTC-USD'}, function(err, price) {
      console.log(price);
      res.send(price)
    });
}
//then send data up to frontend...
app.get('/sell', function(req, res){
    getSellPrice(req, res);
    
})

app.post('/signup', function(req, res){
    // this user object has a plain-text password
    // we must hash the password before we save the user
    var newUser = new UserModel(req.body)
    bcrypt.genSalt(11, function(saltErr, salt){
        if (saltErr) {console.log(saltErr)}
        console.log('salt generated: ', salt)

        bcrypt.hash(newUser.password, salt, function(hashErr, hashedPassword){
            if ( hashErr){ console.log(hashErr) }
            newUser.password = hashedPassword

            newUser.save(function(saveErr, user){
                if ( saveErr ) { console.log(saveErr)}
                else {
                    req.session._id = user._id // this line is what actually logs the user in. 
                    res.send({success:'success!'})
                }
            })
        })

    })
})

app.post('/login', function(req, res){
    UserModel.findOne({username: req.body.username}, function(err, user){
        if ( err ) { console.log('failed to find user')}
        else if ( !user ) { 
            console.log('no user found')
            res.send('<h1>Failed to log in</h1>')
        }
        else {
            // at this point, we know they're trying to log in as someone who DOES exist in our database, but do they have the right password?
            bcrypt.compare(req.body.password, user.password, function(bcryptErr, matched){
                if ( bcryptErr ) { console.log(bcryptErr)}
                //matched will be either true or false
                else if ( !matched ) {
                    console.log('passwords dont match')
                    res.send('<h1>Failed to log in</h1>')
                }
                else {
                    req.session._id = user._id
                    res.send({success:'success!'})
                } 

            })
        }
    }) 
})

app.get('/dashboard', checkIfLoggedIn, function(req, res){
    UserModel.findOne({_id: req.session._id}, function(err, user){
        if ( user ) {
            res.send(`Hello, ${user.username}. Welcome to your dashboard!
                <a href="/logout">Log Out</a>

            `)
        }
        else {
            res.send("you don't belong here!")
        }
    })
})

app.get('/me', checkIfLoggedInForAjax, function(req, res){
    UserModel.findOne({_id:req.session._id}, function(err, user){
        res.send(user)
    })
})

app.get('/logout', function(req, res){
    req.session.reset()
    res.redirect('/')
})

//MONGO TO DO LIST
//=======================================================================
var TodoModel = require('./db')



//Send HTML to clients
app.get('/', function(req, res){
    res.sendFile('./index.html', {root: '.'})
})


//building CRUD:
//read
app.get('/todo', function(req, res, next){
    TodoModel.find({}, function(err, data){
        if (err) { 
            next(err) 
        }
        else {
            res.send(data)
        }
    })
})

//create
app.post('/todo', function(req, res){
    var newTodo = new TodoModel({
        text: req.body.todoText
    })
    newTodo.save(function(err){
        if (err) { 
            next(err) 
        }
        else {
            res.send({success:'success!'})
        }
    })
})

//update (incomplete/complete)
app.post('/todo/done', function(req, res){
    console.log('its done!')

    // mongoose 
    TodoModel.findOne({_id: req.body._id}, function(err, doc){
        console.log(doc)
        if (err) { 
            next(err) 
        }
        else {
            doc.done = !doc.done
            doc.save(function(err){
                if(err){
                    next(err)
                }
                else{
                    res.send({success:'success!'})
                }
            })
        }
    })
})

//delete
app.delete('/todo/:_id', function(req, res, next){

    TodoModel.remove({_id: req.params._id}, function(err){
        if (err) { 
            next(err) 
        }
        else {
            res.send({success:'success!'})
        }
    })
})



//where next(err) goes depending on error
app.use(function(req, res, next){
    res.status(404).send("not found")
})

//where next(err) goes depending on error
app.use(function(err, req, res, next){
    res.status(500).send("oops")
})
//=====================================================================

app.listen(80)