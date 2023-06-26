import { createSlice} from "@reduxjs/toolkit";

const HomeSlice = createSlice({
    name: 'home',
    initialState: {
        url: {},
        genres: [{
            id: 0,
            name: "",
        }]
    },
    reducers: {
        getAPIConfiguration: (state, action) =>{
            state.url = action.payload
        },
        getGenres: (state, action) =>{
            if(state.genres.length === 1){

                state.genres = action.payload
            }else{
                state.genres = [...new Set([...state.genres, ...action.payload])]
            }
        },
    }
})

export const {getAPIConfiguration, getGenres} = HomeSlice.actions;
export default HomeSlice.reducer;