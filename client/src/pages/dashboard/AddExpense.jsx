import { useState } from 'react';
import styles from './AddExpense.module.css';

export default function AddExpense() {
    const [formData, setFormData] = useState({
        category: '',
        amount: '',
        date: '',
        comments: ''
    });

    console.log(formData);

    const categories = [
        'Shopping',
        'Entertainment',
        'Healthcare',
        'Housing',
        'Education',
        'Travel',
    ];

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleAddExpense(e) {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3000/expense/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', 
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to add expense');
            }

            alert('Expense added successfully');
            setFormData({
                category: '',
                amount: '',
                date: '',
                comments: ''
            });
        } catch (error) {
            alert(error.message);
        }
    }


    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleAddExpense}>
                <h1 className={styles.title}>Add Expense</h1>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Category</label>
                    <select
                        className={styles.select}
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Amount</label>
                    <input
                        className={styles.input}
                        type="number"
                        name="amount"
                        placeholder="Enter amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Date</label>
                    <input
                        className={styles.input}
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Comments</label>
                    <textarea
                        className={styles.textarea}
                        name="comments"
                        placeholder="Add any comments (optional)"
                        value={formData.comments}
                        onChange={handleInputChange}
                        rows="3"
                    />
                </div>

                <button className={styles.button} type="submit">
                    Add Expense
                </button>
            </form>
        </div>
    )
}