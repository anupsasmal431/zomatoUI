import React, { useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
const Item = ({itm}) => {
    const [quantity, setQuantity] = useState(1);
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
}

export default Item
