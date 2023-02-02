import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {MS_URL} from "../propraties";

const restaurentService=createApi({
    reducerPath:"restaurent",
    tagTypes:'restaurent',
    baseQuery:fetchBaseQuery({
        baseUrl: MS_URL
    }),
    endpoints:(builder)=>{
        return {
            allrestaurentBycity:builder.query({
                query:({location_id}) => {
                    return {
                        url: `all/${location_id}`,
                        method: 'GET'
                    }
                   },
                   providesTags: ['restaurent']
            }),
            singleRecord:builder.query({
                query: id=>{
                    return {
                        url:`details/${id}`,
                        method:'GET'
                    }
                },
                providesTags:['restaurent']
            }),
            filterRestaurent:builder.query({
                query:(obj)=>{
                    const queryString = new URLSearchParams(obj).toString();
                    //console.log(queryString);
                   return {
                       url:`filter?${queryString}`,
                       method:"GET"
                   }
                },
                providesTags:['restaurent']
                
            })
           
        }
    }
})
export const 
{
    useAllrestaurentBycityQuery,
    useSingleRecordQuery,
    useFilterRestaurentQuery
}=restaurentService;
export default restaurentService;