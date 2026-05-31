const express  = require('express');
const path     = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// ── Middleware ──
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Message Schema ──
const messageSchema = new mongoose.Schema({
    name:      { type: String, required: true },
    email:     { type: String, required: true },
    subject:   { type: String },
    message:   { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// ── Routes ──
app.get('/', function (req, res) {
    res.render('index');
});

// ── Contact Form Route ──
app.post('/contact', async function (req, res) {
    try {
        const { name, email, subject, message } = req.body;

        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();

        console.log('📩 Message saved to MongoDB!');
        console.log('Name:', name);
        console.log('Email:', email);

        res.json({ success: true, message: 'Message saved successfully!' });

    } catch (error) {
        console.error('❌ Error saving message:', error.message);
        res.status(500).json({ success: false, message: 'Server error!' });
    }
});


// ── Connect to MongoDB and Start Server ──
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio').then(() => {
    app.listen(process.env.PORT || 3000, function () {
        console.log('✅ Server running on port http://localhost:3000');
    });
}).catch((error) => {
    console.error('❌ MongoDB connection error:', error);
});