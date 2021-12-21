import { EmailValidator } from "@angular/forms";
import { Product } from "./Product";
export class User{
    id:number=0
    name:string="";
username:string="";
password:string="";
email :string="";
isLoggedIn : boolean=false;
cart:Product[]=[];



constructor( id :number ,name:string ,username:string , email :string,password:string,isLoggedIn:boolean ,cart:Product[]){
this.id=id;
    this.name=name;
this.username=username;
this.email=email;
this.password=password;
this.isLoggedIn=isLoggedIn;
this. cart=cart;

}


}