import { useState } from "react";
import './com.css'

function LsPage(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      if (isLogin) {
        console.log('Logging in with:', email, password);
      } else {
        console.log('Signing up with:', email, password);
      }
    };
  
    return (
      <div className="login-signup-container">
        <div className="background-image"></div>
        <div className="form-container">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <form onSubmit={handleFormSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
          </form>
          <p>
            {isLogin
              ? "Don't have an account? "
              : 'Already have an account? '}
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    );

}
export default LsPage;