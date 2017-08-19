var Campground  = require("../models/campground"),
Comment         = require("../models/comment");

//all the middleware goes here
var middlewareObj = {};

//adding each middleware function to the middlewareObj object
middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err){
                console.log(err);
                req.flash("error", "Could not find Campground");
                res.redirect("back");
            } else {
                //do they own the campground?
                if (foundCampground.author.id.equals(req.user.id)) {
                    next();
                } else {
                    req.flash("error", "This is not your Campground")
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error", "You need to be Logged In");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err){
                console.log(err);
                req.flash("error", "Could not find Comment");
                res.redirect("back");
            } else {
                //do they own the comment?
                if (foundComment.author.id.equals(req.user.id)) {
                    next();
                } else {
                    req.flash("error", "This is not your Comment");
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error", "You need to be Logged In");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
};

//exporting the object containing the functions
module.exports = middlewareObj