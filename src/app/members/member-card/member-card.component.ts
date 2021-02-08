import { Component, Input, OnInit } from '@angular/core';
import { faEnvelope, faThumbsUp, faUser } from '@fortawesome/free-solid-svg-icons';
import { Member } from './../../interface/account.interface';

@Component({
	selector: 'app-member-card',
	templateUrl: './member-card.component.html',
	styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent implements OnInit {
	@Input() member!: Member;

	userIcon = faUser;
	thumbsUpIcon = faThumbsUp;
	messageIcon = faEnvelope;

	constructor() {}

	ngOnInit(): void {}
}
