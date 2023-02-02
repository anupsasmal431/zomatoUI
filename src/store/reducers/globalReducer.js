import { createSlice } from "@reduxjs/toolkit";
const alllocation=localStorage.getItem("location");
function verifystorage(keyName) {
    const storage =localStorage.getItem(keyName) || [];
    return JSON.parse(storage);
}
const globalReducer=createSlice({
    name:"globalReducer",
    initialState:{
        success:'',
        alllocation:verifystorage('location')
    },
    reducers:{
        setSuccess:(state,action)=>{
            state.success=action.payload
         },
         clearMessage:(state)=>{
             state.success=''
         },
         setLocation:(state,action)=>{
            state.alllocation=action.payload
         }
    }
})
export const {setSuccess,clearMessage,setLocation}=globalReducer.actions;
export default globalReducer.reducer;