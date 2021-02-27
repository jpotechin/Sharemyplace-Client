import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		ToastrModule.forRoot({
			positionClass: 'toast-bottom-right',
		}),
		NgxGalleryModule,
		FileUploadModule,
		NgbPaginationModule,
	],
	exports: [ToastrModule, NgxGalleryModule, FileUploadModule, NgbPaginationModule],
})
export class SharedModule {}
