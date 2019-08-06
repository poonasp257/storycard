import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Post = new Schema({
    type: Number,
    username: String,
    left: String,
    top: String,
    created: { type: Date, default: Date.now },    
    likes: Array,
    text: String,
    symbols: Object
});

export default mongoose.model('post', Post);