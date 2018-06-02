import { Injectable } from '@angular/core';
import { IRandomizer } from './irandomizer.interface';

@Injectable({
  providedIn: 'root'
})
export class DefaultRandomizer  implements IRandomizer {

  constructor() { }



  // public  GetInt( max:number):number
  // {
  //     //return Math.floor(Math.random() * max) + 1 ;
  //     return this.GetInt(0, max);
  // }

  public  GetInt( min:number,  max:number):number
  {
    if (max==0)
    {
      max=min;
      min=0;
    }
    return Math.floor(Math.random() * max) + min ;
  }

}
