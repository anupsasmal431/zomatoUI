import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { MS_URL } from "../propraties";

const mealtypeService=createApi({
    reducerPath:"mealtype",
    tagTypes:"mealtype",
    baseQuery:fetchBaseQuery({
        baseUrl:MS_URL
    }),
    endpoints:(builder)=>{
        return {
            getAllmealtype:builder.query({
                query:()=>{
                    return {
                        url:"getallmealtype",
                        method:"GET"
                    }
                },
                providesTags:["mealtype"]
            })
        }
    }
})
export const {useGetAllmealtypeQuery}=mealtypeService;
export default mealtypeService;