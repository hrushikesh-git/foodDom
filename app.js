var express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	flash = require("connect-flash"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Food = require("./models/foodpost.js"),
	User = require("./models/user.js"),
	seedDB = require("./seed.js"),
	Comment = require("./models/comments.js"),
	bodyParser = require("body-parser");

//requiring routes

var commentRoutes = require("./routes/comments"),
 	foodRoutes = require("./routes/foodpost"),
 	indexRoutes = require("./routes/index")

mongoose.connect("mongodb://localhost/food_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

//PassPort Configuration

app.use(require("express-session")({
	secret:"I Love Football",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});



//Routes
app.use("/",indexRoutes);
app.use("/foodpost",foodRoutes);
app.use("/foodpost/:id/comments",commentRoutes);



app.listen(process.env.PORT || 1500,process.env.IP,function(err){
	if(err){
		console.log(err);
	}else{ 
	console.log("Server Started!!");
	}
	})