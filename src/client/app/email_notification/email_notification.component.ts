import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/interfaces';
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators, ngform} from '@angular/common'
import myGlobals = require('../globals');
import {CustomValidators} from '../shared/utils/CustomValidators';

@Component({
    moduleId: module.id,
    selector: 'emailnotification',
    templateUrl: 'email_notification.component.html'
     directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES],

})

export class EmailNotificationComponent implements OnInit {
        ngOnInit() {
        }
        
    
}

