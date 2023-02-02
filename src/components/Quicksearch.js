import React from 'react'
import '../styles/quicksearch.css';
import { useNavigate } from "react-router-dom";
const Quicksearch = ({allmealtypes:quicksearch}) => {
    const navigate=useNavigate();
    const mealClick=(meal_type)=>{
        navigate(`/filter?meal_type=${meal_type}`);
    }
  return (
    <div className="container">
                <div className="quicksearch">Quick Searches</div>
                <div className="subheading">Discover Restaurants by type of meal</div>
                <div className='row'>
                   
                { quicksearch.map((item) =>
                                    {
                                        return <div className="col-sm-12 col-md-6 col-lg-4" onClick={() => mealClick(item.meal_type)} key={item._id}>
                                        <div className="one">
                                            <div className="innerboxpic">
                                                <img className="Breakfast" src= {process.env.PUBLIC_URL+`/images/${item.image}`} /></div>
                                            <div className="secondbox">
                                                <div className="breakfastheading">{item.name}</div>
                                                <div className="breakfastdescription">
                                                    {item.content}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    })}   
                        
                        
                </div>
            </div>
  )
}

export default Quicksearch
