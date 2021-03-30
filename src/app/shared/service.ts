import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class Service {
 
    constructor(private http: HttpClient) { }
   
    public get = (route: string): Promise<any> => {
      return this.http.get(route).toPromise();
    }
   
    public post = (route: string, body: any): Promise<any> => {
      return this.http.post(route, body, this.generateHeaders()).toPromise();
    }

    public upload = (route: string, body: any) => {
      return this.http.post(route, body);
    }
   
    public put = (route: string, body: any) => {
      return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
    }
   
    public delete = (route: string): Promise <any> => {
      return this.http.delete(route).toPromise();
    }
   
    private createCompleteRoute = (route: string, envAddress: string) => {
      return `${envAddress}/${route}`;
    }
   
    private generateHeaders = () => {
      return {
        headers: new HttpHeaders(
          {
            'Content-Type': 'multipart/form-data'
          }
          )
      }
    }
  }