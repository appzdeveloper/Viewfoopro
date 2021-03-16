import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'sub_substr'})
export class Sub_SubstrPipe implements PipeTransform {
  transform(value: any,str:string) {
    if (!value) {
      return '';
    }
    else
    {
       var currentTime = new Date();
       var year = currentTime.getFullYear();
       var n = value.indexOf(year+"/");
        var m = str.indexOf(year+"/");
       var main_fld=str.substr(n+5,value.length );

      var sub = value.substr((n+main_fld.length+6),value.length );
                         
    return sub;
    }
  }
}

