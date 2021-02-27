import { IUser } from './account.interface';

export class UserParams {
	gender = '';
	minAge = 18;
	maxAge = 99;
	pageNumber = 1;
	pageSize = 5;
	orderBy = 'lastActive';

	constructor(user: IUser) {
		this.gender = user.gender === 'female' ? 'female' : 'male';
	}
}
