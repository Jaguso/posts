const express = require('express');
const app = express();
const mongoose = require('mongoose');

var User = require('./api/models/user');
var Post = require('./api/models/post');

mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
);


app.get('/', (req, res) => {
    res.send("it works");
});

var alex = new User({
    name: "Alex"
});

var joe = new User({
    name: "Joe"
});


alex.save();
joe.save();


var post = new Post({
    title: "Hello world",
    postedBy: alex._id,
    comments: [{
        text: "Nice ass",
        postedBy: joe._id
    }, 
    {
        text: "Thanks",
        postedBy: alex._id
    }]
});

post.save(function(error) {
    if (!error) {
        Post.find({})
            .populate('postedBy')
            .populate('comments.postedBy')
            .exec(function(error, post) {
                console.log(JSON.stringify(post, null, "\t" ))
            })
    }
})






module.exports = app;