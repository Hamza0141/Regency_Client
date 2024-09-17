import React from 'react';

function Unauthorized() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">Unauthorized</h1>
      <p className="not-found-message">
        
          You don't have the authorization to access the page you requested
        
      </p>
    </div>
  );
}

export default Unauthorized; 