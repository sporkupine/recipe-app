import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducer';
import * as AuthActions from './store/auth.actions'

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private expirationTimer: any;

  constructor(private store: Store<fromRoot.AppState>) {}

  setLogoutTimer(expirationDuration: number) {
    this.expirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if(this.expirationTimer){
      clearTimeout(this.expirationTimer)
      this.expirationTimer = null;
    }

  }
}
