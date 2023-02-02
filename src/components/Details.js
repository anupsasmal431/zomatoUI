import React, { useState } from 'react'
import '../styles/details.css';
import {useSingleRecordQuery} from "../store/services/restaurantService";
import {useGetallitemsQuery} from "../store/services/itemService";
import {useParams,Link} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { addCart } from "../store/reducers/cartReducer";
import { useDispatch,useSelector } from "react-redux";
import {BsHandbag} from "react-icons/bs"
import '../styles/header.css';
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
    const dispatch = useDispatch();
    const [checked,setState]=useState(true);
    const [quantity, setQuantity] = useState(1);
    const { items:crtitems, total } = useSelector((state) => state.cartReducer);
    const {data=[],isFetching}=useSingleRecordQuery(id);
    const {data:items=[]}=useGetallitemsQuery(id)
    //console.log(data)
   //console.log(items)
   const inc = () => {
    setQuantity(quantity + 1);
  };
  const dec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const addToCart = (sitem) => {
    const {
      ...newProduct
    } = sitem;
    const cart = localStorage.getItem("cart");
    const cartItems = cart ? JSON.parse(cart) : [];
    const checkItem = cartItems.find((item) => item._id === newProduct._id);
    if (!checkItem) {
      newProduct["qty"] = quantity;
      dispatch(addCart(newProduct));
      cartItems.push(newProduct);
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      toast.error(`${newProduct.name} is already in cart`);
      return;
    }
  };
       
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
     return <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-3" key={itm._id} > 
     <div className="card">
      <img src={process.env.PUBLIC_URL+`/images/${itm.image}`} className="card-img-top img-fluid" alt="test"/>
      <div className="card-body">
          <h3 className="menuItemName" style={{'fontSize':'19px'}} >{itm.name}</h3>
          <h4 className="Rupees" style={{'fontSize':'17px'}}>Ingridients : {itm.ingridients}</h4>
           <h4 className="Rupees" style={{'fontSize':'17px'}}>Cost : &#8377; {itm.price}</h4>
           <div className="Deep">{itm.description}</div>
           <div className='d-flex justify-content-between mt-2 align-items-center'>
              <div>
              <button className='border border-dark border-4' onClick={dec}><span className='fw-bold'>-</span></button>
              <span className="mx-1">{quantity}</span>
              <button className='border border-dark border-4' onClick={inc}><span className='fw-bold'>+</span></button>
              </div>
              <div>
                 <button className="btn btn-primary" onClick={()=>addToCart(itm)}>ADD</button>
              </div>
          </div>
           
      </div>
    </div>
    </div>
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
