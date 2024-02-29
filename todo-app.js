// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Todo Model
const Todo = mongoose.model('Todo', {
  text: String,
  completed: Boolean
});

// Routes
// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add new todo
app.post('/api/todos', async (req, res) => {
  const { text } = req.body;
  try {
    const newTodo = new Todo({ text, completed: false });
    await newTodo.save();
    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update todo
app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { text, completed }, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete todo
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.json({ msg: 'Todo deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
