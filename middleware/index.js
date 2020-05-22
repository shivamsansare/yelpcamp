var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middlewareObj={};


middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Login First!");
    res.redirect("/login");
}


middlewareObj.checkOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,found){
            if(err){
                console.log(err);
                req.flash("error","Cannot Find");
                res.redirect("back");
            }
            else{
                console.log(found)
                if(found.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","No Access");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error","Login First!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,found){
            if(err){
                console.log(err);
                req.flash("error","Cannot Find");
                res.redirect("back");
            }
            else{
                console.log(found)
                if(found.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","No Access!");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error","Login First!");
        res.redirect("back");
    }
}

module.exports=middlewareObj