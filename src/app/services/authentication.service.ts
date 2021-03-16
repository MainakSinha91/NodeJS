import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.services';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private sharedService:SharedService) { }
  login(username, password) {
    return this.http.post<any>(`${environment.apiBaseURL}/authenticate`, { username, password })
}
logout() {
  // remove user from local storage to log user out
  this.sharedService.setToken(null);
}
}

