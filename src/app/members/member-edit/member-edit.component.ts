import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { IMember, IUser } from 'src/app/interface/account.interface';
import { AccountService } from './../../_services/account.service';
import { MembersService } from './../../_services/members.service';

@Component({
	selector: 'app-member-edit',
	templateUrl: './member-edit.component.html',
	styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent implements OnInit {
	member!: IMember;
	user: IUser | null = null;
	openTab = 1;
	galleryOptions: NgxGalleryOptions[] | undefined;
	galleryImages: NgxGalleryImage[] | undefined;

	@ViewChild('editForm') editForm!: NgForm;
	// tslint:disable-next-line: typedef
	@HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
		if (this.editForm.dirty) {
			$event.returnValue = true;
		}
	}

	constructor(
		private accountService: AccountService,
		private memberService: MembersService,
		private toastr: ToastrService
	) {
		this.accountService.currentUser$.pipe(take(1)).subscribe((user) => (this.user = user));
	}

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

	loadMember(): void {
		if (this.user) {
			this.memberService.getMember(this.user.username).subscribe((member) => {
				this.member = member;

				this.galleryImages = this.getImages();
			});
		}
	}

	public toggleTabs($tabNumber: number): void {
		this.openTab = $tabNumber;
	}

	getImages(): NgxGalleryImage[] {
		const imageUrls = [];
		console.log(this.member);
		if (this.member?.photos) {
			for (const photo of this.member?.photos) {
				imageUrls.push({
					small: photo?.url,
					medium: photo?.url,
					big: photo?.url,
				});
			}
		}
		console.log(imageUrls);
		return imageUrls;
	}

	updateMember(): void {
		this.memberService.updateMember(this.member).subscribe(() => {
			this.toastr.success('Profile updated successfully');
			this.editForm.reset(this.member);
		});
	}
}
