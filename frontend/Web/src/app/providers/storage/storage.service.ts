import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(){

  }

  public put(key: string, value: any): void{
    localStorage.setItem(key, value);
  }

  public putObject(key: string, value :object): void{
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): any{
    return localStorage.getItem(key);
  }

  public getObject(key: string): object{
    return JSON.parse(localStorage.getItem(key));
  }
}
