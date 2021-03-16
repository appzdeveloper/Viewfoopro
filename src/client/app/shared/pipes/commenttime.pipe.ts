import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'commenttime' })
export class CommenttimePipe implements PipeTransform {
    transform(value: any) {
        if (!value) {
            return '';
        }
        else {
            return '';
        }
    }
}
