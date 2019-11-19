import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/providers/loader/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password_1: string = '';
  password_2: string = '';

  constructor(private loader: LoaderService){

  }

  ngOnInit(): void{
        
  }

  onRegister(): void{
    this.makeRegisterRequest();
  }

  onKeyDown(): void{
    this.makeRegisterRequest();
  }

  private makeRegisterRequest(): void{
    if(this.email === '' || this.password_1 === '' || this.password_2 == '' ||
      (this.password_1 != this.password_2)){
      return;
    }

    this.loader.setVisible(true);
  }

}
