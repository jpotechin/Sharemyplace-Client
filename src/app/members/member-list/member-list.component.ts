import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MembersService } from './../../_services/members.service';
import { IMember } from './../../interface/account.interface';

@Component({
	selector: 'app-member-list',
	templateUrl: './member-list.component.html',
	styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
	members$!: Observable<IMember[]>;

	constructor(private memberService: MembersService) {}

	ngOnInit(): void {
		this.members$ = this.memberService.getMembers();
	}
}
