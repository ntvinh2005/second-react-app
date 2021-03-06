const NoteReducer = (state, action) => {
    const {type, payload} = action
    switch (type){
        case 'NOTE_LOADED_SUCCESS':
            return {
                ...state,
                noteLoading: false,
                notes: payload, 
            }
        case 'NOTE_LOADED_FAIL':
            return {
                ...state,
                noteLoading: false,
                notes: [], 
            }
        case 'ADD_NOTE':
            return {
                ...state, 
                notes: [...state.notes, payload]
            }
        default: return state
        case 'DELETE_POST':
            return {
                ...state,
                notes: state.notes.filter(note => note._id!==payload)
            }
        case 'UPDATE_NOTE':
            state.notes.map(note => console.log(note._id))
            const newNotes = state.notes.map(note =>
				note._id === payload._id ? payload : note
			)

			return {
				...state,
				notes: newNotes
			}

    }
}
export default NoteReducer