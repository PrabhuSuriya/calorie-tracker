import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messages$ = new Subject<any>();
  messagesObs = this.messages$.asObservable();

  showSuccessToast(message: string) {
    this.messages$.next({ type: 'success', message });
  }

  constructor() {}
}
