export interface IUser {
	token: string;
	username: string;
	photoUrl: string;
	knownAs: string;
	gender: string;
}

export interface ISignInAndUp {
	username: string;
	password: string;
}

export interface IMember {
	id: number;
	username: string;
	photoUrl: string;
	gender: string;
	age: number;
	knownAs: string;
	created: string;
	lastActive: string;
	introduction: string;
	lookingFor: string;
	interests: string;
	ownerRenter: boolean;
	city: string;
	state: string;
	photos: IPhoto[];
}

export interface IPhoto {
	id: number;
	url: string;
	isMain: boolean;
}
