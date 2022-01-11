const AssistantReducer = (state, action) => {
    const {type, payload} = action
    console.log(payload)
    switch (type){
        case 'WEATHER_DATA_LOADED_SUCCESS':
            return {
                ...state,
                weatherLoading: false,
                weatherData: payload[0], 
                weatherIcon: payload[1]
            }
        case 'WEATHER_DATA_LOADED_FAIL':
            return {
                ...state,
                weatherLoading: false,
                weatherData: [], 
                weatherIcon: ''
            }
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
export default AssistantReducer