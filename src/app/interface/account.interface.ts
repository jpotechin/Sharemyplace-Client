export interface User {
	token: string;
	username: string;
}

export interface SignInAndUp {
	username: string;
	password: string;
}

export interface Member {
	UserName: string;
	Gender: string;
	DateOfBirth: string;
	KnownAs: string;
	Created: Date;
	LastActive: Date;
	Introduction: string;
	LookingFor: string;
	Interests: string;
	City: string;
	State: string;
	OwnerRenter: boolean;
	Photos: Photo[];
}

export interface Photo {
	id: number;
	Url: string;
	IsMain: boolean;
}
