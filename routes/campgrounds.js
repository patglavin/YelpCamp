var express = require("express"),
router      = express.Router({mergeParams: true}),
Campground  = require("../models/campground"),
Comment     = require("../models/comment"),
middleware  = require("../middleware");

//=====================
//campgrounds routes
//=====================

//INDEX route - show all campgrounds
router.get("/", function(req, res){
    //get all campgrounds from mongodb
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    })
});


//CREATE route - add product of form to database
router.post("/", middleware.isLoggedIn, function(req, res){
   //get data from form, save to variable
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var description = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username,
   };
   var newCampground = {name: name, price: price, image: image, description: description, author: author};
   // create new campground, save to database
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err)
       } else {
           req.flash("success", "Your Campground was created");
           res.redirect("/campgrounds")
           console.log(newlyCreated)
       }
   })
   
});


//NEW route - display form to submit new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new")
});

//SHOW route - display show template of a specific campground
router.get("/:id", function(req, res){
    //find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//Edit campground, show form
//err handled in middleware, but err still needs to be "handled" or node freaks out here
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//Update campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updated) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //redirect back to show
            req.flash("success", "Your Campground was updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Your Campground was deleted");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;