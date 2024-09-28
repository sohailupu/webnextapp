import { configureStore } from '@reduxjs/toolkit';
import plannerReducer from "./plannerSlice"

const store = configureStore({
  reducer: {
    planner: plannerReducer,
    // Add other reducers here
  },
  // Add middleware if needed
});

export default store;
