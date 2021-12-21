import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{map} from 'rxjs/operators'
import { User } from '../User';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
Url="http://localhost:3001"
  constructor(private http : HttpClient) { }
public isLoggedIn=false;
getMyUser():Observable<any> {
  let myUrl =this.Url + '/getAllCustomers'
  return this.http.get<any>(myUrl);
}
addMyUser(userObj :any):Observable<any>{
  let header={'content-type':'application/json'};
  let myUrl = this.Url + '/insertCustomerData'
let body=JSON.stringify(userObj)
  return this.http.post(myUrl,body,{'headers':header})
}

sendEmail(userObj :any){
  let header ={'content-type':'application/json'};

  let myUrl =this.Url + '/sendMail';
  let body = JSON.stringify(userObj);
  return this.http.post(myUrl,body,{'headers':header})

}

forgotPassword(loginObj : any){
  let header ={'content-type':'application/json'};
let myUrl = this.Url +'/forgotPassword';
let body=JSON.stringify(loginObj);
return this.http.post(myUrl,body,{'headers':header});

}



updateUser(user : any):Observable<any>{
  let header={'content-type':'application/json'};
  let updatedURL =  this.Url + "/"+ user.id;
  let body = JSON.stringify(user);
  console.log("data to be written user.json" + body);
  return this.http.put(updatedURL,body,{'headers':header});

}


}