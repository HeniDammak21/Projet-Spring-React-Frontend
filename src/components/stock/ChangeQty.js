import axios from 'axios';
import React,{useState,useEffect} from 'react'
import {useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingCmp from '../LoadingCmp';

export default function ChangeQty(props) {
    const [qty,setQty] = useState('')
    const [errorlist, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [product, setProduct] = useState({
        category:'',
        name:'',
        description:'',
        slug:'',
        qty:'',
        cost:'',
        selling_price:'',
        original_price:'',
        brand:'',
        image:''
        });

        useEffect(() => {

            if(props.toedit)
            {
                setProduct(props.toedit);
                setLoading(false);
            }

        }, [props.toedit])


        const handleInput = (e)=>{
            e.persist();
            setQty(e.target.value)
        }

        const updateProduct = (e)=>{
            e.preventDefault();
            const data = {
                category: product.category.id ? product.category.id:product.category,
                name:product.name,
                description:product.description,
                slug:product.slug,
                
                cost:product.cost,
                selling_price:product.selling_price,
                original_price:product.original_price,
                qty: props.func == "add" ? parseInt(product.qty) + parseInt(qty): parseInt(product.qty) - parseInt(qty) ,
                brand:product.brand,
                image:product.image
            }
            const change = {
                product:product.id,
                type:props.func,
                nb:qty,
                unit_cost:product.cost,
                unit_price:product.selling_price
            }
            const formData= new FormData();
            formData.append('image',[]);
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
            axios.post('/change/add',change).then((res)=>{
                console.log(res)
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
  
            <form onSubmit={updateProduct} encType='mutlipart/form-data' id='QTY_FORM'>
                          <div className="col-md-4 form-group mb-3">
                              <label>Quantity</label>
                              <input type="text" name="qty" onChange={handleInput} value={qty} className="form-control"/>
                              <small className='text-danger'>{errorlist.qtytochange}</small>
                          </div>
            <button type="submit" className='btn btn-primary px-4 mt-2 float-end'>{props.func.toUpperCase()}</button>
        </form>
    </div>
      )
}
