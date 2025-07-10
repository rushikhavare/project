import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      'Shopping',
      'Entertainment',
      'Healthcare',
      'Housing',
      'Education',
      'Travel'
    ]
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    required: true
  },
  comments: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true 
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
