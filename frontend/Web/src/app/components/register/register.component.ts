import { Component, OnInit } from '@angular/core';
import { LoaderService, UserService } from '@providers';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password_1: string = '';
  password_2: string = '';
  startDate: NgbDateStruct = {
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  };
  faCalendar = faCalendar;

  constructor(private loader: LoaderService,
    private _user: UserService,
    private _router: Router) {

  }

  ngOnInit(): void {

  }

  onRegister(): void {
    this.makeRegisterRequest();
  }

  // why does this function exist??? @elitru?
  onKeyDown(): void {
    this.makeRegisterRequest();
  }

  private makeRegisterRequest(): void {
    if (!this.email ||
      !this.password_1! ||
      !this.password_2 ||
      !this.firstname ||
      !this.lastname ||
      (this.password_1 != this.password_2)) {
      return;
    }

    const r = this._user.register(this.firstname, this.lastname, this.email, this.password_1, new Date())

    this.loader.setVisible(true);
  }

}
