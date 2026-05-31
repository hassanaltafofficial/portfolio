const mongoose = require('mongoose');

// ── Message Schema ──
const messageSchema = new mongoose.Schema({
    name:      { type: String, required: true },
    email:     { type: String, required: true },
    subject:   { type: String },
    message:   { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);


module.exports = Message;