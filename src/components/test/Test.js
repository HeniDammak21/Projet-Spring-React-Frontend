import React, { useState } from 'react'
import TestCmp from './TestCmp'

export default function Test() {
    const [data, setData] = useState(0);
  
    const childToParent = (childdata) => {
      setData(childdata);
    }
  return (
    <>
    {data}
    <div>Test</div>
    <TestCmp childToParent={childToParent} />
    </>
  )
}
