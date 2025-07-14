import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(value: string) {
    setCookie('value-token', value, { expires: 365, path: '/'});
  }

  getToken() {
    const value = getCookie('value-token');
    return value;
  }

  removeToken() {
    removeCookie('value-token');
  }
}