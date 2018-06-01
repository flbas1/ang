import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntryPointService {

  constructor() { }

  private x: number;
  private y: number;

  public EntryPoint(x: number, y: number) {
     this.x = x;
     this.y = y;
   }
  
  // public x:number;
  // public y:number;
}

