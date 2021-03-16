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
var mapToIterable_1 = require('../shared/pipes/mapToIterable');
var gallaryview_component_1 = require('../shared/widgets/gallaryview/gallaryview.component');
var carouselview_component_1 = require('../shared/widgets/carouselview/carouselview.component');
var commentmodal_component_1 = require('../shared/widgets/commentmodal/commentmodal.component');
var sharemodal_component_1 = require('../shared/widgets/sharemodal/sharemodal.component');
var PublicViewfooDetailComponent = (function () {
    function PublicViewfooDetailComponent(route, router, authService) {
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.currentViewfoo = {};
        this.viewfooloading = false;
        this.currViewfooComment = {};
        this.currViewfooImageShare = {};
        this.currViewfooShare = {};
        this.isModelCommentHiddenRegistered = false;
        this.imageUrl = myGlobals.imageUrl + '/upload/gallery';
        this.userhomesettings = {};
        this.currViewfooImage = {};
        this.arrayRows = [];
        this.arrayRowsHeight = [];
        this.isSingleViewfoo = false;
        this.isDashboard = false;
        console.log("PublicViewfooDetailComponent constructor");
    }
    PublicViewfooDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.route.url.value[0].path == "singleviewfoo") {
            this.isSingleViewfoo = true;
        }
        if (this.route.url.value[0].path == "viewfoodetail") {
            this.isDashboard = true;
        }
        this.sub = this.route.params.subscribe(function (params) {
            _this.viewfooid = params['viewfooid'];
            _this.getPublicViewfooDetail();
        });
        if (!this.isSingleViewfoo) {
            this.sub = this.router.routerState.parent(this.route).params.subscribe(function (params) {
                _this.subdomain = params['subdomain'];
                _this.getUserHomepageSettings();
            });
        }
    };
    PublicViewfooDetailComponent.prototype.getUserHomepageSettings = function () {
        var _this = this;
        this.authService.userpublichomesettings(this.subdomain)
            .subscribe(function (result) {
            _this.userhomesettings = result.data;
            if (_this.userhomesettings.disablerightmousebtn == 'true') {
            }
        }, function (error) {
            console.log("public homepage setting fail: " + error);
        });
    };
    PublicViewfooDetailComponent.prototype.getPublicViewfooDetail = function () {
        var _this = this;
        console.log("publicviewfoodetail getPublicViewfooDetail viewfooid: "
            + this.viewfooid);
        this.viewfooloading = true;
        this.authService.viewfooDetail(this.viewfooid)
            .subscribe(function (result) {
            var cols = {};
            var colCount = 0;
            console.log("total container : " + result.data.containers.length);
            var maxheight = 0;
            var maxheightImageC = 0;
            var previousRow = 0;
            var currentRow = 0;
            var rows = {};
            _this.arrayRows = [];
            _this.arrayRowsHeight = [];
            var containers = result.data.containers;
            for (var i = 0; i < containers.length; i++) {
                var container = containers[i];
                var ngGridItemOptionsRow = container.ngGridItemOptions.row;
                var ngGridItemOptionsCol = container.ngGridItemOptions.col;
                if (!rows.hasOwnProperty(ngGridItemOptionsRow)) {
                    rows[ngGridItemOptionsRow] = {};
                }
                rows[ngGridItemOptionsRow][ngGridItemOptionsCol] = container;
            }
            console.log(rows);
            _this.containersSorted = [];
            for (var rowkey in rows) {
                var colArray = rows[rowkey];
                for (var colkey in colArray) {
                    _this.containersSorted.push(colArray[colkey]);
                }
            }
            for (var i = 0; i < _this.containersSorted.length; i++) {
                var container = _this.containersSorted[i];
                container.imagedefaultno = parseInt(result.data.imagedefaultno);
                container.colclass = "col-md-" + container.ngGridItemOptions.sizex + "  ";
                if (result.data.imageinfoframe == 'true') {
                    container.heightSizeY = 68 * container.ngGridItemOptions.sizey;
                }
                else {
                    container.heightSizeY = 98 * container.ngGridItemOptions.sizey;
                }
                for (var ci = 0; ci < container.containerimages.length; ci++) {
                    var objCI = container.containerimages[ci];
                    if (objCI.imagename) {
                        objCI.imagename = _this.imageUrl + "/" + objCI.imagename;
                    }
                    if (objCI.thumbimagename) {
                        objCI.thumbimagename = _this.imageUrl + "/" + objCI.thumbimagename;
                    }
                }
            }
            _this.viewfooloading = false;
            _this.currentViewfoo = result.data;
        }, function (error) {
            _this.viewfooloading = false;
            console.log("viewfoo list fail: " + error);
        });
    };
    PublicViewfooDetailComponent.prototype.onViewfooComment = function (vfl) {
        this.currViewfooComment = vfl;
        this.currViewfooImage = {};
        $('#commentphoto_modal').modal('show');
        if (!this.isModelCommentHiddenRegistered) {
            this.isModelCommentHiddenRegistered = true;
            $('#commentphoto_modal').on('hidden.bs.modal', function (e) {
                this.currViewfooComment = {};
                this.currViewfooImage = {};
            });
        }
    };
    PublicViewfooDetailComponent.prototype.onImageComment = function (containerimage) {
        this.currViewfooImage = containerimage;
        this.currViewfooComment = {};
        $('#commentphoto_modal').modal('show');
        if (!this.isModelCommentHiddenRegistered) {
            this.isModelCommentHiddenRegistered = true;
            $('#commentphoto_modal').on('hidden.bs.modal', function (e) {
                this.currViewfooComment = {};
                this.currViewfooImage = {};
            });
        }
    };
    PublicViewfooDetailComponent.prototype.onViewfooShare = function (vfl) {
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
    PublicViewfooDetailComponent.prototype.onImageShare = function (containerimage) {
        this.currViewfooImageShare = containerimage;
        this.currViewfooShare = {};
        $('#SelectPhotoModal').modal('show');
        if (!this.isModelCommentHiddenRegistered) {
            this.isModelCommentHiddenRegistered = true;
            $('#SelectPhotoModal').on('hidden.bs.modal', function (e) {
                this.currViewfooShare = {};
                this.currViewfooImageShare = {};
            });
        }
    };
    PublicViewfooDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'publicviewfoodetail',
            templateUrl: 'publicviewfoodetail.component.html',
            pipes: [mapToIterable_1.MapToIterable],
            directives: [router_1.ROUTER_DIRECTIVES, gallaryview_component_1.GallaryViewComponent, carouselview_component_1.CarouselViewComponent, commentmodal_component_1.CommentModalComponent, sharemodal_component_1.ShareModalComponent]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, auth_service_1.AuthService])
    ], PublicViewfooDetailComponent);
    return PublicViewfooDetailComponent;
}());
exports.PublicViewfooDetailComponent = PublicViewfooDetailComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9wdWJsaWN2aWV3Zm9vbGlzdC9wdWJsaWN2aWV3Zm9vZGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBQ2hELHVCQUF3RCxpQkFBaUIsQ0FBQyxDQUFBO0FBQzFFLDZCQUE0QixpQ0FBaUMsQ0FBQyxDQUFBO0FBRTlELElBQU8sU0FBUyxXQUFXLFlBQVksQ0FBQyxDQUFDO0FBSXpDLDhCQUE4QiwrQkFBK0IsQ0FBQyxDQUFBO0FBRTlELHNDQUFxQyxxREFBcUQsQ0FBQyxDQUFBO0FBRTNGLHVDQUFzQyx1REFBdUQsQ0FBQyxDQUFBO0FBQzlGLHVDQUFzQyx1REFBdUQsQ0FBQyxDQUFBO0FBQzlGLHFDQUFvQyxtREFBbUQsQ0FBQyxDQUFBO0FBU3hGO0lBd0JFLHNDQUFvQixLQUFxQixFQUFVLE1BQWMsRUFBVSxXQUF3QjtRQUEvRSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQXBCbkcsbUJBQWMsR0FBUSxFQUFFLENBQUM7UUFDekIsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsdUJBQWtCLEdBQVksRUFBRSxDQUFDO1FBRWpDLDBCQUFxQixHQUFhLEVBQUUsQ0FBQztRQUNyQyxxQkFBZ0IsR0FBVyxFQUFFLENBQUM7UUFFOUIsbUNBQThCLEdBQVksS0FBSyxDQUFDO1FBQ2hELGFBQVEsR0FBVyxTQUFTLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDO1FBRW5ELHFCQUFnQixHQUFRLEVBQUUsQ0FBQztRQUNsQyxxQkFBZ0IsR0FBYyxFQUFFLENBQUM7UUFHakMsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUNwQixvQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUUxQixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUkzQixPQUFP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QUFDLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsOEJBQThCLEdBQUcsSUFBSSxDQUFDO1lBQzNDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxVQUFTLENBQUM7Z0JBQ25ELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQXBPSDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixXQUFXLEVBQUUsb0NBQW9DO1lBQ2pELEtBQUssRUFBRSxDQUFDLDZCQUFhLENBQUM7WUFDdEIsVUFBVSxFQUFFLENBQUMsMEJBQWlCLEVBQUUsNENBQW9CLEVBQUUsOENBQXFCLEVBQUUsOENBQXFCLEVBQUMsMENBQW1CLENBQUM7U0FDeEgsQ0FBQzs7b0NBQUE7SUFnT0YsbUNBQUM7QUFBRCxDQS9OQSxBQStOQyxJQUFBO0FBL05ZLG9DQUE0QiwrQkErTnhDLENBQUEiLCJmaWxlIjoiYXBwL3B1YmxpY3ZpZXdmb29saXN0L3B1YmxpY3ZpZXdmb29kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLCBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcblxuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uL2dsb2JhbHMnKTtcblxuaW1wb3J0IHsgVmlld2ZvbywgRm9sZGVyLCBDb250YWluZXIgfSBmcm9tICcuLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7IE1hcFRvSXRlcmFibGUgfSBmcm9tICcuLi9zaGFyZWQvcGlwZXMvbWFwVG9JdGVyYWJsZSc7XG5cbmltcG9ydCB7IEdhbGxhcnlWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3dpZGdldHMvZ2FsbGFyeXZpZXcvZ2FsbGFyeXZpZXcuY29tcG9uZW50JztcblxuaW1wb3J0IHsgQ2Fyb3VzZWxWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3dpZGdldHMvY2Fyb3VzZWx2aWV3L2Nhcm91c2Vsdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbWVudE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3dpZGdldHMvY29tbWVudG1vZGFsL2NvbW1lbnRtb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hhcmVNb2RhbENvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC93aWRnZXRzL3NoYXJlbW9kYWwvc2hhcmVtb2RhbC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdwdWJsaWN2aWV3Zm9vZGV0YWlsJyxcbiAgdGVtcGxhdGVVcmw6ICdwdWJsaWN2aWV3Zm9vZGV0YWlsLmNvbXBvbmVudC5odG1sJyxcbiAgcGlwZXM6IFtNYXBUb0l0ZXJhYmxlXSxcbiAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTLCBHYWxsYXJ5Vmlld0NvbXBvbmVudCwgQ2Fyb3VzZWxWaWV3Q29tcG9uZW50LCBDb21tZW50TW9kYWxDb21wb25lbnQsU2hhcmVNb2RhbENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHVibGljVmlld2Zvb0RldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgc3ViZG9tYWluOiBzdHJpbmc7XG4gIHZpZXdmb29pZDogc3RyaW5nO1xuICBjdXJyZW50Vmlld2ZvbzogYW55ID0ge307XG4gIHZpZXdmb29sb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIGN1cnJWaWV3Zm9vQ29tbWVudDogVmlld2ZvbyA9IHt9O1xuICBjb250YWluZXJzU29ydGVkOiBhbnk7XG4gIGN1cnJWaWV3Zm9vSW1hZ2VTaGFyZTpDb250YWluZXIgPSB7fTtcbiAgY3VyclZpZXdmb29TaGFyZTpWaWV3Zm9vID0ge307XG5cbiAgaXNNb2RlbENvbW1lbnRIaWRkZW5SZWdpc3RlcmVkOiBib29sZWFuID0gZmFsc2U7XG4gIGltYWdlVXJsOiBzdHJpbmcgPSBteUdsb2JhbHMuaW1hZ2VVcmwgKyAnL3VwbG9hZC9nYWxsZXJ5JztcbiAgdmlld2Zvb2NvbW1lbnR0eXBlOiBzdHJpbmc7XG4gIHB1YmxpYyB1c2VyaG9tZXNldHRpbmdzOiBhbnkgPSB7fTtcbiAgY3VyclZpZXdmb29JbWFnZTogQ29udGFpbmVyID0ge307XG4gIHN1YjogYW55O1xuXG4gIGFycmF5Um93czogYW55ID0gW107XG4gIGFycmF5Um93c0hlaWdodDogYW55ID0gW107XG5cbiAgaXNTaW5nbGVWaWV3Zm9vOiBib29sZWFuID0gZmFsc2U7XG4gIGlzRGFzaGJvYXJkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XG5cbiAgICBjb25zb2xlLmxvZyhcIlB1YmxpY1ZpZXdmb29EZXRhaWxDb21wb25lbnQgY29uc3RydWN0b3JcIik7XG4gICAgLy8gYXV0aFNlcnZpY2UucHVibGljVmlld2Zvb0NoYW5nZWQkLnN1YnNjcmliZShcbiAgICAvLyAgICAgaXRlbSA9PiB7XG4gICAgLy8gICAgICAgICAvL2NvbnNvbGUubG9nKFwiUHVibGljVmlld2Zvb0xpc3RDb21wb25lbnQgcHVibGljVmlld2Zvb0NoYW5nZWQgXCIrSlNPTi5zdHJpbmdpZnkoaXRlbSkpO1xuICAgIC8vICAgICAgICAgaWYgKGl0ZW0uYWN0aW9uID09IFwicHVibGljaG9tZXBhZ2VzZXR0aW5nXCIpIHtcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnVzZXJob21lc2V0dGluZ3MgPSBpdGVtLmRhdGE7XG4gICAgLy9cbiAgICAvL1xuICAgIC8vICAgICAgICAgfSBlbHNlIGlmIChpdGVtLmFjdGlvbiA9PSBcIm9uRm9sZGVyQ2xpY2tcIikge1xuICAgIC8vXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgICAvL3RoaXMucmVmcmVzaEltYWdlKGl0ZW0pO1xuICAgIC8vICAgICB9KTtcblxuICAgIC8vIHRoaXMuZ2V0UHVibGljVmlld2Zvb2xpc3QoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLnJvdXRlLnVybC52YWx1ZVswXS5wYXRoID09IFwic2luZ2xldmlld2Zvb1wiKSB7XG4gICAgICB0aGlzLmlzU2luZ2xlVmlld2ZvbyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucm91dGUudXJsLnZhbHVlWzBdLnBhdGggPT0gXCJ2aWV3Zm9vZGV0YWlsXCIpIHtcbiAgICAgIHRoaXMuaXNEYXNoYm9hcmQgPSB0cnVlO1xuICAgICAgLy9hbGVydChcImRhc2hib2FyZFwiKTtcbiAgICB9XG5cbiAgICB0aGlzLnN1YiA9IHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgdGhpcy52aWV3Zm9vaWQgPSBwYXJhbXNbJ3ZpZXdmb29pZCddO1xuICAgICAgdGhpcy5nZXRQdWJsaWNWaWV3Zm9vRGV0YWlsKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoIXRoaXMuaXNTaW5nbGVWaWV3Zm9vKSB7XG4gICAgICB0aGlzLnN1YiA9IHRoaXMucm91dGVyLnJvdXRlclN0YXRlLnBhcmVudCh0aGlzLnJvdXRlKS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICAgIHRoaXMuc3ViZG9tYWluID0gcGFyYW1zWydzdWJkb21haW4nXTtcblxuICAgICAgICB0aGlzLmdldFVzZXJIb21lcGFnZVNldHRpbmdzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRVc2VySG9tZXBhZ2VTZXR0aW5ncygpIHtcbiAgICB0aGlzLmF1dGhTZXJ2aWNlLnVzZXJwdWJsaWNob21lc2V0dGluZ3ModGhpcy5zdWJkb21haW4pXG4gICAgICAuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4ge1xuXG4gICAgICAgIC8vIHRoaXMuYXV0aFNlcnZpY2UucHVibGljVmlld2Zvb0NoYW5nZVNvdXJjZS5uZXh0KHtcbiAgICAgICAgLy8gICAgIGFjdGlvbjogXCJwdWJsaWNob21lcGFnZXNldHRpbmdcIixcbiAgICAgICAgLy8gICAgIGRhdGE6IHJlc3VsdC5kYXRhXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIHRoaXMudXNlcmhvbWVzZXR0aW5ncyA9IHJlc3VsdC5kYXRhO1xuXG4gICAgICAgIGlmICh0aGlzLnVzZXJob21lc2V0dGluZ3MuZGlzYWJsZXJpZ2h0bW91c2VidG4gPT0gJ3RydWUnKSB7XG4gICAgICAgICAgLy8gZG9jdW1lbnQub25tb3VzZWRvd24gPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIC8vICAgICB2YXIgc3RhdHVzPVwiUmlnaHQgQ2xpY2sgRGlzYWJsZWRcIjtcbiAgICAgICAgICAvLyAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PSAyKSB7XG4gICAgICAgICAgLy8gXHRcdGFsZXJ0KHN0YXR1cyk7XG4gICAgICAgICAgLy8gXHRcdHJldHVybiBmYWxzZTtcbiAgICAgICAgICAvLyBcdH1cbiAgICAgICAgICAvLyB9O1xuICAgICAgICB9XG5cbiAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicHVibGljIGhvbWVwYWdlIHNldHRpbmcgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIGdldFB1YmxpY1ZpZXdmb29EZXRhaWwoKSB7XG4gICAgY29uc29sZS5sb2coXCJwdWJsaWN2aWV3Zm9vZGV0YWlsIGdldFB1YmxpY1ZpZXdmb29EZXRhaWwgdmlld2Zvb2lkOiBcIlxuICAgICAgKyB0aGlzLnZpZXdmb29pZCk7XG4gICAgdGhpcy52aWV3Zm9vbG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5hdXRoU2VydmljZS52aWV3Zm9vRGV0YWlsKHRoaXMudmlld2Zvb2lkKVxuICAgICAgLnN1YnNjcmliZSgocmVzdWx0OiBhbnkpID0+IHtcblxuICAgICAgICB2YXIgY29sczogYW55ID0ge307XG4gICAgICAgIHZhciBjb2xDb3VudCA9IDA7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidG90YWwgY29udGFpbmVyIDogXCIgKyByZXN1bHQuZGF0YS5jb250YWluZXJzLmxlbmd0aCk7XG5cbiAgICAgICAgdmFyIG1heGhlaWdodCA9IDA7XG4gICAgICAgIHZhciBtYXhoZWlnaHRJbWFnZUMgPSAwO1xuICAgICAgICB2YXIgcHJldmlvdXNSb3cgPSAwO1xuICAgICAgICB2YXIgY3VycmVudFJvdyA9IDA7XG5cbiAgICAgICAgdmFyIHJvd3M6IGFueSA9IHt9XG4gICAgICAgIHRoaXMuYXJyYXlSb3dzID0gW107XG4gICAgICAgIHRoaXMuYXJyYXlSb3dzSGVpZ2h0ID0gW107XG5cbiAgICAgICAgdmFyIGNvbnRhaW5lcnMgPSByZXN1bHQuZGF0YS5jb250YWluZXJzO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSBjb250YWluZXJzW2ldO1xuICAgICAgICAgIHZhciBuZ0dyaWRJdGVtT3B0aW9uc1JvdyA9IGNvbnRhaW5lci5uZ0dyaWRJdGVtT3B0aW9ucy5yb3c7XG4gICAgICAgICAgdmFyIG5nR3JpZEl0ZW1PcHRpb25zQ29sID0gY29udGFpbmVyLm5nR3JpZEl0ZW1PcHRpb25zLmNvbDtcbiAgICAgICAgICBpZiAoIXJvd3MuaGFzT3duUHJvcGVydHkobmdHcmlkSXRlbU9wdGlvbnNSb3cpKSB7XG4gICAgICAgICAgICByb3dzW25nR3JpZEl0ZW1PcHRpb25zUm93XSA9IHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByb3dzW25nR3JpZEl0ZW1PcHRpb25zUm93XVtuZ0dyaWRJdGVtT3B0aW9uc0NvbF0gPSBjb250YWluZXI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2cocm93cyk7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXJzU29ydGVkID0gW107XG4gICAgICAgIGZvciAodmFyIHJvd2tleSBpbiByb3dzKSB7XG4gICAgICAgICAgdmFyIGNvbEFycmF5ID0gcm93c1tyb3drZXldO1xuICAgICAgICAgIGZvciAodmFyIGNvbGtleSBpbiBjb2xBcnJheSkge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXJzU29ydGVkLnB1c2goY29sQXJyYXlbY29sa2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY29udGFpbmVyc1NvcnRlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcnNTb3J0ZWRbaV07XG4gICAgICAgICAgY29udGFpbmVyLmltYWdlZGVmYXVsdG5vID0gcGFyc2VJbnQocmVzdWx0LmRhdGEuaW1hZ2VkZWZhdWx0bm8pO1xuXG4gICAgICAgICAgY29udGFpbmVyLmNvbGNsYXNzID0gXCJjb2wtbWQtXCIgKyBjb250YWluZXIubmdHcmlkSXRlbU9wdGlvbnMuc2l6ZXggKyBcIiAgXCI7XG4gICAgICAgICAgLy9jb250YWluZXIucm93aGVpZ2h0ID0gMTUwICogY29udGFpbmVyLmNvbnRhaW5lcnJvd3MgKyA2MztcbiAgICAgICAgICAvL2NvbnRhaW5lci5sZWZ0UG9zaXRpb24gPSA2OCAqIChjb250YWluZXIubmdHcmlkSXRlbU9wdGlvbnMuY29sIC0gMSk7XG4gICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLmltYWdlaW5mb2ZyYW1lID09ICd0cnVlJykge1xuICAgICAgICAgICAgY29udGFpbmVyLmhlaWdodFNpemVZID0gNjggKiBjb250YWluZXIubmdHcmlkSXRlbU9wdGlvbnMuc2l6ZXk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5oZWlnaHRTaXplWSA9IDk4ICogY29udGFpbmVyLm5nR3JpZEl0ZW1PcHRpb25zLnNpemV5O1xuICAgICAgICAgIH1cblxuXG4gICAgICAgICAgZm9yKHZhciBjaT0wOyBjaSA8IGNvbnRhaW5lci5jb250YWluZXJpbWFnZXMubGVuZ3RoOyBjaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBvYmpDSTogYW55ID0gY29udGFpbmVyLmNvbnRhaW5lcmltYWdlc1tjaV07XG5cbiAgICAgICAgICAgICAgaWYob2JqQ0kuaW1hZ2VuYW1lKSB7XG4gICAgICAgICAgICAgICAgICBvYmpDSS5pbWFnZW5hbWUgPSB0aGlzLmltYWdlVXJsK1wiL1wiK29iakNJLmltYWdlbmFtZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZihvYmpDSS50aHVtYmltYWdlbmFtZSkge1xuICAgICAgICAgICAgICAgICAgb2JqQ0kudGh1bWJpbWFnZW5hbWUgPSB0aGlzLmltYWdlVXJsK1wiL1wiK29iakNJLnRodW1iaW1hZ2VuYW1lO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52aWV3Zm9vbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWV3Zm9vID0gcmVzdWx0LmRhdGE7XG5cblxuICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy52aWV3Zm9vbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZyhcInZpZXdmb28gbGlzdCBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG4gIG9uVmlld2Zvb0NvbW1lbnQodmZsOiBWaWV3Zm9vKSB7XG4gICAgLy9hbGVydCh2Y3QpO1xuICAgIHRoaXMuY3VyclZpZXdmb29Db21tZW50ID0gdmZsO1xuICAgIHRoaXMuY3VyclZpZXdmb29JbWFnZSA9IHt9O1xuICAgICQoJyNjb21tZW50cGhvdG9fbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuICAgIGlmICghdGhpcy5pc01vZGVsQ29tbWVudEhpZGRlblJlZ2lzdGVyZWQpIHtcbiAgICAgIHRoaXMuaXNNb2RlbENvbW1lbnRIaWRkZW5SZWdpc3RlcmVkID0gdHJ1ZTtcbiAgICAgICQoJyNjb21tZW50cGhvdG9fbW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLmN1cnJWaWV3Zm9vQ29tbWVudCA9IHt9O1xuICAgICAgICB0aGlzLmN1cnJWaWV3Zm9vSW1hZ2UgPSB7fTtcblxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIG9uSW1hZ2VDb21tZW50KGNvbnRhaW5lcmltYWdlOiBDb250YWluZXIpIHtcbiAgICB0aGlzLmN1cnJWaWV3Zm9vSW1hZ2UgPSBjb250YWluZXJpbWFnZTtcbiAgICB0aGlzLmN1cnJWaWV3Zm9vQ29tbWVudCA9IHt9O1xuICAgICQoJyNjb21tZW50cGhvdG9fbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuICAgIGlmICghdGhpcy5pc01vZGVsQ29tbWVudEhpZGRlblJlZ2lzdGVyZWQpIHtcbiAgICAgIHRoaXMuaXNNb2RlbENvbW1lbnRIaWRkZW5SZWdpc3RlcmVkID0gdHJ1ZTtcbiAgICAgICQoJyNjb21tZW50cGhvdG9fbW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLmN1cnJWaWV3Zm9vQ29tbWVudCA9IHt9O1xuICAgICAgICB0aGlzLmN1cnJWaWV3Zm9vSW1hZ2UgPSB7fTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uVmlld2Zvb1NoYXJlKHZmbDogVmlld2Zvbykge1xuICAgIHRoaXMuY3VyclZpZXdmb29TaGFyZSA9IHZmbDtcbiAgICB0aGlzLmN1cnJWaWV3Zm9vSW1hZ2VTaGFyZSA9IHt9O1xuICAgICQoJyNTZWxlY3RQaG90b01vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgICBpZiAoIXRoaXMuaXNNb2RlbFNoYXJlSGlkZGVuUmVnaXN0ZXJlZCkge1xuICAgICAgdGhpcy5pc01vZGVsU2hhcmVIaWRkZW5SZWdpc3RlcmVkID0gdHJ1ZTtcbiAgICAgICQoJyNTZWxlY3RQaG90b01vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy5jdXJyVmlld2Zvb1NoYXJlID0ge307XG4gICAgICAgIHRoaXMuY3VyclZpZXdmb29JbWFnZVNoYXJlID0ge307XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBvbkltYWdlU2hhcmUoY29udGFpbmVyaW1hZ2U6IENvbnRhaW5lcikge1xuICAgICAgdGhpcy5jdXJyVmlld2Zvb0ltYWdlU2hhcmUgPSBjb250YWluZXJpbWFnZTtcbiAgICAgIHRoaXMuY3VyclZpZXdmb29TaGFyZSA9IHt9O1xuICAgICAgJCgnI1NlbGVjdFBob3RvTW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuICAgICAgaWYgKCF0aGlzLmlzTW9kZWxDb21tZW50SGlkZGVuUmVnaXN0ZXJlZCkge1xuICAgICAgICAgIHRoaXMuaXNNb2RlbENvbW1lbnRIaWRkZW5SZWdpc3RlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAkKCcjU2VsZWN0UGhvdG9Nb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgIHRoaXMuY3VyclZpZXdmb29TaGFyZSA9IHt9O1xuICAgICAgICAgICAgICB0aGlzLmN1cnJWaWV3Zm9vSW1hZ2VTaGFyZSA9IHt9O1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICB9XG5cbn1cbiJdfQ==
