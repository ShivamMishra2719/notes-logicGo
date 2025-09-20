
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const User = require('../models/User');

// Middleware to check token + user
const verifyToken = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.replace(/Bearer\s+/i, '').trim();
    const username = req.headers['x-username'];

    if (!token || token !== 'xyz101') {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'user not found' });

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
};

router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title) return res.status(400).json({ message: 'title required' });

    const note = new Note({
      title,
      content: content || '',
      userId: req.user._id,
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});


router.get('/', verifyToken, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

module.exports = router;
