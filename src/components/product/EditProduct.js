import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import {useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AddCategoryModal from '../category/AddCategoryModal';
import LoadingCmp from '../LoadingCmp';

function EditProduct(props) {
    const [modalShow, setModalShow] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [errorlist, setError] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const [productInput, setProduct] = useState({
        category:'',
        name:'',
        description:'',

        cost:'',
        selling_price:'',
        original_price:'',
        qty:'',
        brand:'',
        });

        const [picture, setPicture] = useState([]);

        useEffect(() => {

            axios.get('/category/getAll').then(res=>{
                if(res.status === 200)
                {
                    setCategoryList(res.data);
                }
              });

            if(props.toedit)
            {
                setProduct(props.toedit);
                setLoading(false);
            }

        }, [props.toedit])


        const handleInput = (e)=>{
            e.persist();
            setProduct({...productInput,[e.target.name]:e.target.value})
        }

        const handleImage = (e)=>{
            e.persist();
            setPicture({image:e.target.files[0]})
        }

        const updateProduct = (e)=>{
            e.preventDefault();
            const data = {
                category: productInput.category.id ? productInput.category.id:productInput.category,
                name:productInput.name,
                description:productInput.description,
        
                cost:productInput.cost,
                selling_price:productInput.selling_price,
                original_price:productInput.original_price,
                qty:productInput.qty,
                brand:productInput.brand,
                image:productInput.image
            }
            const formData= new FormData();
            formData.append('image',picture.image);
            formData.append('product',JSON.stringify(data));
            axios.put(`/product/update/${props.toedit.id}`,formData).then(res=>{
                if(res.status===200)
                {
                    Swal.fire("Success",res.data.message,"success");
                    setError([]);
                }
                else if(res.status === 422)
                {
                    Swal.fire("All Fields are mandatory","","error");
                    setError(res.data.errors);
                }
                else if(res.status === 404)
                {
                    Swal.fire("Error",res.data.message,"error");
                    navigate('admin/view-product');
                }
            })
        }

        if(loading)
    {
        return (
            <LoadingCmp/>
        )
    }


      return (
<div className='container-fluid px-4'>
  
            <form onSubmit={updateProduct} encType='mutlipart/form-data' id='PRODUCT_FORM'>
            <Tabs defaultActiveKey="principal" className='mb-3'>
<Tab eventKey="principal" title="Principal">
                    <div className="form-group">
                    <label>Select Category</label>
                    <div className="input-group mb-3">
                           <select name="category" onChange={handleInput} value={productInput.category.id} className='form-control'>
                           <option>Select Category</option>
                               {
                                   categoryList.map((item)=>{
                                        return (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        )
                                   })
                               }

                            </select>
                            <small className='text-danger'>{errorlist.category}</small>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" onClick={()=>{setModalShow(true)}} type="button">Add Category</button>
                            </div>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input type="text" name='name' onChange={handleInput} value={productInput.name} className='form-control'/>
                            <small className='text-danger'>{errorlist.name}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label>Description</label>
                            <textarea name="description" onChange={handleInput} value={productInput.description} className='form-control'></textarea>
                            <small className='text-danger'>{errorlist.description}</small>
                        </div>
                    
                    </Tab>
                    <Tab eventKey="other" title="Other">
                      <div className="row">
                      <div className="col-md-4 form-group mb-3">
                              <label>Cost</label>
                              <input type="text" name="cost" onChange={handleInput} value={productInput.cost} className="form-control"/>
                              <small className='text-danger'>{errorlist.cost}</small>
                          </div>
                          <div className="col-md-4 form-group mb-3">
                              <label>Original Price</label>
                              <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price} className="form-control"/>
                              <small className='text-danger'>{errorlist.original_price}</small>
                          </div>
                          <div className="col-md-4 form-group mb-3">
                              <label>Selling Price</label>
                              <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className="form-control"/>
                              <small className='text-danger'>{errorlist.selling_price}</small>
                          </div>
                          <div className="col-md-4 form-group mb-3">
                              <label>Quantity</label>
                              <input type="text" name="qty" onChange={handleInput} value={productInput.qty} className="form-control"/>
                              <small className='text-danger'>{errorlist.qty}</small>
                          </div>
                          <div className="col-md-4 form-group mb-3">
                              <label>Brand</label>
                              <input type="text" name="brand" onChange={handleInput} value={productInput.brand} className="form-control"/>
                              <small className='text-danger'>{errorlist.brand}</small>
                          </div>
                          <div className="col-md-8 form-group mb-3">
                              <label>image</label>
                              <input type="file" name="image" onChange={handleImage} className="form-control"/>
                              <small className='text-danger'>{errorlist.image}</small>
                          </div>

                      </div>
                    </Tab>
                </Tabs>
            <button type="submit" className='btn btn-primary px-4 mt-2 float-end'>Submit</button>
        </form>
    <AddCategoryModal
        show={modalShow}
        onHide={() => {setModalShow(false);axios.get('/category/getAll').then(res=>{if(res.data.status === 200){setCategoryList(res.category);}});}}
      />
    </div>
      )
}

export default EditProduct
