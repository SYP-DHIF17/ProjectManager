import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onContinue() {
    console.log("LALALAL");
  }

}
