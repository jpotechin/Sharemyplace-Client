import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { MembersService } from './../_services/members.service';
import { IMember } from './../interface/account.interface';

@Injectable({
	providedIn: 'root',
})
export class MemberDetailedResolver implements Resolve<IMember> {
	constructor(private membersService: MembersService) {}

	resolve(route: ActivatedRouteSnapshot): Observable<IMember> {
		const routeParamUsername = route.paramMap.get('username');
		const username = routeParamUsername ? routeParamUsername : '';
		return this.membersService.getMember(username);
	}
}
