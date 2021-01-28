import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		ToastrModule.forRoot({
			positionClass: 'toast-bottom-right',
		}),
	],
	exports: [ToastrModule],
})
export class SharedModule {}
