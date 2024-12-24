const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pinterestclone')
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
        },
    password: {
        type: String,
        },
    posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }],
    dp: {
        type: String, 
        default: '' 
        },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
        },
    fullname: {
        type: String,
        required: true,
        trim: true
        }
}, { 
    timestamps: true 
});

userSchema.plugin(plm)

module.exports = mongoose.model('user', userSchema);