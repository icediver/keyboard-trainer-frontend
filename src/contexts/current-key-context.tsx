import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useMemo,
	useState
} from 'react';

export interface IPressedKey {
	code?: string;
	key?: string;
}

export interface IAppContext {
	pressedKey?: IPressedKey | null;
	isTimerStarted?: boolean;
	errorCount?: number;
	currentExerciseId: number;
}

type TypeSetContext<T> = Dispatch<SetStateAction<T>>;

export interface IAppContextState {
	context: IAppContext;
	setContext: TypeSetContext<IAppContext>;
}

const initialContext: IAppContextState = {
	context: { isTimerStarted: false, errorCount: 0, currentExerciseId: 1 },
	setContext: () => {}
};

export const AppContext = createContext<IAppContextState>(initialContext);

export const AppProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [context, setContext] = useState<IAppContext>({
		isTimerStarted: false,
		errorCount: 0,
		currentExerciseId: 1
	});

	const value = useMemo(() => ({ context, setContext }), [context]);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => useContext(AppContext);
