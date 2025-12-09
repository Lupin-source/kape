import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Verify from './components/Verify';
import QR from './components/QR';
import Admin from './components/Admin';
import AdminLogin from './components/AdminLogin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/qr" element={<QR />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
