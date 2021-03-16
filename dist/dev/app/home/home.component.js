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
var gallaryview_component_1 = require('../home/center-gallary-view/gallaryview.component');
var list_component_1 = require('../home/center-list-view/list.component');
var tileview_component_1 = require('../home/center-tile-view/tileview.component');
var angular2_infinite_scroll_1 = require('angular2-infinite-scroll/angular2-infinite-scroll');
var HomeComponent = (function () {
    function HomeComponent(_router, authService) {
        this._router = _router;
        this.authService = authService;
        this.loading = false;
        this.viewfoolist = [];
        this.isTile = true;
        this.isListing = false;
        this.isGallary = false;
        this.viewfooTypeText = "View all ViewFoos";
        this.perpage = 20;
        this.pageno = 1;
        this.viewfootype = "all";
        this.totalcount = 0;
        this.viewfooloading = true;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var today = new Date();
        this.loginUser = myGlobals.LoginUser;
        var subscribeenddate = new Date(this.loginUser.subscriptionenddate);
        if (this.loginUser) {
            this.username = this.loginUser.firstname + " " + this.loginUser.lastname;
            if (subscribeenddate <= today) {
                myGlobals.LoginUser = this.loginUser;
                this._router.navigate(['/trialbilling']);
            }
            else {
                this.loading = true;
                this.loadviewfoo();
            }
        }
    };
    HomeComponent.prototype.onClickViewfooType = function (vType) {
        if (vType == "all") {
            this.viewfooTypeText = "View all ViewFoos";
        }
        else if (vType == "public") {
            this.viewfooTypeText = "View All Public";
        }
        else if (vType == "private") {
            this.viewfooTypeText = "View All Private";
        }
        else if (vType == "draft") {
            this.viewfooTypeText = "View All Draft";
        }
        this.viewfootype = vType;
        this.pageno = 1;
        this.loadviewfoo();
    };
    HomeComponent.prototype.loadviewfoo = function () {
        var _this = this;
        this.viewfooloading = true;
        this.authService.allviewfoolist(this.viewfootype, this.loginUser.id, this.perpage, this.pageno)
            .subscribe(function (result) {
            myGlobals.allViewfoo = result.data.viewfoolist;
            _this.totalcount = result.data.totalcount;
            if (_this.pageno == 1) {
                _this.viewfoolist = [];
            }
            for (var i = 0; i < myGlobals.allViewfoo.length; i++) {
                if (!myGlobals.allViewfoo[i].coverimage) {
                    myGlobals.allViewfoo[i].coverimage = "";
                }
                _this.viewfoolist.push(myGlobals.allViewfoo[i]);
            }
            _this.viewfooloading = false;
        }, function (error) {
            _this.viewfooloading = false;
            console.log("viewfoo list fail: " + error);
        });
    };
    HomeComponent.prototype.loadmoreviewfoo = function () {
        if (this.totalcount > this.viewfoolist.length) {
            this.pageno++;
            this.loadviewfoo();
        }
    };
    HomeComponent.prototype.addviewfoo = function () {
        this._router.navigate(['/addviewfoo']);
    };
    HomeComponent.prototype.selecttemplate = function () {
        this._router.navigate(['/select_template']);
    };
    HomeComponent.prototype.gotogallary = function (id) {
        var link = ['/gallary', id];
        this._router.navigate(link);
    };
    HomeComponent.prototype.settemplateview = function (val) {
        if (val == 'masonry') {
            this.isTile = true;
            this.isListing = false;
            this.isGallary = false;
        }
        else if (val == 'gallary') {
            this.isTile = false;
            this.isListing = false;
            this.isGallary = true;
        }
        else if (val == 'tile') {
            this.isTile = false;
            this.isListing = true;
            this.isGallary = false;
        }
    };
    HomeComponent.prototype.onDelViewfooHome = function ($event) {
        var _this = this;
        console.log("onDelViewfooHome : " + $event);
        this.authService.viewfoodelete($event)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
                _this.router.navigate(['/']);
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("viewfoo delete fail: " + error);
        });
    };
    HomeComponent.prototype.onScroll = function () {
        this.loadmoreviewfoo();
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home',
            templateUrl: 'home.component.html',
            directives: [gallaryview_component_1.GallaryViewComponent, list_component_1.ListViewComponent, tileview_component_1.TileViewComponent, angular2_infinite_scroll_1.InfiniteScroll]
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2hvbWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFDaEQsdUJBQWdELGlCQUFpQixDQUFDLENBQUE7QUFFbEUsNkJBQTRCLGlDQUFpQyxDQUFDLENBQUE7QUFHOUQsSUFBTyxTQUFTLFdBQVcsWUFBWSxDQUFDLENBQUM7QUFDekMsc0NBQXFDLG1EQUFtRCxDQUFDLENBQUE7QUFDekYsK0JBQWtDLHlDQUF5QyxDQUFDLENBQUE7QUFDNUUsbUNBQWtDLDZDQUE2QyxDQUFDLENBQUE7QUFFaEYseUNBQStCLG1EQUFtRCxDQUFDLENBQUE7QUFRbkY7SUFHSSx1QkFBb0IsT0FBZSxFQUFVLFdBQXdCO1FBQWpELFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUZyRSxZQUFPLEdBQVksS0FBSyxDQUFDO1FBTXpCLGdCQUFXLEdBQWMsRUFBRSxDQUFDO1FBRzVCLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBSTNCLG9CQUFlLEdBQVcsbUJBQW1CLENBQUM7UUFFOUMsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBRW5CLGdCQUFXLEdBQVcsS0FBSyxDQUFDO1FBRTVCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsbUJBQWMsR0FBWSxJQUFJLENBQUM7SUFwQi9CLENBQUM7SUEwQkQsZ0NBQVEsR0FBUjtRQUNJLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQ3JDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FB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QUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFdBQVcsRUFBRSxxQkFBcUI7WUFDbEMsVUFBVSxFQUFFLENBQUMsNENBQW9CLEVBQUUsa0NBQWlCLEVBQUUsc0NBQWlCLEVBQUUseUNBQWMsQ0FBQztTQUMzRixDQUFDOztxQkFBQTtJQThKRixvQkFBQztBQUFELENBN0pBLEFBNkpDLElBQUE7QUE3SlkscUJBQWEsZ0JBNkp6QixDQUFBIiwiZmlsZSI6ImFwcC9ob21lL2hvbWUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JvdXRlcywgUm91dGVyLCBST1VURVJfRElSRUNUSVZFU30gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld2ZvbyB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi9nbG9iYWxzJyk7XG5pbXBvcnQgeyBHYWxsYXJ5Vmlld0NvbXBvbmVudCB9IGZyb20gJy4uL2hvbWUvY2VudGVyLWdhbGxhcnktdmlldy9nYWxsYXJ5dmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlzdFZpZXdDb21wb25lbnQgfSBmcm9tICcuLi9ob21lL2NlbnRlci1saXN0LXZpZXcvbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGlsZVZpZXdDb21wb25lbnQgfSBmcm9tICcuLi9ob21lL2NlbnRlci10aWxlLXZpZXcvdGlsZXZpZXcuY29tcG9uZW50JztcblxuaW1wb3J0IHsgSW5maW5pdGVTY3JvbGwgfSBmcm9tICdhbmd1bGFyMi1pbmZpbml0ZS1zY3JvbGwvYW5ndWxhcjItaW5maW5pdGUtc2Nyb2xsJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2hvbWUnLFxuICAgIHRlbXBsYXRlVXJsOiAnaG9tZS5jb21wb25lbnQuaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW0dhbGxhcnlWaWV3Q29tcG9uZW50LCBMaXN0Vmlld0NvbXBvbmVudCwgVGlsZVZpZXdDb21wb25lbnQsIEluZmluaXRlU2Nyb2xsXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIHZpZXdmb29saXN0OiBWaWV3Zm9vW10gPSBbXTtcbiAgICB1c2VybmFtZTogc3RyaW5nO1xuXG4gICAgaXNUaWxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBpc0xpc3Rpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc0dhbGxhcnk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGxvZ2luVXNlcjogYW55O1xuICAgIFxuICAgIHZpZXdmb29UeXBlVGV4dDogc3RyaW5nID0gXCJWaWV3IGFsbCBWaWV3Rm9vc1wiO1xuXG4gICAgcGVycGFnZTogbnVtYmVyID0gMjA7XG4gICAgcGFnZW5vOiBudW1iZXIgPSAxO1xuXG4gICAgdmlld2Zvb3R5cGU6IHN0cmluZyA9IFwiYWxsXCI7XG5cbiAgICB0b3RhbGNvdW50OiBudW1iZXIgPSAwO1xuXG4gICAgdmlld2Zvb2xvYWRpbmc6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgICAgICB0aGlzLmxvZ2luVXNlciA9IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZVsndXNlciddIHx8ICd7fScpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLmxvZ2luVXNlciA9IG15R2xvYmFscy5Mb2dpblVzZXI7XG4gICAgICAgIGxldCBzdWJzY3JpYmVlbmRkYXRlID0gbmV3IERhdGUodGhpcy5sb2dpblVzZXIuc3Vic2NyaXB0aW9uZW5kZGF0ZSk7XG4gICAgICAgIGlmICh0aGlzLmxvZ2luVXNlcikge1xuICAgICAgICAgICAgdGhpcy51c2VybmFtZSA9IHRoaXMubG9naW5Vc2VyLmZpcnN0bmFtZSArIFwiIFwiICsgdGhpcy5sb2dpblVzZXIubGFzdG5hbWU7XG5cbiAgICAgICAgICAgIGlmIChzdWJzY3JpYmVlbmRkYXRlIDw9IHRvZGF5KSB7XG4gICAgICAgICAgICAgICAgbXlHbG9iYWxzLkxvZ2luVXNlciA9IHRoaXMubG9naW5Vc2VyO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy90cmlhbGJpbGxpbmcnXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZHZpZXdmb28oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xpY2tWaWV3Zm9vVHlwZSh2VHlwZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2VHlwZSA9PSBcImFsbFwiKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdmb29UeXBlVGV4dCA9IFwiVmlldyBhbGwgVmlld0Zvb3NcIlxuICAgICAgICB9IGVsc2UgaWYgKHZUeXBlID09IFwicHVibGljXCIpIHtcbiAgICAgICAgICAgIHRoaXMudmlld2Zvb1R5cGVUZXh0ID0gXCJWaWV3IEFsbCBQdWJsaWNcIlxuICAgICAgICB9IGVsc2UgaWYgKHZUeXBlID09IFwicHJpdmF0ZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdmb29UeXBlVGV4dCA9IFwiVmlldyBBbGwgUHJpdmF0ZVwiXG4gICAgICAgIH0gZWxzZSBpZiAodlR5cGUgPT0gXCJkcmFmdFwiKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdmb29UeXBlVGV4dCA9IFwiVmlldyBBbGwgRHJhZnRcIlxuICAgICAgICB9XG4gICAgICAgIHRoaXMudmlld2Zvb3R5cGUgPSB2VHlwZTtcbiAgICAgICAgdGhpcy5wYWdlbm8gPSAxO1xuICAgICAgICB0aGlzLmxvYWR2aWV3Zm9vKCk7XG4gICAgfVxuXG4gICAgbG9hZHZpZXdmb28oKSB7XG4gICAgICAgIHRoaXMudmlld2Zvb2xvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmFsbHZpZXdmb29saXN0KHRoaXMudmlld2Zvb3R5cGUsIHRoaXMubG9naW5Vc2VyLmlkLCB0aGlzLnBlcnBhZ2UsIHRoaXMucGFnZW5vKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImFmdGVyIHBhZ2UgY2hhbmdlXCIpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICBteUdsb2JhbHMuYWxsVmlld2ZvbyA9IHJlc3VsdC5kYXRhLnZpZXdmb29saXN0O1xuICAgICAgICAgICAgICAgIHRoaXMudG90YWxjb3VudCA9IHJlc3VsdC5kYXRhLnRvdGFsY291bnQ7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdlbm8gPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdmb29saXN0ID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXlHbG9iYWxzLmFsbFZpZXdmb28ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFteUdsb2JhbHMuYWxsVmlld2Zvb1tpXS5jb3ZlcmltYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBteUdsb2JhbHMuYWxsVmlld2Zvb1tpXS5jb3ZlcmltYWdlID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdmb29saXN0LnB1c2gobXlHbG9iYWxzLmFsbFZpZXdmb29baV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInZpZXdmb29saXN0XCIpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudmlld2Zvb2xpc3QpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Zm9vbG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld2Zvb2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpZXdmb28gbGlzdCBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgbG9hZG1vcmV2aWV3Zm9vKCkge1xuICAgICAgICBpZiAodGhpcy50b3RhbGNvdW50ID4gdGhpcy52aWV3Zm9vbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZW5vKys7XG4gICAgICAgICAgICB0aGlzLmxvYWR2aWV3Zm9vKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8kKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAkKGRvY3VtZW50KS5oZWlnaHQoKSB9LCAxMDAwKTtcbiAgICB9XG5cblxuICAgIGFkZHZpZXdmb28oKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9hZGR2aWV3Zm9vJ10pO1xuICAgIH1cblxuICAgIHNlbGVjdHRlbXBsYXRlKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvc2VsZWN0X3RlbXBsYXRlJ10pO1xuICAgIH1cblxuICAgIGdvdG9nYWxsYXJ5KGlkKSB7XG4gICAgICAgIGxldCBsaW5rID0gWycvZ2FsbGFyeScsIGlkXTtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKGxpbmspO1xuICAgIH1cblxuICAgIHNldHRlbXBsYXRldmlldyh2YWwpIHtcbiAgICAgICAgaWYgKHZhbCA9PSAnbWFzb25yeScpIHtcbiAgICAgICAgICAgIHRoaXMuaXNUaWxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaXNMaXN0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzR2FsbGFyeSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbCA9PSAnZ2FsbGFyeScpIHtcbiAgICAgICAgICAgIHRoaXMuaXNUaWxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzTGlzdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc0dhbGxhcnkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbCA9PSAndGlsZScpIHtcbiAgICAgICAgICAgIHRoaXMuaXNUaWxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzTGlzdGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmlzR2FsbGFyeSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EZWxWaWV3Zm9vSG9tZSgkZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkRlbFZpZXdmb29Ib21lIDogXCIgKyAkZXZlbnQpO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb29kZWxldGUoJGV2ZW50KVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLyddKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlld2ZvbyBkZWxldGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiBJbmZpbml0ZVNjcm9sbCBFdmVudCAqL1xuICAgIG9uU2Nyb2xsKCkge1xuICAgICAgICB0aGlzLmxvYWRtb3Jldmlld2ZvbygpO1xuICAgIH1cbn1cbiJdfQ==
