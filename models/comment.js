var mongoose = require("mongoose");
var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})


//export to app.js
module.exports = mongoose.model("Comment", commentSchema);