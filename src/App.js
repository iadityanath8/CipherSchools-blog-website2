import './App.css';
import LsPage from './components/Login';
import BlogsPage from './components/Blog';
import { BrowserRouter as Router,Route,Routes, Link } from 'react-router-dom'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={LsPage}/>
        <Route path='/blogs' Component={BlogsPage}/>
      </Routes>
    </Router>
  )
}

export default App;
