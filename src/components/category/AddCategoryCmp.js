// @ts-nocheck
import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

function AddCategoryCmp() {
    const [categoryInput, setCategory] = useState({
        name:'',
        errorsList:[],
        });

        const handleInput = (e)=>{
            e.persist();
            setCategory({...categoryInput,[e.target.name]:e.target.value})
        }

        const submitCategory = (e)=>{
            e.preventDefault();
            const data = {
                name:categoryInput.name.trim(),
            }
            axios.post('/category/add',data).then(res=>{
                if(res.status===200)
                {
                    Swal.fire("Success",res.data.message,"success");
                    document.getElementById('CATEGORY_FORM').reset();
                }
                else if(res.status=== 400)
                {
                    setCategory({...categoryInput,errorsList:res.data.errors});
                }
            })
        }

  return (

    <form onSubmit={submitCategory} id='CATEGORY_FORM'>
      
                <div className="form-group mb-3">
                    <label>Name</label>
                    <input type="text" name='name' onChange={handleInput} value={categoryInput.name} className='form-control'/>
                    <small className='text-danger'>{categoryInput.errorsList.slug}</small>

        </div>
        <button type="submit" className='btn btn-primary px-4 float-end'>Submit</button>
    </form>

  )
}

export default AddCategoryCmp
