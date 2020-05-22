var express=require('express'),
    app=express(),
    bodyParser=require("body-parser"),
    Campground=require("./models/campground"),
    Comment=require("./models/comment"),
    User=require("./models/user"),
    seedDB=require("./seeds"),
    passport=require("passport"),
    LocalStrategy=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose"),
    methodOverride=require("method-override"),
    flash=require("connect-flash"),
    mongoose=require("mongoose");

//seedDB();


var authRoutes=require("./routes/index");
var campgroundRoutes=require("./routes/campground");
var commentRoutes=require("./routes/comments");

mongoose.connect("mongodb+srv://shivam:yelpcamp@cluster0-jui1f.mongodb.net/yelpcamp?retryWrites=true&w=majority",{useNewUrlParser: true});

app.use(require("express-session")({
    secret:"Shivam's created Yelpcamp",
    resave:false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(flash());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
});

app.use("/",authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.get("*",function(req,res){
    res.render("404");
});

//const PORT = 3000;

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Hello");
});