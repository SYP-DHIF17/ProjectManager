import { Component, OnInit } from '@angular/core';
import { UserService } from '@providers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {

  amountUnseenMessages: number = 2;

  constructor(public userService: UserService){
    
  }

  ngOnInit(): void{

  }

}
