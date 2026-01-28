require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

connectDB();

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const notesRoutes = require('./routes/notes.routes');
app.use('/api/notes', notesRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Home Route' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
