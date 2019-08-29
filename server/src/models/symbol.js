import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Symbol = new Schema({
    category: String,
    type: Number,
    left: String,
    top: String
});

export default mongoose.model('symbol', Symbol);