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
var forms_1 = require('@angular/forms');
var myGlobals = require('../globals');
var CustomValidators_1 = require('../shared/utils/CustomValidators');
var ViewProfileComponent = (function () {
    function ViewProfileComponent(builder, _router, authService) {
        this.builder = builder;
        this._router = _router;
        this.authService = authService;
        this.invaliddomain = true;
        this.invalid = false;
        this.loading = false;
        this.cropperloading = false;
        this.noprofile = false;
        this.filechanged = false;
        this.active = true;
        this.statusCode = 200;
        this.createForm();
        console.log("Is MyGlobal user > " + myGlobals.LoginUser);
    }
    ViewProfileComponent.prototype.createForm = function () {
        this.name = new forms_1.FormControl('', forms_1.Validators.required);
        this.email = new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, CustomValidators_1.CustomValidators.emailValidator]));
        this.subdomain = new forms_1.FormControl('', forms_1.Validators.required);
        this.timezone = new forms_1.FormControl('');
        this.local = new forms_1.FormControl('');
        this.language = new forms_1.FormControl('');
        this.currency = new forms_1.FormControl('');
        this.profileform = this.builder.group({
            name: this.name,
            email: this.email,
            subdomain: this.subdomain,
            timezone: this.timezone,
            local: this.local,
            language: this.language,
            currency: this.currency
        });
    };
    ViewProfileComponent.prototype.savecropimage = function () {
        var _this = this;
        var $image = $('#image');
        var cropBoxData;
        var canvasData;
        var croppedcanvas;
        cropBoxData = $image.cropper('getCropBoxData');
        canvasData = $image.cropper('getCanvasData');
        croppedcanvas = $image.cropper('getCroppedCanvas');
        this.filename = croppedcanvas.toDataURL("image/png");
        this.loginUser = myGlobals.LoginUser;
        this.authService.profilebase64(this.filename, this.loginUser.id)
            .subscribe(function (result) {
            if (result) {
                _this.url = result.profileData.ImageUrl;
                _this.filechanged = true;
                setTimeout(function () {
                    this.filename = this.url;
                }, 5000);
            }
            else {
                _this.filename = "uploads/user_icon.png";
            }
            _this.loading = false;
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("profile image upload fail: " + error);
        });
        $image.cropper('destroy');
        $("#frmBrowse")[0].reset();
        $('#myModal').modal('hide');
    };
    ViewProfileComponent.prototype.onCropperPopupDone = function () {
        var _this = this;
        var $image = this.cropAvtar.$img;
        var croppedcanvas = $image.cropper('getCroppedCanvas');
        this.filename = croppedcanvas.toDataURL("image/png");
        this.loginUser = myGlobals.LoginUser;
        this.cropperloading = true;
        this.authService.profilebase64(this.filename, this.loginUser.id)
            .subscribe(function (result) {
            if (result.data.profileimage) {
                var self = _this;
                setTimeout(function () {
                    self.filename = myGlobals.imageUrl + "/upload/profiles/" + result.data.profileimage;
                    myGlobals.LoginUser.profileimage = result.data.profileimage;
                    window.localStorage['user'] = JSON.stringify(myGlobals.LoginUser);
                    self.authService.emitProfileChange();
                }, 3000);
            }
            else {
                _this.filename = "uploads/user_icon.png";
            }
            _this.loading = false;
            $('#avatar-modal').modal('hide');
            _this.cropperloading = false;
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("profile image upload fail: " + error);
            _this.cropperloading = false;
        });
    };
    ViewProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cropAvtar = new CropAvatar($('#crop-avatar'));
        ;
        this.loginUser = myGlobals.LoginUser;
        if (this.loginUser != null) {
            this.authService.viewprofile(this.loginUser.id)
                .subscribe(function (result) {
                if (result) {
                    console.log(result.data);
                    _this.profileform.controls['name'].updateValue(result.data.firstname + " " + result.data.lastname);
                    _this.profileform.controls['email'].updateValue(result.data.email);
                    _this.profileform.controls['subdomain'].updateValue(result.data.subdomain + ".viewfoo.pro");
                    _this.profileform.controls['timezone'].updateValue(result.data.timezone);
                    _this.profileform.controls['local'].updateValue(result.data.local);
                    _this.profileform.controls['language'].updateValue(result.data.language);
                    _this.profileform.controls['currency'].updateValue(result.data.currency);
                    if (result.data.profileimage)
                        _this.filename = myGlobals.imageUrl + "/upload/profiles/" + result.data.profileimage;
                    else
                        _this.filename = "uploads/user_icon.png";
                }
            }, function (error) {
                _this.errorMsg = error;
                _this.loading = false;
                console.log(" view profile fail: " + error);
            });
        }
    };
    ViewProfileComponent.prototype.editprofile = function () {
        var _this = this;
        var formdata = this.profileform.value;
        formdata["id"] = this.loginUser.id;
        console.log(formdata);
        this.authService.editprofile(formdata)
            .subscribe(function (result) {
            myGlobals.LoginUser.firstname = result.data.firstname;
            myGlobals.LoginUser.lastname = result.data.lastname;
            myGlobals.LoginUser.email = result.data.email;
            myGlobals.LoginUser.subdomain = result.data.subdomain;
            myGlobals.LoginUser.timezone = result.data.timezone;
            myGlobals.LoginUser.local = result.data.local;
            myGlobals.LoginUser.currency = result.data.currency;
            myGlobals.LoginUser.profileimage = result.data.profileimage;
            window.localStorage['user'] = JSON.stringify(myGlobals.LoginUser);
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log(" view profile fail: " + error);
        });
    };
    ViewProfileComponent.prototype.chksubdomain = function (subdomain) {
        var _this = this;
        this.invaliddomain = false;
        if (subdomain.length != 0) {
            var n = subdomain.indexOf(".viewfoo.pro");
            var sub = subdomain.substr(0, n);
            this.authService.chksubdomain(sub)
                .subscribe(function (result) {
                _this.invaliddomain = false;
            }, function (error) {
                _this.domainmessage = error;
                _this.invaliddomain = true;
                console.log("subdomain  fail: " + error);
            });
        }
    };
    ViewProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'viewprofile',
            templateUrl: 'viewprofile.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, auth_service_1.AuthService])
    ], ViewProfileComponent);
    return ViewProfileComponent;
}());
exports.ViewProfileComponent = ViewProfileComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC92aWV3cHJvZmlsZS92aWV3cHJvZmlsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFzRCxlQUFlLENBQUMsQ0FBQTtBQUN0RSx1QkFBd0MsaUJBQWlCLENBQUMsQ0FBQTtBQUMxRCw2QkFBNEIsaUNBQWlDLENBQUMsQ0FBQTtBQUc5RCxzQkFDSyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3RCLElBQU8sU0FBUyxXQUFXLFlBQVksQ0FBQyxDQUFDO0FBQ3pDLGlDQUErQixrQ0FBa0MsQ0FBQyxDQUFBO0FBUWxFO0lBNkJJLDhCQUFvQixPQUFvQixFQUFVLE9BQWUsRUFBVSxXQUF3QjtRQUEvRSxZQUFPLEdBQVAsT0FBTyxDQUFhO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBZG5HLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBQzlCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxjQUFTLEdBQVcsS0FBSyxDQUFDO1FBQzFCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBSTdCLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsZUFBVSxHQUFXLEdBQUcsQ0FBQztRQU1yQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFN0QsQ0FBQztJQUNELHlDQUFVLEdBQVY7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksbUJBQVcsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksbUJBQVcsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxrQkFBVSxD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QUN2QixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFVBQVUsRUFBRSxDQUFDLGdDQUF3QixFQUFFLDBCQUFpQixDQUFDO1NBQzVELENBQUM7OzRCQUFBO0lBbU9GLDJCQUFDO0FBQUQsQ0FqT0EsQUFpT0MsSUFBQTtBQWpPWSw0QkFBb0IsdUJBaU9oQyxDQUFBIiwiZmlsZSI6ImFwcC92aWV3cHJvZmlsZS92aWV3cHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBFdmVudEVtaXR0ZXIsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLCBSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbi8vaW1wb3J0IHtGT1JNX0RJUkVDVElWRVMsIEZvcm1CdWlsZGVyLCBDb250cm9sLCBDb250cm9sR3JvdXAsIFZhbGlkYXRvcnMsIG5nZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycywgRm9ybUJ1aWxkZXIsIFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUyB9XG5mcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vZ2xvYmFscycpO1xuaW1wb3J0IHtDdXN0b21WYWxpZGF0b3JzfSBmcm9tICcuLi9zaGFyZWQvdXRpbHMvQ3VzdG9tVmFsaWRhdG9ycyc7XG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAndmlld3Byb2ZpbGUnLFxuICAgIHRlbXBsYXRlVXJsOiAndmlld3Byb2ZpbGUuY29tcG9uZW50Lmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMsIFJPVVRFUl9ESVJFQ1RJVkVTXVxufSlcblxuZXhwb3J0IGNsYXNzIFZpZXdQcm9maWxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGxvZ2luVXNlcjogVXNlcjtcblxuICAgIG5hbWU6IEZvcm1Db250cm9sO1xuICAgIHN1YmRvbWFpbjogRm9ybUNvbnRyb2w7XG4gICAgZW1haWw6IEZvcm1Db250cm9sO1xuICAgIHRpbWV6b25lOiBGb3JtQ29udHJvbDtcbiAgICBsb2NhbDogRm9ybUNvbnRyb2w7XG4gICAgbGFuZ3VhZ2U6IEZvcm1Db250cm9sO1xuICAgIGN1cnJlbmN5OiBGb3JtQ29udHJvbDtcblxuICAgIHByb2ZpbGVmb3JtOiBGb3JtR3JvdXA7XG4gICAgcHJvZmlsZWRhdGE6IHByb2ZpbGVEYXRhO1xuICAgIHB1YmxpYyBkb21haW5tZXNzYWdlOnN0cmluZztcbiAgICBpbnZhbGlkZG9tYWluOiBib29sZWFuID0gdHJ1ZTtcbiAgICBpbnZhbGlkOiBib29sZWFuID0gZmFsc2U7XG4gICAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGNyb3BwZXJsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgbm9wcm9maWxlOmJvb2xlYW4gPSBmYWxzZTtcbiAgICBmaWxlY2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgICBwdWJsaWMgdXJsOiBzdHJpbmc7XG4gICAgYWN0aXZlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBzdGF0dXNDb2RlOiBzdHJpbmcgPSAyMDA7XG5cbiAgICBjcm9wQXZ0YXI6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYnVpbGRlcjogRm9ybUJ1aWxkZXIsIHByaXZhdGUgX3JvdXRlcjogUm91dGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xuXG4gICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIklzIE15R2xvYmFsIHVzZXIgPiBcIiArIG15R2xvYmFscy5Mb2dpblVzZXIpO1xuXG4gICAgfVxuICAgIGNyZWF0ZUZvcm0oKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgICAgIHRoaXMuZW1haWwgPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMuY29tcG9zZShbVmFsaWRhdG9ycy5yZXF1aXJlZCwgQ3VzdG9tVmFsaWRhdG9ycy5lbWFpbFZhbGlkYXRvcl0pKTtcbiAgICAgICAgdGhpcy5zdWJkb21haW4gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgICB0aGlzLnRpbWV6b25lID0gbmV3IEZvcm1Db250cm9sKCcnLCApO1xuICAgICAgICB0aGlzLmxvY2FsID0gbmV3IEZvcm1Db250cm9sKCcnLCApO1xuICAgICAgICB0aGlzLmxhbmd1YWdlID0gbmV3IEZvcm1Db250cm9sKCcnLCApO1xuICAgICAgICB0aGlzLmN1cnJlbmN5ID0gbmV3IEZvcm1Db250cm9sKCcnLCApO1xuICAgICAgICB0aGlzLnByb2ZpbGVmb3JtID0gdGhpcy5idWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgIGVtYWlsOiB0aGlzLmVtYWlsLFxuICAgICAgICAgICAgc3ViZG9tYWluOiB0aGlzLnN1YmRvbWFpbixcbiAgICAgICAgICAgIHRpbWV6b25lOiB0aGlzLnRpbWV6b25lLFxuICAgICAgICAgICAgbG9jYWw6IHRoaXMubG9jYWwsXG4gICAgICAgICAgICBsYW5ndWFnZTogdGhpcy5sYW5ndWFnZSxcbiAgICAgICAgICAgIGN1cnJlbmN5OiB0aGlzLmN1cnJlbmN5XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBzYXZlY3JvcGltYWdlKCkge1xuICAgICAgICB2YXIgJGltYWdlID0gJCgnI2ltYWdlJyk7XG4gICAgICAgIHZhciBjcm9wQm94RGF0YTtcbiAgICAgICAgdmFyIGNhbnZhc0RhdGE7XG4gICAgICAgIHZhciBjcm9wcGVkY2FudmFzO1xuICAgICAgICBjcm9wQm94RGF0YSA9ICRpbWFnZS5jcm9wcGVyKCdnZXRDcm9wQm94RGF0YScpO1xuICAgICAgICBjYW52YXNEYXRhID0gJGltYWdlLmNyb3BwZXIoJ2dldENhbnZhc0RhdGEnKTtcbiAgICAgICAgY3JvcHBlZGNhbnZhcyA9ICRpbWFnZS5jcm9wcGVyKCdnZXRDcm9wcGVkQ2FudmFzJyk7XG4gICAgICAgIC8vY29uc29sZS5sb2coY3JvcHBlZGNhbnZhcyk7XG4gICAgICAgIHRoaXMuZmlsZW5hbWUgPSBjcm9wcGVkY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmZpbGVuYW1lKTtcbiAgICAgICAgdGhpcy5sb2dpblVzZXIgPSBteUdsb2JhbHMuTG9naW5Vc2VyO1xuXG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UucHJvZmlsZWJhc2U2NCh0aGlzLmZpbGVuYW1lLCB0aGlzLmxvZ2luVXNlci5pZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3VsdC5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cmwgPSByZXN1bHQucHJvZmlsZURhdGEuSW1hZ2VVcmw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZWNoYW5nZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGVuYW1lID0gdGhpcy51cmw7XG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMDApO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZmlsZW5hbWUgPSB0aGlzLnVybDtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmZpbGVuYW1lID1cImh0dHA6Ly8xOTIuMTY4LjAuMTgzOjEzMzcvdXBsb2FkL3Byb2ZpbGVzLzE0NjYxNjA5MDc5NTkucG5nXCI7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5lcnJvck1zZyA9IHJlc3VsdC5zdWNjZXNzLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlbmFtZSA9IFwidXBsb2Fkcy91c2VyX2ljb24ucG5nXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicHJvZmlsZSBpbWFnZSB1cGxvYWQgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICRpbWFnZS5jcm9wcGVyKCdkZXN0cm95Jyk7XG5cbiAgICAgICAgJChcIiNmcm1Ccm93c2VcIilbMF0ucmVzZXQoKTtcbiAgICAgICAgJCgnI215TW9kYWwnKS5tb2RhbCgnaGlkZScpO1xuICAgIH1cblxuICAgIG9uQ3JvcHBlclBvcHVwRG9uZSgpIHtcbiAgICAgICAgdmFyICRpbWFnZSA9IHRoaXMuY3JvcEF2dGFyLiRpbWc7XG4gICAgICAgIHZhciBjcm9wcGVkY2FudmFzID0gJGltYWdlLmNyb3BwZXIoJ2dldENyb3BwZWRDYW52YXMnKTtcbiAgICAgICAgdGhpcy5maWxlbmFtZSA9IGNyb3BwZWRjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xuICAgICAgICAvL3ZhciBpbWdkYXRhID0gPSBjcm9wcGVkY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgICAgICB0aGlzLmxvZ2luVXNlciA9IG15R2xvYmFscy5Mb2dpblVzZXI7XG5cbiAgICAgICAgdGhpcy5jcm9wcGVybG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UucHJvZmlsZWJhc2U2NCh0aGlzLmZpbGVuYW1lLHRoaXMubG9naW5Vc2VyLmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3VsdC5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEucHJvZmlsZWltYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZmlsZW5hbWUgPSBteUdsb2JhbHMuaW1hZ2VVcmwgKyBcIi91cGxvYWQvcHJvZmlsZXMvXCIgKyByZXN1bHQuZGF0YS5wcm9maWxlaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBteUdsb2JhbHMuTG9naW5Vc2VyLnByb2ZpbGVpbWFnZSA9IHJlc3VsdC5kYXRhLnByb2ZpbGVpbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ3VzZXInXSA9IEpTT04uc3RyaW5naWZ5KG15R2xvYmFscy5Mb2dpblVzZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hdXRoU2VydmljZS5lbWl0UHJvZmlsZUNoYW5nZSgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZW5hbWUgPSBcInVwbG9hZHMvdXNlcl9pY29uLnBuZ1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkKCcjYXZhdGFyLW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3BwZXJsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInByb2ZpbGUgaW1hZ2UgdXBsb2FkIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3JvcHBlcmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZpbGVuYW1lKTtcbiAgICAgICAgLy8gICAgICAgICQoXCIjZnJtQnJvd3NlXCIpWzBdLnJlc2V0KCk7XG4gICAgICAgIC8vICAgICAgICAkKCcjYXZhdGFyLW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIHRoaXMuY3JvcEF2dGFyID0gbmV3IENyb3BBdmF0YXIoJCgnI2Nyb3AtYXZhdGFyJykpOztcblxuICAgICAgICB0aGlzLmxvZ2luVXNlciA9IG15R2xvYmFscy5Mb2dpblVzZXI7XG5cbiAgICAgICAgaWYgKHRoaXMubG9naW5Vc2VyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uudmlld3Byb2ZpbGUodGhpcy5sb2dpblVzZXIuaWQpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9maWxlZm9ybS5jb250cm9sc1snbmFtZSddLnVwZGF0ZVZhbHVlKHJlc3VsdC5kYXRhLmZpcnN0bmFtZSArIFwiIFwiICsgcmVzdWx0LmRhdGEubGFzdG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9maWxlZm9ybS5jb250cm9sc1snZW1haWwnXS51cGRhdGVWYWx1ZShyZXN1bHQuZGF0YS5lbWFpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2ZpbGVmb3JtLmNvbnRyb2xzWydzdWJkb21haW4nXS51cGRhdGVWYWx1ZShyZXN1bHQuZGF0YS5zdWJkb21haW4gKyBcIi52aWV3Zm9vLnByb1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZmlsZWZvcm0uY29udHJvbHNbJ3RpbWV6b25lJ10udXBkYXRlVmFsdWUocmVzdWx0LmRhdGEudGltZXpvbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9maWxlZm9ybS5jb250cm9sc1snbG9jYWwnXS51cGRhdGVWYWx1ZShyZXN1bHQuZGF0YS5sb2NhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2ZpbGVmb3JtLmNvbnRyb2xzWydsYW5ndWFnZSddLnVwZGF0ZVZhbHVlKHJlc3VsdC5kYXRhLmxhbmd1YWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZmlsZWZvcm0uY29udHJvbHNbJ2N1cnJlbmN5J10udXBkYXRlVmFsdWUocmVzdWx0LmRhdGEuY3VycmVuY3kpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLnByb2ZpbGVpbWFnZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGVuYW1lID0gbXlHbG9iYWxzLmltYWdlVXJsICsgXCIvdXBsb2FkL3Byb2ZpbGVzL1wiICsgcmVzdWx0LmRhdGEucHJvZmlsZWltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlbmFtZSA9IFwidXBsb2Fkcy91c2VyX2ljb24ucG5nXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIgdmlldyBwcm9maWxlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBlZGl0cHJvZmlsZSgpIHtcbiAgICAgICAgbGV0IGZvcm1kYXRhID0gdGhpcy5wcm9maWxlZm9ybS52YWx1ZTtcblxuICAgICAgICBmb3JtZGF0YVtcImlkXCJdID0gdGhpcy5sb2dpblVzZXIuaWQ7XG5cbiAgICAgICAgY29uc29sZS5sb2coZm9ybWRhdGEpO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmVkaXRwcm9maWxlKGZvcm1kYXRhKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvL215R2xvYmFscy5Mb2dpblVzZXIgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICBteUdsb2JhbHMuTG9naW5Vc2VyLmZpcnN0bmFtZSA9IHJlc3VsdC5kYXRhLmZpcnN0bmFtZTtcbiAgICAgICAgICAgICAgICBteUdsb2JhbHMuTG9naW5Vc2VyLmxhc3RuYW1lID0gcmVzdWx0LmRhdGEubGFzdG5hbWU7XG4gICAgICAgICAgICAgICAgbXlHbG9iYWxzLkxvZ2luVXNlci5lbWFpbCA9IHJlc3VsdC5kYXRhLmVtYWlsO1xuICAgICAgICAgICAgICAgIG15R2xvYmFscy5Mb2dpblVzZXIuc3ViZG9tYWluID0gcmVzdWx0LmRhdGEuc3ViZG9tYWluO1xuICAgICAgICAgICAgICAgIG15R2xvYmFscy5Mb2dpblVzZXIudGltZXpvbmUgPSByZXN1bHQuZGF0YS50aW1lem9uZTtcbiAgICAgICAgICAgICAgICBteUdsb2JhbHMuTG9naW5Vc2VyLmxvY2FsID0gcmVzdWx0LmRhdGEubG9jYWw7XG4gICAgICAgICAgICAgICAgbXlHbG9iYWxzLkxvZ2luVXNlci5jdXJyZW5jeSA9IHJlc3VsdC5kYXRhLmN1cnJlbmN5O1xuICAgICAgICAgICAgICAgIG15R2xvYmFscy5Mb2dpblVzZXIucHJvZmlsZWltYWdlID0gcmVzdWx0LmRhdGEucHJvZmlsZWltYWdlO1xuXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZVsndXNlciddID0gSlNPTi5zdHJpbmdpZnkobXlHbG9iYWxzLkxvZ2luVXNlcik7XG5cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIHZpZXcgcHJvZmlsZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAgICAgY2hrc3ViZG9tYWluKHN1YmRvbWFpbil7XG4gICAgICAgICB0aGlzLmludmFsaWRkb21haW4gPSBmYWxzZTtcbiAgICAgICAgIGlmKHN1YmRvbWFpbi5sZW5ndGghPTApXG4gICAgICAgIHtcbiAgICAgICAgICAgICB2YXIgbiA9IHN1YmRvbWFpbi5pbmRleE9mKFwiLnZpZXdmb28ucHJvXCIpO1xuICAgICAgICAgICAgIHZhciBzdWIgPSBzdWJkb21haW4uc3Vic3RyKDAsIG4pO1xuICAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2UuY2hrc3ViZG9tYWluKHN1YilcbiAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZG9tYWlubWVzc2FnZSA9IHJlc3VsdC5tZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmludmFsaWRkb21haW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tYWlubWVzc2FnZSA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnZhbGlkZG9tYWluID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3ViZG9tYWluICBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19
