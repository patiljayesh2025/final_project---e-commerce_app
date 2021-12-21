import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{map} from 'rxjs/operators'
import { Product } from '../Product';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
Url="http://localhost:3001"
  constructor(private http : HttpClient) { }

getMyProduct(){
  let myUrl = this.Url +'/getAllProducts'
return this.http.get<any>(myUrl);
}

  getProduct(){
    return this.http.get<Product[]>("https://fakestoreapi.com/products?_limit:3")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
