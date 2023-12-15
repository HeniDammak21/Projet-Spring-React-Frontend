// @ts-nocheck
import axios from 'axios';
import LoadingCmp from '../LoadingCmp';
import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

export default function EditCategoryCmp(props) {
    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategory] = useState([]);
    const navigate = useNavigate()
    const [error,setError] = useState([]);

    useEffect(()=>{

        if(props.toedit)
        {
            setCategory(props.toedit);
            setLoading(false);
        }
},[props.toedit])

    const handleInput = (e) =>{
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value});
    }

    const updateCategory = (e)=>{
        e.preventDefault();
        const data = {
            name:categoryInput.name.trim(),
        };
        axios.put(`/category/update/${props.toedit.id}`,data).then(res=>{
            if(res.status === 200)
            {
                Swal.fire("Success","Category modifié avec success","success");
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
                navigate('admin/view-category');
            }
        });
    }
    if(loading)
    {
        return (
            <LoadingCmp/>
        )
    }
  return (
    <div className='container px-4'>
    <form onSubmit={updateCategory} >

                <div className="form-group mb-3">
                    <label>Name</label>
                    <input type="text" name='name' onChange={handleInput} value={categoryInput.name} className='form-control'/>
                    <small className='text-danger'>{error.name}</small>

        </div>
        <button type="submit" className='btn btn-primary px-4 float-end'>Update</button>
    </form>
</div>
  )
}
