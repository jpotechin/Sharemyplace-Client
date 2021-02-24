import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
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
	],
	exports: [ToastrModule, NgxGalleryModule, FileUploadModule],
})
export class SharedModule {}
