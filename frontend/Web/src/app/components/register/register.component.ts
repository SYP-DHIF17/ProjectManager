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
  birthdate: NgbDateStruct = {
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

    const { firstname, lastname, email, password_1, birthdate } = this;
    const { year, month, day } = birthdate;

    const r = this._user.register({
      firstname,
      lastname,
      email,
      password: password_1,
      birthdate: new Date(year, month - 1, day).toISOString().split('T')[0]
    })
      .subscribe(() => {
        r.unsubscribe();
        const login = this._user.login(
          {
            email: this.email,
            password: this.password_1
          }
        )
          .subscribe(res => {
            login.unsubscribe();
            this._user.token.next(res.token);
            this._user.tokenExpiration.next(new Date(res.expiration));
            this._user.user.next(res.user);
            this._user.save();
            this.loader.setVisible(false);
            this._router.navigateByUrl("/")
          }, err => {
            // TODO display err msg
            console.error(err);
          });
      }, err => {
        // TODO make err dialog
        console.error(err);
      });


    this.loader.setVisible(true);
  }

}
