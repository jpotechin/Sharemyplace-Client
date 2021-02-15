import { MembersService } from './../../_services/members.service';
import { AccountService } from './../../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Member, User } from 'src/app/interface/account.interface';
import { take } from 'rxjs/operators';

@Component({
	selector: 'app-member-edit',
	templateUrl: './member-edit.component.html',
	styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent implements OnInit {
	member!: Member;
	user!: User | null;

	constructor(private accountService: AccountService, private memberService: MembersService) {
		this.accountService.currentUser$.pipe(take(1)).subscribe((user) => (this.user = user));
	}

	ngOnInit(): void {
		this.loadMember();
	}

	loadMember(): void {
		if (this.user) {
			this.memberService.getMember(this.user.username).subscribe((member) => (this.member = member));
		}
	}
}
