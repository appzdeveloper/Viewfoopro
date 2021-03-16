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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var auth_service_1 = require('../../services/auth.service');
var CustomValidators_1 = require('../../utils/CustomValidators');
var myGlobals = require('../../../globals');
var CommentModalComponent = (function () {
    function CommentModalComponent(zone, _changeDetectionRef, elementRef, authService, builder) {
        this._changeDetectionRef = _changeDetectionRef;
        this.elementRef = elementRef;
        this.authService = authService;
        this.builder = builder;
        this.imageUrl = myGlobals.imageUrl + '/upload/gallery';
        this.profileimageUrl = myGlobals.imageUrl + '/upload/profiles';
        this.isEnable = true;
        this.commentaddloading = false;
        this.loading = false;
        this.viewfoocommenttext = new forms_1.FormControl("", forms_1.Validators.required);
        this.viewfoocommentname = new forms_1.FormControl("", forms_1.Validators.required);
        this.viewfoocommentemail = new forms_1.FormControl("", forms_1.Validators.compose([forms_1.Validators.required, CustomValidators_1.CustomValidators.emailValidator]));
        this.serviceUrl = myGlobals.serviceUrl;
        this.imageUrl = myGlobals.imageUrl + '/upload/gallery/';
        this.viewfoocomment = builder.group({
            "viewfoocommenttext": this.viewfoocommenttext,
            "viewfoocommentname": this.viewfoocommentname,
            "viewfoocommentemail": this.viewfoocommentemail
        });
        this.loginUser = myGlobals.LoginUser;
        if (window.localStorage['offlineuser']) {
            this.offlineuser = JSON.parse(window.localStorage['offlineuser']);
        }
    }
    Object.defineProperty(CommentModalComponent.prototype, "commenttype", {
        get: function () {
            return this._commenttype;
        },
        set: function (v) {
            this._commenttype = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentModalComponent.prototype, "currViewfoo", {
        get: function () {
            return this._currViewfoo;
        },
        set: function (v) {
            this._currViewfoo = v;
            if (this._currViewfoo.id != undefined) {
                this.getComment(this._currViewfoo, '');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentModalComponent.prototype, "currImage", {
        get: function () {
            return this._currImage;
        },
        set: function (v) {
            this._currImage = v;
            if (this._currImage.id != undefined) {
                this.getComment('', this._currImage);
            }
        },
        enumerable: true,
        configurable: true
    });
    CommentModalComponent.prototype.ngOnInit = function () {
    };
    CommentModalComponent.prototype.ngAfterViewInit = function () {
    };
    CommentModalComponent.prototype.getComment = function (currentviewfoo, currentimage) {
        var _this = this;
        if (this.loginUser) {
            this.viewfoocommentname.updateValue(this.loginUser.firstname + " " + this.loginUser.lastname);
            this.viewfoocommentemail.updateValue(this.loginUser.email);
        }
        else if (this.offlineuser) {
            this.viewfoocommentname.updateValue(this.offlineuser.username);
            this.viewfoocommentemail.updateValue(this.offlineuser.email);
        }
        this.viewfoocomments = [];
        if (currentviewfoo.id != undefined) {
            var viewfooid = currentviewfoo.id;
        }
        else {
            var viewfooid = '';
        }
        if (currentimage.id != undefined) {
            var viewfooid = currentimage.viewfooid;
            var imageid = currentimage.id;
        }
        else {
            var imageid = '';
        }
        this.loading = true;
        this.authService.viewfoogetcomment(viewfooid, imageid)
            .subscribe(function (result) {
            console.log(currentviewfoo.id);
            _this.viewfoocomments = result.data;
            _this.loading = false;
        }, function (error) {
            _this.errorMsg = error;
            console.log("viewfoo get fail: " + error);
            _this.loading = false;
        });
    };
    CommentModalComponent.prototype.doComment = function () {
        var _this = this;
        var offlineuser = {
            username: this.viewfoocommentname.value,
            email: this.viewfoocommentemail.value
        };
        window.localStorage['offlineuser'] = JSON.stringify(offlineuser);
        var currViewfoo = this.currViewfoo;
        var currImage = this.currImage;
        this.commentaddloading = true;
        var commentdata = this.viewfoocommenttext.value;
        var commentname = this.viewfoocommentname.value;
        var commentemail = this.viewfoocommentemail.value;
        var userid = this.loginUser != undefined ? this.loginUser.id : '';
        console.log(this.currViewfoo);
        console.log(this.currImage);
        if (currViewfoo != undefined) {
            var viewfooid = currViewfoo.id;
        }
        else {
            var viewfooid = '';
        }
        if (currImage != undefined) {
            if (currImage.id != undefined) {
                var viewfooid = currImage.viewfooid;
                var imageid = currImage.id;
            }
        }
        else {
            var imageid = '';
        }
        console.log(viewfooid);
        console.log(imageid);
        this.authService.viewfooaddcomment('comment', userid, commentdata, commentname, commentemail, viewfooid, imageid)
            .subscribe(function (result) {
            _this.authService.viewfoogetcomment(viewfooid, imageid)
                .subscribe(function (result1) {
                if (result1) {
                    _this.viewfoocomments = result1.data;
                    _this.viewfoocommenttext.updateValue("");
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
    CommentModalComponent.prototype.resetform = function () {
        this.viewfoocomment = this.builder.group({
            "viewfoocommenttext": '',
            "viewfoocommentname": this.viewfoocommentname,
            "viewfoocommentemail": this.viewfoocommentemail
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CommentModalComponent.prototype, "commenttype", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CommentModalComponent.prototype, "currViewfoo", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CommentModalComponent.prototype, "currImage", null);
    CommentModalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'commentmodal',
            templateUrl: 'commentmodal.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [core_1.NgZone, core_1.ChangeDetectorRef, core_1.ElementRef, auth_service_1.AuthService, forms_1.FormBuilder])
    ], CommentModalComponent);
    return CommentModalComponent;
}());
exports.CommentModalComponent = CommentModalComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvd2lkZ2V0cy9zaGFyZW1vZGFsL2NvbW1lbnRtb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHFCQUVLLGVBQWUsQ0FBQyxDQUFBO0FBQ3JCLHVCQUE4QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hELHNCQUEwRixnQkFBZ0IsQ0FBQyxDQUFBO0FBRTNHLDZCQUE0Qiw2QkFBNkIsQ0FBQyxDQUFBO0FBQzFELGlDQUErQiw4QkFBOEIsQ0FBQyxDQUFBO0FBQzlELElBQU8sU0FBUyxXQUFXLGtCQUFrQixDQUFDLENBQUM7QUFPL0M7SUE2QkksK0JBQVksSUFBWSxFQUFVLG1CQUFzQyxFQUM3RCxVQUFzQixFQUNyQixXQUF3QixFQUFVLE9BQW9CO1FBRmhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFDN0QsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQWE7UUF2QmxFLGFBQVEsR0FBVyxTQUFTLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDO1FBQzFELG9CQUFlLEdBQVcsU0FBUyxDQUFDLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQztRQUMzRCxhQUFRLEdBQVksSUFBSSxDQUFDO1FBQ2hDLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUduQyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBRXpCLHVCQUFrQixHQUFnQixJQUFJLG1CQUFXLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0UsdUJBQWtCLEdBQWdCLElBQUksbUJBQVcsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRSx3QkFBbUIsR0FBZ0IsSUFBSSxtQkFBVyxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGtCQUFVLENBQUMsUUFBUSxFQUFFLG1DQUFnQixD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UUFFaEMsQ0FBQyxDQUFDLENBQUM7SUFFRixDQUFDO0lBRUQseUNBQVMsR0FBVDtRQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDeEMsb0JBQW9CLEVBQUUsRUFBRTtZQUN4QixvQkFBb0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCO1lBQzdDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxtQkFBbUI7U0FDekMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQXZKRDtRQUFDLFlBQUssRUFBRTs7NERBQUE7SUFTWDtRQUFDLFlBQUssRUFBRTs7NERBQUE7SUFVTDtRQUFDLFlBQUssRUFBRTs7MERBQUE7SUF4RVo7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsVUFBVSxFQUFFLENBQUMsZ0NBQXdCLEVBQUUsd0JBQWUsQ0FBQztTQUMxRCxDQUFDOzs2QkFBQTtJQXdNRiw0QkFBQztBQUFELENBdk1BLEFBdU1DLElBQUE7QUF2TVksNkJBQXFCLHdCQXVNakMsQ0FBQSIsImZpbGUiOiJhcHAvc2hhcmVkL3dpZGdldHMvc2hhcmVtb2RhbC9jb21tZW50bW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUsIElucHV0LCBPdXRwdXQsIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLCBSZW5kZXJlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2UsIENoYW5nZURldGVjdG9yUmVmLCBWaWV3Q2hpbGR9XG5mcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycywgRm9ybUJ1aWxkZXIsIFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFVzZXIsIFZpZXdmb28sIENvbnRhaW5lciB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHtDdXN0b21WYWxpZGF0b3JzfSBmcm9tICcuLi8uLi91dGlscy9DdXN0b21WYWxpZGF0b3JzJztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi8uLi8uLi9nbG9iYWxzJyk7XG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnY29tbWVudG1vZGFsJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2NvbW1lbnRtb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW1JFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUywgQ09SRV9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBDb21tZW50TW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgLy9AVmlld0NoaWxkKCdpbWdibG9jaycpIGltZ2Jsb2NrOiBFbGVtZW50UmVmO1xuXG4gICAgLy9ASW5wdXQoKSBwdWJsaWMgY3VyclZpZXdmb286IHN0cmluZztcbiAgICB2aWV3Zm9vY29tbWVudGlkOiBzdHJpbmc7XG4gICAgLy9ASW5wdXQoKSBwdWJsaWMgY29tbWVudHR5cGU6IHN0cmluZztcblxuICAgIGltYWdlVXJsOiBzdHJpbmcgPSBteUdsb2JhbHMuaW1hZ2VVcmwgKyAnL3VwbG9hZC9nYWxsZXJ5JztcbiAgICBwcm9maWxlaW1hZ2VVcmw6IHN0cmluZyA9IG15R2xvYmFscy5pbWFnZVVybCArICcvdXBsb2FkL3Byb2ZpbGVzJztcbiAgICBwdWJsaWMgaXNFbmFibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGNvbW1lbnRhZGRsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgdmlld2Zvb2NvbW1lbnRzOiBhbnk7XG5cbiAgICBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICB2aWV3Zm9vY29tbWVudHRleHQ6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKFwiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgIHZpZXdmb29jb21tZW50bmFtZTogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgdmlld2Zvb2NvbW1lbnRlbWFpbDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woXCJcIiwgVmFsaWRhdG9ycy5jb21wb3NlKFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBDdXN0b21WYWxpZGF0b3JzLmVtYWlsVmFsaWRhdG9yXSkpO1xuXG4gICAgdmlld2Zvb2NvbW1lbnQ6IEZvcm1Hcm91cDtcbiAgICAvL0BPdXRwdXQoKSBwcml2YXRlIG9uQ29udGFpbmVyRGVsZXRlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHNlcnZpY2VVcmw6IHN0cmluZyA9IG15R2xvYmFscy5zZXJ2aWNlVXJsO1xuICAgIGltYWdlVXJsOiBzdHJpbmcgPSBteUdsb2JhbHMuaW1hZ2VVcmwgKyAnL3VwbG9hZC9nYWxsZXJ5Lyc7XG5cbiAgICBsb2dpblVzZXI6IGFueTtcbiAgICBvZmZsaW5ldXNlcjogYW55O1xuXG4gICAgY29uc3RydWN0b3Ioem9uZTogTmdab25lLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgYnVpbGRlcjogRm9ybUJ1aWxkZXIpIHtcblxuICAgICAgICB0aGlzLnZpZXdmb29jb21tZW50ID0gYnVpbGRlci5ncm91cCh7XG5cdFx0XHRcInZpZXdmb29jb21tZW50dGV4dFwiOiB0aGlzLnZpZXdmb29jb21tZW50dGV4dCxcblx0XHRcdFwidmlld2Zvb2NvbW1lbnRuYW1lXCI6IHRoaXMudmlld2Zvb2NvbW1lbnRuYW1lLFxuXHRcdFx0XCJ2aWV3Zm9vY29tbWVudGVtYWlsXCI6IHRoaXMudmlld2Zvb2NvbW1lbnRlbWFpbFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxvZ2luVXNlciA9IG15R2xvYmFscy5Mb2dpblVzZXI7XG5cbiAgICAgICAgaWYod2luZG93LmxvY2FsU3RvcmFnZVsnb2ZmbGluZXVzZXInXSkge1xuICAgICAgICAgICAgdGhpcy5vZmZsaW5ldXNlciA9IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZVsnb2ZmbGluZXVzZXInXSk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuICAgIEBJbnB1dCgpIHByaXZhdGUgZ2V0IGNvbW1lbnR0eXBlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb21tZW50dHlwZTtcbiAgICB9XG4gICAgcHVibGljIHNldCBjb21tZW50dHlwZSh2OiBhbnkpIHtcbiAgICAgICAgdGhpcy5fY29tbWVudHR5cGUgPSB2O1xuICAgICAgICAvL2FsZXJ0KFwiQ29tbWVudHR5cGUgc2V0IDogXCIrdik7XG4gICAgICAgIC8vdGhpcy5nZXRDb21tZW50KHRoaXMuX2N1cnJWaWV3Zm9vKTtcbiAgICB9XG5cblx0QElucHV0KCkgcHJpdmF0ZSBnZXQgY3VyclZpZXdmb28oKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJWaWV3Zm9vO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IGN1cnJWaWV3Zm9vKHY6IGFueSkge1xuICAgICAgICB0aGlzLl9jdXJyVmlld2ZvbyA9IHY7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyVmlld2Zvby5pZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tbWVudCh0aGlzLl9jdXJyVmlld2ZvbywgJycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgcHJpdmF0ZSBnZXQgY3VyckltYWdlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJySW1hZ2U7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgY3VyckltYWdlKHY6IGFueSkge1xuICAgICAgICB0aGlzLl9jdXJySW1hZ2UgPSB2O1xuICAgICAgICBpZiAodGhpcy5fY3VyckltYWdlLmlkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5nZXRDb21tZW50KCcnLCB0aGlzLl9jdXJySW1hZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIH1cblxuICAgIGdldENvbW1lbnQoY3VycmVudHZpZXdmb286IGFueSwgY3VycmVudGltYWdlOiBhbnkpIHtcblxuICAgICAgICBpZih0aGlzLmxvZ2luVXNlcikge1xuICAgICAgICAgICAgdGhpcy52aWV3Zm9vY29tbWVudG5hbWUudXBkYXRlVmFsdWUodGhpcy5sb2dpblVzZXIuZmlyc3RuYW1lK1wiIFwiK3RoaXMubG9naW5Vc2VyLmxhc3RuYW1lKTtcblxuICAgICAgICAgICAgdGhpcy52aWV3Zm9vY29tbWVudGVtYWlsLnVwZGF0ZVZhbHVlKHRoaXMubG9naW5Vc2VyLmVtYWlsKTtcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMub2ZmbGluZXVzZXIpIHtcbiAgICAgICAgICAgIHRoaXMudmlld2Zvb2NvbW1lbnRuYW1lLnVwZGF0ZVZhbHVlKHRoaXMub2ZmbGluZXVzZXIudXNlcm5hbWUpO1xuICAgICAgICAgICAgdGhpcy52aWV3Zm9vY29tbWVudGVtYWlsLnVwZGF0ZVZhbHVlKHRoaXMub2ZmbGluZXVzZXIuZW1haWwpO1xuICAgICAgICB9XG4gICAgICAgIC8vXG5cblx0XHR0aGlzLnZpZXdmb29jb21tZW50cyA9IFtdO1xuXG5cdFx0aWYgKGN1cnJlbnR2aWV3Zm9vLmlkICE9IHVuZGVmaW5lZCkge1xuXHRcdFx0bGV0IHZpZXdmb29pZCA9IGN1cnJlbnR2aWV3Zm9vLmlkO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCB2aWV3Zm9vaWQgPSAnJztcblx0XHR9XG5cblx0XHRpZiAoY3VycmVudGltYWdlLmlkICE9IHVuZGVmaW5lZCkge1xuXHRcdFx0bGV0IHZpZXdmb29pZCA9IGN1cnJlbnRpbWFnZS52aWV3Zm9vaWQ7XG5cdFx0XHRsZXQgaW1hZ2VpZCA9IGN1cnJlbnRpbWFnZS5pZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGltYWdlaWQgPSAnJztcblx0XHR9XG5cblxuXG5cdFx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcblx0XHR0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb29nZXRjb21tZW50KHZpZXdmb29pZCwgaW1hZ2VpZClcblx0XHRcdC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhjdXJyZW50dmlld2Zvby5pZCk7XG5cdFx0XHRcdHRoaXMudmlld2Zvb2NvbW1lbnRzID0gcmVzdWx0LmRhdGE7XG5cdFx0XHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0fSwgKGVycm9yOiBhbnkpID0+IHtcblx0XHRcdFx0dGhpcy5lcnJvck1zZyA9IGVycm9yO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcInZpZXdmb28gZ2V0IGZhaWw6IFwiICsgZXJyb3IpO1xuXHRcdFx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdH0pO1xuXG4gICAgfVxuXG4gICAgZG9Db21tZW50KCkge1xuXG4gICAgICAgIHZhciBvZmZsaW5ldXNlciA9IHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiB0aGlzLnZpZXdmb29jb21tZW50bmFtZS52YWx1ZSxcbiAgICAgICAgICAgIGVtYWlsOiB0aGlzLnZpZXdmb29jb21tZW50ZW1haWwudmFsdWVcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlWydvZmZsaW5ldXNlciddID0gSlNPTi5zdHJpbmdpZnkob2ZmbGluZXVzZXIpO1xuXG4gICAgICAgIGxldCBjdXJyVmlld2ZvbyA9IHRoaXMuY3VyclZpZXdmb287XG4gICAgICAgIGxldCBjdXJySW1hZ2UgPSB0aGlzLmN1cnJJbWFnZTtcblxuICAgICAgICB0aGlzLmNvbW1lbnRhZGRsb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAvL3RoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgbGV0IGNvbW1lbnRkYXRhID0gdGhpcy52aWV3Zm9vY29tbWVudHRleHQudmFsdWU7XG4gICAgICAgIGxldCBjb21tZW50bmFtZSA9IHRoaXMudmlld2Zvb2NvbW1lbnRuYW1lLnZhbHVlO1xuICAgICAgICBsZXQgY29tbWVudGVtYWlsID0gdGhpcy52aWV3Zm9vY29tbWVudGVtYWlsLnZhbHVlO1xuXG4gICAgICAgIGxldCB1c2VyaWQgPSB0aGlzLmxvZ2luVXNlciAhPSB1bmRlZmluZWQgPyB0aGlzLmxvZ2luVXNlci5pZCA6ICcnO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY3VyclZpZXdmb28pO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJJbWFnZSk7XG5cbiAgICAgICAgaWYgKGN1cnJWaWV3Zm9vICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGV0IHZpZXdmb29pZCA9IGN1cnJWaWV3Zm9vLmlkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHZpZXdmb29pZCA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJJbWFnZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChjdXJySW1hZ2UuaWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZpZXdmb29pZCA9IGN1cnJJbWFnZS52aWV3Zm9vaWQ7XG4gICAgICAgICAgICAgICAgbGV0IGltYWdlaWQgPSBjdXJySW1hZ2UuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgaW1hZ2VpZCA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2codmlld2Zvb2lkKTtcbiAgICAgICAgY29uc29sZS5sb2coaW1hZ2VpZCk7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb2FkZGNvbW1lbnQoJ2NvbW1lbnQnLCB1c2VyaWQsIGNvbW1lbnRkYXRhLCBjb21tZW50bmFtZSwgY29tbWVudGVtYWlsLCB2aWV3Zm9vaWQsIGltYWdlaWQpXG5cdFx0XHQuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcblx0XHRcdFx0dGhpcy5hdXRoU2VydmljZS52aWV3Zm9vZ2V0Y29tbWVudCh2aWV3Zm9vaWQsIGltYWdlaWQpXG5cdFx0XHRcdFx0LnN1YnNjcmliZSgocmVzdWx0MSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHJlc3VsdDEpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy52aWV3Zm9vY29tbWVudHMgPSByZXN1bHQxLmRhdGE7XG5cdFx0XHRcdFx0XHRcdC8vdGhpcy5yZXNldGZvcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdmb29jb21tZW50dGV4dC51cGRhdGVWYWx1ZShcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMudmlld2Zvb2NvbW1lbnQucmVzZXQoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LCAoZXJyb3I6IGFueSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5lcnJvck1zZyA9IGVycm9yO1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJ2aWV3Zm9vIGdldCBmYWlsOiBcIiArIGVycm9yKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy5jb21tZW50YWRkbG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0XHQvL3RoaXMubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0fSwgKGVycm9yOiBhbnkpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJ2aWV3Zm9vIGFkZCBmYWlsOiBcIiArIGVycm9yKTtcblx0XHRcdFx0dGhpcy5jb21tZW50YWRkbG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0XHQvL3RoaXMubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0fSk7XG5cbiAgICB9XG5cbiAgICByZXNldGZvcm0oKSB7XG5cdFx0dGhpcy52aWV3Zm9vY29tbWVudCA9IHRoaXMuYnVpbGRlci5ncm91cCh7XG5cdFx0XHRcInZpZXdmb29jb21tZW50dGV4dFwiOiAnJyxcblx0XHRcdFwidmlld2Zvb2NvbW1lbnRuYW1lXCI6IHRoaXMudmlld2Zvb2NvbW1lbnRuYW1lLFxuXHRcdFx0XCJ2aWV3Zm9vY29tbWVudGVtYWlsXCI6IHRoaXMudmlld2Zvb2NvbW1lbnRlbWFpbFxuICAgICAgICB9KTtcblxuICAgIH1cbn1cbiJdfQ==
