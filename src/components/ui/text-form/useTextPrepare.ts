export const useTextPrepare = (typingText: string) => {
	const typingArray = typingText.split('\n');

	return { typingArray };
};
