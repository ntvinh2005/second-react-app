const DictionaryReducer = (state, action) => {
    const {type, payload} = action
    console.log(payload)
    switch (type){
        case 'DICTIONARY_DATA_LOADED_SUCCESS':
            console.log("Yeah")
            return {
                ...state,
                dictionaryLoading: false,
                dictionaryData: payload, 
            }
        case 'DICTIONARY_DATA_LOADED_FAIL':
            return {
                ...state,
                dictionaryLoading: false,
                dictionaryData: [],
            }
        default: return state
    }
}
export default DictionaryReducer