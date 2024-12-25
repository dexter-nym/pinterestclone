const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postcaption: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    image: {
        type: String,
        
    },
    createdat: {
        type: Date,
        default: Date.now, // Automatically sets the current date and time
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user', // Reference to the User model
        },
    ],
});

module.exports = mongoose.model('post', postSchema);


