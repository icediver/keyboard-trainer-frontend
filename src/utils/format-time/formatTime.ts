export const formatTime = (timer: number) => {
	const getSeconds = `0${timer % 60}`.slice(-2);
	const minutes = Math.floor(timer / 60);
	const getMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

	return `${getMinutes}:${getSeconds} `;
};
