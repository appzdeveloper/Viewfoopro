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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvd2lkZ2V0cy9jb21tZW50bW9kYWxfMS9jb21tZW50bW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxxQkFFSyxlQUFlLENBQUMsQ0FBQTtBQUNyQix1QkFBOEIsaUJBQWlCLENBQUMsQ0FBQTtBQUNoRCxzQkFBMEYsZ0JBQWdCLENBQUMsQ0FBQTtBQUUzRyw2QkFBNEIsNkJBQTZCLENBQUMsQ0FBQTtBQUMxRCxpQ0FBK0IsOEJBQThCLENBQUMsQ0FBQTtBQUM5RCxJQUFPLFNBQVMsV0FBVyxrQkFBa0IsQ0FBQyxDQUFDO0FBTy9DO0lBNkJJLCtCQUFZLElBQVksRUFBVSxtQkFBc0MsRUFDN0QsVUFBc0IsRUFDckIsV0FBd0IsRUFBVSxPQUFvQjtRQUZoQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW1CO1FBQzdELGVBQVUsR0FBVixVQUFVLENBQVk7UUFDckIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFhO1FBdkJsRSxhQUFRLEdBQVcsU0FBUyxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQztRQUMxRCxvQkFBZSxHQUFXLFNBQVMsQ0FBQyxRQUFRLEdBQUcsa0JBQWtCLENBQUM7UUFDM0QsYUFBUSxHQUFZLElBQUksQ0FBQztRQUNoQyxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFHbkMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6Qix1QkFBa0IsR0FBZ0IsSUFBSSxtQkFBVyxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNFLHVCQUFrQixHQUFnQixJQUFJLG1CQUFXLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0Usd0JBQW1CLEdBQWdCLElBQUksbUJBQVcsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsRUFBRSxtQ0FB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QUFDO1FBRWhDLENBQUMsQ0FBQyxDQUFDO0lBRUYsQ0FBQztJQUVELHlDQUFTLEdBQVQ7UUFDRixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ3hDLG9CQUFvQixFQUFFLEVBQUU7WUFDeEIsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjtZQUM3QyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CO1NBQ3pDLENBQUMsQ0FBQztJQUVQLENBQUM7SUF2SkQ7UUFBQyxZQUFLLEVBQUU7OzREQUFBO0lBU1g7UUFBQyxZQUFLLEVBQUU7OzREQUFBO0lBVUw7UUFBQyxZQUFLLEVBQUU7OzBEQUFBO0lBeEVaO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsY0FBYztZQUN4QixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFVBQVUsRUFBRSxDQUFDLGdDQUF3QixFQUFFLHdCQUFlLENBQUM7U0FDMUQsQ0FBQzs7NkJBQUE7SUF3TUYsNEJBQUM7QUFBRCxDQXZNQSxBQXVNQyxJQUFBO0FBdk1ZLDZCQUFxQix3QkF1TWpDLENBQUEiLCJmaWxlIjoiYXBwL3NoYXJlZC93aWRnZXRzL2NvbW1lbnRtb2RhbF8xL2NvbW1lbnRtb2RhbC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZH1cbmZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JzLCBGb3JtQnVpbGRlciwgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVXNlciwgVmlld2ZvbywgQ29udGFpbmVyIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQge0N1c3RvbVZhbGlkYXRvcnN9IGZyb20gJy4uLy4uL3V0aWxzL0N1c3RvbVZhbGlkYXRvcnMnO1xuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uLy4uLy4uL2dsb2JhbHMnKTtcbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdjb21tZW50bW9kYWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnY29tbWVudG1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTLCBDT1JFX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIENvbW1lbnRNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICAvL0BWaWV3Q2hpbGQoJ2ltZ2Jsb2NrJykgaW1nYmxvY2s6IEVsZW1lbnRSZWY7XG5cbiAgICAvL0BJbnB1dCgpIHB1YmxpYyBjdXJyVmlld2Zvbzogc3RyaW5nO1xuICAgIHZpZXdmb29jb21tZW50aWQ6IHN0cmluZztcbiAgICAvL0BJbnB1dCgpIHB1YmxpYyBjb21tZW50dHlwZTogc3RyaW5nO1xuXG4gICAgaW1hZ2VVcmw6IHN0cmluZyA9IG15R2xvYmFscy5pbWFnZVVybCArICcvdXBsb2FkL2dhbGxlcnknO1xuICAgIHByb2ZpbGVpbWFnZVVybDogc3RyaW5nID0gbXlHbG9iYWxzLmltYWdlVXJsICsgJy91cGxvYWQvcHJvZmlsZXMnO1xuICAgIHB1YmxpYyBpc0VuYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgY29tbWVudGFkZGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICB2aWV3Zm9vY29tbWVudHM6IGFueTtcblxuICAgIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHZpZXdmb29jb21tZW50dGV4dDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgdmlld2Zvb2NvbW1lbnRuYW1lOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbChcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICB2aWV3Zm9vY29tbWVudGVtYWlsOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbChcIlwiLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1ZhbGlkYXRvcnMucmVxdWlyZWQsIEN1c3RvbVZhbGlkYXRvcnMuZW1haWxWYWxpZGF0b3JdKSk7XG5cbiAgICB2aWV3Zm9vY29tbWVudDogRm9ybUdyb3VwO1xuICAgIC8vQE91dHB1dCgpIHByaXZhdGUgb25Db250YWluZXJEZWxldGU6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgc2VydmljZVVybDogc3RyaW5nID0gbXlHbG9iYWxzLnNlcnZpY2VVcmw7XG4gICAgaW1hZ2VVcmw6IHN0cmluZyA9IG15R2xvYmFscy5pbWFnZVVybCArICcvdXBsb2FkL2dhbGxlcnkvJztcblxuICAgIGxvZ2luVXNlcjogYW55O1xuICAgIG9mZmxpbmV1c2VyOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcih6b25lOiBOZ1pvbmUsIHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBidWlsZGVyOiBGb3JtQnVpbGRlcikge1xuXG4gICAgICAgIHRoaXMudmlld2Zvb2NvbW1lbnQgPSBidWlsZGVyLmdyb3VwKHtcblx0XHRcdFwidmlld2Zvb2NvbW1lbnR0ZXh0XCI6IHRoaXMudmlld2Zvb2NvbW1lbnR0ZXh0LFxuXHRcdFx0XCJ2aWV3Zm9vY29tbWVudG5hbWVcIjogdGhpcy52aWV3Zm9vY29tbWVudG5hbWUsXG5cdFx0XHRcInZpZXdmb29jb21tZW50ZW1haWxcIjogdGhpcy52aWV3Zm9vY29tbWVudGVtYWlsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubG9naW5Vc2VyID0gbXlHbG9iYWxzLkxvZ2luVXNlcjtcblxuICAgICAgICBpZih3aW5kb3cubG9jYWxTdG9yYWdlWydvZmZsaW5ldXNlciddKSB7XG4gICAgICAgICAgICB0aGlzLm9mZmxpbmV1c2VyID0gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlWydvZmZsaW5ldXNlciddKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG4gICAgQElucHV0KCkgcHJpdmF0ZSBnZXQgY29tbWVudHR5cGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1lbnR0eXBlO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IGNvbW1lbnR0eXBlKHY6IGFueSkge1xuICAgICAgICB0aGlzLl9jb21tZW50dHlwZSA9IHY7XG4gICAgICAgIC8vYWxlcnQoXCJDb21tZW50dHlwZSBzZXQgOiBcIit2KTtcbiAgICAgICAgLy90aGlzLmdldENvbW1lbnQodGhpcy5fY3VyclZpZXdmb28pO1xuICAgIH1cblxuXHRASW5wdXQoKSBwcml2YXRlIGdldCBjdXJyVmlld2ZvbygpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VyclZpZXdmb287XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgY3VyclZpZXdmb28odjogYW55KSB7XG4gICAgICAgIHRoaXMuX2N1cnJWaWV3Zm9vID0gdjtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJWaWV3Zm9vLmlkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5nZXRDb21tZW50KHRoaXMuX2N1cnJWaWV3Zm9vLCAnJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBwcml2YXRlIGdldCBjdXJySW1hZ2UoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJJbWFnZTtcbiAgICB9XG4gICAgcHVibGljIHNldCBjdXJySW1hZ2UodjogYW55KSB7XG4gICAgICAgIHRoaXMuX2N1cnJJbWFnZSA9IHY7XG4gICAgICAgIGlmICh0aGlzLl9jdXJySW1hZ2UuaWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmdldENvbW1lbnQoJycsIHRoaXMuX2N1cnJJbWFnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q29tbWVudChjdXJyZW50dmlld2ZvbzogYW55LCBjdXJyZW50aW1hZ2U6IGFueSkge1xuXG4gICAgICAgIGlmKHRoaXMubG9naW5Vc2VyKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdmb29jb21tZW50bmFtZS51cGRhdGVWYWx1ZSh0aGlzLmxvZ2luVXNlci5maXJzdG5hbWUrXCIgXCIrdGhpcy5sb2dpblVzZXIubGFzdG5hbWUpO1xuXG4gICAgICAgICAgICB0aGlzLnZpZXdmb29jb21tZW50ZW1haWwudXBkYXRlVmFsdWUodGhpcy5sb2dpblVzZXIuZW1haWwpO1xuICAgICAgICB9IGVsc2UgaWYodGhpcy5vZmZsaW5ldXNlcikge1xuICAgICAgICAgICAgdGhpcy52aWV3Zm9vY29tbWVudG5hbWUudXBkYXRlVmFsdWUodGhpcy5vZmZsaW5ldXNlci51c2VybmFtZSk7XG4gICAgICAgICAgICB0aGlzLnZpZXdmb29jb21tZW50ZW1haWwudXBkYXRlVmFsdWUodGhpcy5vZmZsaW5ldXNlci5lbWFpbCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9cblxuXHRcdHRoaXMudmlld2Zvb2NvbW1lbnRzID0gW107XG5cblx0XHRpZiAoY3VycmVudHZpZXdmb28uaWQgIT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRsZXQgdmlld2Zvb2lkID0gY3VycmVudHZpZXdmb28uaWQ7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IHZpZXdmb29pZCA9ICcnO1xuXHRcdH1cblxuXHRcdGlmIChjdXJyZW50aW1hZ2UuaWQgIT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRsZXQgdmlld2Zvb2lkID0gY3VycmVudGltYWdlLnZpZXdmb29pZDtcblx0XHRcdGxldCBpbWFnZWlkID0gY3VycmVudGltYWdlLmlkO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgaW1hZ2VpZCA9ICcnO1xuXHRcdH1cblxuXG5cblx0XHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXHRcdHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb2dldGNvbW1lbnQodmlld2Zvb2lkLCBpbWFnZWlkKVxuXHRcdFx0LnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGN1cnJlbnR2aWV3Zm9vLmlkKTtcblx0XHRcdFx0dGhpcy52aWV3Zm9vY29tbWVudHMgPSByZXN1bHQuZGF0YTtcblx0XHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR9LCAoZXJyb3I6IGFueSkgPT4ge1xuXHRcdFx0XHR0aGlzLmVycm9yTXNnID0gZXJyb3I7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwidmlld2ZvbyBnZXQgZmFpbDogXCIgKyBlcnJvcik7XG5cdFx0XHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0fSk7XG5cbiAgICB9XG5cbiAgICBkb0NvbW1lbnQoKSB7XG5cbiAgICAgICAgdmFyIG9mZmxpbmV1c2VyID0ge1xuICAgICAgICAgICAgdXNlcm5hbWU6IHRoaXMudmlld2Zvb2NvbW1lbnRuYW1lLnZhbHVlLFxuICAgICAgICAgICAgZW1haWw6IHRoaXMudmlld2Zvb2NvbW1lbnRlbWFpbC52YWx1ZVxuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ29mZmxpbmV1c2VyJ10gPSBKU09OLnN0cmluZ2lmeShvZmZsaW5ldXNlcik7XG5cbiAgICAgICAgbGV0IGN1cnJWaWV3Zm9vID0gdGhpcy5jdXJyVmlld2ZvbztcbiAgICAgICAgbGV0IGN1cnJJbWFnZSA9IHRoaXMuY3VyckltYWdlO1xuXG4gICAgICAgIHRoaXMuY29tbWVudGFkZGxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICBsZXQgY29tbWVudGRhdGEgPSB0aGlzLnZpZXdmb29jb21tZW50dGV4dC52YWx1ZTtcbiAgICAgICAgbGV0IGNvbW1lbnRuYW1lID0gdGhpcy52aWV3Zm9vY29tbWVudG5hbWUudmFsdWU7XG4gICAgICAgIGxldCBjb21tZW50ZW1haWwgPSB0aGlzLnZpZXdmb29jb21tZW50ZW1haWwudmFsdWU7XG5cbiAgICAgICAgbGV0IHVzZXJpZCA9IHRoaXMubG9naW5Vc2VyICE9IHVuZGVmaW5lZCA/IHRoaXMubG9naW5Vc2VyLmlkIDogJyc7XG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyVmlld2Zvbyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY3VyckltYWdlKTtcblxuICAgICAgICBpZiAoY3VyclZpZXdmb28gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgdmlld2Zvb2lkID0gY3VyclZpZXdmb28uaWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgdmlld2Zvb2lkID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VyckltYWdlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGN1cnJJbWFnZS5pZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmlld2Zvb2lkID0gY3VyckltYWdlLnZpZXdmb29pZDtcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2VpZCA9IGN1cnJJbWFnZS5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBpbWFnZWlkID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyh2aWV3Zm9vaWQpO1xuICAgICAgICBjb25zb2xlLmxvZyhpbWFnZWlkKTtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS52aWV3Zm9vYWRkY29tbWVudCgnY29tbWVudCcsIHVzZXJpZCwgY29tbWVudGRhdGEsIGNvbW1lbnRuYW1lLCBjb21tZW50ZW1haWwsIHZpZXdmb29pZCwgaW1hZ2VpZClcblx0XHRcdC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHR0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb29nZXRjb21tZW50KHZpZXdmb29pZCwgaW1hZ2VpZClcblx0XHRcdFx0XHQuc3Vic2NyaWJlKChyZXN1bHQxKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAocmVzdWx0MSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnZpZXdmb29jb21tZW50cyA9IHJlc3VsdDEuZGF0YTtcblx0XHRcdFx0XHRcdFx0Ly90aGlzLnJlc2V0Zm9ybSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlld2Zvb2NvbW1lbnR0ZXh0LnVwZGF0ZVZhbHVlKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy52aWV3Zm9vY29tbWVudC5yZXNldCgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sIChlcnJvcjogYW55KSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLmVycm9yTXNnID0gZXJyb3I7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInZpZXdmb28gZ2V0IGZhaWw6IFwiICsgZXJyb3IpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR0aGlzLmNvbW1lbnRhZGRsb2FkaW5nID0gZmFsc2U7XG5cdFx0XHRcdC8vdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR9LCAoZXJyb3I6IGFueSkgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcInZpZXdmb28gYWRkIGZhaWw6IFwiICsgZXJyb3IpO1xuXHRcdFx0XHR0aGlzLmNvbW1lbnRhZGRsb2FkaW5nID0gZmFsc2U7XG5cdFx0XHRcdC8vdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR9KTtcblxuICAgIH1cblxuICAgIHJlc2V0Zm9ybSgpIHtcblx0XHR0aGlzLnZpZXdmb29jb21tZW50ID0gdGhpcy5idWlsZGVyLmdyb3VwKHtcblx0XHRcdFwidmlld2Zvb2NvbW1lbnR0ZXh0XCI6ICcnLFxuXHRcdFx0XCJ2aWV3Zm9vY29tbWVudG5hbWVcIjogdGhpcy52aWV3Zm9vY29tbWVudG5hbWUsXG5cdFx0XHRcInZpZXdmb29jb21tZW50ZW1haWxcIjogdGhpcy52aWV3Zm9vY29tbWVudGVtYWlsXG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuIl19
