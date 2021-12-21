import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Product';
import { NgModel } from '@angular/forms';
import {AppComponent} from '../../app.component';
import { User } from 'src/app/User';
import { UserService } from 'src/app/service/user.service';
import { HeaderComponent } from '../header/header.component';
import { FormGroup , FormBuilder } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { DataSharingService } from 'src/app/service/dataSharing.service';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
id!:number;
mycart:Product []=[];
myUser:User[]=[];
count=0;
public isLogged !: boolean;
public userName !:string;

public signupForm !:FormGroup;
public loginForm !: FormGroup;
  constructor(private cartService : CartService, private dataSharingService : DataSharingService,  private router : Router , private formBuilder : FormBuilder ,private app : AppComponent,private userService : UserService , private header : HeaderComponent) { }


  
  ngOnInit(): void {
    this.userService.getMyUser().subscribe((data)=>{this.myUser=data});
    console.log("my user" + this.myUser)
  console.log(this.myUser)

this.signupForm =this.formBuilder.group({
  name :'',
  username:'',
  password:'',
  email:'',
 
  
  
})
this.loginForm =this.formBuilder.group({

  email:'',
  password:'',
  
})
this.dataSharingService.isUserLoggedIn.subscribe(value=>{this.isLogged = value})
this.dataSharingService.myUserName.subscribe(value=>{this.userName=value})
this.dataSharingService.myUserCart.subscribe(value=>this.mycart = value);

  }
// addMyUser(name :string ,username :string ,password :string,email:string ){
//   alert("Sign Up Successful");
// let obj = new User(this.id,name ,username,email,password,this.mycart)
// this.userService.addMyUser(obj).subscribe((data)=>{console.log(data)});
// }
logout(){
  this.dataSharingService.isUserLoggedIn.next(false);
this.dataSharingService.myUserName.next("");
this.dataSharingService.myUserCart.next([]);
this.dataSharingService.myUserId.next(0);
this.dataSharingService.isUserLoggedIn.subscribe(value=>{this.isLogged = value});
this.dataSharingService.myUserName.subscribe(value=>{this.userName=value});
this.dataSharingService.myUserCart.subscribe(value=>this.mycart = value);
this.dataSharingService.myUserId.subscribe(value=>this.id=value)

}




signUp(){

  this.userService.addMyUser(this.signupForm.value).subscribe((data)=>{console.log(data)});
  this.userService.sendEmail(this.signupForm.value).subscribe((data=>console.log(data)));
  alert("signup successful");
  this.signupForm.reset();
  this.router.navigate(['home']);
}

user=0;
userFound=false;
login(){
this.userService.getMyUser().subscribe(res=>{
  this.myUser=res;

  for(let i=0;i<res.length;i++){
    if(res[i].email===this.loginForm.value.email && res[i].password===this.loginForm.value.password){
this.user=i;
this.userFound=true;
    }
  }
 


  if(this.userFound==true){
alert("User Login Successful");
let id = this.myUser[this.user].id;
let name =this.myUser[this.user].name;
let username = this.myUser[this.user].username;
// let email =this.myUser[this.user].email;
// let password =this.myUser[this.user].password;
// let isLoggedIn =true;
// let cart = this.myUser[this.user].cart;

// let userLogin = new User(id,name , username , email , password, isLoggedIn, cart);
 this.dataSharingService.isUserLoggedIn.next(true);
this.dataSharingService.myUserName.next(name);
this.dataSharingService.myUserId.next(id);
this.cartService.getMyCart(id).subscribe((data)=>{ this.dataSharingService.myUserCart.next(data)});


//  this.dataSharingService.myUserCart.next(cart)
// this.dataSharingService.myUserCart.subscribe(value=>this.mycart = value);
this.dataSharingService.isUserLoggedIn.subscribe(value=>{this.isLogged = value})
this.dataSharingService.myUserName.subscribe(value=>{this.userName=value})

// this.userService.updateUser(userLogin).subscribe((data)=>console.log(data));
this.header.myUser=this.myUser[this.user].name;

this.dataSharingService.myCartItems.next(this.myUser[this.user].cart.length);
this.userFound=false;
this.loginForm.reset();

 }
 else{
  this.userService.forgotPassword(this.loginForm.value).subscribe(data=>console.log(data));
   alert("Please enter correct username or password");
   alert("Your Credentials have been sent to you registered email id.")
 }

})
}

}
