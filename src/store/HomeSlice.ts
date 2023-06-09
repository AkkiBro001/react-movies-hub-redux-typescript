import { createSlice} from "@reduxjs/toolkit";

const HomeSlice = createSlice({
    name: 'home',
    initialState: {
        url: {},
        genres: {}
    },
    reducers: {
        getAPIConfiguration: (state, action) =>{
            state.url = action.payload
        },
        getGenres: (state, action) =>{
            state.genres = action.payload
        },
    }
})

export const {getAPIConfiguration, getGenres} = HomeSlice.actions;
export default HomeSlice.reducer;