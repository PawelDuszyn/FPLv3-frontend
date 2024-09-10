import React, { useEffect } from 'react';

function Home() {
  useEffect(() => {
    console.log('Home component rendered');
  }, []);

  return (
    <div>
      <h1>Logged!</h1>
    </div>
  );
}

export default Home;