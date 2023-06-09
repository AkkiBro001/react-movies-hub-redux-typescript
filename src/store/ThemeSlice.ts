import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const ThemeSlice = createSlice({
    name: "theme",
    initialState: true,
    reducers: {
        setTheme(_, action: PayloadAction<boolean>){
            
            return action.payload;
        }
    }
})

export const {setTheme} = ThemeSlice.actions;
export default ThemeSlice.reducer;
