import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false // Updates whenever data changes
})
export class FilterPipe implements PipeTransform {

    transform(value: any, filterString: string, propName: string): unknown {
        if (value.length == 0 || !filterString || filterString == '') {
            return value;
        }
        else {
            let resultArray = [];
            for (const item of value) {
                if (item[propName] == filterString) {
                    resultArray.push(item);
                }
            }
            return resultArray;
        }
    }
}
