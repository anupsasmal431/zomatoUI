import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {MS_URL} from "../propraties";

const locationService=createApi({
      reducerPath:"location",
      tagTypes:'location',
      baseQuery:fetchBaseQuery({
        baseUrl: MS_URL
      }),
      endpoints:(builder)=>{
             return {
                allRecords:builder.query({
                    query:()=>{
                        return {
                            url:'getallcity',
                            method:"GET"
                        }
                    },
                    providesTags:['location']
                })
             }
      }
})

export const {useAllRecordsQuery}=locationService;
export default locationService;