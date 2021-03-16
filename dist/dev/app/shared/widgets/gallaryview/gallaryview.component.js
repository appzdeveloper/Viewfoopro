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
var pagination_component_1 = require('../../pagination/pagination.component');
var myGlobals = require('../../../globals');
var GallaryViewComponent = (function () {
    function GallaryViewComponent(zone, _changeDetectionRef, elementRef, authService) {
        this._changeDetectionRef = _changeDetectionRef;
        this.elementRef = elementRef;
        this.authService = authService;
        this.container = {};
        this.currentViewfoo = {};
        this.changeComment = new core_1.EventEmitter();
        this.changeShare = new core_1.EventEmitter();
        this.currViewfooComment = {};
        this.isModelCommentHiddenRegistered = false;
        this.imageUrl = myGlobals.imageUrl + '/upload/gallery/';
        this.zone = zone;
        this.loginUser = myGlobals.LoginUser;
    }
    GallaryViewComponent.prototype.ngOnInit = function () {
    };
    GallaryViewComponent.prototype.ngAfterViewInit = function () {
        var self = this;
        setTimeout(function () {
            self.initContainerForDropzone();
        }, 1000);
    };
    GallaryViewComponent.prototype.commentImage = function (containerimage) {
        this.changeComment.emit(containerimage);
    };
    GallaryViewComponent.prototype.shareImage = function (containerimage) {
        this.changeShare.emit(containerimage);
    };
    GallaryViewComponent.prototype.updatePagingBasedonHW = function () {
        var rows = this.container.containerrows;
        var cols = this.container.containercols;
        this.lipercentage = (100 / cols) + "%";
        var heightSizeY;
        if (this.currentViewfoo.imageinfoframe == 'true') {
            heightSizeY = 68 * this.container.ngGridItemOptions.sizey;
        }
        else {
            heightSizeY = 98 * this.container.ngGridItemOptions.sizey;
        }
        heightSizeY = heightSizeY - 63;
        this.liheight = (heightSizeY / rows) + "px";
        var perpage = rows * cols;
        this.container.itemsPerPage = perpage;
        this.copyArrayFromTotalToDisplay();
        console.log("GallaryViewComponent ngGridItemEvent");
        console.log(rows + "  " + cols);
        console.log("perpage  " + perpage);
    };
    GallaryViewComponent.prototype.initContainerForDropzone = function () {
        var self = this;
        var container = this.container;
        container.opacity = 1;
        container.dispImageArray = [];
        this.updatePagingBasedonHW();
        container.currentPage = 1;
        this.copyArrayFromTotalToDisplay();
    };
    GallaryViewComponent.prototype.currentPageChanged = function (event, container) {
        container.currentPage = event.page;
        this.copyArrayFromTotalToDisplay();
    };
    GallaryViewComponent.prototype.numberOfPages = function (totalPages, container) {
        container.totalPages = totalPages;
    };
    GallaryViewComponent.prototype.copyArrayFromTotalToDisplay = function () {
        var self = this;
        var container = this.container;
        var start = ((container.currentPage - 1) * container.itemsPerPage);
        var end = start + container.itemsPerPage;
        container.dispImageArray.splice(0, container.dispImageArray.length);
        for (var i = start; i < end; i++) {
            if (container.containerimages.length <= i) {
                break;
            }
            container.dispImageArray.push(container.containerimages[i]);
        }
    };
    GallaryViewComponent.prototype.onClickImage = function (containerimage) {
        containerimage.isclicked = !containerimage.isclicked;
        if (this.currContainerImage && this.currContainerImage != containerimage) {
            this.currContainerImage.isclicked = false;
        }
        this.currContainerImage = containerimage;
    };
    GallaryViewComponent.prototype.onClickPreview = function (index) {
        var self = this;
        var imgLength = self.container.containerimages.length;
        var fancyArray = [];
        for (var j = 0; j < imgLength; j++) {
            var containerimage = self.container.containerimages[j];
            var imgUrl = containerimage.imagename;
            var objImage = {
                href: imgUrl
            };
            fancyArray.push(objImage);
        }
        $.fancybox.open(fancyArray, {
            autoSize: true,
            index: index,
            prevEffect: 'none',
            nextEffect: 'none',
            helpers: {
                buttons: {}
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GallaryViewComponent.prototype, "container", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GallaryViewComponent.prototype, "currentViewfoo", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], GallaryViewComponent.prototype, "changeComment", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], GallaryViewComponent.prototype, "changeShare", void 0);
    GallaryViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gallaryview',
            templateUrl: 'gallaryview.component.html',
            directives: [pagination_component_1.PaginationComponent, forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [core_1.NgZone, core_1.ChangeDetectorRef, core_1.ElementRef, auth_service_1.AuthService])
    ], GallaryViewComponent);
    return GallaryViewComponent;
}());
exports.GallaryViewComponent = GallaryViewComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvd2lkZ2V0cy9nYWxsYXJ5dmlldy9nYWxsYXJ5dmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHFCQUVLLGVBQWUsQ0FBQyxDQUFBO0FBQ3JCLHVCQUE4QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hELHNCQUF5QyxnQkFBZ0IsQ0FBQyxDQUFBO0FBRzFELDZCQUE0Qiw2QkFBNkIsQ0FBQyxDQUFBO0FBRTFELHFDQUFrQyx1Q0FBdUMsQ0FBQyxDQUFBO0FBQzFFLElBQU8sU0FBUyxXQUFXLGtCQUFrQixDQUFDLENBQUM7QUFRL0M7SUFtQ0ksOEJBQVksSUFBWSxFQUFVLG1CQUFzQyxFQUM3RCxVQUFzQixFQUNyQixXQUF3QjtRQUZGLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFDN0QsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWhDcEIsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUNwQixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUt2QixrQkFBYSxHQUE0QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUM1RCxnQkFBVyxHQUE0QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQVc1RSx1QkFBa0IsR0FBWSxFQUFFLENBQUM7UUFDakMsbUNBQThCLEdBQVksS0FBSyxDQUFDO1FBRWhELGFBQVEsR0FBVyxTQUFTLENBQUMsUUFBUSxHQUFHLGtCQUFrQixDQUFDO1FBWXZELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUt6QyxDQUFDO0lBRUQsdUNBQVEsR0FBUjtJQUVBLENBQUM7SUFFRCw4Q0FBZSxHQUFmO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLFVBQVUsQ0FBQztZQUNQLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ3BDLENB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QUM7WUFDdkQsSUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQztZQUV0QyxJQUFJLFFBQVEsR0FBRztnQkFDWCxJQUFJLEVBQUUsTUFBTTthQUNmLENBQUM7WUFDRixVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFRCxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDeEIsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsS0FBSztZQUNaLFVBQVUsRUFBRSxNQUFNO1lBQ2xCLFVBQVUsRUFBRSxNQUFNO1lBQ2xCLE9BQU8sRUFBRTtnQkFLTCxPQUFPLEVBQUUsRUFBRTthQUNkO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXBNRDtRQUFDLFlBQUssRUFBRTs7MkRBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7Z0VBQUE7SUFLUjtRQUFDLGFBQU0sRUFBRTs7K0RBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7NkRBQUE7SUFsQmI7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsVUFBVSxFQUFFLENBQUMsMENBQW1CLEVBQUUsZ0NBQXdCLEVBQUUsd0JBQWUsQ0FBQztTQUMvRSxDQUFDOzs0QkFBQTtJQStNRiwyQkFBQztBQUFELENBOU1BLEFBOE1DLElBQUE7QUE5TVksNEJBQW9CLHVCQThNaEMsQ0FBQSIsImZpbGUiOiJhcHAvc2hhcmVkL3dpZGdldHMvZ2FsbGFyeXZpZXcvZ2FsbGFyeXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUsIElucHV0LCBPdXRwdXQsIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLCBSZW5kZXJlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2UsIENoYW5nZURldGVjdG9yUmVmLCBWaWV3Q2hpbGR9XG5mcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBVc2VyLFZpZXdmb28sQ29udGFpbmVyICB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuXG5pbXBvcnQge1BhZ2luYXRpb25Db21wb25lbnR9IGZyb20gJy4uLy4uL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uLy4uLy4uL2dsb2JhbHMnKTtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2dhbGxhcnl2aWV3JyxcbiAgICB0ZW1wbGF0ZVVybDogJ2dhbGxhcnl2aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbUGFnaW5hdGlvbkNvbXBvbmVudCwgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTLCBDT1JFX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIEdhbGxhcnlWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXG4gICAgLy9AVmlld0NoaWxkKCdpbWdibG9jaycpIGltZ2Jsb2NrOiBFbGVtZW50UmVmO1xuXG4gICAgQElucHV0KCkgcHVibGljIGNvbnRhaW5lcjogYW55ID0ge307XG4gICAgQElucHV0KCkgcHVibGljIGN1cnJlbnRWaWV3Zm9vOiBhbnkgPSB7fTtcblxuICAgIC8vQE91dHB1dCgpIHByaXZhdGUgb25Db250YWluZXJEZWxldGU6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIC8vQE91dHB1dCgpIHByaXZhdGUgb25Db250YWluZXJVcGRhdGU6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIC8vQE91dHB1dCgpIHByaXZhdGUgb25Db250YWluZXJJbWFnZUNsaWNrOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcHJpdmF0ZSBjaGFuZ2VDb21tZW50OiBFdmVudEVtaXR0ZXI8Q29udGFpbmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcHJpdmF0ZSBjaGFuZ2VTaGFyZTogRXZlbnRFbWl0dGVyPENvbnRhaW5lcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBsb2dpblVzZXI6IFVzZXI7XG5cbiAgICB2aWV3Zm9vaWQ6IHN0cmluZztcbiAgICBjb250YWluZXJpZDogc3RyaW5nO1xuXG4gICAgbGlwZXJjZW50YWdlOiBzdHJpbmc7XG4gICAgbGloZWlnaHQ6IHN0cmluZztcblxuICAgIGN1cnJDb250YWluZXJJbWFnZTogYW55O1xuICAgIGN1cnJWaWV3Zm9vQ29tbWVudDogVmlld2ZvbyA9IHt9O1xuICAgIGlzTW9kZWxDb21tZW50SGlkZGVuUmVnaXN0ZXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgaW1hZ2VVcmw6IHN0cmluZyA9IG15R2xvYmFscy5pbWFnZVVybCArICcvdXBsb2FkL2dhbGxlcnkvJztcblxuICAgIGl0ZW06IGFueTtcbiAgICBteURyb3B6b25lOiBhbnk7XG5cbiAgICBkWm9uZTogYW55O1xuXG4gICAgem9uZTogTmdab25lO1xuXG4gICAgY29uc3RydWN0b3Ioem9uZTogTmdab25lLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy56b25lID0gem9uZTtcblxuICAgICAgICB0aGlzLmxvZ2luVXNlciA9IG15R2xvYmFscy5Mb2dpblVzZXI7XG5cbiAgICAgICAgLy90aGlzLmNvbnRhaW5lci5pdGVtc1BlclBhZ2UgPSAwO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiR2FsbGFyeUNvbXBvbmVudCBjb25zdHJ1Y3RvclwiKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuaW5pdENvbnRhaW5lckZvckRyb3B6b25lKCk7XG4gICAgICAgIH0sIDEwMDApXG4gICAgICAgIC8vdGhpcy5pbml0Q29udGFpbmVyRm9yRHJvcHpvbmUoKTtcbiAgICAgICAgLy90aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgICBjb21tZW50SW1hZ2UoY29udGFpbmVyaW1hZ2U6IGFueSl7XG4gICAgICAgIHRoaXMuY2hhbmdlQ29tbWVudC5lbWl0KGNvbnRhaW5lcmltYWdlKTtcbiAgICB9XG4gICAgc2hhcmVJbWFnZShjb250YWluZXJpbWFnZTogYW55KXtcbiAgICAgICAgdGhpcy5jaGFuZ2VTaGFyZS5lbWl0KGNvbnRhaW5lcmltYWdlKTtcbiAgICB9XG4gICAgdXBkYXRlUGFnaW5nQmFzZWRvbkhXKCkge1xuXG5cdFx0dmFyIHJvd3MgPSB0aGlzLmNvbnRhaW5lci5jb250YWluZXJyb3dzO1xuXHRcdHZhciBjb2xzID0gdGhpcy5jb250YWluZXIuY29udGFpbmVyY29scztcblxuXHRcdHRoaXMubGlwZXJjZW50YWdlID0gKDEwMCAvIGNvbHMpICsgXCIlXCI7XG5cbiAgICAgICAgdmFyIGhlaWdodFNpemVZOiBhbnk7XG4gICAgICAgIGlmKHRoaXMuY3VycmVudFZpZXdmb28uaW1hZ2VpbmZvZnJhbWUgPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICBoZWlnaHRTaXplWSA9IDY4ICogdGhpcy5jb250YWluZXIubmdHcmlkSXRlbU9wdGlvbnMuc2l6ZXlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhlaWdodFNpemVZID0gOTggKiB0aGlzLmNvbnRhaW5lci5uZ0dyaWRJdGVtT3B0aW9ucy5zaXpleVxuICAgICAgICB9XG5cbiAgICAgICAgaGVpZ2h0U2l6ZVkgPSBoZWlnaHRTaXplWSAtIDYzO1xuXG4gICAgICAgIHRoaXMubGloZWlnaHQgPSAoaGVpZ2h0U2l6ZVkgLyByb3dzKSArIFwicHhcIjtcblxuXHRcdHZhciBwZXJwYWdlID0gcm93cyAqIGNvbHM7XG5cblx0XHR0aGlzLmNvbnRhaW5lci5pdGVtc1BlclBhZ2UgPSBwZXJwYWdlO1xuXHRcdHRoaXMuY29weUFycmF5RnJvbVRvdGFsVG9EaXNwbGF5KCk7XG5cblx0XHRjb25zb2xlLmxvZyhcIkdhbGxhcnlWaWV3Q29tcG9uZW50IG5nR3JpZEl0ZW1FdmVudFwiKTtcblx0XHRjb25zb2xlLmxvZyhyb3dzICsgXCIgIFwiICsgY29scyk7XG5cdFx0Y29uc29sZS5sb2coXCJwZXJwYWdlICBcIiArIHBlcnBhZ2UpO1xuXG4gICAgfVxuXG4gICAgLy9uZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wS2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xuICAgIC8vY29uc29sZS5sb2coXCJHYWxsYXJ5IG9uIHByb3AgY2hhbmdlc1wiKTtcbiAgICAvLyAgICAgICAgbGV0IGxvZzogc3RyaW5nW10gPSBbXTtcbiAgICAvL3ZhciBzZWxmID0gdGhpcztcbiAgICAvL2ZvciAobGV0IHByb3BOYW1lIGluIGNoYW5nZXMpIHtcbiAgICAvL2NvbnNvbGUubG9nKFwibmdPbkNoYW5nZXMgXCIrcHJvcE5hbWUpO1xuICAgIC8vaWYocHJvcE5hbWUgPT0gXCJ0b3RhbEl0ZW1zXCIpIHtcbiAgICAvL3RoaXMuaW5pdGVkID0gdHJ1ZTtcbiAgICAvL3RoaXMucGFnZSA9XG4gICAgLy99XG4gICAgLy8gICAgICAgICAgICBsZXQgY2hhbmdlZFByb3AgPSBjaGFuZ2VzW3Byb3BOYW1lXTtcbiAgICAvLyAgICAgICAgICAgIGxldCBmcm9tID0gSlNPTi5zdHJpbmdpZnkoY2hhbmdlZFByb3AucHJldmlvdXNWYWx1ZSk7XG4gICAgLy8gICAgICAgICAgICBsZXQgdG8gPSBKU09OLnN0cmluZ2lmeShjaGFuZ2VkUHJvcC5jdXJyZW50VmFsdWUpO1xuICAgIC8vICAgICAgICAgICAgbG9nLnB1c2goYCR7cHJvcE5hbWV9IGNoYW5nZWQgZnJvbSAke2Zyb219IHRvICR7dG99YCk7XG4gICAgLy99XG4gICAgLy8gICAgICAgIHRoaXMuY2hhbmdlTG9nLnB1c2gobG9nLmpvaW4oJywgJykpO1xuICAgIC8vY29uc29sZS5sb2coXCJuZ09uQ2hhbmdlc1wiKTtcbiAgICAvL31cblxuICAgIGluaXRDb250YWluZXJGb3JEcm9wem9uZSgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG5cbiAgICAgICAgY29udGFpbmVyLm9wYWNpdHkgPSAxO1xuICAgICAgICBjb250YWluZXIuZGlzcEltYWdlQXJyYXkgPSBbXTtcblxuICAgICAgICAvL2NvbnRhaW5lci5pdGVtc1BlclBhZ2UgPSAxO1xuICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luZ0Jhc2Vkb25IVygpO1xuXG4gICAgICAgIGNvbnRhaW5lci5jdXJyZW50UGFnZSA9IDE7XG5cblxuICAgICAgICB0aGlzLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheSgpO1xuXG4gICAgICAgIC8vdGhpcy5jcmVhdGluZ0Ryb3B6b25lSW5zdGFuY2VzKCk7XG4gICAgfVxuXG4gICAgY3VycmVudFBhZ2VDaGFuZ2VkKGV2ZW50OiBhbnksIGNvbnRhaW5lcjogYW55KSB7XG5cbiAgICAgICAgY29udGFpbmVyLmN1cnJlbnRQYWdlID0gZXZlbnQucGFnZTtcblxuICAgICAgICB0aGlzLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheSgpO1xuXG4gICAgfVxuXG4gICAgbnVtYmVyT2ZQYWdlcyh0b3RhbFBhZ2VzOiBhbnksIGNvbnRhaW5lcjogYW55KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJudW1iZXJPZlBhZ2VzID4gXCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGV2ZW50KTtcblxuICAgICAgICBjb250YWluZXIudG90YWxQYWdlcyA9IHRvdGFsUGFnZXM7XG4gICAgfVxuXG4gICAgY29weUFycmF5RnJvbVRvdGFsVG9EaXNwbGF5KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcblxuICAgICAgICB2YXIgc3RhcnQgPSAoKGNvbnRhaW5lci5jdXJyZW50UGFnZSAtIDEpICogY29udGFpbmVyLml0ZW1zUGVyUGFnZSk7XG4gICAgICAgIHZhciBlbmQgPSBzdGFydCArIGNvbnRhaW5lci5pdGVtc1BlclBhZ2U7XG5cbiAgICAgICAgY29udGFpbmVyLmRpc3BJbWFnZUFycmF5LnNwbGljZSgwLCBjb250YWluZXIuZGlzcEltYWdlQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjb250YWluZXIuY29udGFpbmVyaW1hZ2VzLmxlbmd0aCA8PSBpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250YWluZXIuZGlzcEltYWdlQXJyYXkucHVzaChjb250YWluZXIuY29udGFpbmVyaW1hZ2VzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgb25DbGlja0ltYWdlKGNvbnRhaW5lcmltYWdlOiBhbnkpIHtcblxuICAgICAgICBjb250YWluZXJpbWFnZS5pc2NsaWNrZWQgPSAhY29udGFpbmVyaW1hZ2UuaXNjbGlja2VkO1xuICAgICAgICBpZih0aGlzLmN1cnJDb250YWluZXJJbWFnZSAmJiB0aGlzLmN1cnJDb250YWluZXJJbWFnZSAhPSBjb250YWluZXJpbWFnZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyQ29udGFpbmVySW1hZ2UuaXNjbGlja2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyQ29udGFpbmVySW1hZ2UgPSBjb250YWluZXJpbWFnZTtcbiAgICB9XG5cbiAgICBvbkNsaWNrUHJldmlldyhpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGltZ0xlbmd0aCA9IHNlbGYuY29udGFpbmVyLmNvbnRhaW5lcmltYWdlcy5sZW5ndGg7XG5cbiAgICAgICAgdmFyIGZhbmN5QXJyYXk6IGFueSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGltZ0xlbmd0aDsgaisrKSB7XG5cbiAgICAgICAgICAgIHZhciBjb250YWluZXJpbWFnZSA9IHNlbGYuY29udGFpbmVyLmNvbnRhaW5lcmltYWdlc1tqXTtcbiAgICAgICAgICAgIHZhciBpbWdVcmwgPSBjb250YWluZXJpbWFnZS5pbWFnZW5hbWU7XG5cbiAgICAgICAgICAgIHZhciBvYmpJbWFnZSA9IHtcbiAgICAgICAgICAgICAgICBocmVmOiBpbWdVcmxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmYW5jeUFycmF5LnB1c2gob2JqSW1hZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgJC5mYW5jeWJveC5vcGVuKGZhbmN5QXJyYXksIHtcbiAgICAgICAgICAgIGF1dG9TaXplOiB0cnVlLFxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgcHJldkVmZmVjdDogJ25vbmUnLFxuICAgICAgICAgICAgbmV4dEVmZmVjdDogJ25vbmUnLFxuICAgICAgICAgICAgaGVscGVyczoge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRodW1iczoge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzUsXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnV0dG9uczoge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuXG59XG4iXX0=
