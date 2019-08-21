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
        return res.json({ success: true });
    });
 
    req.io.sockets.emit('attached/post', post);
});

router.post('/attach/symbol', (req, res) => {
    const { postId, ...info } = req.body;
    const index = posts.findIndex((post) => { return post.id === postId });
 
    posts[index].symbols.push({ info });
    Post.updateOne({ id: postId }, { $push: { symbols: { info } } }, (err) => {
        if (err) throw err;
        return res.json({ success: true });
    });

    req.io.sockets.emit('attached/symbol', { info });
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

    req.io.sockets.emit('update', { index, info: posts[index] });
});

//likes = [ 'poona', 'test', 'hello', ...other usernames ];
router.post('/like', (req, res) => {
    const { postId, username } = req.body;
    const index = posts.findIndex(post => { 
        return post.id === postId;
    });
    if (index < 0) return res.json({ success: false });

    const isExist = posts[index].likes.findIndex(like => {
        return like === username;
    });
    if(isExist < 0) { 
        posts[index].likes.push(username);
        Post.updateOne({ _id: postId }, { $push: { likes: username } }, (err) => {
            if (err) throw err;
            return res.json({ success: true });
        });
    }
    else { 
        posts[index].likes.splice(isExist, 1);
        Post.updateOne({ _id: postId}, { $pull: { likes: username } }, (err) => {
            if(err) throw err;
            return res.json({ success: true });
        });
    }

    req.io.sockets.emit('update', { index, info: posts[index] });
});

export default router;