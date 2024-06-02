import React from 'react';

function Home({ user }) {
  return (
    <div>
      <h1>Hi {user ? user.givenName : 'Guest'}</h1>
    </div>
  );
}

export default Home;
