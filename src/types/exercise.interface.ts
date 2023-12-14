export interface ICategory {
	id: number;
	title: string;
}

export interface ILevel {
	id: number;
	levelNumber: number;
	exercises: IExercise[];
	category: ICategory;
}

export interface IExercise {
	id: number;
	createdAt: string;
	updatedAt: string;
	exercise: string;
	level: ILevel;
}
