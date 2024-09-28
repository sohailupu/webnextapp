import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // initial state we need to define here
  data: {},
};

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    setPlannerData(state, action) {
      state.data = action.payload;
    },
    // Adding fazla reducers
  },
});

export const { setPlannerData } = plannerSlice.actions;

export default plannerSlice.reducer;
