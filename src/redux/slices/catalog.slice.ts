import { createSlice } from "@reduxjs/toolkit"
import { RootState } from '../config-store'
const initialState = {
    selectedCalalogForDanhMucPage: {
        tenDanhMuc: null,
        maDanhMuc: null
    }
};
const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        selectCatalogForDanhMucPage: (state, action) => {
            state.selectedCalalogForDanhMucPage = action.payload
        }
    }
})
export default catalogSlice.reducer
export const { selectCatalogForDanhMucPage } = catalogSlice.actions
export const getSelectedCalalog = (state: RootState) => state.catalog.selectedCalalogForDanhMucPage
