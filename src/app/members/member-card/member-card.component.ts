import { Component, Input, OnInit } from '@angular/core';
import { faEnvelope, faThumbsUp, faUser } from '@fortawesome/free-solid-svg-icons';
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

	constructor() {}

	ngOnInit(): void {}
}
