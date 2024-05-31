import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { SessionService } from '../services/session.service';
import { User } from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  items!: MenuItem[] ;
  public user?: User;

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.sessionService.getUser().subscribe(res => {
      this.user = res;
    });
  }

  closeSessionUser(){
    this.sessionService.clearUser();
  }

}
