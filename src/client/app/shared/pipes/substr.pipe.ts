import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'substr' })
export class SubstrPipe implements PipeTransform {
    transform(value: any) {
        if (!value) {
            return '';
        }
        else {
            
            var splitArray = value.split("/");
            return splitArray[splitArray.length-1];
//            
//            var currentTime = new Date();
//            var year = currentTime.getFullYear();
//            var n = value.indexOf(year + "/");
//            var sub = value.substr(n + 5, value.length);

            //return sub;
        }
    }
}
