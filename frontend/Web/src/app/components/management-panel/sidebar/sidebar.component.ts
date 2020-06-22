import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.styl']
})
export class SidebarComponent implements OnInit {

	constructor(public router: Router) {
        
	}

	ngOnInit(): void {
        
	}

	public test(event: MouseEvent): void {

	}
}
