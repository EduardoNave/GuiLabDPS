import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ComboBoxComponent } from './combo-box/combo-box.component';

//modulo del formulario
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ComboBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
