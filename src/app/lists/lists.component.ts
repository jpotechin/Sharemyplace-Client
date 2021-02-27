/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { MembersService } from './../_services/members.service';
import { IPagination } from '../interface/pagination';

@Component({
	selector: 'app-lists',
	templateUrl: './lists.component.html',
	styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
	members: any;
	predicate = 'liked';
	pageNumber = 1;
	pageSize = 5;
	pagination!: IPagination;

	constructor(private memberService: MembersService) {}

	ngOnInit(): void {
		this.loadLikes();
	}

	loadLikes(): void {
		this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe((response: any) => {
			this.members = response.result;
			this.pagination = response.pagination;
		});
	}

	typeOfLikeButton(selection: string): void {
		this.predicate = selection;
		this.loadLikes();
	}

	pageChanged(eventPage: any): void {
		this.pageNumber = eventPage;
		this.loadLikes();
	}
}
