import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class SharedService {
    token;
    public setToken(token): void {
        this.token = token;
      }
    
      public getToken() {
        return this.token;
      }
  }
