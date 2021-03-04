import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { MembersService } from './../../_services/members.service';
import { MessageService } from './../../_services/message.service';
import { IMember } from './../../interface/account.interface';
import { IMessage } from './../../interface/message';

@Component({
	selector: 'app-member-detail',
	templateUrl: './member-detail.component.html',
	styleUrls: ['./member-detail.component.scss'],
})
export class MemberDetailComponent implements OnInit {
	member!: IMember;
	openTab = 1;
	galleryOptions!: NgxGalleryOptions[];
	galleryImages!: NgxGalleryImage[];
	messages: IMessage[] | [] = [];
	memberUsername = '';

	constructor(
		private memberService: MembersService,
		private messageService: MessageService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.loadMember();
		this.route.queryParams.subscribe((params) => {
			params.tab ? this.toggleTabs(parseInt(params.tab, 10)) : this.toggleTabs(1);
		});
		this.galleryOptions = [
			{
				width: '500px',
				height: '500px',
				imagePercent: 100,
				thumbnailsColumns: 4,
				imageAnimation: NgxGalleryAnimation.Slide,
				preview: false,
			},
		];
	}

	getImages(): NgxGalleryImage[] {
		const imageUrls = [];
		for (const photo of this.member.photos) {
			imageUrls.push({
				small: photo?.url,
				medium: photo?.url,
				big: photo?.url,
			});
		}
		return imageUrls;
	}

	loadMember(): void {
		// @ts-ignore
		this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe((member) => {
			this.member = member;
			this.galleryImages = this.getImages();
		});
	}

	loadMessages(): void {
		const username = this.route.snapshot.paramMap.get('username')
			? this.route.snapshot.paramMap.get('username')
			: this.member.username;
		this.memberUsername = username ? username : this.member.username;
		this.messageService.getMessageThread(this.memberUsername).subscribe((messages) => {
			this.messages = messages;
		});
	}

	public toggleTabs($tabNumber: number): void {
		this.openTab = $tabNumber;
		if (this.openTab === 4 && this.messages.length === 0) {
			this.loadMessages();
		}
	}

	public toggleMessagesTab(): void {
		this.openTab = 4;
		if (this.messages.length === 0) {
			this.loadMessages();
		}
	}
}
