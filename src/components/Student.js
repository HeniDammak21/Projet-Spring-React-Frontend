import React, { useEffect, useState } from 'react';
import axios from 'axios'
export default function Student() {
    const[name,setName]=useState('')
    const[address,setAddress]=useState('')
    const[students,setStudents]=useState([])

  const handleClick=(e)=>{
    e.preventDefault()
    const student={name,address}
    console.log(student)
    axios.post("http://localhost:8080/student/add",student)
}

useEffect(()=>{
  axios.get("http://localhost:8080/student/getAll")
  .then(res=>{
    setStudents(res.data);
  }
)
},[])
  return (

    <div>
        
            <h1 style={{color:"blue"}}><u>Add Student</u></h1>

    <form noValidate autoComplete="off">
    
      <input id="outlined-basic" 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <input id="outlined-basic"
      value={address}
      onChange={(e)=>setAddress(e.target.value)}
      />
      <button type='button' onClick={handleClick}>
  Submit
</button>
    </form>
   
    
    <h1>Students</h1>

    <div>

      {students.map(student=>(
        <div style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
         Id:{student.id}<br/>
         Name:{student.name}<br/>
         Address:{student.address}

        </div>
      ))
}


    </div>



    </div>
  );
}
