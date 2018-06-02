import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export interface IRandomizer {

  // constructor() { }

  //interface IRandomizer {
 // GetInt(max: number): number;
  GetInt(min: number, max: number): number;
}

