import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'ct-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private accountSvc: AccountService, private router: Router) {}

  ngOnInit(): void {
    if (this.accountSvc.isLoggedIn) {
      this.router.navigate(['foods']);
    }
  }

  login(form: NgForm) {
    for (const key in form.controls) form.controls[key].markAsDirty();

    if (form.valid) {
      const { email, password } = form.value;
      this.accountSvc.login(email, password).subscribe(() => {
        this.router.navigate(['foods']);
      });
    }
  }
}
