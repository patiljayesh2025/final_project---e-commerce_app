import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ProductsService } from 'src/app/service/products.service';
import {AppComponent} from '../../app.component'
import { Product } from 'src/app/Product';
import { User } from 'src/app/User';
import { UserService } from 'src/app/service/user.service';
import { RouterModule ,Routes } from '@angular/router';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DataSharingService } from 'src/app/service/dataSharing.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor( private dataSharingService :  DataSharingService,   private cartService : CartService ,private productService :ProductsService, private myApp :AppComponent,private userService : UserService) { }
  public myProducts : Product[]=[
    {
      "id": 1,
      "title": "Men's Jacket",
      "price": 100,
     "description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
    , "category" : "men's clothing",
    "image": "./assets/jacket.webp"
  }, {
    "id": 2,
    "title": "Men's T-Shirts",
    "price": 100,
   "description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
  , "category" : "men's clothing",
  "image": "./assets/tshirt.png"
},
{
  "id":3,
  "title" :"Amazon Alexa",
  "price":100,
  "description":"Amazon Echo (4th Gen) Smart Speaker with Dolby Technology, 2020 Release, Black"
  ,"category":"Electronics",
  "image":"./assets/alexa.webp"

}
];



  public totalItem : number = 0; 
  public searchTerm !: string;
  public isLoggedIn !:boolean;
  public myUser !:string;
  public email !: string;
  public password !: string;
 

  
 
  ngOnInit(): void {
 
  this.userService.getMyUser().subscribe((data:User[])=>{})
  this.dataSharingService.isUserLoggedIn.subscribe(value=>{
    this.isLoggedIn=value;
    })
this.dataSharingService.myUserCart.subscribe(value=>{
  this.totalItem=value.length;
})
}
 

logout(){
  this.isLoggedIn=false;
  this.totalItem=0;
}


}
