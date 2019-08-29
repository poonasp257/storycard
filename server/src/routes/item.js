import express from 'express';
import Post from '../models/post';
import Symbol from '../models/symbol';

const router = express.Router();

let items = {
    posts: null,
    symbols: null
};

Post.find({}, null, (err, posts) => {
    if (err) throw err;

    items.posts = posts.map(post => {
        const { __v, ...others } = post._doc;
        return others;
    });
});

Symbol.find({}, null, (err, symbols) => {
    if(err) throw err;

    items.symbols = symbols.map(symbol => {
        const { __v, ...others } = symbol._doc;
        return others; 
    });
})

router.post('/getItems', (req, res) => {
    return res.json(items);
});

router.post('/attach/post', (req, res) => {
    const { category, type, left, top } = req.body;
    let post = new Post({
        category: category,
        type: type,
        left: left,
        top: top,
        likes: [],
        text: '',
        writer: req.session.loginInfo.username,
    });

    items.posts.push(post);
    post.save(err => {
        if (err) throw err;
        res.json({ success: true });
    }); 
    req.io.sockets.emit('attach/post', post);
});

router.post('/attach/symbol', (req, res) => {
    const { category, type, left, top } = req.body;
    let symbol = new Symbol({
        category: category,
        type: type,
        left: left,
        top: top
    });

    items.symbols.push(symbol);
    symbol.save(err => {
        if (err) throw err;
        res.json({ success: true });
    }); 
    req.io.sockets.emit('attach/symbol', symbol);
});

router.post('/delete', (req, res) => {
    const { postId } = req.body;
    const username = req.session.loginInfo.username;
    const index = items.posts.findIndex((post) => {
        return post._id == postId && post.writer === username;
    });
    if (index < 0) return res.json({ success: false });

    items.posts.splice(index, 1);
    Post.deleteOne({ _id: postId, writer: username }, (err) => {
        if (err) throw err;
        res.json({ success: true });
    }); 

    req.io.sockets.emit('delete', index);
});

router.post('/edit', (req, res) => {
    const { postId, text } = req.body;
    const username = req.session.loginInfo.username;
    const index = items.posts.findIndex((post) => {
        return post._id == postId && post.writer === username;
    });
    if (index < 0) return res.json({ success: false });

    items.posts[index].text = text;
    Post.updateOne({ _id: postId, writer: username }, { $set: { text: text } }, (err) => {
        if (err) throw err;
        res.json({ success: true });
    });

    req.io.sockets.emit('update', { index, info: items.posts[index] });
});
 
router.post('/like', (req, res) => {
    const { postId, index } = req.body;
    const username = req.session.loginInfo.username;
    const postIndex = items.posts.findIndex(post => { 
        return post._id == postId;
    });
    if (postIndex < 0) return res.json({ success: false });

    if(index < 0) { 
        items.posts[postIndex].likes.push(username);
        Post.updateOne({ _id: postId }, { $push: { likes: username } }, (err) => {
            if (err) throw err;
            res.json({ success: true });
        });
    }
    else { 
        items.posts[postIndex].likes.splice(index, 1);
        Post.updateOne({ _id: postId}, { $pull: { likes: username } }, (err) => {
            if(err) throw err;
            res.json({ success: true });
        });
    }
    
    req.io.sockets.emit('update', { index: postIndex, info: items.posts[postIndex] });
});

export default router;