// include external modules
var express = require("express");
var bodyParser = require("body-parser");
var session = require('express-session');
var UserFtns = require("./UserFtns.js");
var PostFtns = require("./PostFtns.js");
var app = express();
var moment = require("moment");

// set the port for use
var PORT = process.env.port || 8000;





app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
	secret: "Secret Key",
	resave: false,
	saveUninitialized: false
}));

//do this for every request
app.use(function(req, res, next) {
	console.log(req.url);
	next();
});



app.post('/posts', function(req,res){
	console.log(req.session);
	var student = req.session.user;
	var emotion = req.body.emotion;
	var date = req.body.date;
	var time = moment().format("h:mm a");
	var post = req.body.post;
	var counselor = req.session.counselorId;
	console.log(req.session.counselorId);
	PostFtns.makePost(student,emotion,date,time,post,counselor);
});

// Display posts by date on the index page
app.get('/posts',function(req,res){
	var posts = PostFtns.getAllPosts();
	console.log(posts);
	// console.log(posts, "this is our post stuff");
	res.send(posts);
});

// if we want to respond to GET requests for "/"
app.get("/", function(req, res) {
	// console.log(req.session.user);
	if(req.session.user && req.session.permission == "student"){
		res.sendFile(__dirname + "/public/student.html");
	}else if(req.session.user && req.session.permission == "counselor"){
		res.sendFile(__dirname + "/public/counselor.html");
	}else {
		res.redirect("/login");
	}
	
});


app.get('/login', function(req, res){
	res.sendFile(__dirname + "/public/login.html");
});

app.post('/login', function(req, res){
	var id;
	if (UserFtns.checkLogin(req.body.username, req.body.password).isit)
	{
		console.log(req.body.username, "i am user");
		var permission = UserFtns.checkLogin(req.body.username, req.body.password).permission;

		req.session.user = req.body.username;
		req.session.permission = permission;
		if(permission == "student"){
			 id = UserFtns.checkLogin(req.body.username, req.body.password).counselorId;
			req.session.counselorId = id;
			// console.log(req.session.counselor, "student");
		}else {
			id = UserFtns.checkLogin(req.body.username, req.body.password).counselorId;
			req.session.counselorId = id;
			// console.log(req.session.counselorId, "SEE IF THIS WORKS");
		}
		res.send("success");
	}else {
		res.send("error");
	}
});

app.get('/logout', function(req,res){
	req.session.user = "";
	res.redirect("/login");
});



app.post('/register', function(req, res){
	//shorthand variables to save us time
	var username = req.body.username;
	var password = req.body.password;
	var permission = req.body.permission;
	if (UserFtns.userExists(username)) {
		if (UserFtns.checkLogin(username, password)) {
			req.session.user = username;
			req.session.permission = permission;
			res.send("success");
		} else {
			// Otherwise, they might be trying to
			// take a username that already exists - error!
			res.send("error");
		}
	} else {
		// Username is not taken, register a new user
		// and log them in - success!
		if(UserFtns.registerUser(username, password)) {
			req.session.user = username;
			req.session.permission = permission;
			res.send("success");
		} else {
			// there was a problem registering
			res.send("error");
		}
	}
});
// if we want to serve static files out of ./public
app.use(express.static("public"));

// actually start the server
app.listen(PORT, function() {
	console.log("Listening on port " + PORT);
});
