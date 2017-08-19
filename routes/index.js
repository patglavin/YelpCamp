var express = require("express"),
router      = express.Router({mergeParams: true}),
passport    = require("passport"),
User        = require("../models/user");

//Landing page
router.get("/", function(req, res){
    res.render("landing");
});

//================
//LOGIN routes
//================

//render register form
router.get("/register", function(req, res) {
    res.render("register");
});

//handle signup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("back");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp, " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//render login form
router.get("/login", function(req, res) {
    res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local",
    {successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function(req, res) {
});

//logout route, using passport's req.logout function
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged You Out");
    res.redirect("/campgrounds");
});

module.exports = router;