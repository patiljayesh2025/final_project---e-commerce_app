import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule , routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './component/card/card.component';

import {HttpClientModule} from '@angular/common/http'
import { FilterPipe } from '../shared/filter.pipe';
import { LoginComponent } from './component/login/login.component';
import { RouterModule} from '@angular/router';
import { Routes } from '@angular/router';
import { PipePipe } from './component/pipe.pipe';
import { HeaderComponent } from './component/header/header.component';
import { DataSharingService } from './service/dataSharing.service';
import { GooglePayButtonModule } from '@google-pay/button-angular';

@NgModule({
  declarations: [
    AppComponent,
  routing ,
    CardComponent,
   FilterPipe, LoginComponent, PipePipe,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
 RouterModule ,GooglePayButtonModule

  ],
  providers: [DataSharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
