import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SudukuBoxComponent } from './suduku-box/suduku-box.component';

@NgModule({
  declarations: [
    AppComponent,
    SudukuBoxComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
