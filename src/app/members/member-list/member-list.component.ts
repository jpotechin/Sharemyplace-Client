import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AccountService } from './../../_services/account.service';
import { MembersService } from './../../_services/members.service';
import { IMember, IUser } from './../../interface/account.interface';
import { IPagination } from './../../interface/pagination';
import { UserParams } from './../../interface/userParams';

@Component({
	selector: 'app-member-list',
	templateUrl: './member-list.component.html',
	styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
	members!: IMember[];
	pagination!: IPagination;
	items: IMember[] | [] = [];
	userParams!: UserParams;
	user: IUser | null = null;
	genderList = [
		{ value: 'male', display: 'Males' },
		{ value: 'female', display: 'Females' },
	];
	model = 'lastActive';

	constructor(private memberService: MembersService) {
		this.userParams = this.memberService.getUserParams();
	}

	ngOnInit(): void {
		this.loadMembers();
	}

	loadMembers(): void {
		this.memberService.setUserParams(this.userParams);
		this.memberService
			.getMembers(this.userParams)
			.subscribe((response: { result: IMember[]; pagination: IPagination }) => {
				this.members = response.result;
				this.items = response.result;
				this.pagination = response.pagination;
			});
	}

	resetFilters(): void {
		if (this.user) {
			this.userParams = this.memberService.resetUserParams();
			this.loadMembers();
		}
	}

	pageChanged(eventPage: any): void {
		this.userParams.pageNumber = eventPage;
		this.memberService.setUserParams(this.userParams);
		this.loadMembers();
	}

	sortButton(selection: string): void {
		this.userParams.orderBy = selection;
		this.loadMembers();
	}
}
