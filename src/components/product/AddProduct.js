import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import Swal from 'sweetalert2';
import AddCategoryModal from '../category/AddCategoryModal';

function AddProduct() {
    const [categoryList, setCategoryList] = useState([]);
    const [errorlist, setError] = useState([]);
    const [productInput, setProduct] = useState({
        category:'',
        name:'',
        description:'',

        cost:'',
        selling_price:'',
        original_price:'',
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
        }, [])


        const handleInput = (e)=>{
            e.persist();
            setProduct({...productInput,[e.target.name]:e.target.value})
        }

        const handleImage = (e)=>{
            e.persist();
            setPicture({image:e.target.files[0]})
        }

        const submitProduct = (e)=>{
            e.preventDefault();
            const data = {
                category:productInput.category,
                name:productInput.name,
                description:productInput.description,
        
                cost:productInput.cost,
                selling_price:productInput.selling_price,
                original_price:productInput.original_price,
                qty:0,
                brand:productInput.brand,
                to_buy:false
            }
            const formData= new FormData();
            formData.append('image',picture.image);
            formData.append('product',JSON.stringify(data));
            axios.post('/product/add',formData).then(res=>{
                if(res.status===200)
                {
                    Swal.fire("Success",res.data.message,"success");
                    setError([]);
                    resetForm();
                }
                else if(res.status === 422)
                {
                    Swal.fire("Tous les champs sont obligatoires!","","error");
                    setError(res.data.errors);
                }
            })
        }

        function resetForm(){
            setProduct({
                category:'',
                name:'',
                description:'',

                selling_price:'',
                original_price:'',
                brand:'',
                });
                document.getElementById('PRODUCT_FORM').reset();
        }
        const [modalShow, setModalShow] = useState(false);

      return (
<div className='container-fluid px-4'>
            <form onSubmit={submitProduct} encType='mutlipart/form-data' id='PRODUCT_FORM'>
<Tabs defaultActiveKey="principal" className='mb-3'>
<Tab eventKey="principal" title="Principal">
                    <div className="form-group">
                    <label>Select Category</label>
                    <div className="input-group mb-3">
                           <select name="category" onChange={handleInput} value={productInput.category} className='form-control'>
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
                                <button className="btn btn-outline-secondary" onClick={()=>{setModalShow(true)}} type="button">Ajouter Catégorie</button>
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
        onHide={() => {setModalShow(false);axios.get('/category/getAll').then(res=>{if(res.status === 200){setCategoryList(res.data);}});}}
      />
    </div>
      )
}

export default AddProduct
