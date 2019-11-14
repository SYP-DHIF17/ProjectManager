import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/providers/loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private loader: LoaderService){

  }

  ngOnInit(): void{
        
  }

  onLogin(): void{
    this.makeLoginRequest();
  }

  onKeyDown(): void{
    this.makeLoginRequest();
  }

  private makeLoginRequest(): void{
    if(this.email === '' || this.password === ''){
      return;
    }

    this.loader.setVisible(true);
  }
}
