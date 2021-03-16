"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var auth_service_1 = require('../shared/services/auth.service');
var substr_pipe_1 = require('../shared/pipes/substr.pipe');
var sub_substr_pipe_1 = require('../shared/pipes/sub_substr.pipe');
var myGlobals = require('../globals');
var forms_1 = require('@angular/forms');
var angular2_infinite_scroll_1 = require('angular2-infinite-scroll/angular2-infinite-scroll');
var TopNavComponent = (function () {
    function TopNavComponent(_router, builder, authService) {
        var _this = this;
        this._router = _router;
        this.builder = builder;
        this.authService = authService;
        this.foldername = new forms_1.FormControl("", forms_1.Validators.required);
        this.subfoldername = new forms_1.FormControl("", forms_1.Validators.required);
        this.publicfolder = [];
        this.privatefolder = [];
        this.backupfolder = [];
        this.loadingnotification = false;
        this.addfolder = false;
        this.addsubfolder = false;
        this.imageUrl = myGlobals.imageUrl + "/upload/gallery/";
        this.folderlist = [];
        this.subfolderlist = [];
        this.faddfolderform = builder.group({
            "foldername": this.foldername
        });
        this.fsubfolderform = builder.group({
            "subfoldername": this.subfoldername
        });
        authService.profileImageChanged$.subscribe(function (item) {
            _this.refreshImage(item);
        });
    }
    TopNavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getfolderlist();
        this.refreshImage("");
        $("#notification_li").click(function () {
            $("#profileContainer").hide();
            $("#notificationContainer").fadeToggle(3);
            $("#notification_count").fadeOut("slow");
            return false;
        });
        $("#profileLink").click(function () {
            $("#notificationContainer").hide();
            $("#profileContainer").fadeToggle(3);
            return false;
        });
        $(document).click(function () {
            $("#notificationContainer").hide();
            $("#profileContainer").hide();
        });
        var userid = this.loginUser.id;
        this.authService.getviewallnotificationCount(userid)
            .subscribe(function (result) {
            if (result) {
                _this.notificationCount = result.data;
                console.log('notificationCount:' + _this.notificationCount);
            }
        }, function (error) {
            _this.notificationerror = error;
        });
    };
    TopNavComponent.prototype.getfolderlist = function () {
        var _this = this;
        this.loginUser = myGlobals.LoginUser;
        if (!this.loginUser) {
            return;
        }
        this.authService.folderlist(this.loginUser.id)
            .subscribe(function (result) {
            if (result) {
                if (result.data) {
                    console.log(result.data);
                    _this.folderlist = result.data;
                    for (var i = 0; i < _this.folderlist; i++) {
                        var temp_foldertype = result.data.folder[i].foldertype;
                        if (temp_foldertype == 'backup') {
                            _this.backupfolder.push(result.data.folder[i]);
                        }
                        else if (temp_foldertype == 'public') {
                            _this.publicfolder.push(result.data.folder[i]);
                        }
                        else if (temp_foldertype == 'private') {
                            _this.privatefolder.push(result.data.folder[i]);
                        }
                    }
                    myGlobals.PublicFolder = _this.publicfolder;
                    myGlobals.PrivateFolder = _this.privatefolder;
                }
            }
        }, function (error) {
            console.log("viewfoo list fail: " + error);
        });
    };
    TopNavComponent.prototype.refreshImage = function (evt) {
        this.loginUser = myGlobals.LoginUser;
        if (this.loginUser) {
            if (this.loginUser.profileimage) {
                var self = this;
                this.filename = myGlobals.imageUrl + "/upload/profiles/" + this.loginUser.profileimage;
            }
            else {
                this.filename = "img/user_icon.png";
            }
        }
    };
    TopNavComponent.prototype.Addfoderpopup = function (value) {
        if (value == 'backup') {
            if (this.backupfolder.length > 8) {
                this.addfolder = true;
            }
            else {
                this.addfolder = false;
            }
        }
        if (value == 'public') {
            if (this.publicfolder.length > 8) {
                this.addfolder = true;
            }
            else {
                this.addfolder = false;
            }
        }
        if (value == 'private') {
            if (this.privatefolder.length > 8) {
                this.addfolder = true;
            }
            else {
                this.addfolder = false;
            }
        }
        var foldertype = value;
        this.errorMsg = "";
        $('#folderModal').modal('show');
        $('#foldertype').val(foldertype);
    };
    TopNavComponent.prototype.Addsub = function (id, name, foldertype) {
        var self = this;
        this.folderid = id;
        this.errorMsg = "";
        this.mainfolder = name;
        this.authService.subfolderlist(id)
            .subscribe(function (result) {
            if (result.data) {
                self.subfolderlist = result.data;
            }
        }, function (error) {
            console.log("viewfoo list fail: " + error);
        });
        setTimeout(function () {
            if (self.subfolderlist) {
                if (foldertype == 'backup') {
                    if (self.subfolderlist.length > 9) {
                        self.addsubfolder = true;
                    }
                    else {
                        self.addsubfolder = false;
                    }
                }
                if (foldertype == 'public') {
                    if (self.subfolderlist.length > 9) {
                        self.addsubfolder = true;
                    }
                    else {
                        self.addsubfolder = false;
                    }
                }
                if (foldertype == 'private') {
                    if (self.subfolderlist.length > 9) {
                        self.addsubfolder = true;
                    }
                    else {
                        self.addsubfolder = false;
                    }
                }
                $('#subfolderModal').modal('show');
            }
            else {
                self.addsubfolder = false;
                $('#subfolderModal').modal('show');
            }
        }, 1000);
    };
    TopNavComponent.prototype.Addfolder = function () {
        var _this = this;
        var formdata = this.faddfolderform.value;
        var foldertype = $('#foldertype').val();
        this.loginUser = myGlobals.LoginUser;
        var userid = this.loginUser.id;
        this.errorMsg = "";
        this.authService.addfolder(userid, formdata.foldername, foldertype, "")
            .subscribe(function (result) {
            if (result) {
                var currentfolder = result.data.data;
                console.log(currentfolder.foldertype);
                if (currentfolder.foldertype == 'public') {
                    _this.publicfolder.push(currentfolder);
                    myGlobals.PublicFolder = _this.publicfolder;
                }
                else if (currentfolder.foldertype == 'private') {
                    _this.privatefolder.push(currentfolder);
                    myGlobals.PrivateFolder = _this.privatefolder;
                }
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
        });
        $('#folderModal').modal('hide');
    };
    TopNavComponent.prototype.Addsubfolder = function () {
        var _this = this;
        var formdata = this.fsubfolderform.value;
        this.loginUser = myGlobals.LoginUser;
        var userid = this.loginUser.id;
        this.errorMsg = "";
        formdata["folder_id"] = this.folderid;
        this.authService.addfolder(userid, formdata.subfoldername, "", this.folderid)
            .subscribe(function (result) {
            if (result) {
                _this.errorMsg = result.data;
                _this.getfolderlist();
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
        });
        $('#subfolderModal').modal('hide');
    };
    TopNavComponent.prototype.doLogout = function () {
        delete myGlobals.LoginUser;
        window.localStorage.removeItem("user");
        this._router.navigate(['/login']);
    };
    TopNavComponent.prototype.viewprofile = function () {
        this._router.navigate(['/viewprofile']);
    };
    TopNavComponent.prototype.viewpublichomepage = function () {
        this._router.navigate(['/publichomepagesetting']);
    };
    TopNavComponent.prototype.emailnotification = function () {
        this._router.navigate(['/emailnotification']);
    };
    TopNavComponent.prototype.realtimenotification = function () {
        this._router.navigate(['/realtimenotification']);
    };
    TopNavComponent.prototype.billingdetail = function () {
        this._router.navigate(['/trialbilling']);
    };
    TopNavComponent.prototype.support = function () {
        this._router.navigate(['/support']);
    };
    TopNavComponent.prototype.tellFriend = function () {
        this._router.navigate(['/tellafriend']);
    };
    TopNavComponent.prototype.gotohome = function () {
        this._router.navigate(['/']);
    };
    TopNavComponent.prototype.viewcontact = function () {
        this._router.navigate(['/contact']);
    };
    TopNavComponent.prototype.setViewAll = function () {
        var _this = this;
        var userid = this.loginUser.id;
        this.authService.setviewallnotification(userid)
            .subscribe(function (result) {
            if (result) {
                _this.loadnotification();
                _this.pageno = 1;
            }
        }, function (error) {
            _this.notificationerror = error;
        });
    };
    TopNavComponent.prototype.loadnotification = function () {
        var _this = this;
        this.loadingnotification = true;
        var userid = this.loginUser.id;
        this.authService.getviewallnotification(userid)
            .subscribe(function (result) {
            _this.allnotification = result.data;
            console.log(_this.allnotification);
            _this.totalcount = result.data.totalcount;
            if (_this.pageno == 1) {
                _this.notificationlist = [];
            }
            for (var i = 0; i < _this.allnotification.notificationlist.length; i++) {
                _this.viewfoolist.push(myGlobals.allViewfoo[i]);
            }
            _this.viewfooloading = false;
        }, function (error) {
            _this.viewfooloading = false;
            console.log("viewfoo list fail: " + error);
        });
    };
    TopNavComponent.prototype.loadmoreviewfoo = function () {
        if (this.totalcount > this.viewfoolist.length) {
            this.pageno++;
            this.loadviewfoo();
        }
    };
    TopNavComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'topnav',
            templateUrl: 'topnav.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES, angular2_infinite_scroll_1.InfiniteScroll],
            pipes: [substr_pipe_1.SubstrPipe, sub_substr_pipe_1.Sub_SubstrPipe]
        }), 
        __metadata('design:paramtypes', [router_1.Router, forms_1.FormBuilder, auth_service_1.AuthService])
    ], TopNavComponent);
    return TopNavComponent;
}());
exports.TopNavComponent = TopNavComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90b3BuYXYvdG9wbmF2LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBQ2hELHVCQUFnRCxpQkFBaUIsQ0FBQyxDQUFBO0FBRWxFLDZCQUE0QixpQ0FBaUMsQ0FBQyxDQUFBO0FBQzlELDRCQUEyQiw2QkFBNkIsQ0FBQyxDQUFBO0FBQ3pELGdDQUErQixpQ0FBaUMsQ0FBQyxDQUFBO0FBRWpFLElBQU8sU0FBUyxXQUFXLFlBQVksQ0FBQyxDQUFDO0FBRXpDLHNCQUNLLGdCQUFnQixDQUFDLENBQUE7QUFDdEIseUNBQStCLG1EQUFtRCxDQUFDLENBQUE7QUFZbkY7SUE0QkkseUJBQW9CLE9BQWUsRUFBVSxPQUFvQixFQUFVLFdBQXdCO1FBNUJ2RyxpQkE4WUM7UUFsWHVCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFhO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUExQm5HLGVBQVUsR0FBZ0IsSUFBSSxtQkFBVyxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25FLGtCQUFhLEdBQWdCLElBQUksbUJBQVcsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQU10RSxpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUMxQixrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUMzQixpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUkxQix3QkFBbUIsR0FBUyxLQUFLLENBQUM7UUFLbEMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUs5QixhQUFRLEdBQVcsU0FBUyxDQUFDLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQztRQWU5RCxlQUFVLEdBQVksRUFBRSxDQUFDO1FBQ3RCLGtCQUFhLEdBQVksRUFBRSxDQUFDO1FBWjlCLElBQUksQ0FBQyxjQUFjLEdBQUcs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QUFDO0FBQUQsQ0E5WUEsQUE4WUMsSUFBQTtBQTlZWSx1QkFBZSxrQkE4WTNCLENBQUEiLCJmaWxlIjoiYXBwL3RvcG5hdi90b3BuYXYuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JvdXRlcywgUm91dGVyLCBST1VURVJfRElSRUNUSVZFU30gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnN0clBpcGUgfSBmcm9tICcuLi9zaGFyZWQvcGlwZXMvc3Vic3RyLnBpcGUnO1xuaW1wb3J0IHsgU3ViX1N1YnN0clBpcGUgfSBmcm9tICcuLi9zaGFyZWQvcGlwZXMvc3ViX3N1YnN0ci5waXBlJztcbmltcG9ydCB7IEZvbGRlciB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi9nbG9iYWxzJyk7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycywgRm9ybUJ1aWxkZXIsIFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUyB9XG5mcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJbmZpbml0ZVNjcm9sbCB9IGZyb20gJ2FuZ3VsYXIyLWluZmluaXRlLXNjcm9sbC9hbmd1bGFyMi1pbmZpbml0ZS1zY3JvbGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAndG9wbmF2JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3RvcG5hdi5jb21wb25lbnQuaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW1JFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUywgSW5maW5pdGVTY3JvbGxdLFxuICAgIHBpcGVzOiBbU3Vic3RyUGlwZSwgU3ViX1N1YnN0clBpcGVdXG4gICAgLy9kaXJlY3RpdmVzOiBbRHJvcGRvd24sIERyb3Bkb3duVG9nZ2xlLCBST1VURVJfRElSRUNUSVZFUywgQ09SRV9ESVJFQ1RJVkVTLCBBQ0NPUkRJT05fRElSRUNUSVZFU10sXG4gICAgLy92aWV3UHJvdmlkZXJzOiBbRHJvcGRvd24sIERyb3Bkb3duVG9nZ2xlLCBEUk9QRE9XTl9ESVJFQ1RJVkVTXVxufSlcblxuZXhwb3J0IGNsYXNzIFRvcE5hdkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgbG9naW5Vc2VyOiBVc2VyO1xuICAgIGZvbGRlcm5hbWU6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKFwiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgIHN1YmZvbGRlcm5hbWU6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKFwiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgIGZpbGVuYW1lOiBzdHJpbmc7XG4gICAgZm9sZGVyaWQ6IHN0cmluZztcbiAgICBlcnJvck1zZzogc3RyaW5nO1xuICAgIG5vdGlmaWNhdGlvbmVycm9yOnN0cmluZztcbiAgICBtYWluZm9sZGVyOiBzdHJpbmc7XG4gICAgcHVibGljZm9sZGVyOiBGb2xkZXIgPSBbXTtcbiAgICBwcml2YXRlZm9sZGVyOiBGb2xkZXIgPSBbXTtcbiAgICBiYWNrdXBmb2xkZXI6IEZvbGRlciA9IFtdO1xuICAgIFxuICAgIG5vdGlmaWNhdGlvbkNvdW50Om51bWJlcjtcbiAgICBhbGxub3RpZmljYXRpb25zOmFueTtcbiAgICBsb2FkaW5nbm90aWZpY2F0aW9uOmJvb2xlYW49ZmFsc2U7XG4gICAgcGFnZW5vOm51bWJlcjtcbiAgICB0b3RhbGNvdW50Om51bWJlcjtcbiAgICBub3RpZmljYXRpb25saXN0OmFueTtcbiAgICBcbiAgICBhZGRmb2xkZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBhZGRzdWJmb2xkZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGZhZGRmb2xkZXJmb3JtOiBDb250cm9sR3JvdXA7XG4gICAgZnN1YmZvbGRlcmZvcm06IENvbnRyb2xHcm91cDtcblxuICAgIGltYWdlVXJsOiBzdHJpbmcgPSBteUdsb2JhbHMuaW1hZ2VVcmwgKyBcIi91cGxvYWQvZ2FsbGVyeS9cIjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyLCBwcml2YXRlIGJ1aWxkZXI6IEZvcm1CdWlsZGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKGF1dGhTZXJ2aWNlKTtcblx0XHR0aGlzLmZhZGRmb2xkZXJmb3JtID0gYnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICBcImZvbGRlcm5hbWVcIjogdGhpcy5mb2xkZXJuYW1lXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZzdWJmb2xkZXJmb3JtID0gYnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICBcInN1YmZvbGRlcm5hbWVcIjogdGhpcy5zdWJmb2xkZXJuYW1lXG4gICAgICAgIH0pO1xuICAgICAgICBhdXRoU2VydmljZS5wcm9maWxlSW1hZ2VDaGFuZ2VkJC5zdWJzY3JpYmUoXG4gICAgICAgICAgICBpdGVtID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hJbWFnZShpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblx0Zm9sZGVybGlzdDogdmlld2ZvbyA9IFtdO1xuICAgIHN1YmZvbGRlcmxpc3Q6IHZpZXdmb28gPSBbXTtcblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIHRoaXMuZ2V0Zm9sZGVybGlzdCgpO1xuICAgICAgICB0aGlzLnJlZnJlc2hJbWFnZShcIlwiKTtcblxuXHRcdCQoXCIjbm90aWZpY2F0aW9uX2xpXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJChcIiNwcm9maWxlQ29udGFpbmVyXCIpLmhpZGUoKTtcbiAgICAgICAgICAgICQoXCIjbm90aWZpY2F0aW9uQ29udGFpbmVyXCIpLmZhZGVUb2dnbGUoMyk7XG4gICAgICAgICAgICAkKFwiI25vdGlmaWNhdGlvbl9jb3VudFwiKS5mYWRlT3V0KFwic2xvd1wiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChcIiNwcm9maWxlTGlua1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoXCIjbm90aWZpY2F0aW9uQ29udGFpbmVyXCIpLmhpZGUoKTtcbiAgICAgICAgICAgICQoXCIjcHJvZmlsZUNvbnRhaW5lclwiKS5mYWRlVG9nZ2xlKDMpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL0RvY3VtZW50IENsaWNrIGhpZGluZyB0aGUgcG9wdXBcbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKFwiI25vdGlmaWNhdGlvbkNvbnRhaW5lclwiKS5oaWRlKCk7XG4gICAgICAgICAgICAkKFwiI3Byb2ZpbGVDb250YWluZXJcIikuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGxldCB1c2VyaWQgPSB0aGlzLmxvZ2luVXNlci5pZDtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5nZXR2aWV3YWxsbm90aWZpY2F0aW9uQ291bnQodXNlcmlkKVxuXHRcdFx0LnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cdFx0XHRcdGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25Db3VudCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbm90aWZpY2F0aW9uQ291bnQ6Jyt0aGlzLm5vdGlmaWNhdGlvbkNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0fSwgKGVycm9yOiBhbnkpID0+IHtcblx0XHRcdFx0dGhpcy5ub3RpZmljYXRpb25lcnJvciA9IGVycm9yO1xuXHRcdFx0fSk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG4gICAgZ2V0Zm9sZGVybGlzdCgpIHtcbiAgICAgICAgdGhpcy5sb2dpblVzZXIgPSBteUdsb2JhbHMuTG9naW5Vc2VyO1xuICAgICAgICBpZiAoIXRoaXMubG9naW5Vc2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5mb2xkZXJsaXN0KHRoaXMubG9naW5Vc2VyLmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5kYXRhKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXN1bHQuZGF0YSk7XG5cdFx0XHRcdFx0XHR0aGlzLmZvbGRlcmxpc3QgPSByZXN1bHQuZGF0YTtcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5mb2xkZXJsaXN0OyBpKyspIHtcblx0XHRcdFx0XHRcdFx0bGV0IHRlbXBfZm9sZGVydHlwZSA9IHJlc3VsdC5kYXRhLmZvbGRlcltpXS5mb2xkZXJ0eXBlO1xuXHRcdFx0XHRcdFx0XHRpZiAodGVtcF9mb2xkZXJ0eXBlID09ICdiYWNrdXAnKSB7XG5cblx0XHRcdFx0XHRcdFx0XHR0aGlzLmJhY2t1cGZvbGRlci5wdXNoKHJlc3VsdC5kYXRhLmZvbGRlcltpXSk7XG5cblxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGVsc2UgaWYgKHRlbXBfZm9sZGVydHlwZSA9PSAncHVibGljJykge1xuXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5wdWJsaWNmb2xkZXIucHVzaChyZXN1bHQuZGF0YS5mb2xkZXJbaV0pO1xuXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAodGVtcF9mb2xkZXJ0eXBlID09ICdwcml2YXRlJykge1xuXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5wcml2YXRlZm9sZGVyLnB1c2gocmVzdWx0LmRhdGEuZm9sZGVyW2ldKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRteUdsb2JhbHMuUHVibGljRm9sZGVyID0gdGhpcy5wdWJsaWNmb2xkZXI7XG5cdFx0XHRcdFx0XHRteUdsb2JhbHMuUHJpdmF0ZUZvbGRlciA9IHRoaXMucHJpdmF0ZWZvbGRlcjtcblx0XHRcdFx0XHR9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlld2ZvbyBsaXN0IGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXHQvLyAgICBnZXRzdWJmb2xkZXJsaXN0KGlkKXtcblx0Ly9cblx0Ly8gICAgICAgIGxldCBpZD1pZDtcblx0Ly8gICAgICAgICBjb25zb2xlLmxvZyhpZCk7XG5cdC8vLy8gICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uuc3ViZm9sZGVybGlzdChpZClcblx0Ly8vLyAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cdC8vLy9cblx0Ly8vLyAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcblx0Ly8vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3VsdCk7XG5cdC8vLy9cblx0Ly8vLyAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ViZm9sZGVybGlzdD1yZXN1bHQuZGF0YTtcblx0Ly8vL1xuXHQvLy8vICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQvLy8vICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuXHQvLy8vXG5cdC8vLy8gICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlld2ZvbyBsaXN0IGZhaWw6IFwiICsgZXJyb3IpO1xuXHQvLy8vICAgICAgICAgICAgICAgICAgICB9KTtcblx0Ly9cblx0Ly8gICAgfVxuXG4gICAgcmVmcmVzaEltYWdlKGV2dDogYW55KSB7XG4gICAgICAgIHRoaXMubG9naW5Vc2VyID0gbXlHbG9iYWxzLkxvZ2luVXNlcjtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInRvcG5hdiByZWZyZXNoSW1hZ2VcIik7XG4gICAgICAgIGlmICh0aGlzLmxvZ2luVXNlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMubG9naW5Vc2VyLnByb2ZpbGVpbWFnZSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICAvL3NldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHRoaXMuZmlsZW5hbWUgPSBteUdsb2JhbHMuaW1hZ2VVcmwgKyBcIi91cGxvYWQvcHJvZmlsZXMvXCIgKyB0aGlzLmxvZ2luVXNlci5wcm9maWxlaW1hZ2U7XG4gICAgICAgICAgICAgICAgLy99LCAxMDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsZW5hbWUgPSBcImltZy91c2VyX2ljb24ucG5nXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICBBZGRmb2RlcnBvcHVwKHZhbHVlKSB7XG5cbiAgICAgICAgaWYgKHZhbHVlID09ICdiYWNrdXAnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5iYWNrdXBmb2xkZXIubGVuZ3RoID4gOCkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRmb2xkZXIgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXHRcdFx0ZWxzZSB7IHRoaXMuYWRkZm9sZGVyID0gZmFsc2U7IH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUgPT0gJ3B1YmxpYycpIHtcblx0XHRcdGlmICh0aGlzLnB1YmxpY2ZvbGRlci5sZW5ndGggPiA4KSB7XG5cdFx0XHRcdHRoaXMuYWRkZm9sZGVyID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGVsc2UgeyB0aGlzLmFkZGZvbGRlciA9IGZhbHNlOyB9XG4gICAgICAgIH1cblx0XHRpZiAodmFsdWUgPT0gJ3ByaXZhdGUnKSB7XG5cdFx0XHRpZiAodGhpcy5wcml2YXRlZm9sZGVyLmxlbmd0aCA+IDgpIHtcblx0XHRcdFx0dGhpcy5hZGRmb2xkZXIgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IHRoaXMuYWRkZm9sZGVyID0gZmFsc2U7IH1cblx0XHR9XG5cbiAgICAgICAgbGV0IGZvbGRlcnR5cGUgPSB2YWx1ZTtcblx0XHR0aGlzLmVycm9yTXNnID0gXCJcIjtcblx0XHQkKCcjZm9sZGVyTW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuXHRcdCQoJyNmb2xkZXJ0eXBlJykudmFsKGZvbGRlcnR5cGUpO1xuICAgIH1cblx0QWRkc3ViKGlkLCBuYW1lLCBmb2xkZXJ0eXBlKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHRoaXMuZm9sZGVyaWQgPSBpZDtcbiAgICAgICAgdGhpcy5lcnJvck1zZyA9IFwiXCI7XG5cdFx0dGhpcy5tYWluZm9sZGVyID0gbmFtZTtcblx0XHR0aGlzLmF1dGhTZXJ2aWNlLnN1YmZvbGRlcmxpc3QoaWQpXG5cdFx0XHQuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcblx0XHRcdFx0aWYgKHJlc3VsdC5kYXRhKSB7XG5cblx0XHRcdFx0XHRzZWxmLnN1YmZvbGRlcmxpc3QgPSByZXN1bHQuZGF0YTtcblxuXHRcdFx0XHR9XG5cdFx0XHR9LCAoZXJyb3I6IGFueSkgPT4ge1xuXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwidmlld2ZvbyBsaXN0IGZhaWw6IFwiICsgZXJyb3IpO1xuXHRcdFx0fSk7XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRpZiAoc2VsZi5zdWJmb2xkZXJsaXN0KSB7XG5cblx0XHRcdFx0aWYgKGZvbGRlcnR5cGUgPT0gJ2JhY2t1cCcpIHtcblxuXHRcdFx0XHRcdGlmIChzZWxmLnN1YmZvbGRlcmxpc3QubGVuZ3RoID4gOSkge1xuXG5cdFx0XHRcdFx0XHRzZWxmLmFkZHN1YmZvbGRlciA9IHRydWU7XG5cblx0XHRcdFx0XHR9IGVsc2UgeyBzZWxmLmFkZHN1YmZvbGRlciA9IGZhbHNlOyB9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoZm9sZGVydHlwZSA9PSAncHVibGljJykge1xuXG5cdFx0XHRcdFx0aWYgKHNlbGYuc3ViZm9sZGVybGlzdC5sZW5ndGggPiA5KSB7XG5cdFx0XHRcdFx0XHRzZWxmLmFkZHN1YmZvbGRlciA9IHRydWU7XG5cdFx0XHRcdFx0fSBlbHNlIHsgc2VsZi5hZGRzdWJmb2xkZXIgPSBmYWxzZTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChmb2xkZXJ0eXBlID09ICdwcml2YXRlJykge1xuXHRcdFx0XHRcdGlmIChzZWxmLnN1YmZvbGRlcmxpc3QubGVuZ3RoID4gOSkge1xuXHRcdFx0XHRcdFx0c2VsZi5hZGRzdWJmb2xkZXIgPSB0cnVlO1xuXHRcdFx0XHRcdH0gZWxzZSB7IHNlbGYuYWRkc3ViZm9sZGVyID0gZmFsc2U7IH1cblx0XHRcdFx0fVxuXHRcdFx0XHQkKCcjc3ViZm9sZGVyTW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHNlbGYuYWRkc3ViZm9sZGVyID0gZmFsc2U7XG5cdFx0XHRcdCQoJyNzdWJmb2xkZXJNb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG5cdFx0XHR9XG5cblx0XHR9LCAxMDAwKTtcblxuXG4gICAgfVxuXG4gICAgQWRkZm9sZGVyKCkge1xuXHRcdGxldCBmb3JtZGF0YSA9IHRoaXMuZmFkZGZvbGRlcmZvcm0udmFsdWU7XG5cdFx0bGV0IGZvbGRlcnR5cGUgPSAkKCcjZm9sZGVydHlwZScpLnZhbCgpO1xuXHRcdHRoaXMubG9naW5Vc2VyID0gbXlHbG9iYWxzLkxvZ2luVXNlcjtcblx0XHRsZXQgdXNlcmlkID0gdGhpcy5sb2dpblVzZXIuaWQ7XG5cdFx0dGhpcy5lcnJvck1zZyA9IFwiXCI7XG5cblxuXHRcdHRoaXMuYXV0aFNlcnZpY2UuYWRkZm9sZGVyKHVzZXJpZCwgZm9ybWRhdGEuZm9sZGVybmFtZSwgZm9sZGVydHlwZSwgXCJcIilcblx0XHRcdC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRpZiAocmVzdWx0KSB7XG5cblx0XHRcdFx0XHRsZXQgY3VycmVudGZvbGRlciA9IHJlc3VsdC5kYXRhLmRhdGE7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coY3VycmVudGZvbGRlci5mb2xkZXJ0eXBlKTtcblx0XHRcdFx0XHRpZiAoY3VycmVudGZvbGRlci5mb2xkZXJ0eXBlID09ICdwdWJsaWMnKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnB1YmxpY2ZvbGRlci5wdXNoKGN1cnJlbnRmb2xkZXIpO1xuXHRcdFx0XHRcdFx0bXlHbG9iYWxzLlB1YmxpY0ZvbGRlciA9IHRoaXMucHVibGljZm9sZGVyO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmIChjdXJyZW50Zm9sZGVyLmZvbGRlcnR5cGUgPT0gJ3ByaXZhdGUnKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnByaXZhdGVmb2xkZXIucHVzaChjdXJyZW50Zm9sZGVyKTtcblx0XHRcdFx0XHRcdG15R2xvYmFscy5Qcml2YXRlRm9sZGVyID0gdGhpcy5wcml2YXRlZm9sZGVyO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFja3VwZm9sZGVyLnNwbGljZSgwLCB0aGlzLmJhY2t1cGZvbGRlci5sZW5ndGgpO1xuXHRcdFx0XHRcdC8vICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdWJsaWNmb2xkZXIuc3BsaWNlKDAsIHRoaXMucHVibGljZm9sZGVyLmxlbmd0aCk7XG5cdFx0XHRcdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByaXZhdGVmb2xkZXIuc3BsaWNlKDAsIHRoaXMucHJpdmF0ZWZvbGRlci5sZW5ndGgpO1xuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRmb2xkZXJsaXN0KCk7XG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0fVxuXHRcdFx0fSwgKGVycm9yOiBhbnkpID0+IHtcblx0XHRcdFx0dGhpcy5lcnJvck1zZyA9IGVycm9yO1xuXHRcdFx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKFwiZm9sZGVyIEFkZCBmYWlsOiBcIiArIGVycm9yKTtcblx0XHRcdH0pXG5cdFx0JCgnI2ZvbGRlck1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICB9XG4gICAgQWRkc3ViZm9sZGVyKCkge1xuXHRcdGxldCBmb3JtZGF0YSA9IHRoaXMuZnN1YmZvbGRlcmZvcm0udmFsdWU7XG5cdFx0dGhpcy5sb2dpblVzZXIgPSBteUdsb2JhbHMuTG9naW5Vc2VyO1xuXHRcdGxldCB1c2VyaWQgPSB0aGlzLmxvZ2luVXNlci5pZDtcblx0XHR0aGlzLmVycm9yTXNnID0gXCJcIjtcblx0XHRmb3JtZGF0YVtcImZvbGRlcl9pZFwiXSA9IHRoaXMuZm9sZGVyaWQ7XG5cblx0XHR0aGlzLmF1dGhTZXJ2aWNlLmFkZGZvbGRlcih1c2VyaWQsIGZvcm1kYXRhLnN1YmZvbGRlcm5hbWUsIFwiXCIsIHRoaXMuZm9sZGVyaWQpXG5cdFx0XHQuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcblx0XHRcdFx0aWYgKHJlc3VsdCkge1xuXG5cdFx0XHRcdFx0dGhpcy5lcnJvck1zZyA9IHJlc3VsdC5kYXRhO1xuXHRcdFx0XHRcdHRoaXMuZ2V0Zm9sZGVybGlzdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCAoZXJyb3I6IGFueSkgPT4ge1xuXHRcdFx0XHR0aGlzLmVycm9yTXNnID0gZXJyb3I7XG5cdFx0XHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG5cdFx0XHRcdC8vY29uc29sZS5sb2coXCJmb2xkZXIgQWRkIGZhaWw6IFwiICsgZXJyb3IpO1xuXHRcdFx0fSk7XG5cdFx0JCgnI3N1YmZvbGRlck1vZGFsJykubW9kYWwoJ2hpZGUnKTtcblxuXG4gICAgfVxuICAgIGRvTG9nb3V0KCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwibG9nb3V0XCIpO1xuICAgICAgICBkZWxldGUgbXlHbG9iYWxzLkxvZ2luVXNlcjtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwidXNlclwiKTtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xuICAgIH1cblxuICAgIHZpZXdwcm9maWxlKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvdmlld3Byb2ZpbGUnXSk7XG5cbiAgICB9XG4gICAgdmlld3B1YmxpY2hvbWVwYWdlKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvcHVibGljaG9tZXBhZ2VzZXR0aW5nJ10pO1xuXG4gICAgfVxuICAgIGVtYWlsbm90aWZpY2F0aW9uKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvZW1haWxub3RpZmljYXRpb24nXSk7XG4gICAgfVxuICAgIHJlYWx0aW1lbm90aWZpY2F0aW9uKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvcmVhbHRpbWVub3RpZmljYXRpb24nXSk7XG4gICAgfVxuICAgIGJpbGxpbmdkZXRhaWwoKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy90cmlhbGJpbGxpbmcnXSk7XG4gICAgfVxuICAgIHN1cHBvcnQoKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9zdXBwb3J0J10pO1xuICAgIH1cbiAgICB0ZWxsRnJpZW5kKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvdGVsbGFmcmllbmQnXSk7XG4gICAgfVxuICAgIGdvdG9ob21lKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvJ10pO1xuICAgIH1cbiAgICB2aWV3Y29udGFjdCgpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnL2NvbnRhY3QnXSk7XG4gICAgfVxuICAgIFxuICAgIHNldFZpZXdBbGwoKXtcbiAgICAgICAgbGV0IHVzZXJpZCA9IHRoaXMubG9naW5Vc2VyLmlkO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnNldHZpZXdhbGxub3RpZmljYXRpb24odXNlcmlkKVxuXHRcdFx0LnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cdFx0XHRcdGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9nZXQgbm90aWZpY2F0aW9uXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2UuZ2V0dmlld2FsbG5vdGlmaWNhdGlvbih1c2VyaWQpXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbG5vdGlmaWNhdGlvbnM9IHJlc3VsdC5kYXRhOyAgICAgICAgICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmFsbG5vdGlmaWNhdGlvbnMpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25lcnJvciA9IGVycm9yO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2Fkbm90aWZpY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZW5vID0gMTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgKGVycm9yOiBhbnkpID0+IHtcblx0XHRcdFx0dGhpcy5ub3RpZmljYXRpb25lcnJvciA9IGVycm9yO1xuXHRcdFx0fSk7XG4gICAgfVxuICAgIFxuICAgIFxuICAgIFxuICAgIGxvYWRub3RpZmljYXRpb24oKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxvYWRpbmdub3RpZmljYXRpb24gPSB0cnVlO1xuICAgICAgICBsZXQgdXNlcmlkID0gdGhpcy5sb2dpblVzZXIuaWQ7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UuZ2V0dmlld2FsbG5vdGlmaWNhdGlvbih1c2VyaWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcblxuICAgICAgICAgICAgICAgIHRoaXMuYWxsbm90aWZpY2F0aW9uID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5hbGxub3RpZmljYXRpb24pO1xuICAgICAgICAgICAgICAgIHRoaXMudG90YWxjb3VudCA9IHJlc3VsdC5kYXRhLnRvdGFsY291bnQ7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZW5vID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25saXN0ID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hbGxub3RpZmljYXRpb24ubm90aWZpY2F0aW9ubGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdmb29saXN0LnB1c2gobXlHbG9iYWxzLmFsbFZpZXdmb29baV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInZpZXdmb29saXN0XCIpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudmlld2Zvb2xpc3QpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Zm9vbG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld2Zvb2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpZXdmb28gbGlzdCBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgbG9hZG1vcmV2aWV3Zm9vKCkge1xuICAgICAgICBpZiAodGhpcy50b3RhbGNvdW50ID4gdGhpcy52aWV3Zm9vbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZW5vKys7XG4gICAgICAgICAgICB0aGlzLmxvYWR2aWV3Zm9vKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8kKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAkKGRvY3VtZW50KS5oZWlnaHQoKSB9LCAxMDAwKTtcbiAgICB9XG5cbiAgICBcbiAgICBcblxufVxuIl19
