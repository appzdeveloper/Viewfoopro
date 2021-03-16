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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvd2lkZ2V0cy9jb21tZW50bW9kYWwvY29tbWVudG1vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EscUJBRUssZUFBZSxDQUFDLENBQUE7QUFDckIsdUJBQThCLGlCQUFpQixDQUFDLENBQUE7QUFDaEQsc0JBQTBGLGdCQUFnQixDQUFDLENBQUE7QUFFM0csNkJBQTRCLDZCQUE2QixDQUFDLENBQUE7QUFDMUQsaUNBQStCLDhCQUE4QixDQUFDLENBQUE7QUFDOUQsSUFBTyxTQUFTLFdBQVcsa0JBQWtCLENBQUMsQ0FBQztBQU8vQztJQTZCSSwrQkFBWSxJQUFZLEVBQVUsbUJBQXNDLEVBQzdELFVBQXNCLEVBQ3JCLFdBQXdCLEVBQVUsT0FBb0I7UUFGaEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFtQjtRQUM3RCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3JCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBYTtRQXZCbEUsYUFBUSxHQUFXLFNBQVMsQ0FBQyxRQUFRLEdBQUcsaUJBQWlCLENBQUM7UUFDMUQsb0JBQWUsR0FBVyxTQUFTLENBQUMsUUFBUSxHQUFHLGtCQUFrQixDQUFDO1FBQzNELGFBQVEsR0FBWSxJQUFJLENBQUM7UUFDaEMsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBR25DLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFFekIsdUJBQWtCLEdBQWdCLElBQUksbUJBQVcsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRSx1QkFBa0IsR0FBZ0IsSUFBSSxtQkFBVyxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNFLHdCQUFtQixHQUFnQixJQUFJLG1CQUFXLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsa0JBQVUsQ0FBQyxRQUFRLEVBQUUsbUNBQWdC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QztRQUVoQyxDQUFDLENBQUMsQ0FBQztJQUVGLENBQUM7SUFFRCx5Q0FBUyxHQUFUO1FBQ0YsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUN4QyxvQkFBb0IsRUFBRSxFQUFFO1lBQ3hCLG9CQUFvQixFQUFFLElBQUksQ0FBQyxrQkFBa0I7WUFDN0MscUJBQXFCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQjtTQUN6QyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBdkpEO1FBQUMsWUFBSyxFQUFFOzs0REFBQTtJQVNYO1FBQUMsWUFBSyxFQUFFOzs0REFBQTtJQVVMO1FBQUMsWUFBSyxFQUFFOzswREFBQTtJQXhFWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxVQUFVLEVBQUUsQ0FBQyxnQ0FBd0IsRUFBRSx3QkFBZSxDQUFDO1NBQzFELENBQUM7OzZCQUFBO0lBd01GLDRCQUFDO0FBQUQsQ0F2TUEsQUF1TUMsSUFBQTtBQXZNWSw2QkFBcUIsd0JBdU1qQyxDQUFBIiwiZmlsZSI6ImFwcC9zaGFyZWQvd2lkZ2V0cy9jb21tZW50bW9kYWwvY29tbWVudG1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgTmdab25lLCBJbnB1dCwgT3V0cHV0LCBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlLCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0NoaWxkfVxuZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NPUkVfRElSRUNUSVZFU30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMsIEZvcm1CdWlsZGVyLCBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBVc2VyLCBWaWV3Zm9vLCBDb250YWluZXIgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7Q3VzdG9tVmFsaWRhdG9yc30gZnJvbSAnLi4vLi4vdXRpbHMvQ3VzdG9tVmFsaWRhdG9ycyc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vLi4vLi4vZ2xvYmFscycpO1xuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2NvbW1lbnRtb2RhbCcsXG4gICAgdGVtcGxhdGVVcmw6ICdjb21tZW50bW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMsIENPUkVfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgQ29tbWVudE1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIC8vQFZpZXdDaGlsZCgnaW1nYmxvY2snKSBpbWdibG9jazogRWxlbWVudFJlZjtcblxuICAgIC8vQElucHV0KCkgcHVibGljIGN1cnJWaWV3Zm9vOiBzdHJpbmc7XG4gICAgdmlld2Zvb2NvbW1lbnRpZDogc3RyaW5nO1xuICAgIC8vQElucHV0KCkgcHVibGljIGNvbW1lbnR0eXBlOiBzdHJpbmc7XG5cbiAgICBpbWFnZVVybDogc3RyaW5nID0gbXlHbG9iYWxzLmltYWdlVXJsICsgJy91cGxvYWQvZ2FsbGVyeSc7XG4gICAgcHJvZmlsZWltYWdlVXJsOiBzdHJpbmcgPSBteUdsb2JhbHMuaW1hZ2VVcmwgKyAnL3VwbG9hZC9wcm9maWxlcyc7XG4gICAgcHVibGljIGlzRW5hYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBjb21tZW50YWRkbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHZpZXdmb29jb21tZW50czogYW55O1xuXG4gICAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgdmlld2Zvb2NvbW1lbnR0ZXh0OiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbChcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICB2aWV3Zm9vY29tbWVudG5hbWU6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKFwiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgIHZpZXdmb29jb21tZW50ZW1haWw6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKFwiXCIsIFZhbGlkYXRvcnMuY29tcG9zZShbVmFsaWRhdG9ycy5yZXF1aXJlZCwgQ3VzdG9tVmFsaWRhdG9ycy5lbWFpbFZhbGlkYXRvcl0pKTtcblxuICAgIHZpZXdmb29jb21tZW50OiBGb3JtR3JvdXA7XG4gICAgLy9AT3V0cHV0KCkgcHJpdmF0ZSBvbkNvbnRhaW5lckRlbGV0ZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBzZXJ2aWNlVXJsOiBzdHJpbmcgPSBteUdsb2JhbHMuc2VydmljZVVybDtcbiAgICBpbWFnZVVybDogc3RyaW5nID0gbXlHbG9iYWxzLmltYWdlVXJsICsgJy91cGxvYWQvZ2FsbGVyeS8nO1xuXG4gICAgbG9naW5Vc2VyOiBhbnk7XG4gICAgb2ZmbGluZXVzZXI6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIGJ1aWxkZXI6IEZvcm1CdWlsZGVyKSB7XG5cbiAgICAgICAgdGhpcy52aWV3Zm9vY29tbWVudCA9IGJ1aWxkZXIuZ3JvdXAoe1xuXHRcdFx0XCJ2aWV3Zm9vY29tbWVudHRleHRcIjogdGhpcy52aWV3Zm9vY29tbWVudHRleHQsXG5cdFx0XHRcInZpZXdmb29jb21tZW50bmFtZVwiOiB0aGlzLnZpZXdmb29jb21tZW50bmFtZSxcblx0XHRcdFwidmlld2Zvb2NvbW1lbnRlbWFpbFwiOiB0aGlzLnZpZXdmb29jb21tZW50ZW1haWxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5sb2dpblVzZXIgPSBteUdsb2JhbHMuTG9naW5Vc2VyO1xuXG4gICAgICAgIGlmKHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ29mZmxpbmV1c2VyJ10pIHtcbiAgICAgICAgICAgIHRoaXMub2ZmbGluZXVzZXIgPSBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ29mZmxpbmV1c2VyJ10pO1xuICAgICAgICB9XG5cblxuICAgIH1cbiAgICBASW5wdXQoKSBwcml2YXRlIGdldCBjb21tZW50dHlwZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWVudHR5cGU7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgY29tbWVudHR5cGUodjogYW55KSB7XG4gICAgICAgIHRoaXMuX2NvbW1lbnR0eXBlID0gdjtcbiAgICAgICAgLy9hbGVydChcIkNvbW1lbnR0eXBlIHNldCA6IFwiK3YpO1xuICAgICAgICAvL3RoaXMuZ2V0Q29tbWVudCh0aGlzLl9jdXJyVmlld2Zvbyk7XG4gICAgfVxuXG5cdEBJbnB1dCgpIHByaXZhdGUgZ2V0IGN1cnJWaWV3Zm9vKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyVmlld2ZvbztcbiAgICB9XG4gICAgcHVibGljIHNldCBjdXJyVmlld2Zvbyh2OiBhbnkpIHtcbiAgICAgICAgdGhpcy5fY3VyclZpZXdmb28gPSB2O1xuICAgICAgICBpZiAodGhpcy5fY3VyclZpZXdmb28uaWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmdldENvbW1lbnQodGhpcy5fY3VyclZpZXdmb28sICcnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIHByaXZhdGUgZ2V0IGN1cnJJbWFnZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VyckltYWdlO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IGN1cnJJbWFnZSh2OiBhbnkpIHtcbiAgICAgICAgdGhpcy5fY3VyckltYWdlID0gdjtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJJbWFnZS5pZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tbWVudCgnJywgdGhpcy5fY3VyckltYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB9XG5cbiAgICBnZXRDb21tZW50KGN1cnJlbnR2aWV3Zm9vOiBhbnksIGN1cnJlbnRpbWFnZTogYW55KSB7XG5cbiAgICAgICAgaWYodGhpcy5sb2dpblVzZXIpIHtcbiAgICAgICAgICAgIHRoaXMudmlld2Zvb2NvbW1lbnRuYW1lLnVwZGF0ZVZhbHVlKHRoaXMubG9naW5Vc2VyLmZpcnN0bmFtZStcIiBcIit0aGlzLmxvZ2luVXNlci5sYXN0bmFtZSk7XG5cbiAgICAgICAgICAgIHRoaXMudmlld2Zvb2NvbW1lbnRlbWFpbC51cGRhdGVWYWx1ZSh0aGlzLmxvZ2luVXNlci5lbWFpbCk7XG4gICAgICAgIH0gZWxzZSBpZih0aGlzLm9mZmxpbmV1c2VyKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdmb29jb21tZW50bmFtZS51cGRhdGVWYWx1ZSh0aGlzLm9mZmxpbmV1c2VyLnVzZXJuYW1lKTtcbiAgICAgICAgICAgIHRoaXMudmlld2Zvb2NvbW1lbnRlbWFpbC51cGRhdGVWYWx1ZSh0aGlzLm9mZmxpbmV1c2VyLmVtYWlsKTtcbiAgICAgICAgfVxuICAgICAgICAvL1xuXG5cdFx0dGhpcy52aWV3Zm9vY29tbWVudHMgPSBbXTtcblxuXHRcdGlmIChjdXJyZW50dmlld2Zvby5pZCAhPSB1bmRlZmluZWQpIHtcblx0XHRcdGxldCB2aWV3Zm9vaWQgPSBjdXJyZW50dmlld2Zvby5pZDtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgdmlld2Zvb2lkID0gJyc7XG5cdFx0fVxuXG5cdFx0aWYgKGN1cnJlbnRpbWFnZS5pZCAhPSB1bmRlZmluZWQpIHtcblx0XHRcdGxldCB2aWV3Zm9vaWQgPSBjdXJyZW50aW1hZ2Uudmlld2Zvb2lkO1xuXHRcdFx0bGV0IGltYWdlaWQgPSBjdXJyZW50aW1hZ2UuaWQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBpbWFnZWlkID0gJyc7XG5cdFx0fVxuXG5cblxuXHRcdHRoaXMubG9hZGluZyA9IHRydWU7XG5cdFx0dGhpcy5hdXRoU2VydmljZS52aWV3Zm9vZ2V0Y29tbWVudCh2aWV3Zm9vaWQsIGltYWdlaWQpXG5cdFx0XHQuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2coY3VycmVudHZpZXdmb28uaWQpO1xuXHRcdFx0XHR0aGlzLnZpZXdmb29jb21tZW50cyA9IHJlc3VsdC5kYXRhO1xuXHRcdFx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdH0sIChlcnJvcjogYW55KSA9PiB7XG5cdFx0XHRcdHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJ2aWV3Zm9vIGdldCBmYWlsOiBcIiArIGVycm9yKTtcblx0XHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR9KTtcblxuICAgIH1cblxuICAgIGRvQ29tbWVudCgpIHtcblxuICAgICAgICB2YXIgb2ZmbGluZXVzZXIgPSB7XG4gICAgICAgICAgICB1c2VybmFtZTogdGhpcy52aWV3Zm9vY29tbWVudG5hbWUudmFsdWUsXG4gICAgICAgICAgICBlbWFpbDogdGhpcy52aWV3Zm9vY29tbWVudGVtYWlsLnZhbHVlXG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZVsnb2ZmbGluZXVzZXInXSA9IEpTT04uc3RyaW5naWZ5KG9mZmxpbmV1c2VyKTtcblxuICAgICAgICBsZXQgY3VyclZpZXdmb28gPSB0aGlzLmN1cnJWaWV3Zm9vO1xuICAgICAgICBsZXQgY3VyckltYWdlID0gdGhpcy5jdXJySW1hZ2U7XG5cbiAgICAgICAgdGhpcy5jb21tZW50YWRkbG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgLy90aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIGxldCBjb21tZW50ZGF0YSA9IHRoaXMudmlld2Zvb2NvbW1lbnR0ZXh0LnZhbHVlO1xuICAgICAgICBsZXQgY29tbWVudG5hbWUgPSB0aGlzLnZpZXdmb29jb21tZW50bmFtZS52YWx1ZTtcbiAgICAgICAgbGV0IGNvbW1lbnRlbWFpbCA9IHRoaXMudmlld2Zvb2NvbW1lbnRlbWFpbC52YWx1ZTtcblxuICAgICAgICBsZXQgdXNlcmlkID0gdGhpcy5sb2dpblVzZXIgIT0gdW5kZWZpbmVkID8gdGhpcy5sb2dpblVzZXIuaWQgOiAnJztcblxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJWaWV3Zm9vKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jdXJySW1hZ2UpO1xuXG4gICAgICAgIGlmIChjdXJyVmlld2ZvbyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCB2aWV3Zm9vaWQgPSBjdXJyVmlld2Zvby5pZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB2aWV3Zm9vaWQgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJySW1hZ2UgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoY3VyckltYWdlLmlkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGxldCB2aWV3Zm9vaWQgPSBjdXJySW1hZ2Uudmlld2Zvb2lkO1xuICAgICAgICAgICAgICAgIGxldCBpbWFnZWlkID0gY3VyckltYWdlLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGltYWdlaWQgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHZpZXdmb29pZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGltYWdlaWQpO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb29hZGRjb21tZW50KCdjb21tZW50JywgdXNlcmlkLCBjb21tZW50ZGF0YSwgY29tbWVudG5hbWUsIGNvbW1lbnRlbWFpbCwgdmlld2Zvb2lkLCBpbWFnZWlkKVxuXHRcdFx0LnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cdFx0XHRcdHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb2dldGNvbW1lbnQodmlld2Zvb2lkLCBpbWFnZWlkKVxuXHRcdFx0XHRcdC5zdWJzY3JpYmUoKHJlc3VsdDEpID0+IHtcblx0XHRcdFx0XHRcdGlmIChyZXN1bHQxKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMudmlld2Zvb2NvbW1lbnRzID0gcmVzdWx0MS5kYXRhO1xuXHRcdFx0XHRcdFx0XHQvL3RoaXMucmVzZXRmb3JtKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Zm9vY29tbWVudHRleHQudXBkYXRlVmFsdWUoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLnZpZXdmb29jb21tZW50LnJlc2V0KCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSwgKGVycm9yOiBhbnkpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwidmlld2ZvbyBnZXQgZmFpbDogXCIgKyBlcnJvcik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdHRoaXMuY29tbWVudGFkZGxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdFx0Ly90aGlzLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdH0sIChlcnJvcjogYW55KSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwidmlld2ZvbyBhZGQgZmFpbDogXCIgKyBlcnJvcik7XG5cdFx0XHRcdHRoaXMuY29tbWVudGFkZGxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdFx0Ly90aGlzLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdH0pO1xuXG4gICAgfVxuXG4gICAgcmVzZXRmb3JtKCkge1xuXHRcdHRoaXMudmlld2Zvb2NvbW1lbnQgPSB0aGlzLmJ1aWxkZXIuZ3JvdXAoe1xuXHRcdFx0XCJ2aWV3Zm9vY29tbWVudHRleHRcIjogJycsXG5cdFx0XHRcInZpZXdmb29jb21tZW50bmFtZVwiOiB0aGlzLnZpZXdmb29jb21tZW50bmFtZSxcblx0XHRcdFwidmlld2Zvb2NvbW1lbnRlbWFpbFwiOiB0aGlzLnZpZXdmb29jb21tZW50ZW1haWxcbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG4iXX0=
