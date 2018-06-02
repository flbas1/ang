import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntryPoint {

  constructor(x, y) { 
    this.x=x;
    this.y=y;
  }
  
  public x: number;
  public y: number;
}

