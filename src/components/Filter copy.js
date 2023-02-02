import React,{useEffect, useState} from 'react'
import '../styles/Filter.css';
import { Link,useSearchParams,useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {useFilterRestaurentQuery} from "../store/services/restaurantService";
import Pagination from './Pagination';

const Filter = () => {
    const navigate=useNavigate();
    const [searchParams]  = useSearchParams();
    const [state,setState]=useState({
          city:searchParams.get("city")!=null ? searchParams.get("city") : "",
          meal_type:searchParams.get("meal_type")!=null ? searchParams.get("meal_type") : "",
          cuisine:searchParams.get("cuisine")!=null ? searchParams.get("cuisine") : "",
          sortBy:searchParams.get("sortBy")!=null ? searchParams.get("sortBy") : "",
          costSort:searchParams.get("costSort")!=null ? searchParams.get("costSort") : "",
          page:searchParams.get("page")!=null ? searchParams.get("page") : ""
    })
    const page=(searchParams.get("page")!=null) ? parseInt(searchParams.get("page")) : 1;
    const showhide = (state.city!="") ? true : false;
    const {alllocation}=useSelector(state=>state.globalReducer);
    const {data,isFetching}=useFilterRestaurentQuery(state);
    console.log(data)
    
    const clickHandler =  (e) => { 
        // Destructuring
        const { value, checked } = e.target;
         // Case 1 : The user checks the box
            if (checked) {
                let addstr='';
                if(state.cuisine==""){
                    addstr=state.cuisine.trim()+value;
                }else{
                    addstr=state.cuisine+','+value;
                }
                setState({...state,cuisine:addstr});
               
            }else { // Case 2  : The user unchecks the box
                let mval=state.cuisine.split(",").filter((e) => e !== value); 
                setState({...state,cuisine:mval.join(",")});
               
           }
         
    }
   const locationChangerfilter=(e)=>{
    setState({...state,city:e.target.value});
   } 
   const sortbyhandler=(value)=>{
    setState({...state,sortBy:value});
   }
   const handleCostChange=(val1,val2)=>{
        setState({...state,costSort:val1+","+val2})
   }
   const nextpageClick=(id)=>{
    navigate(`/details/${id}`);
   } 
   const paginationClick=(page)=>{
    setState({...state,page:page});
   }
    useEffect(()=>{
        if(state){
        let passingStr='';
        for (const [key, value] of Object.entries(state)) {
            if(value!=""){
                    passingStr+=key+'='+value+"&";
            }
          }
        passingStr=passingStr.slice(0,-1);
         //console.log(passingStr)   
         navigate("/filter?"+passingStr) 
        }
    },[state])
    //console.log(state)
  return (
    <>
       {
         showhide && (
          
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-12 col-ms-12 col-lg-12'>
                </div>
                <div className='col-sm-12 col-ms-12 col-lg-12'>
                    <h1 className='Filterbreakfast'>Places in {state.city}</h1>
                </div>
                <div className='col-sm-12 col-ms-12 col-lg-12'>
                </div>
               </div>
           </div>
          
         )
       }
            
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-4 col-md-4 col-lg-4'>
                        <div className='Filterrectangle'>
                            <div className='FilterFilt'>Filters</div>
                            <div className='Filter-Select-Location'>Select Location</div>
                            <div>
                            <select className='locationDropdown' onChange={locationChangerfilter} value={state.city}>
                                    <option value="">--Select City--</option>
                                    {
                                        alllocation.length>0 && (
                                            alllocation.map( location => {
                                                return <option value={location.location_id} key={location._id}>{`${location.name}, ${location.city}`}</option>
                                            })
                                            
                                        )
                                    }
                                
                                
                                </select>
                            </div>
                            <div className=''>Cuisine</div>
                            {
                                data?.cuisine?.length>0 ? 
                                    data.cuisine.map((item,i) => {
                                        return <div key={i+1}>
                                             <input type="checkbox" 
                                             name="cuisine"
                                             value={item} 
                                             className='check'  
                                             checked={state.cuisine.split(",").indexOf(item)>-1?true:false}
                                             onChange={clickHandler} />
                                            <span className='head'>{item}</span>
                                           </div>
                                    })
                                 : <div style={{"color":"black","fontSize":"25px"}}>Loading...</div>
                            }
                            
                           
                            <div className='CostFilter'>Cost for Two</div>
                            <div>
                                <input type="radio" className='radiobutton' name="costSort" onChange={() => handleCostChange(1,500)} checked={state.costSort=='1,500'?true:false}/>
                                <span className='head'>Less than Rs. 500</span>
                            </div>
                            <div>
                                <input type="radio" className='radiobutton' name="costSort" onChange={() => handleCostChange(500,1000)} checked={state.costSort=='500,1000'?true:false} />
                                <span className='head'>Rs. 500 to Rs. 1000</span>
                            </div>
                            <div>
                                <input type="radio" className='radiobutton' name="costSort" onChange={() => handleCostChange(1000,1500)} checked={state.costSort=='1000,1500'?true:false} />
                                <span className='head'>Rs. 1000 to Rs. 1500</span>
                            </div>
                            <div>
                                <input type="radio" className='radiobutton' name="costSort" onChange={() => handleCostChange(1500,2000)} checked={state.costSort=='1500,2000'?true:false} />
                                <span className='head'>Rs. 1500 to Rs. 2000</span>
                            </div>
                            <div>
                                <input type="radio" className='radiobutton' name="costSort" onChange={() => handleCostChange(2000,10000)} checked={state.costSort=='2000,10000'?true:false} />
                                <span className='head'>Rs. 2000+</span>
                            </div>
                            <div className='FilterSort'>Sort</div>
                            <div>
                                <input type="radio" className='radiobutton' name="sort"  onChange={()=>sortbyhandler('lth')}  checked={state.sortBy=='lth'?true:false}/>
                                <span className='head'>Price low to high</span>
                            </div>
                            <div>
                                <input type="radio" className='radiobutton' name="sort"  onChange={()=>sortbyhandler('htl')}  checked={state.sortBy=='htl'?true:false}/>
                                <span className='head'>Price high to low</span>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-8 col-md-8 col-lg-8'>
                        {data?.fiterArr?.length==0 && <div style={{"color":"red","fontSize":"25px","marginTop":"250px","marginLeft":"225px"}}>Sorry no record found!!</div>}
                        {isFetching &&  <div style={{"color":"black","fontSize":"25px"}}>Loading...</div>}
                        {
                            
                            data?.fiterArr?.length >0 &&
                            
                            data.fiterArr.map(item=>{
                                return <div className='FilterItems' key={item._id} onClick={() => nextpageClick(item._id)} >
                                        <img src={process.env.PUBLIC_URL+`/images/${item.image}`} className="FilterPic1" alt={item.name} />
                                        <div className='FilterTheBigChill'>{item.name}</div>
                                        <div className='FilterFort'>{item.address}</div>
                                        <div className='FilterAddress'>{item.locality} , {item.city}</div>
                                        <div><hr /></div>
                                        <div className='FilterCUISINES'>CUISINES:</div>
                                        <div className='FilterCOSTFORTWO'>COST FOR TWO:</div>
                                        <div className='FilterBakery'>{item.cuisine}</div>
                                        <div className='FilterSevenHundred'>Rs {item.min_price}/- only</div>
                                    </div>
                            })
                            
                            

                        }
                           
                                
                            
                    
                    </div>
                    <div className='col-sm-8 col-md-8 col-lg-8 text-end'>
                       
                            <Pagination page={page} perPage={data?.perPage} count={data?.count}  paginationClick={paginationClick}/>
                        
                    </div>
                </div>
            </div>
        </>
  )
}

export default Filter
