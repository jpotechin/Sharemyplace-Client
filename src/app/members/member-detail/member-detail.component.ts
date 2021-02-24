import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { MembersService } from './../../_services/members.service';
import { IMember } from './../../interface/account.interface';

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

	constructor(private memberService: MembersService, private route: ActivatedRoute) {}

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

	public toggleTabs($tabNumber: number): void {
		this.openTab = $tabNumber;
	}
}
