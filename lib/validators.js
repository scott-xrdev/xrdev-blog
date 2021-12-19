export const isValidEmail = (email) => {
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return false;
	}

	return true;
};

export const isValidPassword = (password) => {
	if (!password || password.trim().length < 7) {
		return false;
	}

	return true;
};

export const isValidText = (text) => {
	if (!text || text.trim() === '') {
		return false;
	}

	return true;
};
