import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Home from './Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    console.log('Handling login');
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Home />
      ) : (
        <div>
          <Login onLogin={handleLogin} />
          <Register />
        </div>
      )}
    </div>
  );
}

export default App;