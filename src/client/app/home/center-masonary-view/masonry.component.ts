
import {Component, OnInit, NgZone, Input, Output, ElementRef,
    EventEmitter, Renderer, OnChanges, SimpleChange, ChangeDetectorRef, ViewChild}
from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { User } from '../../shared/interfaces';
import { AuthService } from '../../shared/services/auth.service';
import { Viewfoo } from '../../shared/interfaces';
import { Container } from '../../shared/interfaces';
import {PaginationComponent} from '../../shared/pagination/pagination.component';
import myGlobals = require('../../globals');

@Component({
    moduleId: module.id,
    selector: 'centermasonryview',
    templateUrl: 'masonry.component.html',
    directives: [PaginationComponent, REACTIVE_FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class MasonryViewComponent implements OnInit {

    constructor(private authService: AuthService) {
      
        this.loginUser = myGlobals.LoginUser;

    }

    ngOnInit() {

    }

