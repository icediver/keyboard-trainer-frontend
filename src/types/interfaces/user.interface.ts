import { ICategory, IExercise } from '../exercise.interface';

export interface IUser {
	id: number;
	name: string;
	email: string;
	avatarPath: string;
	currentCategory?: ICategory;
	isAdmin: boolean;
	solvedExercises: IExercise[];
}

export interface IAuthResponse {
	user: IUser;
	accessToken: string;
}
