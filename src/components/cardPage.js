



import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ComponentPage = () => {
  const location = useLocation();
  const { state } = location;
  const item = state?.item; // Retrieve the item from the state
  const navigate = useNavigate();

  const purchaseAlert = () => {
    alert('Thank you for shopping with us');
    navigate('/');
  };

  return (
    <div>
      {!item ? (
        <h1 className="text-center">No product added</h1> 
      ) : (
        <div className="item text-center">
          <img 
            src={item.image} 
            className="card-img-top img-fluid mx-auto" 
            alt={item.name} 
            style={{ maxHeight: '300px', objectFit: 'cover', width: 'auto' }} 
          />
          <h2 className="mt-3">{item.name}</h2>
          <p>Price: ${item.price}</p>
        </div>
      )}

      <div className="text-center mt-3">
        <button className="btn btn-primary btn-sm" onClick={purchaseAlert}>Purchase</button>
      </div> 
    </div>
  );
};

export default ComponentPage;



