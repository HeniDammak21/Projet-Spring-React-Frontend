import axios from 'axios';
import React,{ useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import LoadingCmp from '../LoadingCmp';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

function ViewProduct() {
    const [loading, setLoading] = useState(true);
    const [productslist,setProductslist] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [toEdit, setToEdit] = useState({});

    useEffect(()=>{
        let isMounted = true;
        document.title = "View Product"

        axios.get('/product/getAll').then(res=>{
            if(isMounted)
            {
                if(res.status === 200)
                {
                    setProductslist(res.data);
                    setLoading(false);
                }
            }
        });
        return () =>{
            isMounted = false
        }
    },[])

    const deleteProduct = (e,item) =>{
        e.preventDefault();
        Swal.fire({
            title: 'Supprimée la produit',
            text: `Etes-vous sûr que vous voulez supprimer ${item.name} ?`,
            showDenyButton: true,
            confirmButtonText: 'Supprimer',
            denyButtonText: `Annuler`,
            confirmButtonColor: '#df4759',
            denyButtonColor: '#d9e2ef',
          }).then((result) => {
            if (result.isConfirmed) {
        axios.delete(`/product/delete/${item.id}`).then(res=>{

            if(res.status === 200)
            {
                const items = productslist.filter(itemC => itemC.id !== item.id);
                setProductslist(items)
                Swal.fire("Success","Produit supprimé avec success","success");
            }
            else if(res.status === 404)
            {
                Swal.fire("Erreur","Produit non trouvé","error")
            }
        })
    } else if (result.isDenied) {
    }
  });
    }
    var viewProduct_HTMLTABLE=[];
    if(loading)
    {
        return (
            <LoadingCmp/>
        )
    }
    else
    {
        viewProduct_HTMLTABLE = productslist.map((item)=>{

            return (
                <div key={item.id} className="mx-0 row border-bottom border-200 text-center">
                    <div className='py-3 col-1 text-start'>{item.id}</div>
                    <div className='py-3 col-1 text-start'><img src={`http://localhost:8080/uploads/${item.image}`} width="50px" alt={item.name} /></div>
                    <div className='py-3 col-2'>{item.category.name}</div>
                    <div className='py-3 col-2'>{item.name}</div>
                    <div className='py-3 col-1'>{item.cost}</div>
                    <div className='py-3 col-1'>{item.original_price}</div>
                    <div className='py-3 col-1'>{item.selling_price}</div>
                    <div className='py-3 col-3 text-center'>
                        <div className='row'>
                        <div className='col-6'><Link to="#" onClick={()=>{setToEdit(item);setEditModalShow(true)}} className='btn p-0'><i className="fas fa-edit fs-3 text-primary"></i></Link></div>
                        <div className='col-6'><button type='button' onClick={(e)=>deleteProduct(e,item)} className='btn p-0'><i className="fas fa-trash fs-3 text-danger"></i></button></div>
                        </div> 
                    </div>
                </div>
            )
        })
    }
  return (
    <div className="container p-5">
        <div className='card shadow'>
            <div className="card-header">
                <h5 className='mb-3 mb-md-0'>Products ( {productslist.length} )
                    <Link to="#" onClick={()=>{setModalShow(true)}} className='btn btn-primary btn-sm float-end'>Add Product</Link>
                </h5>
            </div>
            <div className="p-0 card-body">
                <div className='mx-0 row text-center'>
                            <div className='col-1 text-start'>ID</div>
                            <div className='col-1 text-start'>Image</div>
                            <div className='col-2'>Category</div>
                            <div className='col-2'>Name</div>
                            <div className='col-1'>Cost</div>
                            <div className='col-1'>Original Price</div>
                            <div className='col-1'>Selling Price</div>
                            <div className='col-3'>Actions</div>
                    </div>
                        {viewProduct_HTMLTABLE}
            </div>
        </div>
        <AddProductModal
        show={modalShow}
        onHide={() => {setModalShow(false);axios.get('/product/getAll').then(res=>{if(res.status === 200){setProductslist(res.data);}});}}
      />
            <EditProductModal
        toedit={toEdit}
        show={editModalShow}
        onHide={() => {setEditModalShow(false);axios.get('/product/getAll').then(res=>{if(res.status === 200){setProductslist(res.data);}});}}
      />
    </div>
  )
}

export default ViewProduct
