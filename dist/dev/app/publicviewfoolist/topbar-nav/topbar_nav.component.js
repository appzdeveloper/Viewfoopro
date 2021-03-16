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
var auth_service_1 = require('../../shared/services/auth.service');
var forms_1 = require('@angular/forms');
var TopbarnavComponent = (function () {
    function TopbarnavComponent(route, router, authService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.publicfolder = [];
        this.isDropDownJQueryApplied = false;
        this.folderchange = new core_1.EventEmitter();
        this.sub = this.route.params.subscribe(function (params) {
            _this.domainName = params['subdomain'];
        });
    }
    Object.defineProperty(TopbarnavComponent.prototype, "folderlist", {
        get: function () {
            return this._folderlist;
        },
        set: function (v) {
            this._folderlist = v;
            if (!this.isDropDownJQueryApplied) {
                setTimeout(function () {
                    $('.dropdown').click(function () {
                        $('.dropdown-menu', this).slideToggle(250);
                    });
                }, 1000);
                this.isDropDownJQueryApplied = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    TopbarnavComponent.prototype.ngOnInit = function () {
    };
    TopbarnavComponent.prototype.ngAfterViewInit = function () {
        $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
    };
    TopbarnavComponent.prototype.setPublicViewfooid = function (folderid, parentid) {
        this.router.navigate(["/users/" + this.domainName]);
        this.parentid = parentid;
        this.folderchange.emit(folderid);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], TopbarnavComponent.prototype, "folderlist", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TopbarnavComponent.prototype, "menuBackgroundcolor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TopbarnavComponent.prototype, "fontcolor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TopbarnavComponent.prototype, "userhomesettings", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TopbarnavComponent.prototype, "folderchange", void 0);
    TopbarnavComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'topbarnav',
            templateUrl: 'topbar_nav.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, auth_service_1.AuthService])
    ], TopbarnavComponent);
    return TopbarnavComponent;
}());
exports.TopbarnavComponent = TopbarnavComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9wdWJsaWN2aWV3Zm9vbGlzdC90b3BiYXItbmF2L3RvcGJhcl9uYXYuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0UsZUFBZSxDQUFDLENBQUE7QUFDeEYsdUJBQXlELGlCQUFpQixDQUFDLENBQUE7QUFDM0UsNkJBQTRCLG9DQUFvQyxDQUFDLENBQUE7QUFFakUsc0JBQTBGLGdCQUFnQixDQUFDLENBQUE7QUFjM0c7SUFvQ0ksNEJBQW9CLEtBQXFCLEVBQzdCLE1BQWMsRUFBVSxXQUF3QjtRQXJDaEUsaUJBb0VDO1FBaEN1QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUM3QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFsQzVELGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBTTFCLDRCQUF1QixHQUFZLEtBQUssQ0FBQztRQXVCdkIsaUJBQVksR0FBeUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFPNUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQzVDLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRWpDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWpDRCxzQkFBVywwQ0FBVTthQWFaO1lBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDNUIsQ0FBQzthQWZELFVBQXNCLENBQU07WUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFFckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxVQUFVLENBQUM7b0JBQ1YsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDcEIsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDNUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNBLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUM7WUFDOUMsQ0FBQztRQUNDLENBQUM7OztPQUFBO0lBd0JELHFDQUFRLEdBQVI7SUFFQSxDQUFDO0lBRUQsNENBQWUsR0FBZjtRQUNJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELCtDQUFrQixHQUFsQixVQUFtQixRQUFnQixFQUFFLFFBQWdCO1FBSzdDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBR3pDLENBQUM7SUEzQ0Q7UUFBQyxZQUFLLEVBQUU7Ozt3REFBQTtJQUlSO1FBQUMsWUFBSyxFQUFFOzttRUFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzt5REFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztnRUFBQTtJQUVSO1FBQUMsYUFBTSxFQUFFOzs0REFBQTtJQXhDYjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLDJCQUEyQjtZQUMzQyxVQUFVLEVBQUUsQ0FBQyxnQ0FBd0IsQ0FBQztTQUV0QyxDQUFDOzswQkFBQTtJQXNFRix5QkFBQztBQUFELENBcEVBLEFBb0VDLElBQUE7QUFwRVksMEJBQWtCLHFCQW9FOUIsQ0FBQSIsImZpbGUiOiJhcHAvcHVibGljdmlld2Zvb2xpc3QvdG9wYmFyLW5hdi90b3BiYXJfbmF2LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVMsIFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JzLCBGb3JtQnVpbGRlciwgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uLy4uL2dsb2JhbHMnKTtcbmltcG9ydCB7Q3VzdG9tVmFsaWRhdG9yc30gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL0N1c3RvbVZhbGlkYXRvcnMnO1xuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uLy4uL2dsb2JhbHMnKTtcbmltcG9ydCB7IEZvbGRlciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ3RvcGJhcm5hdicsXG4gICAgdGVtcGxhdGVVcmw6ICd0b3BiYXJfbmF2LmNvbXBvbmVudC5odG1sJyxcblx0ZGlyZWN0aXZlczogW1JFQUNUSVZFX0ZPUk1fRElSRUNUSVZFU11cblxufSlcblxuZXhwb3J0IGNsYXNzIFRvcGJhcm5hdkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBkb21haW5OYW1lOiBzdHJpbmc7XG5cbiAgICBwdWJsaWNmb2xkZXI6IEZvbGRlciA9IFtdO1xuICAgIHB1YmxpY1ZpZXdmb29pZDogc3RyaW5nO1xuICAgIHBhcmVudGlkOiBzdHJpbmc7XG5cbiAgICBfZm9sZGVybGlzdDogYW55O1xuXG4gICAgaXNEcm9wRG93bkpRdWVyeUFwcGxpZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgc2V0IGZvbGRlcmxpc3QodjogYW55KSB7XG4gICAgICAgIHRoaXMuX2ZvbGRlcmxpc3QgPSB2O1xuXG4gICAgICAgIGlmICghdGhpcy5pc0Ryb3BEb3duSlF1ZXJ5QXBwbGllZCkge1xuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0JCgnLmRyb3Bkb3duJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0JCgnLmRyb3Bkb3duLW1lbnUnLCB0aGlzKS5zbGlkZVRvZ2dsZSgyNTApO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sIDEwMDApO1xuICAgICAgICAgICAgdGhpcy5pc0Ryb3BEb3duSlF1ZXJ5QXBwbGllZCA9IHRydWU7XG5cdFx0fVxuICAgIH1cblxuICAgIEBJbnB1dCgpIHB1YmxpYyBnZXQgZm9sZGVybGlzdCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9sZGVybGlzdDtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgbWVudUJhY2tncm91bmRjb2xvcjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmb250Y29sb3I6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHB1YmxpYyB1c2VyaG9tZXNldHRpbmdzOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KCkgcHJpdmF0ZSBmb2xkZXJjaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgc3ViOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcblxuXHRcdHRoaXMuc3ViID0gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG5cdFx0XHR0aGlzLmRvbWFpbk5hbWUgPSBwYXJhbXNbJ3N1YmRvbWFpbiddO1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICAkKFwiI21lbnUtdG9nZ2xlXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQoXCIjd3JhcHBlclwiKS50b2dnbGVDbGFzcyhcInRvZ2dsZWRcIik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldFB1YmxpY1ZpZXdmb29pZChmb2xkZXJpZDogc3RyaW5nLCBwYXJlbnRpZDogc3RyaW5nKSB7XG4gICAgICAgIC8vaWYgKHRoaXMucGFyZW50aWQgPT0gcGFyZW50aWQpIHtcbiAgICAgICAgICAgIC8vdGhpcy5wYXJlbnRpZCA9IFwiXCI7XG4gICAgICAgIC8vfSBlbHNlIHtcbiAgICAgICAgICAgIC8vdGhpcy5wdWJsaWNWaWV3Zm9vaWQgPSBpZDtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi91c2Vycy9cIit0aGlzLmRvbWFpbk5hbWVdKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50aWQgPSBwYXJlbnRpZDtcbiAgICAgICAgICAgIHRoaXMuZm9sZGVyY2hhbmdlLmVtaXQoZm9sZGVyaWQpO1xuICAgICAgICAvL31cblxuICAgIH1cblxufVxuIl19
