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
var SidebarnavComponent = (function () {
    function SidebarnavComponent(route, router, authService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.isDropDownJQueryApplied = false;
        this.folderchange = new core_1.EventEmitter();
        this.sub = this.route.params.subscribe(function (params) {
            _this.domainName = params['subdomain'];
        });
    }
    Object.defineProperty(SidebarnavComponent.prototype, "folderlist", {
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
    SidebarnavComponent.prototype.ngOnInit = function () {
    };
    SidebarnavComponent.prototype.ngAfterViewInit = function () {
        $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
    };
    SidebarnavComponent.prototype.setPublicViewfooid = function (folderid, parentid) {
        this.router.navigate(["/users/" + this.domainName]);
        this.parentid = parentid;
        this.folderchange.emit(folderid);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], SidebarnavComponent.prototype, "folderlist", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SidebarnavComponent.prototype, "menuBackgroundcolor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SidebarnavComponent.prototype, "fontcolor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SidebarnavComponent.prototype, "userhomesettings", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SidebarnavComponent.prototype, "folderchange", void 0);
    SidebarnavComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sidebarnav',
            templateUrl: 'sidebar_nav.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, auth_service_1.AuthService])
    ], SidebarnavComponent);
    return SidebarnavComponent;
}());
exports.SidebarnavComponent = SidebarnavComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9wdWJsaWN2aWV3Zm9vbGlzdC9zaWRlYmFyLW5hdi9zaWRlYmFyX25hdi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3RSxlQUFlLENBQUMsQ0FBQTtBQUN4Rix1QkFBeUQsaUJBQWlCLENBQUMsQ0FBQTtBQUMzRSw2QkFBNEIsb0NBQW9DLENBQUMsQ0FBQTtBQUVqRSxzQkFBMEYsZ0JBQWdCLENBQUMsQ0FBQTtBQWEzRztJQXFDSSw2QkFBb0IsS0FBcUIsRUFDN0IsTUFBYyxFQUFVLFdBQXdCO1FBdENoRSxpQkFzRUM7UUFqQ3VCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQzdCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQTVCNUQsNEJBQXVCLEdBQVksS0FBSyxDQUFDO1FBdUJ2QixpQkFBWSxHQUF5QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQU81RSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDNUMsS0FBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFakMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBakNELHNCQUFXLDJDQUFVO2FBYVo7WUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDO2FBZkQsVUFBc0IsQ0FBTTtZQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUVyQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLFVBQVUsQ0FBQztvQkFDVixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDO3dCQUNwQixDQUFDLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM1QyxDQUFDLENBQUMsQ0FBQztnQkFDSixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ0EsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQztZQUM5QyxDQUFDO1FBQ0MsQ0FBQzs7O09BQUE7SUF3QkQsc0NBQVEsR0FBUjtJQUVBLENBQUM7SUFFRCw2Q0FBZSxHQUFmO1FBQ0ksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLENBQUM7WUFDdkMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsZ0RBQWtCLEdBQWxCLFVBQW1CLFFBQWdCLEVBQUUsUUFBZ0I7UUFLN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFJekMsQ0FBQztJQTVDRDtRQUFDLFlBQUssRUFBRTs7O3lEQUFBO0lBSVI7UUFBQyxZQUFLLEVBQUU7O29FQUFBO0lBQ1I7UUFBQyxZQUFLLEVBQUU7OzBEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2lFQUFBO0lBRVI7UUFBQyxhQUFNLEVBQUU7OzZEQUFBO0lBeENiO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUUsNEJBQTRCO1lBQzVDLFVBQVUsRUFBRSxDQUFDLGdDQUF3QixDQUFDO1NBQ3RDLENBQUM7OzJCQUFBO0lBd0VGLDBCQUFDO0FBQUQsQ0F0RUEsQUFzRUMsSUFBQTtBQXRFWSwyQkFBbUIsc0JBc0UvQixDQUFBIiwiZmlsZSI6ImFwcC9wdWJsaWN2aWV3Zm9vbGlzdC9zaWRlYmFyLW5hdi9zaWRlYmFyX25hdi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLCBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycywgRm9ybUJ1aWxkZXIsIFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi8uLi9nbG9iYWxzJyk7XG5pbXBvcnQge0N1c3RvbVZhbGlkYXRvcnN9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy9DdXN0b21WYWxpZGF0b3JzJztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi8uLi9nbG9iYWxzJyk7XG5pbXBvcnQgeyBGb2xkZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdzaWRlYmFybmF2JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3NpZGViYXJfbmF2LmNvbXBvbmVudC5odG1sJyxcblx0ZGlyZWN0aXZlczogW1JFQUNUSVZFX0ZPUk1fRElSRUNUSVZFU11cbn0pXG5cbmV4cG9ydCBjbGFzcyBTaWRlYmFybmF2Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAgIGRvbWFpbk5hbWU6IHN0cmluZztcblxuXG4gICAgcHVibGljVmlld2Zvb2lkOiBzdHJpbmc7XG5cbiAgICBwYXJlbnRpZDogc3RyaW5nO1xuXG4gICAgX2ZvbGRlcmxpc3Q6IGFueTtcblxuICAgIGlzRHJvcERvd25KUXVlcnlBcHBsaWVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIHNldCBmb2xkZXJsaXN0KHY6IGFueSkge1xuICAgICAgICB0aGlzLl9mb2xkZXJsaXN0ID0gdjtcblxuICAgICAgICBpZiAoIXRoaXMuaXNEcm9wRG93bkpRdWVyeUFwcGxpZWQpIHtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdCQoJy5kcm9wZG93bicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdCQoJy5kcm9wZG93bi1tZW51JywgdGhpcykuc2xpZGVUb2dnbGUoMjUwKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LCAxMDAwKTtcbiAgICAgICAgICAgIHRoaXMuaXNEcm9wRG93bkpRdWVyeUFwcGxpZWQgPSB0cnVlO1xuXHRcdH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgZ2V0IGZvbGRlcmxpc3QoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvbGRlcmxpc3Q7XG4gICAgfVxuXG4gICAgQElucHV0KCkgcHVibGljIG1lbnVCYWNrZ3JvdW5kY29sb3I6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgZm9udGNvbG9yOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgdXNlcmhvbWVzZXR0aW5nczogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpIHByaXZhdGUgZm9sZGVyY2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHN1YjogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XG5cblx0XHR0aGlzLnN1YiA9IHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuXHRcdFx0dGhpcy5kb21haW5OYW1lID0gcGFyYW1zWydzdWJkb21haW4nXTtcblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgJChcIiNtZW51LXRvZ2dsZVwiKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKFwiI3dyYXBwZXJcIikudG9nZ2xlQ2xhc3MoXCJ0b2dnbGVkXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRQdWJsaWNWaWV3Zm9vaWQoZm9sZGVyaWQ6IHN0cmluZywgcGFyZW50aWQ6IHN0cmluZykge1xuICAgICAgICAvL2lmICh0aGlzLnBhcmVudGlkID09IHBhcmVudGlkKSB7XG4gICAgICAgICAgICAvL3RoaXMucGFyZW50aWQgPSBcIlwiO1xuICAgICAgICAvL30gZWxzZSB7XG4gICAgICAgICAgICAvL3RoaXMucHVibGljVmlld2Zvb2lkID0gaWQ7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdXNlcnMvXCIrdGhpcy5kb21haW5OYW1lXSk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudGlkID0gcGFyZW50aWQ7XG4gICAgICAgICAgICB0aGlzLmZvbGRlcmNoYW5nZS5lbWl0KGZvbGRlcmlkKTtcbiAgICAgICAgLy99XG5cbiAgICAgICAgLy9hbGVydCh0aGlzLnBhcmVudGlkKTtcbiAgICB9XG5cbn1cbiJdfQ==
