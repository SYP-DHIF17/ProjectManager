import { Component } from '@angular/core';
import { LoaderService } from './providers/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'Web';

  constructor(public loader: LoaderService){
    
  }
}
