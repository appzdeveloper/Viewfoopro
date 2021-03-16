import {Control} from '@angular/common';
import { AuthService } from '../shared/services/auth.service';


export class CustomValidators {
    
  constructor( public authService: AuthService){}
  
    static emailValidator(control: Control) {
        var emailRegexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (control.value && !emailRegexp.test(control.value)) {
            return { invalidEmail: true };
        }

    }

    static matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: ControlGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                return { mismatchedPasswords: true };
            }
        }
    }

    static zipValidator(control: Control) {
        if(control.value){
        var valid = /^\d{5}$/.test(control.value);
        if (valid) {
            return null;
        }
        return { invalidZip: true };
        }
    }
  static cardValidator(control: Control) {
        if(control.value){
        var valid = /^\d{16}$/.test(control.value);
        if (valid) {
            return null;
        }
        return { invalidCard: true };
        }
    }
  static cvvValidator(control: Control) {
        if(control.value){
        var valid = /^\d{3}$/.test(control.value);
        if (valid) {
            return null;
        }
        return { invalidCvv: true };
        }
    }

}

