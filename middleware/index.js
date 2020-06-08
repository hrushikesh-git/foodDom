var Food = require("../models/foodpost");
var Comment = require("../models/comments");

//all MiddleWare Goes Here

var middlewareObj = {};

middlewareObj.checkFoodpostOwnership = function(req,res,next) {
	if(req.isAuthenticated()){
		Food.findById(req.params.id,function(err,foodpost){
			if(err){
				res.redirect("back");
			}else{
				//Dose owner Owns a Post ?
				if(foodpost.author.id.equals(req.user.id)){
					next();
				}else{
					res.redirect("back");
				}
			}
		});
	}else{
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req,res,next) {
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,comment){
			if(err){
				res.redirect("back");
			}else{
				//Dose owner Owns a Post ?
				if(comment.author.id.equals(req.user.id)){
					next();
				}else{
					res.redirect("back");
				}
			}
		});
	}else{
		res.redirect("back");
	}
}

 middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
	}
	req.flash("error","Plese Login First!!")
    res.redirect("/login");
}

module.exports = middlewareObj;