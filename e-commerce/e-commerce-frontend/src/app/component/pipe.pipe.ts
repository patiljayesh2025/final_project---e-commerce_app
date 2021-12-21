import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipe',
  pure:false
})
export class PipePipe implements PipeTransform {

  transform(value: any,searchTerm : any ): any {

    return value.filter((item:any)=>{return item.title.indexOf(searchTerm)>-1})
 
  }

}
