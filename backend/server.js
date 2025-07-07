const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://devanukulchandra:h8N7uInPuZp2oK7z@cluster0.8hccjcs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Registration Model
const Registration = require('./models/Registration');

// Routes
app.post('/api/register-course', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if already submitted
    const existing = await Registration.findOne({ email, completed: true });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Upsert (save progress)
    const updated = await Registration.findOneAndUpdate(
      { email },
      { ...req.body },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all registrations (with search/sort)
app.get('/api/registrations', async (req, res) => {
  const { search, sortBy } = req.query;
  let query = {};
  if (search) {
    query = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    };
  }
  let sort = {};
  if (sortBy) {
    sort[sortBy] = 1;
  }
  const registrations = await Registration.find(query).sort(sort);
  res.json(registrations);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
