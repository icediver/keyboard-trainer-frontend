import { useState } from 'react';
import { typingText } from '../../backend-temp-data/typing-text';
import {
	IPressedKey,
	useGlobalContext
} from '../../contexts/current-key-context';

let count = 0;

export const compareLetter = (pressedKey: IPressedKey): void => {
	const { context, setContext } = useGlobalContext();
	const { isTimerStarted } = context;
	const typingArray = typingText.split('\n');
	const totalSymbols = typingArray.join(' ').length;

	const [typingRow, setTypingRow] = useState<number>(0);
	const [typingString, setTypingString] = useState<string>(
		typingArray[typingRow]
	);
	const [textState, setTextState] = useState<string>('');
	const [index, setIndex] = useState<number>(0);
	if (
		index >= typingString.length &&
		(pressedKey.code === 'Enter' || pressedKey.code === 'Space')
	) {
		if (typingRow < typingArray.length - 1) {
			const index = typingRow + 1;
			setTypingRow(index);
			setTypingString(typingArray[index]);
			setTextState(textState + '\n');
			setIndex(0);
			console.log('index', index, 'typingArray.length', typingArray.length);
		}

		if (index >= typingArray.length - 1) {
			console.log('the end');
			setContext(prevCtx => ({
				...prevCtx,
				isTimerStarted: false
			}));
		}
	}
	if (
		pressedKey &&
		typingString[index] === pressedKey.key &&
		typingString[index] !== undefined
	) {
		if (!isTimerStarted) {
			setContext(prevCtx => {
				return {
					...prevCtx,
					isTimerStarted: true
				};
			});
		}
		setTextState(textState + pressedKey.key);
		count++;

		if (typingString.length > index) setIndex(index + 1);
	}
};
