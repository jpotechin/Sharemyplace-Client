import { Component, Input, OnInit } from '@angular/core';
import { faEnvelope, faThumbsUp, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from './../../_services/members.service';
import { IMember } from './../../interface/account.interface';

@Component({
	selector: 'app-member-card',
	templateUrl: './member-card.component.html',
	styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent implements OnInit {
	@Input() member!: IMember;

	userIcon = faUser;
	thumbsUpIcon = faThumbsUp;
	messageIcon = faEnvelope;

	constructor(private memberService: MembersService, private toastr: ToastrService) {}

	ngOnInit(): void {}

	addLike(member: IMember): void {
		this.memberService.addLike(member.username).subscribe(() => {
			this.toastr.success(`You have liked ${member.knownAs}`);
		});
	}
}
