import axios from 'axios';
import LoadingCmp from '../LoadingCmp';
import React,{ useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import AddCategoryModal from './AddCategoryModal';
import EditCategoryModal from './EditCategoryModal.';

function ViewCategory() {
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categorylist,setCategorylist] = useState([]);
    const [editModalShow, setEditModalShow] = useState(false);
    const [toEdit, setToEdit] = useState({});

    useEffect(()=>{
        axios.get('/category/getAll').then(res=>{
            if(res.status === 200)
            {
                setCategorylist(res.data);
            }
            setLoading(false);
        })
    },[])

    const deleteCategory = (e,item) =>{
        e.preventDefault();
        Swal.fire({
            title: 'Supprimée la category',
            text: `Etes-vous sûr que vous voulez supprimer ${item.name} ?`,
            showDenyButton: true,
            confirmButtonText: 'Supprimer',
            denyButtonText: `Annuler`,
            confirmButtonColor: '#df4759',
            denyButtonColor: '#d9e2ef',
          }).then((result) => {
            if (result.isConfirmed) {
        axios.delete(`/category/delete/${item.id}`).then(res=>{

            if(res.status === 200)
            {
                const items = categorylist.filter(itemC => itemC.id !== item.id);
                setCategorylist(items)
                Swal.fire("Success","Category supprimé avec success","success");
            }
            else if(res.status === 404)
            {
                Swal.fire("Erreur","Category non trouvé","error")
            }
        })
    } else if (result.isDenied) {
    }
  });
    }

    var viewCategory_HTMLTABLE=[];
    if(loading)
    {
        return (
            <LoadingCmp/>
        )
    }
    else
    {
        viewCategory_HTMLTABLE =
        categorylist.map((item)=>{
            return (
                <div key={item.id} className="mx-0 row border-bottom border-200 text-center">
                    <div className='py-3 col-2 text-start'>{item.id}</div>
                    <div className='py-3 col-7 text-start'>{item.name}</div>
                    <div className='py-3 col-3 text-center'>
                        <div className='row'>
                        <div className='col-6'><Link to="#" onClick={()=>{setToEdit(item);setEditModalShow(true)}} className='btn p-0'><i className="fas fa-edit fs-3 text-primary"></i></Link></div>
                        <div className='col-6'><button type='button' onClick={(e)=>deleteCategory(e,item)} className='btn p-0'><i className="fas fa-trash fs-3 text-danger"></i></button></div>
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
                <h5 className='mb-3 mb-md-0'>Categories ( {categorylist.length} )
                    <Link to="#" onClick={()=>{setModalShow(true)}}  className='btn btn-primary btn-sm float-end'>Add Category</Link>
                </h5>
            </div>
            <div className="p-0 card-body">
                    <div className='mx-0 row text-center'>
                            <div className='col-2 text-start'>ID</div>
                            <div className='col-7 text-start'>Name</div>
                            <div className='col-3'>Actions</div>
                    </div>
                        {viewCategory_HTMLTABLE}
            </div>
        </div>
        <AddCategoryModal
        show={modalShow}
        onHide={() => {setModalShow(false);axios.get('/category/getAll').then(res=>{if(res.status === 200){setCategorylist(res.data);}});}}
      />
            <EditCategoryModal
      toedit={toEdit}
        show={editModalShow}
        onHide={() => {setEditModalShow(false);axios.get('/category/getAll').then(res=>{if(res.status === 200){setCategorylist(res.data);}})}}
      />
    </div>
  )
}

export default ViewCategory
