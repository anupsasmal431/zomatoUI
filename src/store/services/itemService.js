import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {MS_URL} from "../propraties";

const itemService=createApi({
    reducerPath:"item",
    tagTypes:'item',
    baseQuery:fetchBaseQuery({
        baseUrl: MS_URL
    }),
    endpoints:(builder)=>{
        return {
            getallitems:builder.query({
                query:(id)=>{
                    return {
                        url:`getallitem/${id}`,
                        method:"GET"
                    }
                },
                providesTags:['item']
            })
           
        }
    }
})
export const 
{
    useGetallitemsQuery
}=itemService;
export default itemService;