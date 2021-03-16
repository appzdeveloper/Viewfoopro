import {Component, OnInit} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {CORE_DIRECTIVES} from '@angular/common';
import { AuthService } from '../shared/services/auth.service';
import { SubstrPipe } from '../shared/pipes/substr.pipe';
import { Sub_SubstrPipe } from '../shared/pipes/sub_substr.pipe';
import { Folder } from '../shared/interfaces';
import myGlobals = require('../globals');
import { User } from '../shared/interfaces';
import { FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES }
from '@angular/forms';
import { InfiniteScroll } from 'angular2-infinite-scroll/angular2-infinite-scroll';

@Component({
    moduleId: module.id,
    selector: 'topnav',
    templateUrl: 'topnav.component.html',
    directives: [REACTIVE_FORM_DIRECTIVES, InfiniteScroll],
    pipes: [SubstrPipe, Sub_SubstrPipe]
    //directives: [Dropdown, DropdownToggle, ROUTER_DIRECTIVES, CORE_DIRECTIVES, ACCORDION_DIRECTIVES],
    //viewProviders: [Dropdown, DropdownToggle, DROPDOWN_DIRECTIVES]
})

export class TopNavComponent implements OnInit {
    loginUser: User;
    foldername: FormControl = new FormControl("", Validators.required);
    subfoldername: FormControl = new FormControl("", Validators.required);
    filename: string;
    folderid: string;
    errorMsg: string;
    notificationerror:string;
    mainfolder: string;
    publicfolder: Folder = [];
    privatefolder: Folder = [];
    backupfolder: Folder = [];
    
    notificationCount:number;
    allnotifications:any;
    loadingnotification:boolean=false;
    pageno:number;
    totalcount:number;
    notificationlist:any;
    
    addfolder: boolean = false;
    addsubfolder: boolean = false;

    faddfolderform: ControlGroup;
    fsubfolderform: ControlGroup;

    imageUrl: string = myGlobals.imageUrl + "/upload/gallery/";

    constructor(private _router: Router, private builder: FormBuilder, private authService: AuthService) {
        //console.log(authService);
		this.faddfolderform = builder.group({
            "foldername": this.foldername
        });
        this.fsubfolderform = builder.group({
            "subfoldername": this.subfoldername
        });
        authService.profileImageChanged$.subscribe(
            item => {
                this.refreshImage(item);
            });
    }
	folderlist: viewfoo = [];
    subfolderlist: viewfoo = [];

    ngOnInit() {

        this.getfolderlist();
        this.refreshImage("");

		$("#notification_li").click(function() {
            $("#profileContainer").hide();
            $("#notificationContainer").fadeToggle(3);
            $("#notification_count").fadeOut("slow");
            return false;
        });

        $("#profileLink").click(function() {
            $("#notificationContainer").hide();
            $("#profileContainer").fadeToggle(3);
            return false;
        });

        //Document Click hiding the popup
        $(document).click(function() {
            $("#notificationContainer").hide();
            $("#profileContainer").hide();
        });
        
        let userid = this.loginUser.id;
        this.authService.getviewallnotificationCount(userid)
			.subscribe((result) => {
				if (result) {
                                   this.notificationCount = result.data;
                                   console.log('notificationCount:'+this.notificationCount);
                                }
			}, (error: any) => {
				this.notificationerror = error;
			});
        
        
    }
    getfolderlist() {
        this.loginUser = myGlobals.LoginUser;
        if (!this.loginUser) {
            return;
        }
        this.authService.folderlist(this.loginUser.id)
            .subscribe((result: any) => {
                if (result) {
					if (result.data) {
						console.log(result.data);
						this.folderlist = result.data;
						for (var i = 0; i < this.folderlist; i++) {
							let temp_foldertype = result.data.folder[i].foldertype;
							if (temp_foldertype == 'backup') {

								this.backupfolder.push(result.data.folder[i]);


							}
							else if (temp_foldertype == 'public') {

								this.publicfolder.push(result.data.folder[i]);

							} else if (temp_foldertype == 'private') {

								this.privatefolder.push(result.data.folder[i]);
							}

						}
						myGlobals.PublicFolder = this.publicfolder;
						myGlobals.PrivateFolder = this.privatefolder;
					}

                }
            }, (error: any) => {
                console.log("viewfoo list fail: " + error);
            });
    }
	//    getsubfolderlist(id){
	//
	//        let id=id;
	//         console.log(id);
	////        this.authService.subfolderlist(id)
	////                    .subscribe((result) => {
	////
	////                        if (result) {
	////                            //console.log(result);
	////
	////                           this.subfolderlist=result.data;
	////
	////                        }
	////                    }, (error: any) => {
	////
	////                       console.log("viewfoo list fail: " + error);
	////                    });
	//
	//    }

    refreshImage(evt: any) {
        this.loginUser = myGlobals.LoginUser;
        //console.log("topnav refreshImage");
        if (this.loginUser) {
            if (this.loginUser.profileimage) {
                var self = this;
                //setTimeout(function() {
				this.filename = myGlobals.imageUrl + "/upload/profiles/" + this.loginUser.profileimage;
                //}, 1000);
            }
            else {
                this.filename = "img/user_icon.png";
            }

        }
    }
    Addfoderpopup(value) {

        if (value == 'backup') {
            if (this.backupfolder.length > 8) {

                this.addfolder = true;
            }
			else { this.addfolder = false; }
        }
        if (value == 'public') {
			if (this.publicfolder.length > 8) {
				this.addfolder = true;
			}
			else { this.addfolder = false; }
        }
		if (value == 'private') {
			if (this.privatefolder.length > 8) {
				this.addfolder = true;
			}
			else { this.addfolder = false; }
		}

        let foldertype = value;
		this.errorMsg = "";
		$('#folderModal').modal('show');
		$('#foldertype').val(foldertype);
    }
	Addsub(id, name, foldertype) {
		var self = this;
		this.folderid = id;
        this.errorMsg = "";
		this.mainfolder = name;
		this.authService.subfolderlist(id)
			.subscribe((result) => {
				if (result.data) {

					self.subfolderlist = result.data;

				}
			}, (error: any) => {

				console.log("viewfoo list fail: " + error);
			});

		setTimeout(function() {

			if (self.subfolderlist) {

				if (foldertype == 'backup') {

					if (self.subfolderlist.length > 9) {

						self.addsubfolder = true;

					} else { self.addsubfolder = false; }
				}

				if (foldertype == 'public') {

					if (self.subfolderlist.length > 9) {
						self.addsubfolder = true;
					} else { self.addsubfolder = false; }
				}
				if (foldertype == 'private') {
					if (self.subfolderlist.length > 9) {
						self.addsubfolder = true;
					} else { self.addsubfolder = false; }
				}
				$('#subfolderModal').modal('show');
			}
			else {
				self.addsubfolder = false;
				$('#subfolderModal').modal('show');
			}

		}, 1000);


    }

    Addfolder() {
		let formdata = this.faddfolderform.value;
		let foldertype = $('#foldertype').val();
		this.loginUser = myGlobals.LoginUser;
		let userid = this.loginUser.id;
		this.errorMsg = "";


		this.authService.addfolder(userid, formdata.foldername, foldertype, "")
			.subscribe((result) => {
				if (result) {

					let currentfolder = result.data.data;
					console.log(currentfolder.foldertype);
					if (currentfolder.foldertype == 'public') {
						this.publicfolder.push(currentfolder);
						myGlobals.PublicFolder = this.publicfolder;
					}
					else if (currentfolder.foldertype == 'private') {
						this.privatefolder.push(currentfolder);
						myGlobals.PrivateFolder = this.privatefolder;
					}
					//                        this.backupfolder.splice(0, this.backupfolder.length);
					//                        this.publicfolder.splice(0, this.publicfolder.length);
					//                        this.privatefolder.splice(0, this.privatefolder.length);
					//
					//                         this.getfolderlist();
					//
				}
			}, (error: any) => {
				this.errorMsg = error;
				this.loading = false;

				//console.log("folder Add fail: " + error);
			})
		$('#folderModal').modal('hide');
    }
    Addsubfolder() {
		let formdata = this.fsubfolderform.value;
		this.loginUser = myGlobals.LoginUser;
		let userid = this.loginUser.id;
		this.errorMsg = "";
		formdata["folder_id"] = this.folderid;

		this.authService.addfolder(userid, formdata.subfoldername, "", this.folderid)
			.subscribe((result) => {
				if (result) {

					this.errorMsg = result.data;
					this.getfolderlist();
				}
			}, (error: any) => {
				this.errorMsg = error;
				this.loading = false;

				//console.log("folder Add fail: " + error);
			});
		$('#subfolderModal').modal('hide');


    }
    doLogout() {
        //console.log("logout");
        delete myGlobals.LoginUser;
        window.localStorage.removeItem("user");
        this._router.navigate(['/login']);
    }

    viewprofile() {
        this._router.navigate(['/viewprofile']);

    }
    viewpublichomepage() {
        this._router.navigate(['/publichomepagesetting']);

    }
    emailnotification() {
        this._router.navigate(['/emailnotification']);
    }
    realtimenotification() {
        this._router.navigate(['/realtimenotification']);
    }
    billingdetail() {
        this._router.navigate(['/trialbilling']);
    }
    support() {
        this._router.navigate(['/support']);
    }
    tellFriend() {
        this._router.navigate(['/tellafriend']);
    }
    gotohome() {
        this._router.navigate(['/']);
    }
    viewcontact() {
        this._router.navigate(['/contact']);
    }
    
    setViewAll(){
        let userid = this.loginUser.id;
        this.authService.setviewallnotification(userid)
			.subscribe((result) => {
				if (result) {
                                   //get notification
//                                    this.authService.getviewallnotification(userid)
//                                        .subscribe((result) => {
//                                           
//                                          this.allnotifications= result.data;                        
//                                          console.log(this.allnotifications);
//                                            }
//                                        }, (error: any) => {
//                                            this.notificationerror = error;
//                                        });
                            this.loadnotification();
                             this.pageno = 1;
				}
			}, (error: any) => {
				this.notificationerror = error;
			});
    }
    
    
    
    loadnotification() {
        
        this.loadingnotification = true;
        let userid = this.loginUser.id;
        this.authService.getviewallnotification(userid)
            .subscribe((result) => {

                this.allnotification = result.data;
                console.log(this.allnotification);
                this.totalcount = result.data.totalcount;
                
                if (this.pageno == 1) {
                    this.notificationlist = [];
                }
                for (var i = 0; i < this.allnotification.notificationlist.length; i++) {
                    this.viewfoolist.push(myGlobals.allViewfoo[i]);
                }
                // console.log("viewfoolist");
                // console.log(this.viewfoolist);

                this.viewfooloading = false;

            }, (error: any) => {
                this.viewfooloading = false;
                console.log("viewfoo list fail: " + error);
            });

    }

    loadmoreviewfoo() {
        if (this.totalcount > this.viewfoolist.length) {
            this.pageno++;
            this.loadviewfoo();
        }
        //$("html, body").animate({ scrollTop: $(document).height() }, 1000);
    }

    
    

}
