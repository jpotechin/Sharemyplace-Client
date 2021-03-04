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

	constructor(
		private memberService: MembersService,
		private messageService: MessageService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.loadMember();
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
		this.messageService.getMessageThread(this.member.username).subscribe((messages) => {
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
