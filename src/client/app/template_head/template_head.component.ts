import {Component, OnInit} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {CORE_DIRECTIVES} from '@angular/common';
import { AuthService } from '../shared/services/auth.service';
//import {Dropdown, DropdownToggle} from 'ng2-bootstrap/ng2-bootstrap';
//import {DROPDOWN_DIRECTIVES, ACCORDION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
//import {RouteConfig,ROUTER_DIRECTIVES,Router} from 'angular2/router';
//
//import {HomeCmp} from '../../../pages/home/components/home';
import myGlobals = require('../globals');
import { User } from '../shared/interfaces';
@Component({
    moduleId: module.id,
    selector: 'templatehead',
    templateUrl: 'template_head.component.html',
    //directives: [Dropdown, DropdownToggle, ROUTER_DIRECTIVES, CORE_DIRECTIVES, ACCORDION_DIRECTIVES],
    //viewProviders: [Dropdown, DropdownToggle, DROPDOWN_DIRECTIVES]
})

export class TemplateHeadComponent implements OnInit {
    
}
