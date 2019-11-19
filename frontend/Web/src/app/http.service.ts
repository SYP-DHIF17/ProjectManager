import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIUrls } from './other/apiurls';
import { StorageService } from './providers/storage/storage.service';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,
              private storage :StorageService){
    
  }

  private get(path: string, headers: HttpHeaders): Observable<any>{
    if(!headers){
      
    }

    return this.http.get(path, { headers: headers });
  }

  private post(path: string, body: object, headers: HttpHeaders = null): Observable<any>{
    if(!headers){
      
    }

    return this.http.post(path, body, { headers: headers });
  }

  public login(email: string, password: string) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.post(APIUrls.USER.LOGIN, {
      email,
      password
    }, headers);
  }

  public register(email: string, password: string) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.post(APIUrls.USER.REGISTER, {
      email,
      password
    }, headers)
  }
}
