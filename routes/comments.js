var express = require("express"),
router      = express.Router({mergeParams: true}),
Campground  = require("../models/campground"),
Comment     = require("../models/comment"),
middleware  = require("../middleware");

//==================
//Comments Routes
//==================

//NEW route - add comment from the campground's show page
router.get("/new", middleware.isLoggedIn, function(req, res) {
    //find campground with provided ID
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            req.flash("error", "Something went wrong");
            console.log(err);
        } else {
            //pass campground to EJS template
            res.render("comments/new", {campground: campground});
        }
    });
});

//CREATE route - push comment to routerropriate db, save
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            req.flash("error", "Something went wrong");
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    //add username and id to comment, save comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save;
                    //push into comments on campground, save campground
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash("success", "Your Comment was added");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            req.flash("error", "Could not find comment");
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

//update route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err) {
            req.flash("error", "Could not find comment");
            res.redirect("back");
        } else {
            req.flash("success", "Your Comment was updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//delete route
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        //either way, we're showing the SHOW template
        if (err) {
            req.flash("error", "Something went wrong");
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            req.flash("success", "Your Comment was deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;