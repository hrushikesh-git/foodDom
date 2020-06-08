var express = require("express");
var router = express.Router();
var passport = require("passport");
var Food = require("../models/foodpost.js");
var middleware = require("../middleware/index");

//All Post
router.get("/",function(req,res){
	Food.find({},function(err,allfood){
		if(err){
			console.log(err);
		}else{
			res.render("food/foodpost",{foods:allfood});
		}
	});
	
});

//New Post Added
router.post("/",middleware.isLoggedIn,function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id:req.user.id,
		username:req.user.username
	};
	var location = req.body.location;
	var newfoodpost = {name:name,description:description,image:image,location:location,author:author};
	Food.create(newfoodpost,function(err,newlycreated){
		if(err){
			console.log(err);
		}else{
		console.log(newlycreated);
		res.redirect("/foodpost");	
		}
	});
});

//newForm
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("food/new");
})

//Show
router.get("/:id",function(req,res){
	Food.findById(req.params.id).populate("comments").exec(function(err,foundFood){
		if(err){
			console.log(err);
		}else{
			res.render("food/show",{food:foundFood});
		}
	});
});

//=================================
//Edit Routes
//=================================
router.get("/:id/edit",middleware.checkFoodpostOwnership,function(req,res){
	Food.findById(req.params.id,function(err,foodpost){
		if(err){
			console.log(err);
		}else{
			res.render("food/edit",{food:foodpost});
		}
	});
});

//Update Edited

router.put("/:id",middleware.checkFoodpostOwnership,function(req,res){
	Food.findByIdAndUpdate(req.params.id,req.body.foodpost,function(err,updateFoodpost){
		if(err){
			res.redirect("/foodpost");
		}else{
			console.log(updateFoodpost);
			res.redirect("/foodpost/"+req.params.id);
		}
	});
});

//Delete Post

router.delete("/:id",middleware.checkFoodpostOwnership,function(req,res){
	Food.findByIdAndRemove(req.params.id,function (err){
		if(err){
			res.redirect("/foodpost");
		}else{
			res.redirect("/foodpost");
		}
	});
});

module.exports =router;

