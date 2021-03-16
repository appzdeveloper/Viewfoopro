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
var myGlobals = require('../globals');
var commentmodal_component_1 = require('../shared/widgets/commentmodal/commentmodal.component');
var sharemodal_component_1 = require('../shared/widgets/sharemodal/sharemodal.component');
var angular2_infinite_scroll_1 = require('angular2-infinite-scroll/angular2-infinite-scroll');
var PublicViewfooListComponent = (function () {
    function PublicViewfooListComponent(route, router, authService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.viewfoolist = [];
        this.imageUrl = myGlobals.imageUrl + '/upload/gallery';
        this.userhomesettings = {};
        this.isListing = false;
        this.isMasonry = false;
        this.isGallery = false;
        this.perpage = 20;
        this.pageno = 1;
        this.totalcount = 0;
        this.viewfooloading = false;
        this.currViewfooComment = {};
        this.currViewfooShare = {};
        this.currViewfooImageShare = {};
        this.isModelCommentHiddenRegistered = false;
        this.isModelShareHiddenRegistered = false;
        console.log("PublicViewfooListComponent constructor");
        this.folderid = "0";
        authService.publicViewfooChanged$.subscribe(function (item) {
            if (item.action == "publichomepagesetting") {
            }
            else if (item.action == "onFolderClick") {
                _this.pageno = 1;
                _this.folderid = item.data;
                _this.getPublicViewfoolist();
            }
        });
    }
    PublicViewfooListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.router.routerState.parent(this.route).params.subscribe(function (params) {
            _this.subdomain = params['subdomain'];
            _this.getPublicViewfoolist();
            _this.getUserHomepageSettings();
        });
    };
    PublicViewfooListComponent.prototype.getUserHomepageSettings = function () {
        var _this = this;
        this.authService.userpublichomesettings(this.subdomain)
            .subscribe(function (result) {
            _this.userhomesettings = result.data;
            if (_this.userhomesettings.viewfoodisplay == 'gallery') {
                _this.onGallery();
            }
            else if (_this.userhomesettings.viewfoodisplay == 'tile') {
                _this.onListing();
            }
            else if (_this.userhomesettings.viewfoodisplay == 'masonry') {
                _this.onMasonry();
            }
            if (_this.userhomesettings.disablerightmousebtn == 'true') {
            }
        }, function (error) {
            console.log("public homepage setting fail: " + error);
        });
    };
    PublicViewfooListComponent.prototype.onListing = function () {
        this.isListing = true;
        this.isMasonry = false;
        this.isGallery = false;
    };
    PublicViewfooListComponent.prototype.onMasonry = function () {
        this.isListing = false;
        this.isMasonry = true;
        this.isGallery = false;
    };
    PublicViewfooListComponent.prototype.onGallery = function () {
        this.isListing = false;
        this.isMasonry = false;
        this.isGallery = true;
    };
    PublicViewfooListComponent.prototype.loadmoreviewfoo = function () {
        if (this.totalcount > this.viewfoolist.length) {
            this.pageno++;
            this.getPublicViewfoolist();
        }
    };
    PublicViewfooListComponent.prototype.getPublicViewfoolist = function () {
        var _this = this;
        console.log("public_viewfoo_list getPublicViewfoolist folderid: "
            + this.folderid);
        this.viewfooloading = true;
        this.authService.publicviewfoo(this.subdomain, this.folderid, this.perpage, this.pageno)
            .subscribe(function (result) {
            _this.viewfooloading = false;
            _this.totalcount = result.data.totalcount;
            if (_this.pageno == 1) {
                _this.viewfoolist = [];
            }
            for (var i = 0; i < result.data.viewfoolist.length; i++) {
                var objViewfoo = result.data.viewfoolist[i];
                if (objViewfoo.thumbcoverimage) {
                    objViewfoo.thumbcoverimage = _this.imageUrl + "/" + objViewfoo.thumbcoverimage;
                }
                if (objViewfoo.coverimage) {
                    objViewfoo.coverimage = _this.imageUrl + "/" + objViewfoo.coverimage;
                }
                _this.viewfoolist.push(objViewfoo);
            }
        }, function (error) {
            console.log("viewfoo list fail: " + error);
        });
    };
    PublicViewfooListComponent.prototype.onScroll = function () {
        this.loadmoreviewfoo();
    };
    PublicViewfooListComponent.prototype.onViewfooDetail = function (viewfooid) {
        console.log("onViewfooDetail : " + viewfooid);
        this.router.navigate([viewfooid], { relativeTo: this.route });
    };
    PublicViewfooListComponent.prototype.onViewfooComment = function (vfl) {
        this.currViewfooComment = vfl;
        $('#commentphoto_modal').modal('show');
        if (!this.isModelCommentHiddenRegistered) {
            this.isModelCommentHiddenRegistered = true;
            $('#commentphoto_modal').on('hidden.bs.modal', function (e) {
                this.currViewfooComment = {};
            });
        }
    };
    PublicViewfooListComponent.prototype.onViewfooShare = function (vfl) {
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
    PublicViewfooListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'publicviewfoolist',
            templateUrl: 'publicviewfoolist.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, angular2_infinite_scroll_1.InfiniteScroll, commentmodal_component_1.CommentModalComponent, sharemodal_component_1.ShareModalComponent]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, auth_service_1.AuthService])
    ], PublicViewfooListComponent);
    return PublicViewfooListComponent;
}());
exports.PublicViewfooListComponent = PublicViewfooListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9wdWJsaWN2aWV3Zm9vbGlzdC9wdWJsaWN2aWV3Zm9vbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFnQyxlQUFlLENBQUMsQ0FBQTtBQUVoRCx1QkFBd0QsaUJBQWlCLENBQUMsQ0FBQTtBQUMxRSw2QkFBNEIsaUNBQWlDLENBQUMsQ0FBQTtBQUc5RCxJQUFPLFNBQVMsV0FBVyxZQUFZLENBQUMsQ0FBQztBQUd6Qyx1Q0FBc0MsdURBQXVELENBQUMsQ0FBQTtBQUM5RixxQ0FBb0MsbURBQW1ELENBQUMsQ0FBQTtBQUN4Rix5Q0FBK0IsbURBQW1ELENBQUMsQ0FBQTtBQVFuRjtJQTRCSSxvQ0FBb0IsS0FBcUIsRUFBVSxNQUFjLEVBQVUsV0FBd0I7UUE1QnZHLGlCQTRNQztRQWhMdUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUExQm5HLGdCQUFXLEdBQWMsRUFBRSxDQUFDO1FBRzVCLGFBQVEsR0FBVyxTQUFTLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDO1FBRW5ELHFCQUFnQixHQUFRLEVBQUUsQ0FBQztRQUlsQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFFbkIsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUV2QixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUVoQyx1QkFBa0IsR0FBWSxFQUFFLENBQUM7UUFDakMscUJBQWdCLEdBQVcsRUFBRSxDQUFDO1FBQzlCLDBCQUFxQixHQUFhLEVBQUUsQ0FBQztRQUNyQyxtQ0FBOEIsR0FBWSxLQUFLLENBQUM7UUFDaEQsaUNBQTRCLEdBQVcsS0FBSyxDQUFDO1FBSXpDLE9B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QzdELENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxVQUFTLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO0lBQ0MsQ0FBQztJQUVELG1EQUFjLEdBQWQsVUFBZSxHQUFZO1FBRXZCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7UUFDNUIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztRQUNoQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUM7WUFDM0QsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFVBQVMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztnQkFDQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsRUFBRSxDQUFDO1lBQzdELENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztJQUNDLENBQUM7SUEvTUw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsV0FBVyxFQUFFLGtDQUFrQztZQUNsRCxVQUFVLEVBQUUsQ0FBQywwQkFBaUIsRUFBRSx5Q0FBYyxFQUFDLDhDQUFxQixFQUFDLDBDQUFtQixDQUFDO1NBQ3pGLENBQUM7O2tDQUFBO0lBNk1GLGlDQUFDO0FBQUQsQ0E1TUEsQUE0TUMsSUFBQTtBQTVNWSxrQ0FBMEIsNkJBNE10QyxDQUFBIiwiZmlsZSI6ImFwcC9wdWJsaWN2aWV3Zm9vbGlzdC9wdWJsaWN2aWV3Zm9vbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFUywgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycywgRm9ybUJ1aWxkZXIsIFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi9nbG9iYWxzJyk7XG5pbXBvcnQgeyBWaWV3Zm9vLCBGb2xkZXIsQ29udGFpbmVyIH0gZnJvbSAnLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuXG5pbXBvcnQgeyBDb21tZW50TW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvd2lkZ2V0cy9jb21tZW50bW9kYWwvY29tbWVudG1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaGFyZU1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3dpZGdldHMvc2hhcmVtb2RhbC9zaGFyZW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbmZpbml0ZVNjcm9sbCB9IGZyb20gJ2FuZ3VsYXIyLWluZmluaXRlLXNjcm9sbC9hbmd1bGFyMi1pbmZpbml0ZS1zY3JvbGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAncHVibGljdmlld2Zvb2xpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAncHVibGljdmlld2Zvb2xpc3QuY29tcG9uZW50Lmh0bWwnLFxuXHRkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVMsIEluZmluaXRlU2Nyb2xsLENvbW1lbnRNb2RhbENvbXBvbmVudCxTaGFyZU1vZGFsQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQdWJsaWNWaWV3Zm9vTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgc3ViZG9tYWluOiBzdHJpbmc7XG4gICAgdmlld2Zvb2xpc3Q6IFZpZXdmb29bXSA9IFtdO1xuICAgIGZvbGRlcmlkOiBzdHJpbmc7XG5cbiAgICBpbWFnZVVybDogc3RyaW5nID0gbXlHbG9iYWxzLmltYWdlVXJsICsgJy91cGxvYWQvZ2FsbGVyeSc7XG5cbiAgICBwdWJsaWMgdXNlcmhvbWVzZXR0aW5nczogYW55ID0ge307XG5cbiAgICBzdWI6IGFueTtcblxuICAgIGlzTGlzdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzTWFzb25yeTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzR2FsbGVyeTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcGVycGFnZTogbnVtYmVyID0gMjA7XG4gICAgcGFnZW5vOiBudW1iZXIgPSAxO1xuXG4gICAgdG90YWxjb3VudDogbnVtYmVyID0gMDtcblxuICAgIHZpZXdmb29sb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjdXJyVmlld2Zvb0NvbW1lbnQ6IFZpZXdmb28gPSB7fTtcbiAgICBjdXJyVmlld2Zvb1NoYXJlOlZpZXdmb28gPSB7fTtcbiAgICBjdXJyVmlld2Zvb0ltYWdlU2hhcmU6Q29udGFpbmVyID0ge307XG4gICAgaXNNb2RlbENvbW1lbnRIaWRkZW5SZWdpc3RlcmVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNNb2RlbFNoYXJlSGlkZGVuUmVnaXN0ZXJlZDpib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlB1YmxpY1ZpZXdmb29MaXN0Q29tcG9uZW50IGNvbnN0cnVjdG9yXCIpO1xuICAgICAgICB0aGlzLmZvbGRlcmlkID0gXCIwXCI7XG5cbiAgICAgICAgYXV0aFNlcnZpY2UucHVibGljVmlld2Zvb0NoYW5nZWQkLnN1YnNjcmliZShcbiAgICAgICAgICAgIGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJQdWJsaWNWaWV3Zm9vTGlzdENvbXBvbmVudCBwdWJsaWNWaWV3Zm9vQ2hhbmdlZCBcIitKU09OLnN0cmluZ2lmeShpdGVtKSk7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uYWN0aW9uID09IFwicHVibGljaG9tZXBhZ2VzZXR0aW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy51c2VyaG9tZXNldHRpbmdzID0gaXRlbS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy51c2VyaG9tZXNldHRpbmdzLnZpZXdmb29kaXNwbGF5ID09ICdnYWxsZXJ5Jykge1xuXHRcdFx0XHRcdC8vIFx0dGhpcy5vbkdhbGxlcnkoKTtcblx0XHRcdFx0XHQvLyB9IGVsc2UgaWYgKHRoaXMudXNlcmhvbWVzZXR0aW5ncy52aWV3Zm9vZGlzcGxheSA9PSAndGlsZScpIHtcblx0XHRcdFx0XHQvLyBcdHRoaXMub25MaXN0aW5nKClcblx0XHRcdFx0XHQvLyB9IGVsc2UgaWYgKHRoaXMudXNlcmhvbWVzZXR0aW5ncy52aWV3Zm9vZGlzcGxheSA9PSAnbWFzb25yeScpIHtcblx0XHRcdFx0XHQvLyBcdHRoaXMub25NYXNvbnJ5KClcblx0XHRcdFx0XHQvLyB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLmFjdGlvbiA9PSBcIm9uRm9sZGVyQ2xpY2tcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2VubyA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9sZGVyaWQgPSBpdGVtLmRhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRQdWJsaWNWaWV3Zm9vbGlzdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL3RoaXMucmVmcmVzaEltYWdlKGl0ZW0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gdGhpcy5nZXRQdWJsaWNWaWV3Zm9vbGlzdCgpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnN1YiA9IHRoaXMucm91dGVyLnJvdXRlclN0YXRlLnBhcmVudCh0aGlzLnJvdXRlKS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnN1YmRvbWFpbiA9IHBhcmFtc1snc3ViZG9tYWluJ107XG5cbiAgICAgICAgICAgIHRoaXMuZ2V0UHVibGljVmlld2Zvb2xpc3QoKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0VXNlckhvbWVwYWdlU2V0dGluZ3MoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0VXNlckhvbWVwYWdlU2V0dGluZ3MoKSB7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UudXNlcnB1YmxpY2hvbWVzZXR0aW5ncyh0aGlzLnN1YmRvbWFpbilcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdDogYW55KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyB0aGlzLmF1dGhTZXJ2aWNlLnB1YmxpY1ZpZXdmb29DaGFuZ2VTb3VyY2UubmV4dCh7XG4gICAgICAgICAgICAgICAgLy8gICAgIGFjdGlvbjogXCJwdWJsaWNob21lcGFnZXNldHRpbmdcIixcbiAgICAgICAgICAgICAgICAvLyAgICAgZGF0YTogcmVzdWx0LmRhdGFcbiAgICAgICAgICAgICAgICAvLyB9KTtcblxuXHRcdFx0XHR0aGlzLnVzZXJob21lc2V0dGluZ3MgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VyaG9tZXNldHRpbmdzLnZpZXdmb29kaXNwbGF5ID09ICdnYWxsZXJ5Jykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uR2FsbGVyeSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy51c2VyaG9tZXNldHRpbmdzLnZpZXdmb29kaXNwbGF5ID09ICd0aWxlJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTGlzdGluZygpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnVzZXJob21lc2V0dGluZ3Mudmlld2Zvb2Rpc3BsYXkgPT0gJ21hc29ucnknKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25NYXNvbnJ5KClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VyaG9tZXNldHRpbmdzLmRpc2FibGVyaWdodG1vdXNlYnRuID09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBkb2N1bWVudC5vbm1vdXNlZG93biA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB2YXIgc3RhdHVzPVwiUmlnaHQgQ2xpY2sgRGlzYWJsZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmIChldmVudC5idXR0b24gPT0gMikge1xuXHRcdFx0XHRcdC8vIFx0XHRhbGVydChzdGF0dXMpO1xuXHRcdFx0XHRcdC8vIFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0Ly8gXHR9XG4gICAgICAgICAgICAgICAgICAgIC8vIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicHVibGljIGhvbWVwYWdlIHNldHRpbmcgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkxpc3RpbmcoKSB7XG4gICAgICAgIHRoaXMuaXNMaXN0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc01hc29ucnkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0dhbGxlcnkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbk1hc29ucnkoKSB7XG4gICAgICAgIHRoaXMuaXNMaXN0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNNYXNvbnJ5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0dhbGxlcnkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbkdhbGxlcnkoKSB7XG4gICAgICAgIHRoaXMuaXNMaXN0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNNYXNvbnJ5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNHYWxsZXJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBsb2FkbW9yZXZpZXdmb28oKSB7XG4gICAgICAgIGlmICh0aGlzLnRvdGFsY291bnQgPiB0aGlzLnZpZXdmb29saXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5wYWdlbm8rKztcblx0XHRcdHRoaXMuZ2V0UHVibGljVmlld2Zvb2xpc3QoKTtcblx0XHR9XG5cdH1cblxuICAgIGdldFB1YmxpY1ZpZXdmb29saXN0KCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInB1YmxpY192aWV3Zm9vX2xpc3QgZ2V0UHVibGljVmlld2Zvb2xpc3QgZm9sZGVyaWQ6IFwiXG5cdFx0XHQrIHRoaXMuZm9sZGVyaWQpO1xuICAgICAgICB0aGlzLnZpZXdmb29sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5wdWJsaWN2aWV3Zm9vKHRoaXMuc3ViZG9tYWluLCB0aGlzLmZvbGRlcmlkLCB0aGlzLnBlcnBhZ2UsIHRoaXMucGFnZW5vKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdmb29sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsY291bnQgPSByZXN1bHQuZGF0YS50b3RhbGNvdW50O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2VubyA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld2Zvb2xpc3QgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQuZGF0YS52aWV3Zm9vbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZighbXlHbG9iYWxzLmFsbFZpZXdmb29baV0uY292ZXJpbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgbXlHbG9iYWxzLmFsbFZpZXdmb29baV0uY292ZXJpbWFnZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIG9ialZpZXdmb286IFZpZXdmb28gPSByZXN1bHQuZGF0YS52aWV3Zm9vbGlzdFtpXTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZihvYmpWaWV3Zm9vLnRodW1iY292ZXJpbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgb2JqVmlld2Zvby50aHVtYmNvdmVyaW1hZ2UgPSB0aGlzLmltYWdlVXJsK1wiL1wiK29ialZpZXdmb28udGh1bWJjb3ZlcmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGVsc2UgaWYob2JqVmlld2Zvby5jb3ZlcmltYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBvYmpWaWV3Zm9vLnRodW1iY292ZXJpbWFnZSA9IHRoaXMuaW1hZ2VVcmwrXCIvXCIrb2JqVmlld2Zvby5jb3ZlcmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIGlmKG9ialZpZXdmb28udGh1bWJjb3ZlcmltYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpWaWV3Zm9vLnRodW1iY292ZXJpbWFnZSA9IHRoaXMuaW1hZ2VVcmwrXCIvXCIrb2JqVmlld2Zvby50aHVtYmNvdmVyaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYob2JqVmlld2Zvby5jb3ZlcmltYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpWaWV3Zm9vLmNvdmVyaW1hZ2UgPSB0aGlzLmltYWdlVXJsK1wiL1wiK29ialZpZXdmb28uY292ZXJpbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0XHRcdHRoaXMudmlld2Zvb2xpc3QucHVzaChvYmpWaWV3Zm9vKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvL3RoaXMudmlld2Zvb2xpc3QgPSByZXN1bHQuZGF0YVswXS52aWV3Zm9vbGlzdDtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyh0aGlzLnZpZXdmb29saXN0KTtcblxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpZXdmb28gbGlzdCBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uU2Nyb2xsKCkge1xuICAgICAgICB0aGlzLmxvYWRtb3Jldmlld2ZvbygpO1xuICAgIH1cblxuICAgIG9uVmlld2Zvb0RldGFpbCh2aWV3Zm9vaWQ6IHN0cmluZykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uVmlld2Zvb0RldGFpbCA6IFwiK3ZpZXdmb29pZCk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt2aWV3Zm9vaWRdLCB7cmVsYXRpdmVUbzogdGhpcy5yb3V0ZX0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm9uVmlld2Zvb0RldGFpbCA6IFwiK3ZpZXdmb29pZCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm91dGVyKTtcbiAgICAgICAgLy90aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJ2aWV3Zm9vZGV0YWlsL1wiICsgdmlld2Zvb2lkXSk7XG4gICAgfVxuXG4gICAgb25WaWV3Zm9vQ29tbWVudCh2Zmw6IFZpZXdmb28pIHtcblxuICAgICAgICB0aGlzLmN1cnJWaWV3Zm9vQ29tbWVudCA9IHZmbDtcbiAgICAgICAgJCgnI2NvbW1lbnRwaG90b19tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG5cdFx0aWYgKCF0aGlzLmlzTW9kZWxDb21tZW50SGlkZGVuUmVnaXN0ZXJlZCkge1xuICAgICAgICAgICAgICAgICAgICBcdHRoaXMuaXNNb2RlbENvbW1lbnRIaWRkZW5SZWdpc3RlcmVkID0gdHJ1ZTtcblx0XHRcdCQoJyNjb21tZW50cGhvdG9fbW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHR0aGlzLmN1cnJWaWV3Zm9vQ29tbWVudCA9IHt9O1xuXHRcdFx0fSk7XG5cdFx0fVxuICAgIH1cblxuICAgIG9uVmlld2Zvb1NoYXJlKHZmbDogVmlld2Zvbykge1xuXG4gICAgICAgIHRoaXMuY3VyclZpZXdmb29TaGFyZSA9IHZmbDtcbiAgICAgICAgdGhpcy5jdXJyVmlld2Zvb0ltYWdlU2hhcmUgPSB7fTtcbiAgICAgICAgJCgnI1NlbGVjdFBob3RvTW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuXHRcdGlmICghdGhpcy5pc01vZGVsU2hhcmVIaWRkZW5SZWdpc3RlcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIFx0dGhpcy5pc01vZGVsU2hhcmVIaWRkZW5SZWdpc3RlcmVkID0gdHJ1ZTtcblx0XHRcdCQoJyNTZWxlY3RQaG90b01vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0dGhpcy5jdXJyVmlld2Zvb1NoYXJlID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyclZpZXdmb29JbWFnZVNoYXJlID0ge307XG5cdFx0XHR9KTtcblx0XHR9XG4gICAgfVxuXG5cbn1cbiJdfQ==
