import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  building:{},
  elevators:[],
  closestElevator:{},
  positions:[],
  queue:[],
}

const buildingSlice = createSlice({
  name: 'building', 
  initialState,
  reducers: {
    setBuilding: (state, action) => {
      state.building = action.payload;
    },
    setElevators: (state, action) => {
      state.elevators = action.payload;
    },
    setClosestElevator: (state, action) => {
      state.closestElevator = action.payload;
    },
    setPositions: (state, action) => {
      state.positions = action.payload;
    },
    setQueue: (state, action) => {
      state.queue = action.payload;
    },
  },
})


export const { 
  setBuilding,
  setElevators,
  setClosestElevator,
  setPositions,
  setQueue,
} = buildingSlice.actions

export default buildingSlice.reducer