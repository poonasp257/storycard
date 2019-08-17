import express from 'express';
import Post from '../models/post';
import _ from 'lodash';

const router = express.Router();

let posts = null;
Post.find({}, null, (err, datas) => {
    if (err) throw err;
    posts = datas;
});

router.post('/getItems/post', (req, res) => {
    return res.json(posts);
});

router.post('/getItems/symbol', (req, res) => {
    const { postId } = req.body;
    const index = posts.findIndex((post) => { return post.id === postId });

    return res.json(posts[index].symbols);
});

router.post('/attach/post', (req, res) => {
    const { type, left, top } = req.body;
    let post = new Post({
        type: type,
        left: left,
        top: top,
        likes: [],
        text: '',
        symbols: [],
        username: req.session.loginInfo.username,
    });

    posts.push(post);
    post.save(err => {
        if (err) throw err;
        return res.json({
            id: post._id,
            success: true
        });
    });
 
    req.io.sockets.emit('attached/post', post);
});

router.post('/attach/symbol', (req, res) => {
    const { type, postId, left, top } = req.body;
    const index = posts.findIndex((post) => { return post.id === postId });

    posts[index].symbols.push({ type, left, top });
    Post.updateOne({ id: postId }, { $push: { symbols: { type, left, top } } }, (err) => {
        if (err) throw err;

        return res.json({ success: true });
    });

    req.io.sockets.emit('attached/symbol', { type, left, top });
});

router.post('/delete', (req, res) => {
    const { postId } = req.body;
    const username = req.session.loginInfo.username;
    const index = posts.findIndex((post) => {
        return post.id === postId
            && post.username === username;
    });
    if (index < 0) return res.json({ success: false });

    posts.splice(index, 1);
    Post.deleteOne({ _id: postId, username: username }, (err) => {
        if (err) throw err;

        return res.json({ success: true });
    }); 

    req.io.sockets.emit('delete', index);
});

router.post('/edit', (req, res) => {
    const { postId, text } = req.body;
    const username = req.session.loginInfo.username;
    const index = posts.findIndex((post) => {
        return post.id === postId
            && post.username === username;
    });
    if (index < 0) return res.json({ success: false });

    posts[index].text = text;
    Post.updateOne({ _id: postId, username: username }, { $set: { text: text } }, (err) => {
        if (err) throw err;

        return res.json({ success: true });
    });

    req.io.sockets.emit('edit', { index, info: posts[index] });
});

router.post('/like', (req, res) => {
    const { postId } = req.body;
    const username = req.session.loginInfo.username;
    const index = posts.findIndex((post) => {
        return post.id === postId
            && post.username === username;
    });
    if (index < 0) return res.json({ success: false });

    Post.updateOne({ _id: postId }, { $push: { likes: username } }, (err) => {
        if (err) throw err;

        return res.json({ success: true });
    });
});

router.post('/dislike', (req, res) => {
    const { postId } = req.body;
    const username = req.session.loginInfo.username;

    Post.updateOne({ _id: postId }, { $pull: { likes: username } }, (err) => {
        if (err) throw err;

        return res.json({ success: true });
    });
});

export default router;