import { PaletteMode } from "@mui/material"
import { createSlice } from "@reduxjs/toolkit"

type StateType = {
    mode: PaletteMode
}

const initialState: StateType = {
    mode: 'light'
}


export const themeModeSlice = createSlice({
    name: 'themeMode',
    initialState,
    reducers: {
        toggleMode: state => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        }
    }
})


export const { toggleMode } = themeModeSlice.actions