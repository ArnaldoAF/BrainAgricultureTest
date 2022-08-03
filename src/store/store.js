import { configureStore } from '@reduxjs/toolkit'
import farmListSlicer from './farmlist'
import currentFarmSlicer from './currentFarm'

export default configureStore({
  reducer: {
    farmlist: farmListSlicer,
    currentFarm: currentFarmSlicer,
  },
})