var mongoose    = require("mongoose"),
    Comment     = require("./models/comment.js"),
    Campground  = require("./models/campground.js");


var data=
    [
        {
            name: "Matheran",
            image: "https://image3.mouthshut.com/images/imagesp/925003649s.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut tellus dapibus, sagittis ex in, dictum augue. Suspendisse ut mi auctor, pulvinar tortor non, hendrerit leo. Nulla in posuere tortor. Nulla finibus leo sem, vitae varius leo tempus sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis rhoncus, purus quis auctor scelerisque, velit lacus egestas augue, in pellentesque felis urna vel ipsum. Nullam a elementum tortor, eget hendrerit lorem."
        },
        {
            name: "Mahableshwar",
            image: "https://www.trawell.in/admin/images/upload/895207722Mahabaleshwar_Savitri_Point_Main.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut tellus dapibus, sagittis ex in, dictum augue. Suspendisse ut mi auctor, pulvinar tortor non, hendrerit leo. Nulla in posuere tortor. Nulla finibus leo sem, vitae varius leo tempus sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis rhoncus, purus quis auctor scelerisque, velit lacus egestas augue, in pellentesque felis urna vel ipsum. Nullam a elementum tortor, eget hendrerit lorem."
        },
        
        {
            name: "Shenandoah",
            image: "https://www.nps.gov/shen/planyourvisit/images/20170712_A7A9022_nl_Campsites_BMCG_960.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut tellus dapibus, sagittis ex in, dictum augue. Suspendisse ut mi auctor, pulvinar tortor non, hendrerit leo. Nulla in posuere tortor. Nulla finibus leo sem, vitae varius leo tempus sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis rhoncus, purus quis auctor scelerisque, velit lacus egestas augue, in pellentesque felis urna vel ipsum. Nullam a elementum tortor, eget hendrerit lorem."
        },
    ]

function seedDB(){
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("deleted");
            data.forEach(function(seed){
                Campground.create(seed,function(err,campground){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("added");
                        Comment.create({
                            text:"this is awesome",
                            author: "Shivam"
                        },function(err,comment){
                            campground.comments.push(comment);
                            campground.save();
                            console.log("comment");
                        })
                    }
                })
            });
        }
    })    
}
    
module.exports=seedDB;