
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/mental-health', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Mental Health Entry Model
const MentalHealthEntry = mongoose.model('MentalHealthEntry', {
  date: Date,
  mood: Number, // 1 to 10 scale
  stressLevel: Number, // 1 to 10 scale
  sleepHours: Number
});

// Routes
// Add new mental health entry
app.post('/api/mental-health', async (req, res) => {
  const { date, mood, stressLevel, sleepHours } = req.body;
  try {
    const newEntry = new MentalHealthEntry({ date, mood, stressLevel, sleepHours });
    await newEntry.save();
    res.json(newEntry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all mental health entries
app.get('/api/mental-health', async (req, res) => {
  try {
    const entries = await MentalHealthEntry.find().sort({ date: 1 });
    res.json(entries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
