

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { clearItemDetails, fetchItemDetailsFailure, fetchItemDetailsStart, fetchItemDetailsSuccess } from '../redux/slice';


const DetailsPage = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const { itemDetails, detailsStatus, detailsError } = useSelector((state) => state.data);

  useEffect(() => {
    const fetchItemDetails = async () => {
      dispatch(fetchItemDetailsStart());
      try {
        const response = await axios.get(`http://localhost:5003/itemdetails/${id}`);
        dispatch(fetchItemDetailsSuccess(response.data));
      } catch (error) {
        dispatch(fetchItemDetailsFailure(error.message));
      }
    };

    fetchItemDetails();

    return () => {
      dispatch(clearItemDetails()); 
    };
  }, [dispatch, id]);

  if (detailsStatus === 'loading') return <p>Loading...</p>;
  if (detailsStatus === 'failed') return <p>Error: {detailsError}</p>;

  return (
    <div className="container mt-4">
      {itemDetails ? (
        <div>
          <h2>{itemDetails.name}</h2>
          <p> {itemDetails.id}</p>
          {itemDetails.descriptio}  
          {itemDetails.price}
        </div>
      ) : (
        <p>Item not found.</p>
      )}
    </div>
  );
};

export default DetailsPage;
