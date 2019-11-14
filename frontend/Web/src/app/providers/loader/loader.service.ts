import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private visible: boolean = false;

  constructor(){

  }

  public setVisible(state: boolean): void{
    this.visible = state;
  }

  public isVisible(): boolean{
    return this.visible;
  }
}
