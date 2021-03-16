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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var auth_service_1 = require('../../shared/services/auth.service');
var pagination_component_1 = require('../../shared/pagination/pagination.component');
var myGlobals = require('../../globals');
var CustomValidators_1 = require('../../shared/utils/CustomValidators');
var commentmodal_component_1 = require('../../shared/widgets/commentmodal/commentmodal.component');
var sharemodal_component_1 = require('../../shared/widgets/sharemodal/sharemodal.component');
var GallaryViewComponent = (function () {
    function GallaryViewComponent(_router, authService, builder) {
        this._router = _router;
        this.authService = authService;
        this.builder = builder;
        this.onDelViewfoo = new core_1.EventEmitter();
        this.serviceUrl = myGlobals.serviceUrl + '/upload/gallery';
        this.imageUrl = myGlobals.imageUrl + '/upload/gallery';
        this.loading = false;
        this.profileimageUrl = myGlobals.imageUrl + '/upload/profiles';
        this.commentaddloading = false;
        this.viewfoocommenttext = new forms_1.FormControl("", forms_1.Validators.required);
        this.loading = false;
        this.password = new forms_1.FormControl("", forms_1.Validators.required);
        this.confirmpassword = new forms_1.FormControl("", forms_1.Validators.required);
        this.viewfoopasswordtype = "autopassword";
        this.generateownpassword = true;
        this.chkmail = false;
        this.chksms = false;
        this.checkemail = false;
        this.checksms = false;
        this.iserror = false;
        this.checkunlocksms = false;
        this.isEnable = true;
        this.currViewfooComment = {};
        this.currViewfooShare = {};
        this.currViewfooImageShare = {};
        this.isModelCommentHiddenRegistered = false;
        this.isModelShareHiddenRegistered = false;
        this.loginUser = myGlobals.LoginUser;
        this.viewfoocomment = builder.group({
            "viewfoocommenttext": this.viewfoocommenttext
        });
        this.viewfoopassword1 = builder.group({
            "password": this.password,
            "generatedpassword": this.generatedpassword,
            "chkmail": this.chkmail,
            "chksms": this.chksms,
            "confirmpassword": this.confirmpassword
        }, { validator: CustomValidators_1.CustomValidators.matchingPasswords('password', 'confirmpassword') });
    }
    GallaryViewComponent.prototype.ngOnInit = function () {
        this.viewfoopassword1.controls['chkmail'].updateValue(false);
        this.viewfoopassword1.controls['chksms'].updateValue(false);
        var formdata = this.viewfoocomment.value;
    };
    GallaryViewComponent.prototype.gotogallary = function (viewfooid) {
        var link = ['/viewfoodetail', viewfooid];
        this._router.navigate(link);
    };
    GallaryViewComponent.prototype.onEditViewfoo = function (viewfooid) {
        var link = ['/gallary', viewfooid];
        this._router.navigate(link);
    };
    GallaryViewComponent.prototype.onDeleteViewfoo = function (viewfooid, viewfooindex) {
        var _this = this;
        this.authService.viewfoodelete(viewfooid)
            .subscribe(function (result) {
            _this.loading = false;
            _this.viewfoolist.splice(viewfooindex, 1);
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("viewfoo delete fail: " + error);
        });
    };
    GallaryViewComponent.prototype.getComment = function (viewfooid) {
        var _this = this;
        this.viewfoocomments = [];
        this.viewfoocommentid = viewfooid;
        this.authService.viewfoogetcomment(this.viewfoocommentid)
            .subscribe(function (result) {
            _this.viewfoocomments = result.data;
        }, function (error) {
            _this.errorMsg = error;
            console.log("viewfoo get fail: " + error);
        });
    };
    GallaryViewComponent.prototype.doComment = function () {
        var _this = this;
        this.commentaddloading = true;
        var commentdata = this.viewfoocommenttext.value;
        this.authService.viewfooaddcomment(this.loginUser.id, 'viewfoo', commentdata, this.viewfoocommentid)
            .subscribe(function (result) {
            _this.authService.viewfoogetcomment(_this.viewfoocommentid)
                .subscribe(function (result1) {
                if (result1) {
                    _this.viewfoocomments = result1.data;
                    _this.resetform();
                }
            }, function (error) {
                _this.errorMsg = error;
                console.log("viewfoo get fail: " + error);
            });
            _this.commentaddloading = false;
        }, function (error) {
            console.log("viewfoo add fail: " + error);
            _this.commentaddloading = false;
        });
    };
    GallaryViewComponent.prototype.resetform = function () {
        this.viewfoocomment.controls['viewfoocommenttext'].updateValue('');
    };
    GallaryViewComponent.prototype.openpasswordpopup = function (id) {
        this.viewfoopasswordid = id;
        this.generatepassword();
    };
    GallaryViewComponent.prototype.generatepassword = function () {
        var _this = this;
        this.isloading = true;
        this.viewfoopassword1.controls['generatedpassword'].setErrors(null);
        this.viewfoopassword1.controls['confirmpassword'].setErrors(null);
        this.viewfoopassword1.controls['password'].setErrors(null);
        this.authService.generaterandompw()
            .subscribe(function (result) {
            if (result) {
                _this.viewfoopassword1.controls['generatedpassword'].updateValue(result.data);
                _this.isloading = false;
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.isloading = false;
            console.log("password generate fail: " + error);
        });
    };
    GallaryViewComponent.prototype.changepasswordtype = function (val) {
        if (val == 'own') {
            this.generateownpassword = false;
            this.viewfoopasswordtype = "yourpassword";
        }
        else if (val == 'generate') {
            this.generateownpassword = true;
            this.viewfoopasswordtype = "autopassword";
            this.viewfoopassword1.controls['generatedpassword'].setErrors(null);
            this.viewfoopassword1.controls['confirmpassword'].setErrors(null);
            this.viewfoopassword1.controls['password'].setErrors(null);
        }
    };
    GallaryViewComponent.prototype.updateviewfoopasswprd = function () {
        var _this = this;
        this.isloading = true;
        var formdata = this.viewfoopassword1.value;
        formdata["viewfoopasswordtype"] = this.viewfoopasswordtype;
        formdata["id"] = this.viewfoopasswordid;
        formdata["ispasswordprotected"] = true;
        if (this.viewfoopasswordtype == "autopassword") {
            formdata["viewfoopassword"] = formdata.generatedpassword;
        }
        else if (this.viewfoopasswordtype == "yourpassword") {
            formdata["viewfoopassword"] = formdata.password;
        }
        this.authService.passwordprotectedviefoo(formdata)
            .subscribe(function (result) {
            if (result) {
                _this.changeinviewfoolist(_this.viewfoopasswordid, true);
                _this.isloading = false;
                _this.resetpasswordform();
                $("#passwordModal .close").click();
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.isloading = false;
            console.log("password update fail: " + error);
        });
    };
    GallaryViewComponent.prototype.changeinviewfoolist = function (id, value) {
        for (var i = 0; i < this.viewfoolist.length; i++) {
            if (this.viewfoolist[i].id == id) {
                this.viewfoolist[i].ispasswordprotected = value;
            }
        }
    };
    GallaryViewComponent.prototype.unlockpassword = function (unlockpw) {
        var _this = this;
        this.isloading = true;
        this.iserror = false;
        this.authService.unlockviewfoo(this.unlockviewfooid, unlockpw.value)
            .subscribe(function (result) {
            if (result) {
                _this.changeinviewfoolist(_this.unlockviewfooid, false);
                _this.iserror = true;
                unlockpw.value = null;
                _this.isloading = false;
                $("#unlockpasswordModal .close").click();
            }
        }, function (error) {
            _this.iserror = true;
            _this.errorMsg = error;
            _this.isloading = false;
            console.log("password update fail: " + error);
        });
    };
    GallaryViewComponent.prototype.resetpasswordform = function () {
        this.viewfoopassword1.controls['confirmpassword'].updateValue('');
        this.viewfoopassword1.controls['password'].updateValue('');
        this.viewfoopassword1.controls['generatedpassword'].setErrors(null);
        this.viewfoopassword1.controls['confirmpassword'].setErrors(null);
    };
    GallaryViewComponent.prototype.sendpassword = function () {
        var _this = this;
        this.isloading = true;
        this.iserror = false;
        this.authService.forgotviewfoopassword(this.unlockviewfooid, this.checkunlocksms)
            .subscribe(function (result) {
            if (result) {
                _this.isloading = false;
                _this.iserror = true;
                _this.errorMsg = result.data;
            }
        }, function (error) {
            _this.iserror = true;
            _this.errorMsg = error;
            _this.isloading = false;
            console.log("password sending fail: " + error);
        });
    };
    GallaryViewComponent.prototype.onViewfooComment = function (vfl) {
        this.currViewfooComment = vfl;
        $('#commentphoto_modal').modal('show');
        if (!this.isModelCommentHiddenRegistered) {
            this.isModelCommentHiddenRegistered = true;
            $('#commentphoto_modal').on('hidden.bs.modal', function (e) {
                this.currViewfooComment = {};
            });
        }
    };
    GallaryViewComponent.prototype.onViewfooShare = function (vfl) {
        this.currViewfooShare = vfl;
        this.currViewfooImageShare = {};
        $('#SelectPhotoModal').modal('show');
        if (!this.isModelShareHiddenRegistered) {
            this.isModelShareHiddenRegistered = true;
            $('#SelectPhotoModal').on('hidden.bs.modal', function (e) {
                this.currViewfooShare = {};
                this.currViewfooImageShare = {};
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GallaryViewComponent.prototype, "viewfoolist", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], GallaryViewComponent.prototype, "onDelViewfoo", void 0);
    GallaryViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'centergallaryview',
            templateUrl: 'gallaryview.component.html',
            directives: [pagination_component_1.PaginationComponent, forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, commentmodal_component_1.CommentModalComponent, sharemodal_component_1.ShareModalComponent]
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService, forms_1.FormBuilder])
    ], GallaryViewComponent);
    return GallaryViewComponent;
}());
exports.GallaryViewComponent = GallaryViewComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2NlbnRlci1nYWxsYXJ5LXZpZXcvZ2FsbGFyeXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxxQkFFSyxlQUFlLENBQUMsQ0FBQTtBQUNyQix1QkFBZ0QsaUJBQWlCLENBQUMsQ0FBQTtBQUNsRSx1QkFBOEIsaUJBQWlCLENBQUMsQ0FBQTtBQUNoRCxzQkFBMEYsZ0JBQWdCLENBQUMsQ0FBQTtBQUczRyw2QkFBNEIsb0NBQW9DLENBQUMsQ0FBQTtBQUdqRSxxQ0FBa0MsOENBQThDLENBQUMsQ0FBQTtBQUNqRixJQUFPLFNBQVMsV0FBVyxlQUFlLENBQUMsQ0FBQztBQUM1QyxpQ0FBK0IscUNBQXFDLENBQUMsQ0FBQTtBQUVyRSx1Q0FBc0MsMERBQTBELENBQUMsQ0FBQTtBQUNqRyxxQ0FBb0Msc0RBQXNELENBQUMsQ0FBQTtBQVEzRjtJQXlDSSw4QkFBb0IsT0FBZSxFQUFVLFdBQXdCLEVBQVMsT0FBb0I7UUFBOUUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBYTtRQXZDbkYsaUJBQVksR0FBeUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFdkUsZUFBVSxHQUFXLFNBQVMsQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUM7UUFDOUQsYUFBUSxHQUFXLFNBQVMsQ0FBQyxRQUFRLEdBQUcsaUJBQWlCLENBQUM7UUFFMUQsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUd6QixvQkFBZSxHQUFVLFNBQVMsQ0FBQyxRQUFRLEdBQUcsa0JBQWtCLENBQUM7UUFDakUsc0JBQWlCLEdBQVcsS0FBSyxDQUFDO1FBRWxDLHVCQUFrQixHQUFnQixJQUFJLG1CQUFXLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFJM0UsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixhQUFRLEdBQWdCLElBQUksbUJB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QUMsQ0FBQztZQUN0QixJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1lBQzNELENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxVQUFTLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7Z0JBQ0MsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztZQUM3RCxDQUFDLENBQUMsQ0FBQztRQUNKLENBQUM7SUFDQyxDQUFDO0lBMVJKO1FBQUMsWUFBSyxFQUFFOzs2REFBQTtJQUNSO1FBQUMsYUFBTSxFQUFFOzs4REFBQTtJQVJWO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsVUFBVSxFQUFFLENBQUMsMENBQW1CLEVBQUUsZ0NBQXdCLEVBQUUsd0JBQWUsRUFBQyw4Q0FBcUIsRUFBQywwQ0FBbUIsQ0FBQztTQUN6SCxDQUFDOzs0QkFBQTtJQTZSRiwyQkFBQztBQUFELENBNVJBLEFBNFJDLElBQUE7QUE1UlksNEJBQW9CLHVCQTRSaEMsQ0FBQSIsImZpbGUiOiJhcHAvaG9tZS9jZW50ZXItZ2FsbGFyeS12aWV3L2dhbGxhcnl2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgTmdab25lLCBJbnB1dCwgT3V0cHV0LCBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlLCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0NoaWxkfVxuZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JvdXRlcywgUm91dGVyLCBST1VURVJfRElSRUNUSVZFU30gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycywgRm9ybUJ1aWxkZXIsIFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3Zm9vIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtQYWdpbmF0aW9uQ29tcG9uZW50fSBmcm9tICcuLi8uLi9zaGFyZWQvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vLi4vZ2xvYmFscycpO1xuaW1wb3J0IHtDdXN0b21WYWxpZGF0b3JzfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMvQ3VzdG9tVmFsaWRhdG9ycyc7XG5cbmltcG9ydCB7IENvbW1lbnRNb2RhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uL3NoYXJlZC93aWRnZXRzL2NvbW1lbnRtb2RhbC9jb21tZW50bW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IFNoYXJlTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvd2lkZ2V0cy9zaGFyZW1vZGFsL3NoYXJlbW9kYWwuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2NlbnRlcmdhbGxhcnl2aWV3JyxcbiAgICB0ZW1wbGF0ZVVybDogJ2dhbGxhcnl2aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbUGFnaW5hdGlvbkNvbXBvbmVudCwgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTLCBDT1JFX0RJUkVDVElWRVMsQ29tbWVudE1vZGFsQ29tcG9uZW50LFNoYXJlTW9kYWxDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEdhbGxhcnlWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0QElucHV0KCkgcHVibGljIHZpZXdmb29saXN0OiBhbnk7XG5cdEBPdXRwdXQoKSBwcml2YXRlIG9uRGVsVmlld2ZvbzogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBzZXJ2aWNlVXJsOiBzdHJpbmcgPSBteUdsb2JhbHMuc2VydmljZVVybCArICcvdXBsb2FkL2dhbGxlcnknO1xuICAgIGltYWdlVXJsOiBzdHJpbmcgPSBteUdsb2JhbHMuaW1hZ2VVcmwgKyAnL3VwbG9hZC9nYWxsZXJ5JztcbiAgICBsb2dpblVzZXI6IGFueTtcbiAgICBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICB2aWV3Zm9vY29tbWVudGlkOnN0cmluZztcbiAgICBwcm9maWxlaW1hZ2VVcmw6c3RyaW5nID0gbXlHbG9iYWxzLmltYWdlVXJsICsgJy91cGxvYWQvcHJvZmlsZXMnO1xuICAgIGNvbW1lbnRhZGRsb2FkaW5nOmJvb2xlYW4gPSBmYWxzZTtcbiAgICB2aWV3Zm9vY29tbWVudHM6YW55O1xuICAgIHZpZXdmb29jb21tZW50dGV4dDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgdmlld2Zvb2NvbW1lbnQ6IEZvcm1Hcm91cDtcbiAgICAvL2ZvciBwYXNzcHdyZCBwcm90ZWN0ZWRcbiAgICB2aWV3Zm9vcGFzc3dvcmQxOiBGb3JtR3JvdXA7XG4gICAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHBhc3N3b3JkOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbChcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICBjb25maXJtcGFzc3dvcmQ6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKFwiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgIGdlbmVyYXRlZHBhc3N3b3JkOiBGb3JtQ29udHJvbDtcbiAgICB2aWV3Zm9vcGFzc3dvcmRpZDpzdHJpbmc7XG4gICAgdmlld2Zvb3Bhc3N3b3JkdHlwZTpzdHJpbmc9XCJhdXRvcGFzc3dvcmRcIjtcbiAgICBnZW5lcmF0ZW93bnBhc3N3b3JkOiBib29sZWFuID0gdHJ1ZTtcbiAgICBjaGttYWlsOkZvcm1Db250cm9sPWZhbHNlO1xuICAgIGNoa3NtczpGb3JtQ29udHJvbD1mYWxzZTtcbiAgICBwdWJsaWMgY2hlY2tlbWFpbDpib29sZWFuPWZhbHNlO1xuICAgIHB1YmxpYyBjaGVja3Ntczpib29sZWFuPWZhbHNlO1xuICAgIHB1YmxpYyB1bmxvY2t2aWV3Zm9vaWQ6c3RyaW5nO1xuICAgIHB1YmxpYyBpc2Vycm9yOmJvb2xlYW49ZmFsc2U7XG4gICAgcHVibGljIGNoZWNrdW5sb2Nrc21zOmJvb2xlYW49ZmFsc2U7XG4gICAgIHB1YmxpYyBpc0VuYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgLy9lbmQgb2YgcGFzc3dvcmQgcHJvdGVjdGVkXG5cbiAgICAvL3NoYXJlIGFuZCBjb21tZW50XG4gICAgY3VyclZpZXdmb29Db21tZW50OiBWaWV3Zm9vID0ge307XG4gICAgY3VyclZpZXdmb29TaGFyZTpWaWV3Zm9vID0ge307XG4gICAgY3VyclZpZXdmb29JbWFnZVNoYXJlOkNvbnRhaW5lciA9IHt9O1xuICAgIGlzTW9kZWxDb21tZW50SGlkZGVuUmVnaXN0ZXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzTW9kZWxTaGFyZUhpZGRlblJlZ2lzdGVyZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLHByaXZhdGUgYnVpbGRlcjogRm9ybUJ1aWxkZXIpIHtcblxuICAgICAgICB0aGlzLmxvZ2luVXNlciA9IG15R2xvYmFscy5Mb2dpblVzZXI7XG4gICAgICAgIHRoaXMudmlld2Zvb2NvbW1lbnQgPSBidWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgXCJ2aWV3Zm9vY29tbWVudHRleHRcIjogdGhpcy52aWV3Zm9vY29tbWVudHRleHRcbiAgICAgICAgfSk7XG4gICAgICAgICAgLy9mb3IgcGFzc3dvcmQgcHJvdGVjdGVkXG4gICAgICAgIHRoaXMudmlld2Zvb3Bhc3N3b3JkMSA9IGJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgXCJwYXNzd29yZFwiOiB0aGlzLnBhc3N3b3JkLFxuICAgICAgICAgICAgXCJnZW5lcmF0ZWRwYXNzd29yZFwiOiB0aGlzLmdlbmVyYXRlZHBhc3N3b3JkLFxuICAgICAgICAgICAgXCJjaGttYWlsXCI6dGhpcy5jaGttYWlsLFxuICAgICAgICAgICAgXCJjaGtzbXNcIjp0aGlzLmNoa3NtcyxcbiAgICAgICAgICAgIFwiY29uZmlybXBhc3N3b3JkXCI6IHRoaXMuY29uZmlybXBhc3N3b3JkXG4gICAgICAgIH0sXG4gICAgICAgIHsgdmFsaWRhdG9yOiBDdXN0b21WYWxpZGF0b3JzLm1hdGNoaW5nUGFzc3dvcmRzKCdwYXNzd29yZCcsICdjb25maXJtcGFzc3dvcmQnKSB9KTtcbiAgICAgICAgLy9lbmQgb2YgcGFzc3dvcmQgcHJvdGVjdGVkXG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgICB0aGlzLnZpZXdmb29wYXNzd29yZDEuY29udHJvbHNbJ2Noa21haWwnXS51cGRhdGVWYWx1ZShmYWxzZSk7XG4gICAgICAgICAgdGhpcy52aWV3Zm9vcGFzc3dvcmQxLmNvbnRyb2xzWydjaGtzbXMnXS51cGRhdGVWYWx1ZShmYWxzZSk7XG4gICAgICAgICAgbGV0IGZvcm1kYXRhID0gdGhpcy52aWV3Zm9vY29tbWVudC52YWx1ZTtcbiAgICB9XG5cbiAgICBnb3RvZ2FsbGFyeSh2aWV3Zm9vaWQ6IGFueSkge1xuICAgICAgICBcbiAgICAgICAgbGV0IGxpbmsgPSBbJy92aWV3Zm9vZGV0YWlsJywgdmlld2Zvb2lkXTtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKGxpbmspO1xuICAgIH1cblxuICAgIG9uRWRpdFZpZXdmb28odmlld2Zvb2lkOiBhbnkpIHtcbiAgICAgICAgXG4gICAgICAgIGxldCBsaW5rID0gWycvZ2FsbGFyeScsIHZpZXdmb29pZF07XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShsaW5rKTtcbiAgICB9XG5cbiAgICBvbkRlbGV0ZVZpZXdmb28odmlld2Zvb2lkOiBhbnksIHZpZXdmb29pbmRleCkge1xuICAgICAgICAvL3RoaXMub25EZWxWaWV3Zm9vLmVtaXQodmlld2Zvb2lkKTtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS52aWV3Zm9vZGVsZXRlKHZpZXdmb29pZClcblx0XHRcdC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld2Zvb2xpc3Quc3BsaWNlKHZpZXdmb29pbmRleCwgMSk7XG5cblx0XHRcdH0sIChlcnJvcjogYW55KSA9PiB7XG5cdFx0XHRcdHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcblx0XHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cblx0XHRcdFx0Y29uc29sZS5sb2coXCJ2aWV3Zm9vIGRlbGV0ZSBmYWlsOiBcIiArIGVycm9yKTtcblx0XHRcdH0pO1xuICAgIH1cbiAgICBcbiAgICBnZXRDb21tZW50KHZpZXdmb29pZDpzdHJpbmcpe1xuICAgICAgIHRoaXMudmlld2Zvb2NvbW1lbnRzPVtdO1xuICAgICAgIHRoaXMudmlld2Zvb2NvbW1lbnRpZCA9IHZpZXdmb29pZDtcbiAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb29nZXRjb21tZW50KHRoaXMudmlld2Zvb2NvbW1lbnRpZClcblx0XHRcdC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlld2Zvb2NvbW1lbnRzPXJlc3VsdC5kYXRhO1xuXHRcdFx0fSwgKGVycm9yOiBhbnkpID0+IHtcblx0XHRcdFx0dGhpcy5lcnJvck1zZyA9IGVycm9yO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcInZpZXdmb28gZ2V0IGZhaWw6IFwiICsgZXJyb3IpO1xuXHRcdFx0fSk7XG4gICAgICAgIFxuICAgIH1cbiAgICBkb0NvbW1lbnQoKXtcbiAgICAgICAgdGhpcy5jb21tZW50YWRkbG9hZGluZyA9IHRydWU7XG4gICAgICAgIGxldCBjb21tZW50ZGF0YSA9IHRoaXMudmlld2Zvb2NvbW1lbnR0ZXh0LnZhbHVlO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb29hZGRjb21tZW50KHRoaXMubG9naW5Vc2VyLmlkLCd2aWV3Zm9vJyxjb21tZW50ZGF0YSx0aGlzLnZpZXdmb29jb21tZW50aWQpXG5cdFx0XHQuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb29nZXRjb21tZW50KHRoaXMudmlld2Zvb2NvbW1lbnRpZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQxKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Zm9vY29tbWVudHM9cmVzdWx0MS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldGZvcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpZXdmb28gZ2V0IGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbWVudGFkZGxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdH0sIChlcnJvcjogYW55KSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwidmlld2ZvbyBhZGQgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbWVudGFkZGxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdH0pO1xuXG4gICAgfVxuICAgIFxuICAgIHJlc2V0Zm9ybSgpeyAgICAgIFxuICAgICAgICB0aGlzLnZpZXdmb29jb21tZW50LmNvbnRyb2xzWyd2aWV3Zm9vY29tbWVudHRleHQnXS51cGRhdGVWYWx1ZSgnJyk7XG4gICAgfVxuICAgIC8vZm9yIHBhc3N3b3JkIHByb3RlY3RlZFxuICAgIG9wZW5wYXNzd29yZHBvcHVwKGlkKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnZpZXdmb29wYXNzd29yZGlkID0gaWQ7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVwYXNzd29yZCgpO1xuICAgIH1cblxuICAgIGdlbmVyYXRlcGFzc3dvcmQoKSB7XG4gICAgICAgIHRoaXMuaXNsb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy52aWV3Zm9vcGFzc3dvcmQxLmNvbnRyb2xzWydnZW5lcmF0ZWRwYXNzd29yZCddLnNldEVycm9ycyhudWxsKTtcbiAgICAgICAgdGhpcy52aWV3Zm9vcGFzc3dvcmQxLmNvbnRyb2xzWydjb25maXJtcGFzc3dvcmQnXS5zZXRFcnJvcnMobnVsbCk7XG4gICAgICAgIHRoaXMudmlld2Zvb3Bhc3N3b3JkMS5jb250cm9sc1sncGFzc3dvcmQnXS5zZXRFcnJvcnMobnVsbCk7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UuZ2VuZXJhdGVyYW5kb21wdygpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Zm9vcGFzc3dvcmQxLmNvbnRyb2xzWydnZW5lcmF0ZWRwYXNzd29yZCddLnVwZGF0ZVZhbHVlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmlzbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGFzc3dvcmQgZ2VuZXJhdGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgY2hhbmdlcGFzc3dvcmR0eXBlKHZhbCkge1xuICAgICAgICAgICAgXG4gICAgICAgIGlmICh2YWwgPT0gJ293bicpIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVvd25wYXNzd29yZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy52aWV3Zm9vcGFzc3dvcmR0eXBlID0gXCJ5b3VycGFzc3dvcmRcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWwgPT0gJ2dlbmVyYXRlJykge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZW93bnBhc3N3b3JkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudmlld2Zvb3Bhc3N3b3JkdHlwZSA9IFwiYXV0b3Bhc3N3b3JkXCI7XG4gICAgICAgICAgICB0aGlzLnZpZXdmb29wYXNzd29yZDEuY29udHJvbHNbJ2dlbmVyYXRlZHBhc3N3b3JkJ10uc2V0RXJyb3JzKG51bGwpO1xuICAgICAgICAgICAgdGhpcy52aWV3Zm9vcGFzc3dvcmQxLmNvbnRyb2xzWydjb25maXJtcGFzc3dvcmQnXS5zZXRFcnJvcnMobnVsbCk7XG4gICAgICAgICAgICB0aGlzLnZpZXdmb29wYXNzd29yZDEuY29udHJvbHNbJ3Bhc3N3b3JkJ10uc2V0RXJyb3JzKG51bGwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZXZpZXdmb29wYXNzd3ByZCgpIHtcbiAgICAgICAgIHRoaXMuaXNsb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgbGV0IGZvcm1kYXRhID0gdGhpcy52aWV3Zm9vcGFzc3dvcmQxLnZhbHVlO1xuICAgICAgICBmb3JtZGF0YVtcInZpZXdmb29wYXNzd29yZHR5cGVcIl0gPSB0aGlzLnZpZXdmb29wYXNzd29yZHR5cGU7XG4gICAgICAgIGZvcm1kYXRhW1wiaWRcIl0gPSB0aGlzLnZpZXdmb29wYXNzd29yZGlkO1xuICAgICAgICBmb3JtZGF0YVtcImlzcGFzc3dvcmRwcm90ZWN0ZWRcIl0gPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMudmlld2Zvb3Bhc3N3b3JkdHlwZSA9PSBcImF1dG9wYXNzd29yZFwiKSB7XG5cbiAgICAgICAgICAgIGZvcm1kYXRhW1widmlld2Zvb3Bhc3N3b3JkXCJdID0gZm9ybWRhdGEuZ2VuZXJhdGVkcGFzc3dvcmQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy52aWV3Zm9vcGFzc3dvcmR0eXBlID09IFwieW91cnBhc3N3b3JkXCIpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9ybWRhdGFbXCJ2aWV3Zm9vcGFzc3dvcmRcIl0gPSBmb3JtZGF0YS5wYXNzd29yZDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5wYXNzd29yZHByb3RlY3RlZHZpZWZvbyhmb3JtZGF0YSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VpbnZpZXdmb29saXN0KHRoaXMudmlld2Zvb3Bhc3N3b3JkaWQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldHBhc3N3b3JkZm9ybSgpO1xuICAgICAgICAgICAgICAgICAgICAvLyQoJyNwYXNzd29yZE1vZGFsJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAkKFwiI3Bhc3N3b3JkTW9kYWwgLmNsb3NlXCIpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgIHRoaXMuaXNsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwYXNzd29yZCB1cGRhdGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VpbnZpZXdmb29saXN0KGlkLCB2YWx1ZSkge1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy52aWV3Zm9vbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudmlld2Zvb2xpc3RbaV0uaWQgPT0gaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdmb29saXN0W2ldLmlzcGFzc3dvcmRwcm90ZWN0ZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB1bmxvY2twYXNzd29yZCh1bmxvY2twdzpIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuaXNsb2FkaW5nPXRydWU7XG4gICAgICAgIHRoaXMuaXNlcnJvciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnVubG9ja3ZpZXdmb28odGhpcy51bmxvY2t2aWV3Zm9vaWQsIHVubG9ja3B3LnZhbHVlKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlaW52aWV3Zm9vbGlzdCh0aGlzLnVubG9ja3ZpZXdmb29pZCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNlcnJvcj10cnVlO1xuICAgICAgICAgICAgICAgICAgICAgIHVubG9ja3B3LnZhbHVlPW51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc2xvYWRpbmc9ZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgLy8gJCgnI3VubG9ja3Bhc3N3b3JkTW9kYWwnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAkKFwiI3VubG9ja3Bhc3N3b3JkTW9kYWwgLmNsb3NlXCIpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzZXJyb3I9dHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5pc2xvYWRpbmc9ZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwYXNzd29yZCB1cGRhdGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVzZXRwYXNzd29yZGZvcm0oKSB7XG4gICAgICAgIHRoaXMudmlld2Zvb3Bhc3N3b3JkMS5jb250cm9sc1snY29uZmlybXBhc3N3b3JkJ10udXBkYXRlVmFsdWUoJycpO1xuICAgICAgICB0aGlzLnZpZXdmb29wYXNzd29yZDEuY29udHJvbHNbJ3Bhc3N3b3JkJ10udXBkYXRlVmFsdWUoJycpO1xuICAgICAgICB0aGlzLnZpZXdmb29wYXNzd29yZDEuY29udHJvbHNbJ2dlbmVyYXRlZHBhc3N3b3JkJ10uc2V0RXJyb3JzKG51bGwpO1xuICAgICAgICB0aGlzLnZpZXdmb29wYXNzd29yZDEuY29udHJvbHNbJ2NvbmZpcm1wYXNzd29yZCddLnNldEVycm9ycyhudWxsKTtcbiAgICB9XG4gICAgc2VuZHBhc3N3b3JkKCkge1xuICAgICAgICB0aGlzLmlzbG9hZGluZyA9IHRydWU7XG4gICAgICAgICB0aGlzLmlzZXJyb3IgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5mb3Jnb3R2aWV3Zm9vcGFzc3dvcmQodGhpcy51bmxvY2t2aWV3Zm9vaWQsIHRoaXMuY2hlY2t1bmxvY2tzbXMpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmlzbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc2Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNlcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwYXNzd29yZCBzZW5kaW5nIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vZW5kIG9mIHBhc3N3b3JkIHByb3RlY3RlZFxuICAgIFxuICAgIC8vdmlld2ZvbyBzaGFyZSAmIGNvbW1lbnRcbiAgICBvblZpZXdmb29Db21tZW50KHZmbDogVmlld2Zvbykge1xuXG4gICAgICAgIHRoaXMuY3VyclZpZXdmb29Db21tZW50ID0gdmZsO1xuICAgICAgICAkKCcjY29tbWVudHBob3RvX21vZGFsJykubW9kYWwoJ3Nob3cnKTtcblx0XHRpZiAoIXRoaXMuaXNNb2RlbENvbW1lbnRIaWRkZW5SZWdpc3RlcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIFx0dGhpcy5pc01vZGVsQ29tbWVudEhpZGRlblJlZ2lzdGVyZWQgPSB0cnVlO1xuXHRcdFx0JCgnI2NvbW1lbnRwaG90b19tb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdHRoaXMuY3VyclZpZXdmb29Db21tZW50ID0ge307XG5cdFx0XHR9KTtcblx0XHR9XG4gICAgfVxuICAgIFxuICAgIG9uVmlld2Zvb1NoYXJlKHZmbDogVmlld2Zvbykge1xuXG4gICAgICAgIHRoaXMuY3VyclZpZXdmb29TaGFyZSA9IHZmbDtcbiAgICAgICAgdGhpcy5jdXJyVmlld2Zvb0ltYWdlU2hhcmUgPSB7fTtcbiAgICAgICAgJCgnI1NlbGVjdFBob3RvTW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuXHRcdGlmICghdGhpcy5pc01vZGVsU2hhcmVIaWRkZW5SZWdpc3RlcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIFx0dGhpcy5pc01vZGVsU2hhcmVIaWRkZW5SZWdpc3RlcmVkID0gdHJ1ZTtcblx0XHRcdCQoJyNTZWxlY3RQaG90b01vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0dGhpcy5jdXJyVmlld2Zvb1NoYXJlID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyclZpZXdmb29JbWFnZVNoYXJlID0ge307XG5cdFx0XHR9KTtcblx0XHR9XG4gICAgfVxufVxuIl19
