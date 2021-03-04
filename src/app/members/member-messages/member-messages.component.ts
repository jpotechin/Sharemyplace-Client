import { Component, Input, OnInit } from '@angular/core';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { IMessage } from './../../interface/message';

@Component({
	selector: 'app-member-messages',
	templateUrl: './member-messages.component.html',
	styleUrls: ['./member-messages.component.scss'],
})
export class MemberMessagesComponent implements OnInit {
	@Input() messages!: IMessage[] | [];
	@Input() username = '';
	clockIcon = faClock;

	constructor() {}

	ngOnInit(): void {}
}
