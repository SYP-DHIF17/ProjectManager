import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {

  amountUnseenMessages: number = 2;

  constructor(){

  }

  ngOnInit(): void{

  }

}
