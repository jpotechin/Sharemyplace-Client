import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from './../../_services/message.service';
import { IMessage } from './../../interface/message';

@Component({
	selector: 'app-member-messages',
	templateUrl: './member-messages.component.html',
	styleUrls: ['./member-messages.component.scss'],
})
export class MemberMessagesComponent implements OnInit {
	@Input() username!: string;
	messages: IMessage[] | [] = [];
	constructor(private messageService: MessageService) {}

	ngOnInit(): void {
		this.loadMessages();
	}

	loadMessages() {
		this.messageService.getMessageThread(this.username).subscribe((messages) => {
			this.messages = messages;
		});
	}
}
