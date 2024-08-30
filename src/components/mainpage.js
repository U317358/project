



import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addtocart, fetchDataFailure, fetchDataStart, fetchDataSuccess } from '../redux/slice';
import Filtered from './filtered';
import { Link, useNavigate } from 'react-router-dom';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector((state) => state.data);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchDataStart());
      try {
        const response = await axios.get('http://localhost:5003/products');
        dispatch(fetchDataSuccess(response.data));
      } catch (error) {
        dispatch(fetchDataFailure(error.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAddToCart = (item) => {
    dispatch(addtocart(item)); 
    navigate('/component', { state: { item } }); 
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="main-page-container">
    
      <div className="shopping-cart-icon mb-4">
        <Link to="/component">
          <i className="fas fa-shopping-cart"></i>
        </Link>
      </div>
      
      <Filtered />

      <div className="container">
        <div className="row">
          {items.map(item => (
            <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card border">
                <div className="card-body text-center">
                  <img src={item.image} className="card-img-top img-fluid w-100" alt={item.name} style={{ maxHeight: '200px', objectFit: 'cover' }} />
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.price}</p>
                  <Link to={`/details/${item.id}`}>
                    <button className="btn btn-primary btn-sm">Details</button>
                  </Link>
                  <button className="btn btn-secondary btn-sm" onClick={() => handleAddToCart(item)}>Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;



