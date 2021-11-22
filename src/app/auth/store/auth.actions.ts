import { Action } from '@ngrx/store';

export const AUTH_SUCCESS = '[Auth] Auth Success';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_START = '[Auth] Login Start';
export const AUTH_FAIL = '[Auth] Authenticate Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(
    public payload: {
      email: string;
      password: string;
    }
  ) {}
}

export class AuthFail implements Action {
  readonly type = AUTH_FAIL;

  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(
    public payload: {
      email: string;
      password: string;
    }
  ) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type AuthActions =
  | AuthSuccess
  | Logout
  | LoginStart
  | AuthFail
  | SignupStart
  | ClearError;
