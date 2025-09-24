import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedInUser: JSON.parse(localStorage.getItem("loggedInUser")) || null,
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.loggedInUser = action.played;
            localStorage.setItem("loggedInUser", JSON.stringify(action.played));
        },
        logout:(state)=>{
            state.loggedInUser=null;
            localStorage.removeItem('loggedInUser');
        }
    }
})
export const {login,logout}=userSlice.actions;
export default userSlice.reducer;