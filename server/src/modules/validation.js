export function isCorrectUsernameFormat(exp) {
	const regExp = /^[a-z0-9]{4,20}$/;
	return regExp.test(exp); 
}

export function isCorrectPasswordFormat(exp) {
	const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
	return regExp.test(exp);
}