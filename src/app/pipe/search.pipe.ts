import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(data: any[], searchValue: any): any {

    if(!data) return [];
    if(!searchValue) return data;

    searchValue = searchValue.toLowerCase();
    return  data.filter( item => {
       return Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchValue)
      );
    } );
  }

}
