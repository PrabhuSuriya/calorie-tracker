import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountService } from 'src/app/services/account.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'ct-invite-friend',
  templateUrl: './invite-friend.component.html',
  styleUrls: ['./invite-friend.component.scss'],
})
export class InviteFriendComponent {
  showError = false;

  constructor(
    private accountSvc: AccountService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private toastSvc: ToastService
  ) {}

  invite(form: NgForm) {
    this.showError = false;
    for (const key in form.controls) form.controls[key].markAsDirty();

    if (form.valid) {
      const { name, email } = form.value;
      this.accountSvc.inviteUser(name, email).subscribe((data) => {
        if (!data.error) {
          this.toastSvc.showSuccessToast('User invited successfully!');
          this.ref.close();
        } else {
          this.showError = true;
        }
      });
    }
  }
}
