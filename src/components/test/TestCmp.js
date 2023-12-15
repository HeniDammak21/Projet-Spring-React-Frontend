import React, { useState } from 'react'
import TestModal from './TestModal';

export default function TestCmp(props) {
    const [modalShow, setModalShow] = useState(false);
    const [data, setData] = useState(0);

  return (
    <>
     <button type="button" onClick={() => {setData(data+1);props.childToParent(data)}}>Click Child</button>
    <div>TestCmp</div>
    <button className='btn btn-primary' onClick={()=>{setModalShow(true)}}></button>
    <TestModal
    psst="xd"
        show={modalShow}
        onHide={() => {setModalShow(false)}}
      />
    </>
  )
}
