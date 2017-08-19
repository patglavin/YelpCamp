//requires only mongoose and campgrounds
var mongoose    = require("mongoose"),
Campground      = require("./models/campground"),
Comment         = require("./models/comment");

//sample campgrounds, added on server startup
var data = [
    {
        name: "Cloud's Rest",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/54/Coulter_Campground.JPG",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla tempor eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce venenatis, lorem eget finibus porttitor, magna mauris sagittis mauris, in pharetra odio sapien a eros. Morbi placerat, neque a efficitur ullamcorper, mi lorem efficitur dolor, non efficitur tortor arcu quis massa. Duis ultrices orci vel ligula laoreet, nec tempor lectus ultricies. Sed ut gravida ipsum, vitae imperdiet turpis. Duis eleifend finibus sem, vitae laoreet turpis pulvinar volutpat. Curabitur augue leo, fermentum suscipit tempor vitae, ornare in dolor. Mauris consequat nulla ante, vitae ultricies nulla vulputate et. Integer ut felis volutpat, blandit risus sit amet, faucibus nisi. Fusce luctus magna turpis, a congue nunc iaculis accumsan. Sed maximus elementum sem, sit amet cursus arcu ultricies et. Donec eget tortor purus."
    },
    {
        name: "Sparrow's Landing",
        image: "https://c1.staticflickr.com/7/6089/6063751537_49e65160f2_b.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla tempor eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce venenatis, lorem eget finibus porttitor, magna mauris sagittis mauris, in pharetra odio sapien a eros. Morbi placerat, neque a efficitur ullamcorper, mi lorem efficitur dolor, non efficitur tortor arcu quis massa. Duis ultrices orci vel ligula laoreet, nec tempor lectus ultricies. Sed ut gravida ipsum, vitae imperdiet turpis. Duis eleifend finibus sem, vitae laoreet turpis pulvinar volutpat. Curabitur augue leo, fermentum suscipit tempor vitae, ornare in dolor. Mauris consequat nulla ante, vitae ultricies nulla vulputate et. Integer ut felis volutpat, blandit risus sit amet, faucibus nisi. Fusce luctus magna turpis, a congue nunc iaculis accumsan. Sed maximus elementum sem, sit amet cursus arcu ultricies et. Donec eget tortor purus."
    },
    {
        name: "Mountainside Pass",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR51IyKiuADh0W5S8jiSissRV0JrTGRXK6fQU3N0CvUeK0Zb8AYBw",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla tempor eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce venenatis, lorem eget finibus porttitor, magna mauris sagittis mauris, in pharetra odio sapien a eros. Morbi placerat, neque a efficitur ullamcorper, mi lorem efficitur dolor, non efficitur tortor arcu quis massa. Duis ultrices orci vel ligula laoreet, nec tempor lectus ultricies. Sed ut gravida ipsum, vitae imperdiet turpis. Duis eleifend finibus sem, vitae laoreet turpis pulvinar volutpat. Curabitur augue leo, fermentum suscipit tempor vitae, ornare in dolor. Mauris consequat nulla ante, vitae ultricies nulla vulputate et. Integer ut felis volutpat, blandit risus sit amet, faucibus nisi. Fusce luctus magna turpis, a congue nunc iaculis accumsan. Sed maximus elementum sem, sit amet cursus arcu ultricies et. Donec eget tortor purus."
    },
]

//removes current data, adds generic samples of campgrounds with comments
//exported and called in app.js
function seedDB(){
    //removes all campgrounds on startup
    Campground.remove({}, function(err){
    //   if (err) {
    //       console.log(err);
    //   } else {
    //         console.log("removed all campgrounds");
    //         //add a few campgrounds
    //         data.forEach(function(seed){
    //             Campground.create(seed, function(err, campground){
    //                 if (err) {
    //                     console.log(err);
    //                 } else {
    //                     console.log("added campground");
    //                     //create a comment on each campground (still in the forEach loop)
    //                     Comment.create({
    //                         text: "this place is great, i wish there was wifi",
    //                         author: "Homer"
    //                     }, function(err, comment){
    //                         if (err){
    //                             console.log(err)
    //                         } else {
    //                             //pushes those comments to the campgrounds
    //                             campground.comments.push(comment);
    //                             campground.save();
    //                             console.log("comment created")
    //                         }
    //                     })
    //                 }
    //             })  
    //         })
    //     }
    });
}

//exports appropriate function
module.exports = seedDB;