import { Component, OnInit,DoCheck } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { CartService } from 'src/app/service/cart.service';
import { Product } from 'src/app/Product';
import { User } from 'src/app/User';
import { UserService } from 'src/app/service/user.service';
import { DataSharingService } from 'src/app/service/dataSharing.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  



  public products : any = [];
  public grandTotal !: number;
  public myProducts:any=[];
  public searchTerm ="";
  public userid!:number;
  public totalItems=0;
  public totalAmount=0;
  public total="34000";
constructor(private dataSharingService : DataSharingService ,private cartService : CartService , private productService : ProductsService,private userService :UserService ) { }
ngOnInit(): void {
  this.dataSharingService.myUserId.subscribe(value=>{this.userid=value})
  this.dataSharingService.myUserCart.subscribe((value)=>{this.myProducts = value;this.totalItems=this.myProducts.lenght;
    this.totalAmount=0;
  for(let i=0;i<this.myProducts.length;i++){
    this.totalAmount+=this.myProducts[i].price;
  }
  this.total=this.totalAmount.toString();
  this.paymentRequest.transactionInfo.totalPrice=this.total;
  });


}
ngDoCheck():void{
  // this.dataSharingService.myUserId.subscribe(value=>{this.userid=value})
  // this.cartService.getMyCart(this.userid).subscribe(data=>{this.dataSharingService.myUserCart.next(data);});
this.dataSharingService.myUserCart.subscribe(value=>{this.myProducts=value;this.totalItems=this.myProducts.length;  this.totalAmount=0;
  for(let i=0;i<this.myProducts.length;i++){
    this.totalAmount+=this.myProducts[i].price;
  }
 
  this.total=this.totalAmount.toString();
  this.paymentRequest.transactionInfo.totalPrice=this.total;
});

}

removeFromCart(Id : number){
  this.cartService.removeFromCart(Id).subscribe(data=>console.log(data));
  this.cartService.getMyCart(this.userid).subscribe(data=>{this.dataSharingService.myUserCart.next(data);});

}


paymentRequest: google.payments.api.PaymentDataRequest = {
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [
    {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: 'example',
          gatewayMerchantId: 'exampleGatewayMerchantId'
        }
      }
    }
  ],
  merchantInfo: {
    merchantId: '12345678901234567890',
    merchantName: 'Demo Merchant'
  },
  transactionInfo: {
    totalPriceStatus: 'FINAL',
    totalPriceLabel: 'Total',
    totalPrice  : this.total,
    currencyCode: 'INR',
    countryCode: 'IN'
  },
  callbackIntents: ['PAYMENT_AUTHORIZATION']
};

onLoadPaymentData = (
  event: Event
): void => {
  const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
  console.log('load payment data', eventDetail.detail);
}

onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
  paymentData
  ) => {
    console.log('payment authorized', paymentData);
    return {
      transactionState: 'SUCCESS'
    };
  }

onError = (event: ErrorEvent): void => {
  console.error('error', event.error);
}
// ng:void()
// {
//     this.dataSharingService.myUserId.subscribe(value=>{this.userid=value})
//        this.cartService.getMyCart(this.userid).subscribe(data=>{this.dataSharingService.myUserCart.next(data);this.card.myProducts=data});

// }
}