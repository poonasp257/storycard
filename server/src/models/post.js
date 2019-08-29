import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Post = new Schema({
    category: String,
    type: Number,
    left: String,
    top: String,  
    likes: Array,
    text: String,
    writer: String,
    created: { type: Date, default: Date.now }
});

export default mongoose.model('post', Post);