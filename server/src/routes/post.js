import express from 'express';
import Post from '../models/post';

const router = express.Router();

let postList = null;
let symbolList = {};
Post.find({}, null, (err, posts) => {
    if (err) throw err;

    postList = posts.map(post => {
        const { symbols, __v, ...others } = post._doc;
        symbolList[post.id] = symbols;
        return others;
    });
});

router.post('/getItems/post', (req, res) => {
    return res.json(postList);
});

router.post('/getItems/symbol', (req, res) => {
    const { postId } = req.body;
    if(postId === undefined) return res.status(404).send('404 Not Found');

    return res.json(symbolList[postId]);
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
        symbols: [],
        writer: req.session.loginInfo.username,
    });

    postList.push(post);
    post.save(err => {
        if (err) throw err;
        res.json({ success: true });
    }); 
    req.io.sockets.emit('attach', post);
});

router.post('/attach/symbol', (req, res) => {
    const { postId, category, type, left, top } = req.body;
    let symbols = symbolList[postId];
    
    symbols.push({ category, type, left, top });
    Post.updateOne({ id: postId }, { $push: { symbols: { category, type, left, top } } }, (err) => {
        if (err) throw err;
        res.json({ success: true });
    });
    req.io.sockets.emit('attach', { category, type, left, top });
});

router.post('/delete', (req, res) => {
    const { postId } = req.body;
    const username = req.session.loginInfo.username;
    const index = postList.findIndex((post) => {
        return post._id.toString() === postId.toString()
            && post.writer === username;
    });
    if (index < 0) return res.json({ success: false });

    postList.splice(index, 1);
    Post.deleteOne({ _id: postId, writer: username }, (err) => {
        if (err) throw err;
        res.json({ success: true });
    }); 

    req.io.sockets.emit('delete', index);
});

router.post('/edit', (req, res) => {
    const { postId, text } = req.body;
    const username = req.session.loginInfo.username;
    const index = postList.findIndex((post) => {
        return post._id.toString() === postId.toString()
            && post.writer === username;
    });
    if (index < 0) return res.json({ success: false });

    postList[index].text = text;
    Post.updateOne({ _id: postId, writer: username }, { $set: { text: text } }, (err) => {
        if (err) throw err;
        res.json({ success: true });
    });

    req.io.sockets.emit('update', { index, info: postList[index] });
});
 
router.post('/like', (req, res) => {
    const { postId, index } = req.body;
    const username = req.session.loginInfo.username;
    const postIndex = postList.findIndex(post => { 
        return post._id.toString() === postId.toString();
    });
    if (postIndex < 0) return res.json({ success: false });
    

    if(index < 0) { 
        postList[postIndex].likes.push(username);
        Post.updateOne({ _id: postId }, { $push: { likes: username } }, (err) => {
            if (err) throw err;
            res.json({ success: true });
        });
    }
    else { 
        postList[postIndex].likes.splice(index, 1);
        Post.updateOne({ _id: postId}, { $pull: { likes: username } }, (err) => {
            if(err) throw err;
            res.json({ success: true });
        });
    }
    
    req.io.sockets.emit('update', { index, info: postList[postIndex] });
});

export default router;