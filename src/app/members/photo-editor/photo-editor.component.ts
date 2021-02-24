import { Component, Input, OnInit } from '@angular/core';
import { faBan, faTrashAlt, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { IMember, IPhoto, IUser } from 'src/app/interface/account.interface';
import { environment } from 'src/environments/environment';
import { AccountService } from './../../_services/account.service';
import { MembersService } from './../../_services/members.service';

@Component({
	selector: 'app-photo-editor',
	templateUrl: './photo-editor.component.html',
	styleUrls: ['./photo-editor.component.scss'],
})
export class PhotoEditorComponent implements OnInit {
	@Input() member!: IMember;
	trashIcon = faTrashAlt;
	uploadIcon = faUpload;
	banIcon = faBan;

	uploader!: FileUploader;
	hasAnotherDropZoneOver = false;
	hasBaseDropZoneOver = false;
	baseUrl = environment.apiUrl;
	user: IUser | null = null;

	constructor(private accountService: AccountService, private memberService: MembersService) {
		this.accountService.currentUser$.pipe(take(1)).subscribe((user) => (this.user = user));
	}

	ngOnInit(): void {
		this.initializeUploader();
	}

	initializeUploader(): void {
		this.uploader = new FileUploader({
			url: this.baseUrl + 'users/add-photo',
			authToken: 'Bearer ' + this.user?.token,
			isHTML5: true,
			allowedFileType: ['image'],
			removeAfterUpload: true,
			autoUpload: false,
			maxFileSize: 10 * 1024 * 1024,
		});

		this.uploader.onAfterAddingFile = (file) => {
			file.withCredentials = false;
		};

		this.uploader.onSuccessItem = (item, reponse, status, headers) => {
			if (reponse) {
				const photo = JSON.parse(reponse);
				this.member.photos.push(photo);
			}
		};
	}

	public fileOverBase(e: any): void {
		this.hasBaseDropZoneOver = e;
	}

	public fileOverAnother(e: any): void {
		this.hasAnotherDropZoneOver = e;
	}

	public setMainPhoto(photo: IPhoto): void {
		this.memberService.setMainPhoto(photo.id).subscribe(() => {
			if (this.user) {
				this.user.photoUrl = photo.url;
			}
			this.accountService.setCurrentUser(this.user);
			this.member.photoUrl = photo.url;
			this.member.photos.forEach((p) => {
				if (p.isMain) {
					p.isMain = false;
				}
				if (p.id === photo.id) {
					p.isMain = true;
				}
			});
		});
	}

	public deletePhoto(photoId: number): void {
		this.memberService.deletePhoto(photoId).subscribe(() => {
			this.member.photos = this.member.photos.filter((pic) => pic.id !== photoId);
		});
	}
}
