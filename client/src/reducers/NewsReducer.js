const NewsReducer = (state, action) => {
    const {type, payload} = action
    console.log(payload)
    switch (type){
        case 'NEWS_DATA_LOADED_SUCCESS':
            return {
                ...state,
                newsLoading: false,
                newsData: payload, 
            }
        case 'NEWS_DATA_LOADED_FAIL':
            return {
                ...state,
                newsLoading: false,
                newsData: [],
            }
        default: return state
    }
}
export default NewsReducer