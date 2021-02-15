export interface User {
	token: string;
	username: string;
}

export interface SignInAndUp {
	username: string;
	password: string;
}

export interface Member {
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
	photos: Photo[];
}

export interface Photo {
	id: number;
	url: string;
	isMain: boolean;
}
