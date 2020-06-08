var express = require("express");
var router = express.Router({mergeParams: true});
var Food = require("../models/foodpost");
var User = require("../models/user");
var Comment = require("../models/comments");
var middleware = require("../middleware/index")

//===================================
//		C O M M  E N T    R O U T E	
//===================================
router.get("/new", middleware.isLoggedIn ,function(req,res){
	console.log(req.params.id);
	Food.findById(req.params.id,function(err,food){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{food:food});
		}
	})
});


router.post("/",middleware.isLoggedIn,function(req,res){
	Food.findById(req.params.id,function(err,food){
		if(err){
			console.log(err);
			res.redirect("/foodpost");
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					food.comments.push(comment);
					food.save();
					res.redirect("/foodpost/"+food._id);
				}
			})
		}
	})
});

//====================================
//			E d i t
//====================================

//Edit Form
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function (req, res){
	Comment.findById(req.params.comment_id,function (err, foundComment){
		console.log(req.params.comment_id)
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit",{foodpost_id:req.params.id,comment:foundComment});
		}
	});
});
//Edit Request
router.put("/:comment_id",function (req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err,updateComment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/foodpost/"+req.params.id,);
		}
	});
});

//Delete Comments

router.delete("/:comment_id",middleware.checkCommentOwnership,function (req, res){
	Comment.findByIdAndRemove(req.params.comment_id,function (err){
		console.log(req.params.comment_id);
		if(err){
			res.redirect("back");
		}else{
			console.log("Comment Delete");
			res.redirect("/foodpost/" + req.params.id)
		}
	});
});



module.exports = router;