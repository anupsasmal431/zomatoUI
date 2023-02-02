import React,{useState} from 'react'
import "../styles/wallpaper.css";
import {useAllrestaurentBycityQuery} from "../store/services/restaurantService";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
const Wallpaper = ({allLocations}) => {
    const navigate = useNavigate();
    //const [skipQuery,setSkipQuery]= useState(true)
    const [location_id,setLocation]=useState("");
    const [state,setState]=useState({
        searchText:undefined,
        suggestions:[]
    });
    const {data=[]}=useAllrestaurentBycityQuery({location_id});
    //console.log(data)
   // console.log("locationid : ",location_id)
    const locationChanger= (e) => {
         setLocation(e.target.value);
    }
    const renderSuggestions=()=>{
        let { suggestions, searchText } = state;
        if (suggestions.length===0 && searchText) {
            return (
                <ul className="unorderedList" style={{color:'white','fontWeight':'bold'}}>
                    <li className="listsOfRes">No Match Found</li>
                </ul>
            )
        }

        return (
            <ul className="unorderedList" style={{color:'white','fontWeight':'bold'}}>
                {
                    suggestions.map((item, index) => (<li className="listsOfRes" key={index} onClick={() => handleItemClick(item)}>
                        <img src={process.env.PUBLIC_URL+`/images/${item.image}`} className="resIcon" />{`${item.name}, ${item.city}`}</li>))
                }
            </ul>
        );
    }
   const handleSearch=(e)=>{
       if(location_id==""){
         toast.error("Please select city");
       }
       const searchText = e.target.value;
       let filteredRestaurants;

        if (searchText == "") {
            filteredRestaurants = [];
        }
        else {
            filteredRestaurants = data.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
        }
      
       setState({ suggestions: filteredRestaurants, searchText: searchText });
       
   } 
   const handleItemClick = (item) => {
      navigate(`/details/${item._id}`)
   }
  return (
    
    <div className="app" style={{ color: "black", border: "3px" }}>
        <Toaster position="top-right" reverseOrder={true} />
      <img src={process.env.PUBLIC_URL+"/images/Home_Pic.png"} className="MainPic" alt="Loading..." /> 
      <div>
                <b className="logo">e!</b>
            </div>
            <div className="heading">Find the best restaurant, cafes, and bars</div>
            
            
            <div className="locationSelector">
                <select className='locationDropdown' onChange={locationChanger}>
                    <option value="">--Select City--</option>
                    {
                        allLocations.length>0 && (
                            allLocations.map( location => {
                                 return <option value={location.location_id} key={location._id}>{`${location.name}, ${location.city}`}</option>
                            })
                            
                        )
                    }
                   
                   
                </select>
                

                <div id="notebooks">
                       <input id="query"  type="text" onChange={handleSearch} placeholder='Search for Restaurants'/>  
                          {renderSuggestions()}
                          
                </div>
                <i className="bi bi-search search"></i>
            </div>
            
    </div>
  )
}

export default Wallpaper
