import styles from './DashboardLayout.module.css';
import { Outlet, Link, useNavigate } from 'react-router-dom';

export default function DashboardLayout() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await fetch('http://localhost:3000/user/logout', {
        method: 'GET',
        credentials: 'include', 
      });

      navigate('/'); 
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Link to='/add' className={styles.tab}>Add Expense</Link>
        <Link to='/view' className={styles.tab}>View Expenses</Link>
        <Link to='/add' className={styles.tab}>Visualize</Link>

        <div onClick={handleLogout} className={styles.tab}>
          Logout
        </div>
      </aside>

      <section className={styles.mainSection}>
        <Outlet />
      </section>
    </div>
  );
}
