import { NgModule , Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './component/card/card.component';
import { ElectronicsComponent } from './component/electronics/electronics.component';
import { HeaderComponent } from './component/header/header.component';
import { ClothingComponent } from './component/clothing/clothing.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [

  { path:'home', component: HeaderComponent  }  ,
  { path : 'electronics' , component : ElectronicsComponent },
  { path : 'clothing' , component : ClothingComponent },
  { path : 'cart' , component : CardComponent },
  {path :'login' ,component : LoginComponent},
  {path : '' ,redirectTo:'home' ,pathMatch:'full'},
  {  path: '**', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing = [ElectronicsComponent , HeaderComponent , ClothingComponent ]