var express = require('express'),
    path = require('path'),
    app = express();

// Express Middleware for serving static files
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.get('/', function(req, res) {
   res.sendFile('public/main.html' , { root : __dirname});
});

app.listen(3000);

// //Expres
// var express = require('express');
// var app = express();
// var http = require('http').Server(app);
//
// //Socket.io
// app.use(express.static('libraries'));
// app.use(express.static('data'));
//
//
// app.get('/', function(req, res) {
//    res.sendFile('main.html' , { root : __dirname});
// });
//
// http.listen(process.env.PORT || 3000, function() {
//    console.log('listening on localhost:3000');
// });
