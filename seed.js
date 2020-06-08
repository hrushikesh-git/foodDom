var mongoose = require("mongoose"),
	Food = require("./models/foodpost.js"),
	Comment = require("./models/comments.js");

var data = [
		{
		name:"pizza",
	image:"https://images.unsplash.com/photo-1506354666786-959d6d497f1a?//ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		location:"Abc //CAfe",
		description:"Absolutely Fantastic And high in Calories ;-)"
	},
	
	{name:"Burger",image:"https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?//ixlib=rb-//1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",location:"StarBucks",
	 description:"Awsm Vibes Cool place Hot Food And Chicks"
		
	},
	
	{name:"Salad",image:"https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",location:"Green House",
	 description:"Healthy and Tasty Home made type Food"
		
	}
	
]

function seedDB(){
	//Remove Everything
	Food.remove({},function(err){
	if(err){
			console.log(err);
		}
		console.log("Food Post Removed");
		data.forEach(function(seed){
			Food.create(seed,function(err,food){
				if(err){
					console.log(err)
				}else{
					console.log("Added a foodpost");
					  Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                food.comments.push(comment);
                                food.save();
                                console.log("Created new comment");
                            }
                        });
				}
			})
		})
	});
}

module.exports = seedDB;
