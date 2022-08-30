import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { InviteFriendComponent } from './components/invite-friend/invite-friend.component';
import { User } from './models/auth.models';
import { AccountService } from './services/account.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogService, MessageService],
})
export class AppComponent implements OnInit {
  user!: User;

  constructor(
    private accountSvc: AccountService,
    private router: Router,
    private dialogSvc: DialogService,
    private toastSvc: ToastService,
    private messageSvc: MessageService
  ) {
    this.setupToast();
  }
  setupToast() {
    this.toastSvc.messagesObs.subscribe(({ type, message }) => {
      switch (type) {
        case 'success': {
          this.messageSvc.add({
            severity: 'success',
            summary: 'Success',
            detail: message,
          });
        }
      }
    });
  }

  ngOnInit(): void {
    this.accountSvc.userUpdated$.subscribe((data) => {
      this.user = data;
    });
  }

  logOut() {
    this.accountSvc.logout();
    this.router.navigate(['login']);
  }

  openInviteDialog() {
    this.dialogSvc.open(InviteFriendComponent, {
      header: 'Invite a Friend',
      width: '25rem',
      modal: true,
      closeOnEscape: true,
    });
  }
}
