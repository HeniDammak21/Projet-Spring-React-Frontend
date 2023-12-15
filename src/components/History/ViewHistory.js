import axios from 'axios';
import React,{ useState,useEffect } from 'react'
import LoadingCmp from '../LoadingCmp';


export default function ViewHistory() {
    function toDate(timestamp){
        const date = new Date(timestamp)
        const dateFormat = date.getDay()+ '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() 
        return dateFormat;
    }
    const [loading, setLoading] = useState(true);
    const [changeslist,setChangeslist] = useState([]);

    useEffect(()=>{
        let isMounted = true;
        document.title = "View Product"

        axios.get('/change/getAll').then(res=>{
            if(isMounted)
            {
                if(res.status === 200)
                {
                    console.log(res.data)
                    setChangeslist(res.data);
                    setLoading(false);
                }
            }
        });
        return () =>{
            isMounted = false
        }
    },[])


    var History_HTML=[];
    if(loading)
    {
        return (
            <LoadingCmp/>
        )
    }
    else
    {
        History_HTML = changeslist.map((item)=>{

            return (
                <div key={item.id} className="mx-0 row border-bottom border-200 text-center">
                    <div className='py-3 col-2 text-start'>{item.id}</div>
                    <div className='py-3 col-2'>{item.product.name}</div>
                    <div className='py-3 col-2'>{item.type}</div>
                    <div className='py-3 col-1'>{item.unit_cost}</div>
                    <div className='py-3 col-1'>{item.unit_price}</div>
                    <div className='py-3 col-1'>{item.nb}</div>
                    <div className='py-3 col-1'>{item.type == 'sell' ?<span className='text-success'>{'+ ' + item.nb * item.unit_price}</span> :<span className='text-danger'>{'- ' + item.nb * item.unit_cost}</span> }</div>
                    <div className='py-3 col-2'>{toDate(item.change_date)}</div>
                </div>
            )
        })
    }
  return (
    <div className="container p-5">
        <div className='card shadow'>
            <div className="card-header">
            <h5 className='mb-3 mb-md-0'>Changes ( {changeslist.length} )
                </h5>
            </div>
            <div className="p-0 card-body">
                <div className='mx-0 row text-center'>
                            <div className='col-2 text-start'>ID</div>
                            <div className='col-2'>Product</div>
                            <div className='col-2'>type</div>
                            <div className='col-1'>Cost</div>
                            <div className='col-1'>Selling Price</div>
                            <div className='col-1'>Quantity</div>
                            <div className='col-1'>Total</div>
                            <div className='col-2'>Date</div>
                    </div>
                        {History_HTML}
            </div>
        </div>
    </div>
  )
}
