import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuth = (
  email: string,
  localId: string,
  idToken: string,
  expiresIn: number
) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  const user = new User(email, localId, idToken, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthSuccess({
    email: email,
    userId: localId,
    token: idToken,
    expirationDate: expirationDate,
    redirect: true,
  });
};

const handleError = (errorResponse: any) => {
  let errorMessage = 'An unknown error occurred.';
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthActions.AuthFail(errorMessage));
  }
  switch (errorResponse.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage =
        'An account already exists for this email. Please try signing in!';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage =
        'There is no user corresponding to the email you entered. Did you mean to Sign Up instead?';
      break;
    case 'INVALID_PASSWORD':
      errorMessage =
        'The password you have entered is incorrect for this account. Please try again.';
      break;
  }
  return of(new AuthActions.AuthFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            environment.firebaseAPIKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((responseData) => {
            this.authService.setLogoutTimer(+responseData.expiresIn * 1000);
          }),
          map((responseData) => {
            return handleAuth(
              responseData.email,
              responseData.localId,
              responseData.idToken,
              +responseData.expiresIn
            );
          }),
          catchError((errorResponse) => {
            return handleError(errorResponse);
            // this must return a non-error observable
          })
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            environment.firebaseAPIKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((responseData) => {
            this.authService.setLogoutTimer(+responseData.expiresIn * 1000);
          }),
          map((responseData) => {
            return handleAuth(
              responseData.email,
              responseData.localId,
              responseData.idToken,
              +responseData.expiresIn
            );
          }),
          catchError((errorResponse) => {
            return handleError(errorResponse);
          })
        );
    })
  );

  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTH_SUCCESS),
        tap((authSuccessAction: AuthActions.AuthSuccess) => {
          if (authSuccessAction.payload.redirect == true) {
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      // parse converts the 'stringified' JSON object back into the original JS object
      if (!userData) {
        return { type: 'Dummy' };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        // this.user.next(loadedUser);
        const expirationTime =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.authService.setLogoutTimer(expirationTime);
        return new AuthActions.AuthSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false,
        });
      }
      return { type: 'Dummy' };
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
