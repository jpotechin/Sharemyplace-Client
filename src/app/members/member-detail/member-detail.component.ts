import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MembersService } from './../../_services/members.service';
import { Member } from './../../interface/account.interface';

@Component({
	selector: 'app-member-detail',
	templateUrl: './member-detail.component.html',
	styleUrls: ['./member-detail.component.scss'],
})
export class MemberDetailComponent implements OnInit {
	member!: Member;

	constructor(private memberService: MembersService, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.loadMember();
	}

	loadMember(): void {
		// @ts-ignore
		this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe((member) => {
			this.member = member;
		});
	}
	// loadMember(): void {
	// 	const username = this.route.snapshot.paramMap.get('username');
	// 	if (username) {
	// 		this.memberService.getMember(username).subscribe((selectedMember) => {
	// 			console.log('Member', selectedMember);
	// 			this.member = selectedMember;
	// 		});
	// 	}
	// }
}
