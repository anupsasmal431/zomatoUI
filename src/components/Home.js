import React,{useState,useEffect} from 'react'
import Quicksearch from './Quicksearch';
import Wallpaper from './Wallpaper';
import { useAllRecordsQuery } from '../store/services/locationService';
import {useGetAllmealtypeQuery} from "../store/services/mealtypeService";
import {setLocation} from "../store/reducers/globalReducer";
import {useDispatch} from "react-redux";
const Home = () => {
    const dispatch=useDispatch();
    const [allLocations,setState]=useState([]);
    const {data=[]}=useAllRecordsQuery();
     // console.log(data)
    const mealtype=useGetAllmealtypeQuery();
    const allmealtypes=mealtype?.data?.record || [];
    useEffect(()=>{
      localStorage.setItem("location",JSON.stringify(data?.record))
      dispatch(setLocation(data?.record));
      setState(data?.record);
    },[data?.record])
  return (
    <>
    {allLocations && <Wallpaper allLocations={allLocations}/>}
    {allmealtypes && <Quicksearch allmealtypes={allmealtypes}/>}
    </>
  )
}

export default Home
