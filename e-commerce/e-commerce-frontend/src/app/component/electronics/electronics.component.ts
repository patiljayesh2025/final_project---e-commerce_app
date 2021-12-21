import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Product } from 'src/app/Product';
import { RouterModule , Routes } from '@angular/router';
import { DataSharingService } from 'src/app/service/dataSharing.service';
import { CartService } from 'src/app/service/cart.service';



@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.css']
})
export class ElectronicsComponent implements OnInit {

 
 
  public electronics=[];
  public searchTerm ="";
  public userid !:number;
  constructor(private app :AppComponent , private dataSharingService : DataSharingService,private cartService : CartService) { }

  ngOnInit(): void {

   this.electronics=this.app.myProducts.filter((e:any)=>{return e.category==="Electronics"}) ;
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
  