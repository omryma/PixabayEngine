import { createSlice } from '@reduxjs/toolkit';
import { API_URL, KEY } from "../utils/config";

export const initialState = {
    images: [],
    isLoading: false,
    isError: false,
    keepFetch: true,
    resultsPage: 1,
    recentTags: [],
    currentTags: []
}

const engineSlice = createSlice({
    name: 'engine',
    initialState,
    reducers: {
        fetchImagesFulfilled: (state, { payload }) => {
            const { imagesHits, pageNum } = payload
            if (imagesHits.length) {
                state.images = pageNum === 1 ? imagesHits : state.images.concat(imagesHits) //Determine if it's a new query or not
                state.resultsPage = pageNum + 1
            }
            if (imagesHits.length < 50) {
                state.keepFetch = false
            }
            state.isLoading = false
        },
        fetchImagesPending: (state, { payload }) => {
            const { tags, pageNum } = payload
            state.isLoading = true
            state.isError = false
            state.keepFetch = true
            if (pageNum === 1) {
                state.currentTags = tags
                state.recentTags = [...new Set(state.recentTags.concat(tags))].slice(0, 9)
            }
        },
        fetchImagesFailure: (state) => {
            state.isLoading = false
            state.isError = true
            state.keepFetch = false
        },
    }
})

export const { fetchImagesFulfilled, fetchImagesPending, fetchImagesFailure } = engineSlice.actions

export const engineSelector = (state) => state.engine

export default engineSlice.reducer

export const fetchImages = (tags, pageNum = 1) => async dispatch => {
    dispatch(fetchImagesPending({ tags, pageNum }))
    try {
        const imagesDataResponse = await fetch(`${API_URL}/?key=${KEY}&per_page=50&page=${pageNum}&q=${tags.join('+')}&pretty=true/`)
        const imagesData = await imagesDataResponse.json()
        const { hits: imagesHits } = imagesData
        dispatch(fetchImagesFulfilled({ imagesHits, pageNum }))
    } catch(err) {
        console.log(err)
        dispatch(fetchImagesFailure())
    }
}