import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		ToastrModule.forRoot({
			positionClass: 'toast-bottom-right',
		}),
		NgxGalleryModule,
	],
	exports: [ToastrModule, NgxGalleryModule],
})
export class SharedModule {}
