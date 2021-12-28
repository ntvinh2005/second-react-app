export const authReducer = (state, action) => {
	const {
		type,
		payload: { isAuthenticated, user }
	} = action
    console.log(type)
    if (type==='SET_AUTH') console.log('SET_AUTH')
	switch (type) {
		case 'SET_AUTH':
			return {
				...state,
				authLoading: false,
				isAuthenticated,
				user
			}

		default:
			return state
	}
}