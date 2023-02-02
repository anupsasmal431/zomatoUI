import React, { useState } from 'react'
import '../styles/details.css';
import {useSingleRecordQuery} from "../store/services/restaurantService";
import {useGetallitemsQuery} from "../store/services/itemService";
import {useParams,Link} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import {BsHandbag} from "react-icons/bs"
import '../styles/header.css';
import Item from './Item';
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor:'brown'
    }
  };
  const secondStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor:'brown'
    }
  };
  const thirdStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor:'white',
      height:'400px'
    }
  };
const Details = () => {
    const {id}=useParams();
   
    const [checked,setState]=useState(true);
    
    const { items:crtitems, total } = useSelector((state) => state.cartReducer);
    const {data=[],isFetching}=useSingleRecordQuery(id);
    const {data:items=[]}=useGetallitemsQuery(id)
    //console.log(data)
   //console.log(items)
   
  
       
       return  isFetching ?
       (
        <>
        <div>
        Loading...
       </div>
<h1 className='DetailHeader'>Loading...</h1>
<div className='tabs'>
    <div className='tab'>
        <input id="tab-1" type="radio"  checked={checked} name="tab-group-1" onChange={e => {}} />
        <label htmlFor="tab-1">Overview</label>
        <div className="content">
            <div className="about">About this place</div>
            <div className="Detailhead">Cuisine</div>
            <div className="Detailvalue">Loading...</div>
            <div className="Detailhead">Average Cost</div>
            <div className="Detailvalue">Loading...</div>
        </div>
    </div>
    <div className='tab'>
        <input id="tab-2" type="radio" name="tab-group-1" />
        <label htmlFor="tab-2">Contact</label>
        <div className="content">
            <div className="Detailhead">Phone</div>
            <div className="Detailvalue">Loading...</div>
            <div className="Detailhead">Locality</div>
            <div className="Detailvalue">Loading...</div>
            <div className="Detailhead">Loading...</div>
            <div className="Detailvalue">Loading...</div>
        </div>
    </div>
</div>
</>
       )  
        : 
        (
        <>
        <Toaster />
        
        <div>
        <img src={process.env.PUBLIC_URL+`/images/${data.image}`} className="detailMainPic" alt="detail image" />
       </div>

{/* item part */}
<div className='container'>
<ul className="nav justify-content-end mt-3">
  <li className="nav-item">
    <Link  to="/cart" >
         <BsHandbag size={20} />
        <span className="nav-circle">{crtitems}</span>
    </Link>
  </li>
</ul>
<div>
    <h1 className='fw-bold my-4'>
      {data.name} 
      </h1>
    
    </div>
  

<div className='row'>

{items?.response?.length==0 && <div className='col-sm-8 col-md-8 col-lg-8'><div style={{"color":"red","fontSize":"25px"}}>Sorry no item found!!</div></div>}

{
items?.response && 
items?.response.map(itm=>{
    return <Item  toast={toast} itm={itm}/>
})
}

 
  

</div>
</div>
{/* item part end */}
<div className='tabs'>
    <div className='tab'>
        <input id="tab-1" type="radio"  checked={checked} name="tab-group-1" onChange={e => {}} />
        <label htmlFor="tab-1">Overview</label>
        <div className="content">
            <div className="about">About this place</div>
            <div className="Detailhead">Cuisine</div>
            <div className="Detailvalue">{data && data.cuisine ? data.cuisine : null}</div>
            <div className="Detailhead">Average Cost</div>
            <div className="Detailvalue">&#8377; {data.min_price} for two people(approx)</div>
        </div>
    </div>
    <div className='tab'>
        <input id="tab-2" type="radio" name="tab-group-1" />
        <label htmlFor="tab-2">Contact</label>
        <div className="content">
            <div className="Detailhead">Phone</div>
            <div className="Detailvalue">{data.contact}</div>
            <div className="Detailhead">Locality</div>
            <div className="Detailvalue">{`locality, address`}</div>
            <div className="Detailhead">{data.name}</div>
            <div className="Detailvalue">{`${data.locality}, ${data.city}`}</div>
        </div>
    </div>
</div>

</>
       )  
  
}

export default Details
