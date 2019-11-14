import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(){

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

  }
}
