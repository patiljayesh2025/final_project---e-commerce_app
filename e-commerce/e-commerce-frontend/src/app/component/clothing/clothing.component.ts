import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Product } from 'src/app/Product';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { DataSharingService } from 'src/app/service/dataSharing.service';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'app-clothing',
  templateUrl: './clothing.component.html',
  styleUrls: ['./clothing.component.css']
})
export class ClothingComponent implements OnInit {
clothing =[]
public searchTerm="";
public userid!:number;
  constructor( private app : AppComponent,private dataSharingService : DataSharingService,private cartService : CartService) { }

  ngOnInit(): void {

    this.clothing=this.app.myProducts.filter((e:any)=>{return e.category!="Electronics"}) ;
    this.dataSharingService.myUserId.subscribe(value=>this.userid=value);
  }

  addToMyCart(title :string ,price :number ,description:string , category:string ,image: string){
  
    let myCart={
      userid :this.userid,
      title:title,
      price :price,
      description : description,
      category:category,
      image:image
    
    }
    this.cartService.addToCart(myCart).subscribe(data=>console.log(data));
    alert("Product Added To Cart Successfully");
      this.dataSharingService.myUserId.subscribe(value=>{this.userid=value})
      this.cartService.getMyCart(this.userid).subscribe(data=>{this.dataSharingService.myUserCart.next(data);});
      
    
    }

}
