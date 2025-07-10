import './App.css';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import AddExpense from './pages/dashboard/AddExpense';
import ViewExpense from './pages/dashboard/ViewExpense';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path='/add' element={<AddExpense />} />
            <Route path='/view' element={<ViewExpense />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
