import express from 'express';
import Post from '../models/post';

const router = express.Router();

let posts = null;

Post.find({}, null, (err, datas) => {
    if(err) throw err;
    posts = datas;
});

router.post('/getInfo', (req, res) => {
    return res.json(posts);
});

router.post('/write', (req, res) => {
    const { type, username, left, top } = req.body;

    let post = new Post({
        type: type,
        username: username,
        left: left,
        top: top,
        likes: [],
        text: '',
        symbols: {}
    });

    posts.push(post);
        
    post.save(err => {
        if(err) throw err;        
        return res.json({
            id: post._id,
            success: true 
        });
    })
});

router.post('/delete', (req, res) => {
    const { postId, username } = req.body;

    const index = posts.findIndex((post) => { return post.id === postId });
    posts.splice(index, 1);

    Post.deleteOne({ _id: postId, username: username }, (err) => {
        if(err) throw err;

        return res.json({ success: true });
    });
});

router.post('/edit', (req, res) => {
    const { postId, username, text } = req.body;

    Post.updateOne({ _id: id }, { $set: { text: text } }, (err) => {
        if(err) throw err;

        return res.json({ success: true });
    });
});

router.post('/like', (req, res) => {
    const { postId, username } = req.body;

    Post.updateOne({ _id: postId }, { $push: { likes: username } }, (err) => {
        if (err) throw err;

        return res.json({ success: true });
    });
});

router.post('/dislike', (req, res) => {
    const { postId, username } = req.body;

    Post.updateOne({ _id: postId }, { $pull: { likes: username } }, (err) => {
        if(err) throw err;

        return res.json({ success: true });
    });
});

router.post('/symbol', (req, res) => {
    const { postId, type, count } = req.body;
    const target = `symbols.${type}`;

    Post.updateOne({ _id: postId }, { $inc: { [target] : count } }, (err) => {
        if(err) throw err;

        return res.json({ success: true });
    });
});

export default router;