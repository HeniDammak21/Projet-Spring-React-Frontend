import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LoadingCmp from '../LoadingCmp';
import ChangeQtyModal from './ChangeQtyModal';
import './ViewStock.css'


function ViewStock() {
    const [loading, setLoading] = useState(true);
    const [productslist, setProductslist] = useState([]);
    const [editModalShow, setEditModalShow] = useState(false);
    const [toEdit, setToEdit] = useState({});
    const [func, setFunc] = useState({})

    const handleCheckbox = (e)=>{
        e.persist()

    }

    useEffect(() => {
        let isMounted = true;
        document.title = "View Product"

        axios.get('/product/getAll').then(res => {
            if (isMounted) {
                if (res.status === 200) {
                    setProductslist(res.data);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        }
    }, [])


    var ViewStock_HTMLTABLE = [];
    if (loading) {
        return (
            <LoadingCmp />
        )
    }
    else {
        ViewStock_HTMLTABLE = productslist.map((item) => {

            return (
                <div key={item.id} className="mx-0 row border-bottom border-200 text-center">
                    <div className='py-3 col-1 text-start'>{item.id}</div>
                    <div className='py-3 col-1 text-start'><img src={`http://localhost:8080/uploads/${item.image}`} alt={item.name} /></div>
                    <div className='py-3 col-2'>{item.category.name}</div>
                    <div className='py-3 col-2'>{item.name}</div>
                    <div className='py-3 col-1'>{item.cost}</div>
                    <div className='py-3 col-1'>{item.selling_price}</div>
                    <div className='py-3 col-1'>{item.qty}</div>
                    <div className='py-3 col-1 d-flex justify-content-center'><div className="form-check">
                        <input className="form-check-input" type="checkbox" defaultChecked={item.to_buy} onChange={handleCheckbox} id="flexCheckDefault"/>
                    </div>
                    </div>
                    <div className='py-3 col-2 text-center'>
                        <div className='row'>
                            <div className='col-4'><Link to="#" onClick={() => { setFunc("add"); setToEdit(item); setEditModalShow(true) }} className='btn p-0'><i className="fas fa-plus-circle fs-3 text-primary"></i></Link></div>
                            <div className='col-4'><Link to="#" onClick={() => { setFunc("sell"); setToEdit(item); setEditModalShow(true) }} className='btn p-0'><i className="fas fa-sack-dollar fs-3 text-success"></i></Link></div>
                            <div className='col-4'><button type='button' onClick={() => { setFunc("remove"); setToEdit(item); setEditModalShow(true) }} className='btn p-0'><i className="fas fa-trash fs-3 text-danger"></i></button></div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className="container p-5">
            <div className='row pb-4'>
                <div className='col-4'>
                    <button className='btn btn-primary w-100'><i className="fas fa-plus-circle"></i> <span className='mx-2'>Add to stock</span></button>
                </div>
                <div className='col-4'>
                    <button className='btn btn-success w-100'><i className="fas fa-sack-dollar"></i> <span className='mx-2'>Sell</span></button>
                </div>
                <div className='col-4'>
                    <button className='btn btn-danger w-100'><i className="fas fa-trash"></i> <span className='mx-2'>Remove from stock</span></button>
                </div>
            </div>
            <div className='card shadow'>
                <div className="card-header">
                    <h5 className='mb-3 mb-md-0'>Products ( {productslist.length} )
                    </h5>
                </div>
                <div className="p-0 card-body">
                    <div className='mx-0 row text-center'>
                        <div className='col-1 text-start'>ID</div>
                        <div className='col-1 text-start'>Image</div>
                        <div className='col-2'>Category</div>
                        <div className='col-2'>Name</div>
                        <div className='col-1'>Cost</div>
                        <div className='col-1'>Selling Price</div>
                        <div className='col-1'>Quantity</div>
                        <div className='col-1'>To Buy</div>
                        <div className='col-2'>Actions</div>
                    </div>
                    {ViewStock_HTMLTABLE}
                </div>
            </div>
            <ChangeQtyModal
                toedit={toEdit}
                func={func}
                show={editModalShow}
                onHide={() => { setEditModalShow(false); axios.get('/product/getAll').then(res => { if (res.status === 200) { setProductslist(res.data); } }); }}
            />
        </div>
    )
}

export default ViewStock
