// App.js
import './App.css';
import LoginPage from './components/Login';
import BlogsPage from './components/Blog';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './authentication/authContext';
import ProtectedRoute from './protectedRoute'; // Ensure correct import path


const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blogs" element={<ProtectedRoute element={BlogsPage}/>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;


