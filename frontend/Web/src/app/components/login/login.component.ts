import { Component, OnInit } from '@angular/core';
import { LoaderService, UserService } from '@providers';
import { LoginResponse } from '@shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

constructor(private _loader: LoaderService,
  private _user: UserService,
  private _router: Router) {
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.makeLoginRequest();
  }

  // why does this function exist??? @elitru?
  onKeyDown(): void {
    this.makeLoginRequest();
  }

  private makeLoginRequest(): void {
    if (!this.email || !this.password) {
      return;
    }

    this._loader.setVisible(true);

    // login part
    const s = this._user.login({email: this.email, password: this.password}).subscribe((res: LoginResponse) => {
      s.unsubscribe();
      this._user.user.next(res.user);
      this._user.token.next(res.token);
      this._user.tokenExpiration.next(new Date(res.expiration));
      this._user.save();
      this._router.navigateByUrl("/dashboard");
      this._loader.setVisible(false);
    }, err => {
      // TODO add dialog
      console.error(err);
    });

  }
}
