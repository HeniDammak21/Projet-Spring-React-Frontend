import React from 'react'
import { Link } from 'react-router-dom';
import AddCategoryCmp from './AddCategoryCmp';

function Category() {

  return (
<div className='container-fluid px-4'>
<div className='card mt-4'>
    <div className="card-header">
        <h4>Add Category
        <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">View Categories</Link>
        </h4>
    </div>
    <div className="card-body">
<AddCategoryCmp/>
</div>
</div>
</div>
  )
}

export default Category
