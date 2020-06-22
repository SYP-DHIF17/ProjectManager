import { Component, OnInit } from '@angular/core';
import { LoaderService } from './providers/loader/loader.service';
import { Team } from "@models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  title = 'Web';

  constructor(public loader: LoaderService) {
    
  }

  ngOnInit(): void {
    this.loader.setVisible(false);
  }
}
