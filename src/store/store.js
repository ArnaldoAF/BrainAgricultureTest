import { configureStore } from '@reduxjs/toolkit'
import farmListSlicer from './farmlist'

export default configureStore({
  reducer: {
    farmlist: farmListSlicer
  },
})