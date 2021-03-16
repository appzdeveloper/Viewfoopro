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
var auth_service_1 = require('../../services/auth.service');
var myGlobals = require('../../../globals');
var ShareModalComponent = (function () {
    function ShareModalComponent(route, router, authService) {
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.imageUrl = myGlobals.imageUrl + '/upload/gallery';
        this.profileimageUrl = myGlobals.imageUrl + '/upload/profiles';
        this.serviceUrl = myGlobals.serviceUrl;
        this.imageUrl = myGlobals.imageUrl + '/upload/gallery/';
    }
    Object.defineProperty(ShareModalComponent.prototype, "currViewfoo", {
        get: function () {
            return this._currViewfoo;
        },
        set: function (v) {
            this._currViewfoo = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareModalComponent.prototype, "currImage", {
        get: function () {
            return this._currImage;
        },
        set: function (v) {
            this._currImage = v;
        },
        enumerable: true,
        configurable: true
    });
    ShareModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.router.routerState.parent(this.route).params.subscribe(function (params) {
            _this.subdomain = params['subdomain'];
        });
        window.fbAsyncInit = function () {
            FB.init({
                appId: '1762042520748053',
                xfbml: true,
                version: 'v2.7'
            });
        };
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    };
    ShareModalComponent.prototype.ngAfterViewInit = function () {
    };
    ShareModalComponent.prototype.socialshare = function (social) {
        var social = social;
        var shareUrl = 'http://localhost:5555/users/' + this.subdomain;
        if (!$.isEmptyObject(this.currImage)) {
            var viewfooid = this.currViewfoo.id;
            var postdetail = this.currViewfoo.viewfootitle;
            var img = this.imageUrl + this.currViewfoo.coverimage;
            var tags = this.currViewfoo.tags;
        }
        if (!$.isEmptyObject(this.currViewfoo)) {
            var viewfooid = this.currViewfoo.id;
            var postdetail = this.currViewfoo.viewfootitle;
            var img = this.imageUrl + this.currViewfoo.coverimage;
            var tags = this.currViewfoo.tags;
        }
        console.log(this.currImage);
        console.log(this.currViewfoo);
        var width = 550;
        var height = 450;
        var left = 100;
        var top = 100;
        if (social == "fb") {
            var url = shareUrl + '/' + viewfooid;
            FB.ui({
                method: 'share',
                name: 'viewfoo',
                link: url,
                caption: postdetail,
                message: postdetail,
                picture: img,
                href: shareUrl + '/' + viewfooid
            }, function (response) { });
        }
        else {
            if (social == "google") {
                var url = 'https://plus.google.com/share?url=' + shareUrl + '/' + viewfooid + '&description=' + postdetail + '&image=' + img;
            }
            else if (social == "tweeter") {
                var url = 'https://twitter.com/intent/tweet?text=' + postdetail + '&url=' + shareUrl + '/' + viewfooid + '&hashtags=' + tags;
            }
            else if (social == "linkedin") {
                var url = '//www.linkedin.com/shareArticle?mini=true&url=' + shareUrl + '/' + viewfooid + '&title=' + postdetail;
            }
            window.open(url, '', 'left=' + left + ' , top=' + top + ', width=' + width + ', height=' + height + ', personalbar=0, toolbar=0, scrollbars=1, resizable=1');
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ShareModalComponent.prototype, "currViewfoo", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ShareModalComponent.prototype, "currImage", null);
    ShareModalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sharemodal',
            templateUrl: 'sharemodal.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, auth_service_1.AuthService])
    ], ShareModalComponent);
    return ShareModalComponent;
}());
exports.ShareModalComponent = ShareModalComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvd2lkZ2V0cy9zaGFyZW1vZGFsL3NoYXJlbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxxQkFFSyxlQUFlLENBQUMsQ0FBQTtBQUNyQix1QkFBcUMsaUJBQWlCLENBQUMsQ0FBQTtBQUN2RCx1QkFBOEIsaUJBQWlCLENBQUMsQ0FBQTtBQUNoRCxzQkFBMEYsZ0JBQWdCLENBQUMsQ0FBQTtBQUUzRyw2QkFBNEIsNkJBQTZCLENBQUMsQ0FBQTtBQUUxRCxJQUFPLFNBQVMsV0FBVyxrQkFBa0IsQ0FBQyxDQUFDO0FBTy9DO0lBdUJJLDZCQUFvQixLQUFxQixFQUFVLE1BQWMsRUFBVSxXQUF3QjtRQUEvRSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQXJCbkcsYUFBUSxHQUFXLFNBQVMsQ0FBQyxRQUFRLEdBQUcsaUJBQWlCLENBQUM7UUFDMUQsb0JBQWUsR0FBVyxTQUFTLENBQUMsUUFBUSxHQUFHLGtCQUFrQixDQUFDO1FBRWxFLGVBQVUsR0FBVyxTQUFTLENBQUMsVUFBVSxDQUFDO1FBQzFDLGFBQVEsR0FBVyxTQUFTLENBQUMsUUFBUSxHQUFHLGtCQUFrQixDQUFDO0lBcUIzRCxDQUFDO0lBbEJRLHNCQUFZLDRDQUFXO2FBQXZCO1lBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQzthQUNELFVBQXVCLENBQU07WUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDMUIsQ0FBQzs7O09BSEE7SUFLUSxzQkFBWSwwQ0FBUzthQUFyQjtZQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7YUFDRCxVQUFxQixDQUFNO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLENBQUM7OztPQUhBO0lBV0Qs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QUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxPQUFPLEdBQUcsSUFBSSxHQUFHLFNBQVMsR0FBRyxHQUFHLEdBQUcsVUFBVSxHQUFHLEtBQUssR0FBRyxXQUFXLEdBQUcsTUFBTSxHQUFHLHVEQUF1RCxDQUFDLENBQUM7UUFDdkssQ0FBQztJQUNDLENBQUM7SUE3R0Q7UUFBQyxZQUFLLEVBQUU7OzBEQUFBO0lBT1I7UUFBQyxZQUFLLEVBQUU7O3dEQUFBO0lBdEJaO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFVBQVUsRUFBRSxDQUFDLGdDQUF3QixFQUFFLHdCQUFlLENBQUM7U0FDMUQsQ0FBQzs7MkJBQUE7SUF5SEYsMEJBQUM7QUFBRCxDQXhIQSxBQXdIQyxJQUFBO0FBeEhZLDJCQUFtQixzQkF3SC9CLENBQUEiLCJmaWxlIjoiYXBwL3NoYXJlZC93aWRnZXRzL3NoYXJlbW9kYWwvc2hhcmVtb2RhbC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZH1cbmZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JzLCBGb3JtQnVpbGRlciwgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVXNlciwgVmlld2ZvbywgQ29udGFpbmVyIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQge0N1c3RvbVZhbGlkYXRvcnN9IGZyb20gJy4uLy4uL3V0aWxzL0N1c3RvbVZhbGlkYXRvcnMnO1xuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uLy4uLy4uL2dsb2JhbHMnKTtcbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdzaGFyZW1vZGFsJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3NoYXJlbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMsIENPUkVfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgU2hhcmVNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBpbWFnZVVybDogc3RyaW5nID0gbXlHbG9iYWxzLmltYWdlVXJsICsgJy91cGxvYWQvZ2FsbGVyeSc7XG4gICAgcHJvZmlsZWltYWdlVXJsOiBzdHJpbmcgPSBteUdsb2JhbHMuaW1hZ2VVcmwgKyAnL3VwbG9hZC9wcm9maWxlcyc7XG5cbiAgICBzZXJ2aWNlVXJsOiBzdHJpbmcgPSBteUdsb2JhbHMuc2VydmljZVVybDtcbiAgICBpbWFnZVVybDogc3RyaW5nID0gbXlHbG9iYWxzLmltYWdlVXJsICsgJy91cGxvYWQvZ2FsbGVyeS8nO1xuICAgIHN1YjpzdHJpbmc7XG4gICAgc3ViZG9tYWluOnN0cmluZztcbiAgICBASW5wdXQoKSBwcml2YXRlIGdldCBjdXJyVmlld2ZvbygpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VyclZpZXdmb287XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgY3VyclZpZXdmb28odjogYW55KSB7XG4gICAgICAgIHRoaXMuX2N1cnJWaWV3Zm9vID0gdjtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBwcml2YXRlIGdldCBjdXJySW1hZ2UoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJJbWFnZTtcbiAgICB9XG4gICAgcHVibGljIHNldCBjdXJySW1hZ2UodjogYW55KSB7XG4gICAgICAgIHRoaXMuX2N1cnJJbWFnZSA9IHY7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xuICAgICAgIFxuICAgXG4gICAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAgdGhpcy5zdWIgPSB0aGlzLnJvdXRlci5yb3V0ZXJTdGF0ZS5wYXJlbnQodGhpcy5yb3V0ZSkucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdWJkb21haW4gPSBwYXJhbXNbJ3N1YmRvbWFpbiddO1xuXG4gICAgICAgIH0pO1xuICAgICAgIFxuICAgICAgICBcbiAgICAgICAgd2luZG93LmZiQXN5bmNJbml0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRGQi5pbml0KHtcblx0XHRcdFx0YXBwSWQ6ICcxNzYyMDQyNTIwNzQ4MDUzJyxcblx0XHRcdFx0eGZibWw6IHRydWUsXG5cdFx0XHRcdHZlcnNpb246ICd2Mi43J1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdChmdW5jdGlvbihkLCBzLCBpZCkge1xuXHRcdFx0dmFyIGpzLCBmanMgPSBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKHMpWzBdO1xuXHRcdFx0aWYgKGQuZ2V0RWxlbWVudEJ5SWQoaWQpKSB7IHJldHVybjsgfVxuXHRcdFx0anMgPSBkLmNyZWF0ZUVsZW1lbnQocyk7IGpzLmlkID0gaWQ7XG5cdFx0XHRqcy5zcmMgPSBcIi8vY29ubmVjdC5mYWNlYm9vay5uZXQvZW5fVVMvc2RrLmpzXCI7XG5cdFx0XHRmanMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoanMsIGZqcyk7XG5cdFx0fSAoZG9jdW1lbnQsICdzY3JpcHQnLCAnZmFjZWJvb2stanNzZGsnKSk7XG5cdFx0Ly8gd2luZG93LmZiQXN5bmNJbml0ID0gZnVuY3Rpb24oKSB7XG5cdFx0Ly8gXHRGQi5pbml0KHtcblx0XHQvLyBcdFx0YXBwSWQ6IFwiMTA4OTcyNjE5MTExOTU2M1wiLFxuXHRcdC8vIFx0XHR4ZmJtbDogdHJ1ZSxcblx0XHQvLyBcdFx0dmVyc2lvbjogJ3YyLjQnXG5cdFx0Ly8gXHR9KTtcbiAgICAgICAgLy9cblx0XHQvLyB9O1xuXHRcdC8vIChmdW5jdGlvbihkLCBzLCBpZCkge1xuXHRcdC8vIFx0dmFyIGpzLCBmanMgPSBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKHMpWzBdO1xuXHRcdC8vIFx0aWYgKGQuZ2V0RWxlbWVudEJ5SWQoaWQpKSB7IHJldHVybjsgfVxuXHRcdC8vIFx0anMgPSBkLmNyZWF0ZUVsZW1lbnQocyk7IGpzLmlkID0gaWQ7XG5cdFx0Ly8gXHRqcy5zcmMgPSBcIi8vY29ubmVjdC5mYWNlYm9vay5uZXQvZW5fVVMvc2RrLmpzXCI7XG5cdFx0Ly8gXHRmanMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoanMsIGZqcyk7XG5cdFx0Ly8gfSAoZG9jdW1lbnQsICdzY3JpcHQnLCAnZmFjZWJvb2stanNzZGsnKSk7XG5cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgfVxuXG4gICAgc29jaWFsc2hhcmUoc29jaWFsOiBzdHJpbmcpIHtcbiAgICAgICBcblx0XHRsZXQgc29jaWFsID0gc29jaWFsO1xuICAgICAgICAgICAgICAgIGxldCBzaGFyZVVybCA9ICdodHRwOi8vbG9jYWxob3N0OjU1NTUvdXNlcnMvJyt0aGlzLnN1YmRvbWFpbjtcbiAgICAgICAgICAgICAgICBpZiAoISQuaXNFbXB0eU9iamVjdCh0aGlzLmN1cnJJbWFnZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXdmb29pZCA9IHRoaXMuY3VyclZpZXdmb28uaWQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3N0ZGV0YWlsID0gdGhpcy5jdXJyVmlld2Zvby52aWV3Zm9vdGl0bGU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWcgPSB0aGlzLmltYWdlVXJsICsgdGhpcy5jdXJyVmlld2Zvby5jb3ZlcmltYWdlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGFncyA9IHRoaXMuY3VyclZpZXdmb28udGFncztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCEkLmlzRW1wdHlPYmplY3QodGhpcy5jdXJyVmlld2ZvbykpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXdmb29pZCA9IHRoaXMuY3VyclZpZXdmb28uaWQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3N0ZGV0YWlsID0gdGhpcy5jdXJyVmlld2Zvby52aWV3Zm9vdGl0bGU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWcgPSB0aGlzLmltYWdlVXJsICsgdGhpcy5jdXJyVmlld2Zvby5jb3ZlcmltYWdlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGFncyA9IHRoaXMuY3VyclZpZXdmb28udGFncztcbiAgICAgICAgICAgICAgICB9XG5cdFx0Y29uc29sZS5sb2codGhpcy5jdXJySW1hZ2UpO1xuXHRcdGNvbnNvbGUubG9nKHRoaXMuY3VyclZpZXdmb28pO1xuXG5cdFx0bGV0IHdpZHRoID0gNTUwOyBsZXQgaGVpZ2h0ID0gNDUwO1xuXG5cdFx0bGV0IGxlZnQgPSAxMDA7XG5cdFx0bGV0IHRvcCA9IDEwMDtcblx0XHRpZiAoc29jaWFsID09IFwiZmJcIikge1xuXHRcdFx0bGV0IHVybCA9IHNoYXJlVXJsICsgJy8nICsgdmlld2Zvb2lkO1xuICAgICAgICAgICAgRkIudWkoXG4gICAgICAgICAgICAgICAge1xuXHRcdFx0XHRcdG1ldGhvZDogJ3NoYXJlJyxcblx0XHRcdFx0XHRuYW1lOiAndmlld2ZvbycsXG5cdFx0XHRcdFx0bGluazogdXJsLFxuXHRcdFx0XHRcdGNhcHRpb246IHBvc3RkZXRhaWwsXG5cdFx0XHRcdFx0bWVzc2FnZTogcG9zdGRldGFpbCxcblx0XHRcdFx0XHRwaWN0dXJlOiBpbWcsXG5cdFx0XHRcdFx0aHJlZjogc2hhcmVVcmwgKyAnLycgKyB2aWV3Zm9vaWRcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkgeyB9KTtcblx0XHR9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHNvY2lhbCA9PSBcImdvb2dsZVwiKSB7XG5cdFx0XHRcdGxldCB1cmwgPSAnaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vc2hhcmU/dXJsPScgKyBzaGFyZVVybCArICcvJyArIHZpZXdmb29pZCArICcmZGVzY3JpcHRpb249JyArIHBvc3RkZXRhaWwgKyAnJmltYWdlPScgKyBpbWc7XG5cdFx0XHR9IGVsc2UgaWYgKHNvY2lhbCA9PSBcInR3ZWV0ZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gJ2h0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3RleHQ9JyArIHBvc3RkZXRhaWwgKyAnJnVybD0nICsgc2hhcmVVcmwgKyAnLycgKyB2aWV3Zm9vaWQgKyAnJmhhc2h0YWdzPScgKyB0YWdzO1xuXHRcdFx0fSBlbHNlIGlmIChzb2NpYWwgPT0gXCJsaW5rZWRpblwiKSB7XG5cdFx0XHRcdGxldCB1cmwgPSAnLy93d3cubGlua2VkaW4uY29tL3NoYXJlQXJ0aWNsZT9taW5pPXRydWUmdXJsPScgKyBzaGFyZVVybCArICcvJyArIHZpZXdmb29pZCArICcmdGl0bGU9JyArIHBvc3RkZXRhaWw7XG5cdFx0XHR9XG5cbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKHVybCwgJycsICdsZWZ0PScgKyBsZWZ0ICsgJyAsIHRvcD0nICsgdG9wICsgJywgd2lkdGg9JyArIHdpZHRoICsgJywgaGVpZ2h0PScgKyBoZWlnaHQgKyAnLCBwZXJzb25hbGJhcj0wLCB0b29sYmFyPTAsIHNjcm9sbGJhcnM9MSwgcmVzaXphYmxlPTEnKTtcblx0XHR9XG4gICAgfVxuXG59XG4iXX0=
