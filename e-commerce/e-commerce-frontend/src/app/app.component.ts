import { Component } from '@angular/core';
import { User } from './User';
import { RouterModule ,Routes } from '@angular/router';
import { ProductsService } from './service/products.service';
import { UserService } from './service/user.service';
import {Product} from './Product'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
myProducts=[];
myUser : User[]=[];
  title = 'e-commerce';
  constructor(private productService : ProductsService , private userService : UserService){}
ngOnInit(){
  this.productService.getMyProduct().subscribe((data)=>{this.myProducts=data;});
  this.userService.getMyUser().subscribe((data)=>{this.myUser=data})
}



}