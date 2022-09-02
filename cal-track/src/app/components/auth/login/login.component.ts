import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'ct-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private accountSvc: AccountService,
    private router: Router,
    private toastSvc: ToastService
  ) {}

  ngOnInit(): void {
    if (this.accountSvc.isLoggedIn) {
      this.router.navigate(['foods']);
    }
  }

  login(form: NgForm) {
    for (const key in form.controls) form.controls[key].markAsDirty();

    if (form.valid) {
      const { email, password } = form.value;
      this.accountSvc.login(email, password).subscribe(
        () => {
          this.router.navigate(['foods']);
        },
        (err) => {
          console.log(err);
          this.toastSvc.showErrorToast('Email / Password invalid');
        }
      );
    }
  }
}
