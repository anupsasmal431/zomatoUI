import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    incQuantity,
    decQuantity,
    removeItem,
  } from "../store/reducers/cartReducer";
import { BsTrash } from "react-icons/bs";
const Cart = () => {
    const { cart, total } = useSelector((state) => state.cartReducer);
    const dispatch = useDispatch();
    const remove = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
          dispatch(removeItem(id));
        }
      };
  return (
    <div className='container'>
         {cart.length > 0 ? (
     <div className="table-container"> 
              <table className="table">
                <thead>
                  <tr>
                    <th className="th" scope="col">image</th>
                    <th className="th" scope="col">name</th>
                    <th className="th" scope="col">price</th>
                    <th className="th" scope="col">quantities</th>
                    <th className="th" scope="col">total</th>
                    <th className="th" scope="col">delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    
                    return (
                      <tr  key={item._id}>
                        <td >
                          <img
                            src={process.env.PUBLIC_URL+`/images/${item.image}`}
                            alt={item.name}
                            className="rounded-full"
                            style={{"width":"50px","height":"50px"}}
                          />
                        </td>
                        <td >{item.name}</td>
        
                        <td >
                          &#8377; {item.price}
                        </td>
                        <td>
                          {item.qty}
                        </td>
                        <td> &#8377; {item.price*item.qty}</td>
                        <td >
                          <span
                          style={{"cursor":"pointer"}}
                            onClick={() => remove(item._id)}
                          >
                            <BsTrash size={20} />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
             ) : (
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-md text-sm font-medium text-indigo-800">
                  Cart is empty!
                </div>
              )}
    </div>
  )
}

export default Cart
