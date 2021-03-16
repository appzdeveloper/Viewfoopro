

import {Component, OnInit, NgZone, Input, Output, ElementRef,
    EventEmitter, Renderer, OnChanges, SimpleChange, ChangeDetectorRef, ViewChild}
from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import { User } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { Viewfoo } from '../..interfaces';
import { Container } from '../..interfaces';
import myGlobals = require('../../../globals');
import {CustomValidators} from '../../utils/CustomValidators';

@Component({
    moduleId: module.id,
    selector: 'selfdestructmodal',
    templateUrl: 'selfdestructmodal.component.html',
    directives: [REACTIVE_FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class SelfDestructModal implements OnInit {
    @Input() public currViewfooid: any;
    public currentday: number = 0;
    public currenthour: number = 0;
    public currentminute: number = 0;
    public currentsecond: number = 0;
    
    constructor(private _router: Router, private authService: AuthService, private builder: FormBuilder) {
        this.loginUser = myGlobals.LoginUser;

    }
    
    checkday(val) {
        var day = document.getElementById("changeDay").innerHTML;
        var d = parseInt(day);
        this.currentday = d;
        if (val == "increase") {
            this.currentday++;
        }
        else if (val == "decrease") {
            if (this.currentday == 0) {
                this.currentday = 0;
            }
            else {
                this.currentday--;
            }
        }
    }
    checkhour(val) {
        var hour = document.getElementById("changeHours").innerHTML;
        var h = parseInt(hour);
        this.currenthour = h;
        if (val == "increase") {
            if (this.currenthour == 23) {
                this.currenthour = 0;
            }
            this.currenthour++;
        }
        else if (val == "decrease") {
            if (this.currenthour == 0) {
                this.currenthour = 23;
            }
            this.currenthour--;
        }
    }
    checkminute(val) {
        var minute = document.getElementById("changeMinute").innerHTML;
        var m = parseInt(minute);
        this.currentminute = m;
        if (val == "increase") {
            if (this.currentminute == 59) {
                this.currentminute = 0;
            }
            this.currentminute++;
        }
        else if (val == "decrease") {
            if (this.currentminute == 0) {
                this.currentminute = 59;
            }
            this.currentminute--;
        }
    }
    checksecond(val) {
        var second = document.getElementById("changeSecond").innerHTML;
        var s = parseInt(second);
        this.currentsecond = s;
        if (val == "increase") {
            if (this.currentsecond == 59) {
                this.currentsecond = 0;
            }
            this.currentsecond++;
        }
        else if (val == "decrease") {
            if (this.currentsecond == 0) {
                this.currentsecond = 59;
            }
            this.currentsecond--;
        }
    }
    selfdestructalert() {
        //$.modal.close();
        $("#selfdestructModal").modal("hide");        


//        alert(this.currentday        );
//        alert(this.currenthour        );
//        alert(this.currentminute        );
//        alert(this.currentsecond);

    }
    selfdestructactivate() {
        let currentviewfooid = this.currViewfooid;
        let currentday = this.currentday;
        let currenthour = this.currenthour;
        let currentminute = this.currentminute;
        let currentsecond = this.currentsecond;

        this.authService.selfdestruct(currentviewfooid, currentday, currenthour, currentminute, currentsecond)
            .subscribe((result) => {
                if (result) {
                    console.log(result);
                    let link = ['/viewfoodetail', currentviewfooid];
                    this._router.navigate(link);
                }
            }, (error: any) => {
                console.log("self destruct fail: " + error);
            });
    }

    cnacelselfdestruct() {
        
        $("#selfdestructalert").modal("hide");

    }
    
}