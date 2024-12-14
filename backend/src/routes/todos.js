const express = require('express');
const pool = require('../db/db');
const router = express.Router();

// Get all todos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Add a todo
router.post('/', async (req, res) => {
  try {
    const { description } = req.body;
    const result = await pool.query(
      'INSERT INTO todos (description) VALUES ($1) RETURNING *',
      [description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
