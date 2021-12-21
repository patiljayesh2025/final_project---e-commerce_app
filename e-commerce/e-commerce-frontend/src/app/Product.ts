export class Product{
    id:number=0
    title:string="";
description:string="";
category :string="";
image:string="";
price :number=0;


constructor( id :number ,title:string , description:string , category:string,image :string,price:number){
this.id=id;
    this.title=title;
this.description=description;
this.category=category;
this.image=image;
this.price=price;
}


}