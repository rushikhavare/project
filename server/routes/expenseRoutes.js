import express from 'express';
import Expense from '../models/expense.js';

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json({ message: 'Expense created successfully', expense });
  } catch (error) {
    res.status(500).json({ message: 'Error adding expense', error: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 }); 
    res.status(200).json({ expenses });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error: error.message });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: 'Expense updated', updatedExpense });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
});

export default router;
