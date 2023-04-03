import { configureStore } from '@reduxjs/toolkit'
import building from './store/services/buildingReducer';

export const store = configureStore({
  reducer: {
    building,
  },
})









