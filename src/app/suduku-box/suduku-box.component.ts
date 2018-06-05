import { Component, OnInit } from '@angular/core';
import { SudukuService } from '../suduku.service';

@Component({
  selector: 'app-suduku-box',
  templateUrl: './suduku-box.component.html',
  styleUrls: ['./suduku-box.component.css']
})
export class SudukuBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let board = new SudukuService().Generate(81, 10000000);
    console.log(board);
  }

}
