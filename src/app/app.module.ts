import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './_modules/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		HomeComponent,
		RegisterComponent,
		MemberListComponent,
		MemberDetailComponent,
		ListsComponent,
		MessagesComponent,
		TestErrorsComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		SharedModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
