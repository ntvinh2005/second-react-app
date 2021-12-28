export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:5000/api'
		: 'https://whispering-fortress-65647.herokuapp.com/api'

export const LOCAL_STORAGE_TOKEN_NAME = 'vinh-app'