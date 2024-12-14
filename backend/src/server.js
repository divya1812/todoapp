const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const _dirname=app.path("")

const buildpath=path.join(_dirname,"../client/build")
app.use(express.static(buildpath))
app.use(cors());
app.use(express.json());



// Routes
app.use('/api/todos', todoRoutes);

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
