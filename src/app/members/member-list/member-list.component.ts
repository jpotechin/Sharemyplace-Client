import { Component, OnInit } from '@angular/core';
import { MembersService } from './../../_services/members.service';
import { IMember } from './../../interface/account.interface';
import { IPagination } from './../../interface/pagination';

@Component({
	selector: 'app-member-list',
	templateUrl: './member-list.component.html',
	styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
	members!: IMember[];
	pagination!: IPagination;
	pageNumber = 1;
	pageSize = 5;

	constructor(private memberService: MembersService) {}

	ngOnInit(): void {
		this.loadMembers();
	}

	loadMembers(): void {
		this.memberService
			.getMembers(this.pageNumber, this.pageSize)
			.subscribe((response: { result: IMember[]; pagination: IPagination }) => {
				this.members = response.result;
				this.pagination = response.pagination;
			});
	}
}
