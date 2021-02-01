import { Component, isDevMode, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-server-error',
	templateUrl: './server-error.component.html',
	styleUrls: ['./server-error.component.scss'],
})
export class ServerErrorComponent implements OnInit {
	redoIcon = faRedo;
	error: any;
	developerMode = isDevMode();
	constructor(private router: Router, private toastr: ToastrService) {
		const navigation = this.router.getCurrentNavigation();
		this.error = navigation?.extras?.state?.error;
	}

	ngOnInit(): void {
		if (!this.error) {
			this.toastr.info('No error, redirecting to home');
			this.redirect();
		}
	}

	redirect(): void {
		setTimeout(() => {
			this.router.navigateByUrl('/');
		}, 1000);
	}
}
