const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/postsdb', { useNewUrlParser: true, useUnifiedTopology: true });

//mongoose.connect('mongodb://username:password@localhost:27017/postsdb', { useNewUrlParser: true, useUnifiedTopology: true });


const postSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Post = mongoose.model('Post', postSchema);

// CRUD Operations
app.post('/api/posts', async (req, res) => {
    const post = new Post(req.body);
    await post.save();
    res.status(201).send(post);
});

app.get('/api/posts', async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
});

app.put('/api/posts/:id', async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(post);
});

app.delete('/api/posts/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});