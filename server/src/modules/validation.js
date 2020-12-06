export function checkUsernameFormat(exp) {
	const regExp = /^[a-z0-9]{4,20}$/;
	return regExp.test(exp); 
}

export function checkPasswordFormat(exp) {
	const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{4,20}$/;
	return regExp.test(exp);
}