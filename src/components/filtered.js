
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/slice';

const Filtered = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.data.filter);
  const filteredItems = useSelector((state) => state.data.filteredItems);

  const handleSearchChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="input-group mb-4">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search"
              value={filter}
              onChange={handleSearchChange}
            />
            <div className="input-group-append">
              <button className="btn btn-primary btn-lg" type="button">
                <i className="fas fa-search"></i> Search
              </button>
            </div>
          </div>
          <div className="row">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <div key={item.id} className="col-md-4 mb-4">
                  <div className="card shadow-sm border-light">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="alert alert-info" role="alert">
                  No items found
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filtered;
