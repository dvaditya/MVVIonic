import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDiscussion'
})
export class FilterDiscussionPipe implements PipeTransform {

  transform(items: any[], filters: {title: string, value: any}): any {
    if (!items || !filters) {
      return items;
    }

    const returnList: any[] = [];
    items.forEach(item => {
      if(item[filters.title] === filters.value) {
        returnList.push(item);
      }
    });
    return returnList;
  }

}
