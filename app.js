//add dependancies
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    flash           = require("connect-flash"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    methodOverride  = require("method-override"),
    seedDB          = require("./seeds");

//require routes, broken out into separate files
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

//connect to local database, use mongo client, use default js promise library
mongoose.connect("mongodb://localhost/yelp_camp_v8", {useMongoClient: true});
mongoose.Promise = global.Promise;

//use bodyparser
app.use(bodyParser.urlencoded({extended: true}));

//view engine set to ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//use method override for CRUD routes
app.use(methodOverride("_method"));

//use connect flash for flash messages
app.use(flash());

//listen on correct port (c9 specific), send a short console.log message on server's start
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yelpcamp server started!");
});

//seed database with sample campgrounds
//No longer running seed for right now, in v8 it will only clear all campgrounds
//testing new stuff after comment refactor
//seedDB();

//use express session, set secret and options
app.use(require("express-session")({
    secret: "fat wallet boy",
    resave: false,
    saveUninitialized: false
}));

//passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware, feeds every route the req.user
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//use routing files
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);