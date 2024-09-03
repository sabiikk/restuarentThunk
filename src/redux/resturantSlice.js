import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//api call or asyncronous function call using Thunk
//first argument is name of slice/+namr of thunk fn

export const fetchRestaurant = createAsyncThunk('restaurantSlice/fetchRestaurant',()=>{
    const result = axios.get('/restaurant.json').then(response=>response.data);
    console.log("response from thunk");
    console.log(result);
    return result;
})

const restaurantSlice= createSlice({
    name:"restaurantSlice",
    initialState:{
        loading:false, //pending state that mans,api call in-progrees
        allRestaurant:[],
        error:"", //rreject state - return error
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchRestaurant.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(fetchRestaurant.fulfilled,(state,action)=>{
            state.loading=false;
            state.searchRestaurent=action.payload
            state.allRestaurant=action.payload;
            state.error= ""
        })
        builder.addCase(fetchRestaurant.rejected,(state,action)=>{
            state.loading=false
            state.allRestaurant=[]
            state.error=action.error.message
        })
    },
    reducers:{
        searchRestaurent:(state,action)=>{
            state.allRestaurant.restaurants=state.searchRestaurent?.restaurants.filter(item=>item.neighborhood.toLowerCase().includes(action.payload))
        }
    }
})


export default restaurantSlice.reducer;
export const {searchRestaurent}=restaurantSlice.actions;



//redux is a synchrounus operation
//but api call or file read or wrie,etc are asyncronous operation
//to deal with asynchronus operation in redux,we are using redux thunk
//thunk is not a part of slice,seprate method in redux toolkit