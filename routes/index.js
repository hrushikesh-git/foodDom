var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/",function(req,res){
	res.render("landing");
});

//Sign Up
router.get("/register",function(req,res){
	res.render("register");
});

router.post("/register",function(req,res){
	var newUser = new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register");
		}else
			passport.authenticate("local")(req,res,function(){
				res.redirect("foodpost");
			});
	});
});
//Login

router.get("/login",function(req,res){
	res.render("login");
});

router.post("/login",passport.authenticate("local",{
	successRedirect:"/foodpost",
	failuerRedirect:"/login"
}),function(req,res){
	
});

//logout

router.get("/logout", function(req, res){
   req.logout();
   req.flash("success","Successfully LoggedOut")
   res.redirect("/foodpost");
});

//middleware

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;
