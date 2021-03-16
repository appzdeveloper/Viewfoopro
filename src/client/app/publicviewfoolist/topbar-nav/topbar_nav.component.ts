import {Component, OnInit, Output, Input, EventEmitter, OnChanges} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interfaces';
import { FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import myGlobals = require('../../globals');
import {CustomValidators} from '../../shared/utils/CustomValidators';
import myGlobals = require('../../globals');
import { Folder } from '../../shared/interfaces';

@Component({
    moduleId: module.id,
    selector: 'topbarnav',
    templateUrl: 'topbar_nav.component.html',
	directives: [REACTIVE_FORM_DIRECTIVES]

})

export class TopbarnavComponent implements OnInit, OnChanges {
    domainName: string;

    publicfolder: Folder = [];
    publicViewfooid: string;
    parentid: string;

    _folderlist: any;

    isDropDownJQueryApplied: boolean = false;
    public set folderlist(v: any) {
        this._folderlist = v;

        if (!this.isDropDownJQueryApplied) {
			setTimeout(function() {
				$('.dropdown').click(function() {
					$('.dropdown-menu', this).slideToggle(250);
				});
			}, 1000);
            this.isDropDownJQueryApplied = true;
		}
    }

    @Input() public get folderlist(): any {
        return this._folderlist;
    }

    @Input() public menuBackgroundcolor: string;
    @Input() public fontcolor: string;

    @Input() public userhomesettings: string;

    @Output() private folderchange: EventEmitter<string> = new EventEmitter();

    sub: any;

    constructor(private route: ActivatedRoute,
        private router: Router, private authService: AuthService) {

		this.sub = this.route.params.subscribe(params => {
			this.domainName = params['subdomain'];

        });
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        $("#menu-toggle").click(function(e) {
			e.preventDefault();
			$("#wrapper").toggleClass("toggled");
        });
    }

    setPublicViewfooid(folderid: string, parentid: string) {
        //if (this.parentid == parentid) {
            //this.parentid = "";
        //} else {
            //this.publicViewfooid = id;
            this.router.navigate(["/users/"+this.domainName]);
            this.parentid = parentid;
            this.folderchange.emit(folderid);
        //}

    }

}
