import { Component, OnInit } from '@angular/core';
import { User } from './models/auth.models';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user!: User;

  constructor(private accountSvc: AccountService) {}

  ngOnInit(): void {
    this.accountSvc.userUpdated$.subscribe((data) => {
      console.log('asd', data);
      this.user = data;
    });
  }
}
