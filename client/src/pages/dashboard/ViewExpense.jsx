import { useEffect, useState } from 'react';
import styles from './ViewExpense.module.css';

export default function ViewExpense() {
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    category: '',
    amount: '',
    date: '',
    comments: ''
  });

  const categories = [
    'Shopping', 'Entertainment', 'Healthcare',
    'Housing', 'Education', 'Travel'
  ];

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    try {
      const res = await fetch('http://localhost:3000/expense/all', {
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch');
      setExpenses(data.expenses || []);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this expense?')) return;
    try {
      const res = await fetch(`http://localhost:3000/expense/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Delete failed');
      setExpenses(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  function handleEditClick(item) {
    setEditId(item._id);
    setEditData({
      category: item.category,
      amount: item.amount,
      date: item.date.split('T')[0],
      comments: item.comments || ''
    });
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  }

  async function handleUpdate(id) {
    try {
      const res = await fetch(`http://localhost:3000/expense/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(editData)
      });
      if (!res.ok) throw new Error('Update failed');

      setEditId(null);
      fetchExpenses(); // Refresh to see updatedAt
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.head}>
          <div className={styles.cell}>Category</div>
          <div className={styles.cell}>Amount</div>
          <div className={styles.cell}>Date</div>
          <div className={styles.cell}>Updated At</div>
          <div className={styles.cell}>Comments</div>
          <div className={styles.cell}>Edit</div>
          <div className={styles.cell}>Delete</div>
        </div>

        <div className={styles.body}>
          {expenses.map((item, index) => (
            <div key={item._id || index} className={styles.row}>
              <div className={styles.cell}>
                {editId === item._id ? (
                  <select
                    name="category"
                    value={editData.category}
                    onChange={handleEditChange}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                ) : item.category}
              </div>

              <div className={styles.cell}>
                {editId === item._id ? (
                  <input
                    name="amount"
                    type="number"
                    value={editData.amount}
                    onChange={handleEditChange}
                  />
                ) : `₹${item.amount}`}
              </div>

              <div className={styles.cell}>
                {editId === item._id ? (
                  <input
                    name="date"
                    type="date"
                    value={editData.date}
                    onChange={handleEditChange}
                  />
                ) : new Date(item.date).toLocaleDateString()}
              </div>

              <div className={styles.cell}>
                {item.updatedAt
                  ? new Date(item.updatedAt).toLocaleString()
                  : '-'}
              </div>

              <div className={styles.cell}>
                {editId === item._id ? (
                  <input
                    name="comments"
                    value={editData.comments}
                    onChange={handleEditChange}
                  />
                ) : item.comments || '-'}
              </div>

              <div className={styles.cell}>
                {editId === item._id ? (
                  <button
                    className={styles.editBtn}
                    onClick={() => handleUpdate(item._id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                )}
              </div>

              <div className={styles.cell}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
