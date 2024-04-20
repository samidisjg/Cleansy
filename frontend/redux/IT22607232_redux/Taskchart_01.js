import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    categories:[],
    Analysis:[]
}
export const TaskchartSlice = createSlice({ 
        name: "Taskchart",
        initialState,
        reducers: {
            getAnalysis: (state, action) => {
                state.Analysis = action.payload;
            },
        }
});

export const { getAnalysis } = TaskchartSlice.actions;
export default TaskchartSlice.reducer;