import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Details from '../components/Details'
import Filter from '../components/Filter'
import Home from '../components/Home'
import Cart from "../components/Cart"
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/filter" element={<Filter />} />
         <Route path="/details/:id" element={<Details />} />
         <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routing
