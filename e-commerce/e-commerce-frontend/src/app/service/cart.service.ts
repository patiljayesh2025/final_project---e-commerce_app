import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public Url = 'http://localhost:3001';
  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor(private http : HttpClient) { }
  getMyCart(userId : number):Observable<any>{
    
    let myUrl = this.Url + '/getMyCart/'+userId;
    return this.http.get(myUrl);

  }
  addToCart(myCart :any){
    let headers={'content-type':'application/json'};
    let myUrl = this.Url + '/addToCart';
    let body = JSON.stringify(myCart);
    return this.http.post(myUrl,body,{'headers':headers});
  }
removeFromCart(Id :number){
let myUrl = this.Url +'/removeItemFromCart/' +Id;
return this.http.delete(myUrl);

}

 
}
