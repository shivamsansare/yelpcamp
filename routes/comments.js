var express=require("express");
var router=express.Router({mergeParams:true});
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middleware=require("../middleware");

router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,found){
        if(err){
            comsole.log(err);
        }
        else{
            res.render("comments/new",{campground:found});
        }
    })
});

router.post("/",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    //console.log(req.body.comment);
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    });
});

router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,found){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            res.render("comments/edit",{campground_id:req.params.id, comment:found});
        }
    });
});

router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updated){
        if(err){
            redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

module.exports=router;
