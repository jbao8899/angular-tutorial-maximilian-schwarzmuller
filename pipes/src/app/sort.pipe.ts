import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort',
    pure: false // Updates whenever data changes, to deal with servers being added
})
export class SortPipe implements PipeTransform {
    compareServersByName(a, b) {
        return a.name.localeCompare(b.name);
    }

    transform(value: any, propName: string): unknown {
        // This is fixed
        // value.sort(this.compareServersByName);
        
        // Using anonymous function lets us choose what property to sort by
        value.sort(
            (a, b) => {
                return a[propName].localeCompare(b[propName]);
            }
        );

        return value;
    }
}
