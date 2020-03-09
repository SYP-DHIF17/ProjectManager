import { Component, OnInit } from '@angular/core';
import { Ticket } from '@models';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.styl']
})
export class TicketsComponent implements OnInit {

  tickets: Ticket[] = [
    new Ticket(null, 'Bug im Client Interface'),
    new Ticket(null, 'Login für australische User nicht möglich'),
    new Ticket(null, 'Neue ABGs, muss noch online eingeführt werden')
  ];

  constructor() {

  }

  ngOnInit(): void {

  }

}
