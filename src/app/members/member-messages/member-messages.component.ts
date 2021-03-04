import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'src/app/_services/message.service';
import { IMessage } from './../../interface/message';

@Component({
	selector: 'app-member-messages',
	templateUrl: './member-messages.component.html',
	styleUrls: ['./member-messages.component.scss'],
})
export class MemberMessagesComponent implements OnInit {
	@ViewChild('messageForm')
	messageForm!: NgForm;
	@Input() messages: IMessage[] = [];
	@Input() username = '';
	messageContent = '';
	clockIcon = faClock;

	constructor(private messageService: MessageService) {}

	ngOnInit(): void {}

	sendMessage(): void {
		this.messageService.sendMessage(this.username, this.messageContent).subscribe((message: IMessage): void => {
			this.messages.push(message);
			this.messageForm.reset();
		});
	}
}
