import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "../Product";


@Injectable({
    providedIn: 'root'
  })

export class DataSharingService {
    public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public myUserName : BehaviorSubject<string> = new BehaviorSubject<string>("");
    public myUserCart : BehaviorSubject<any[]>=new BehaviorSubject <any[]>([]);
    public myUserId : BehaviorSubject<number>=new BehaviorSubject<number>(0);
    public myCartItems : BehaviorSubject<number>=new BehaviorSubject<number>(0);
}