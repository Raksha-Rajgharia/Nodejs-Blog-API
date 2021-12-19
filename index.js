const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//import modals
const Post = require('./src/models/post')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//define database connection
const db = mongoose.connect('mongodb://localhost:27017/first-node-api')

app.get('/', function (req, res) {
    //handle request root route
    res.send({ ping: 'pong' })
})
// app.get('/presentation', function (req, res) {
//     //handle request for presentation route
//     res.send({ presentation: 'Hello World' })
// })

//CRUD Operations.
//create post
app.post('/posts', function (req, res) {
    //get values from request payload
    const title = req.body.title
    const author = req.body.author
    const content = req.body.content
    //Assign values to post model
    var post = new Post();
    post.title = title;
    post.author = author;
    post.content = content;
    //save post
    post.save(function (error, savedPost) {
        if (error) {
            //send error response
            res.status(500).send({ error: 'Unable to save post' })
        }
        else {
            //send success response
            res.status(200).send(savedPost)
        }
    });
    // res.send({ title: title, author: author, content: content })

});
//get list of all posts
app.get('/posts', function (req, res) {
    Post.find({}, function (error, posts) {
        if (error) {
            //send error response
            res.status(422).send({ error: 'Unable to fetch posts' })
        }
        else {
            //send success response
            res.status(200).send(posts)
        }
    })
})

//get only single post
app.get('/posts/:id', function (req, res) {
    Post.findById(req.params.id, function (error, Singlepost) {
        if (error) {
            //send error response
            res.status(422).send({ error: 'Unable to fetch post ....entered wrong ID' })
        }
        else {
            //send success response
            res.status(200).send(Singlepost)
        }
    })
})

// update post by id 
app.patch('/posts/:id', function (req, res) {
    Post.updateOne({ _id: req.params.id }, { $set: { title: req.body.title, author: req.body.author } }, function (error, Updatedpost) {
        if (error) {
            //send error response
            res.status(422).send({ error: 'Unable to update post ....entered wrong ID' })
        }
        else {
            //send success response
            res.status(200).send(Updatedpost)
        }
    })
})

//delete post by id
app.delete('/posts/:id', function (req, res) {
    Post.remove({ _id: req.params.id }, function (error, Deletedpost) {
        if (error) {
            //send error response
            res.status(422).send({ error: 'Unable to delete post ....entered wrong ID' })
        }
        else {
            //send success response
            res.status(200).send(Deletedpost)
        }
    })
})

app.listen(3001, function () {
    console.log('server is running at port 3001')
})