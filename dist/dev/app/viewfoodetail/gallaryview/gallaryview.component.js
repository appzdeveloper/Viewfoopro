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
var auth_service_1 = require('../../shared/services/auth.service');
var pagination_component_1 = require('../../shared/pagination/pagination.component');
var myGlobals = require('../../globals');
var GallaryViewComponent = (function () {
    function GallaryViewComponent(zone, _changeDetectionRef, elementRef, authService) {
        this._changeDetectionRef = _changeDetectionRef;
        this.elementRef = elementRef;
        this.authService = authService;
        this.onContainerDelete = new core_1.EventEmitter();
        this.onContainerUpdate = new core_1.EventEmitter();
        this.serviceUrl = myGlobals.serviceUrl;
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
    GallaryViewComponent.prototype.updatePagingBasedonHW = function () {
        if (this.imgblock) {
            var height = this.imgblock.nativeElement.clientHeight - 65;
            var width = this.imgblock.nativeElement.clientWidth;
            var rows = Math.floor(height / 142);
            var cols = Math.floor(width / 139);
            var perpage = rows * cols;
            this.container.itemsPerPage = perpage;
            this.copyArrayFromTotalToDisplay();
            console.log("GallaryComponent ngGridItemEvent");
            console.log(height + "  " + width);
            console.log(rows + "  " + cols);
            console.log("perpage  " + perpage);
        }
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
    GallaryViewComponent.prototype.onClickPreview = function (index) {
        var self = this;
        var imgLength = self.container.containerimages.length;
        var fancyArray = [];
        for (var j = 0; j < imgLength; j++) {
            var containerimage = self.container.containerimages[j];
            var imgUrl = self.serviceUrl + "/upload/gallery/" + containerimage.imagename;
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
        core_1.ViewChild('imgblock'), 
        __metadata('design:type', core_1.ElementRef)
    ], GallaryViewComponent.prototype, "imgblock", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GallaryViewComponent.prototype, "container", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], GallaryViewComponent.prototype, "onContainerDelete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], GallaryViewComponent.prototype, "onContainerUpdate", void 0);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC92aWV3Zm9vZGV0YWlsL2dhbGxhcnl2aWV3L2dhbGxhcnl2aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EscUJBRUssZUFBZSxDQUFDLENBQUE7QUFDckIsdUJBQThCLGlCQUFpQixDQUFDLENBQUE7QUFDaEQsc0JBQXlDLGdCQUFnQixDQUFDLENBQUE7QUFHMUQsNkJBQTRCLG9DQUFvQyxDQUFDLENBQUE7QUFHakUscUNBQWtDLDhDQUE4QyxDQUFDLENBQUE7QUFDakYsSUFBTyxTQUFTLFdBQVcsZUFBZSxDQUFDLENBQUM7QUFRNUM7SUF3QkksOEJBQVksSUFBWSxFQUFVLG1CQUFzQyxFQUM3RCxVQUFzQixFQUNyQixXQUF3QjtRQUZGLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFDN0QsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWxCbEIsc0JBQWlCLEdBQXlCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQzdELHNCQUFpQixHQUF5QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQU8vRSxlQUFVLEdBQVcsU0FBUyxDQUFDLFVBQVUsQ0FBQztRQVd0QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFJekMsQ0FBQztJQUVELHVDQUFRLEdBQVI7SUFFQSxDQUFDO0lBRUQsOENBQWUsR0FBZjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixVQUFVLENBQUM7WUFDUCxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNwQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFHWCxDQUFDO0lBRUQsb0RBQXFCLEdBQXJCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFFaEIsSUFBSSxNQUFNLEdBQUcs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LCJmaWxlIjoiYXBwL3ZpZXdmb29kZXRhaWwvZ2FsbGFyeXZpZXcvZ2FsbGFyeXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUsIElucHV0LCBPdXRwdXQsIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLCBSZW5kZXJlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2UsIENoYW5nZURldGVjdG9yUmVmLCBWaWV3Q2hpbGR9XG5mcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdmb28gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQge1BhZ2luYXRpb25Db21wb25lbnR9IGZyb20gJy4uLy4uL3NoYXJlZC9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi8uLi9nbG9iYWxzJyk7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdnYWxsYXJ5dmlldycsXG4gICAgdGVtcGxhdGVVcmw6ICdnYWxsYXJ5dmlldy5jb21wb25lbnQuaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW1BhZ2luYXRpb25Db21wb25lbnQsIFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUywgQ09SRV9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBHYWxsYXJ5Vmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIHB1YmxpYyBjb250YWluZXJ0eXBlOiBzdHJpbmc7XG5cbiAgICBAVmlld0NoaWxkKCdpbWdibG9jaycpIGltZ2Jsb2NrOiBFbGVtZW50UmVmO1xuXG4gICAgQElucHV0KCkgcHVibGljIGNvbnRhaW5lcjogYW55O1xuXG4gICAgQE91dHB1dCgpIHByaXZhdGUgb25Db250YWluZXJEZWxldGU6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBwcml2YXRlIG9uQ29udGFpbmVyVXBkYXRlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAvL0BPdXRwdXQoKSBwcml2YXRlIG9uQ29udGFpbmVySW1hZ2VDbGljazogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBsb2dpblVzZXI6IFVzZXI7XG5cbiAgICB2aWV3Zm9vaWQ6IHN0cmluZztcbiAgICBjb250YWluZXJpZDogc3RyaW5nO1xuICAgIHNlcnZpY2VVcmw6IHN0cmluZyA9IG15R2xvYmFscy5zZXJ2aWNlVXJsO1xuICAgIGl0ZW06IGFueTtcbiAgICBteURyb3B6b25lOiBhbnk7XG5cbiAgICBkWm9uZTogYW55O1xuXG4gICAgem9uZTogTmdab25lO1xuXG4gICAgY29uc3RydWN0b3Ioem9uZTogTmdab25lLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy56b25lID0gem9uZTtcblxuICAgICAgICB0aGlzLmxvZ2luVXNlciA9IG15R2xvYmFscy5Mb2dpblVzZXI7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkdhbGxhcnlDb21wb25lbnQgY29uc3RydWN0b3JcIik7ICAgICAgICBcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5pbml0Q29udGFpbmVyRm9yRHJvcHpvbmUoKTtcbiAgICAgICAgfSwxMDAwKVxuICAgICAgICAvL3RoaXMuaW5pdENvbnRhaW5lckZvckRyb3B6b25lKCk7XG4gICAgICAgIC8vdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVQYWdpbmdCYXNlZG9uSFcoKSB7XG4gICAgICAgIGlmICh0aGlzLmltZ2Jsb2NrKSB7XG5cbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSB0aGlzLmltZ2Jsb2NrLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gNjU7XG4gICAgICAgICAgICB2YXIgd2lkdGggPSB0aGlzLmltZ2Jsb2NrLm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGg7XG5cbiAgICAgICAgICAgIHZhciByb3dzID0gTWF0aC5mbG9vcihoZWlnaHQgLyAxNDIpO1xuICAgICAgICAgICAgdmFyIGNvbHMgPSBNYXRoLmZsb29yKHdpZHRoIC8gMTM5KTtcblxuICAgICAgICAgICAgdmFyIHBlcnBhZ2UgPSByb3dzICogY29scztcblxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuaXRlbXNQZXJQYWdlID0gcGVycGFnZTtcbiAgICAgICAgICAgIHRoaXMuY29weUFycmF5RnJvbVRvdGFsVG9EaXNwbGF5KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbGxhcnlDb21wb25lbnQgbmdHcmlkSXRlbUV2ZW50XCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coaGVpZ2h0ICsgXCIgIFwiICsgd2lkdGgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocm93cyArIFwiICBcIiArIGNvbHMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwZXJwYWdlICBcIiArIHBlcnBhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9uZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wS2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xuICAgIC8vY29uc29sZS5sb2coXCJHYWxsYXJ5IG9uIHByb3AgY2hhbmdlc1wiKTtcbiAgICAvLyAgICAgICAgbGV0IGxvZzogc3RyaW5nW10gPSBbXTtcbiAgICAvL3ZhciBzZWxmID0gdGhpcztcbiAgICAvL2ZvciAobGV0IHByb3BOYW1lIGluIGNoYW5nZXMpIHtcbiAgICAvL2NvbnNvbGUubG9nKFwibmdPbkNoYW5nZXMgXCIrcHJvcE5hbWUpO1xuICAgIC8vaWYocHJvcE5hbWUgPT0gXCJ0b3RhbEl0ZW1zXCIpIHtcbiAgICAvL3RoaXMuaW5pdGVkID0gdHJ1ZTtcbiAgICAvL3RoaXMucGFnZSA9IFxuICAgIC8vfSAgICAgICAgICAgXG4gICAgLy8gICAgICAgICAgICBsZXQgY2hhbmdlZFByb3AgPSBjaGFuZ2VzW3Byb3BOYW1lXTtcbiAgICAvLyAgICAgICAgICAgIGxldCBmcm9tID0gSlNPTi5zdHJpbmdpZnkoY2hhbmdlZFByb3AucHJldmlvdXNWYWx1ZSk7XG4gICAgLy8gICAgICAgICAgICBsZXQgdG8gPSBKU09OLnN0cmluZ2lmeShjaGFuZ2VkUHJvcC5jdXJyZW50VmFsdWUpO1xuICAgIC8vICAgICAgICAgICAgbG9nLnB1c2goYCR7cHJvcE5hbWV9IGNoYW5nZWQgZnJvbSAke2Zyb219IHRvICR7dG99YCk7XG4gICAgLy99XG4gICAgLy8gICAgICAgIHRoaXMuY2hhbmdlTG9nLnB1c2gobG9nLmpvaW4oJywgJykpO1xuICAgIC8vY29uc29sZS5sb2coXCJuZ09uQ2hhbmdlc1wiKTtcbiAgICAvL31cblxuICAgIGluaXRDb250YWluZXJGb3JEcm9wem9uZSgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG5cbiAgICAgICAgY29udGFpbmVyLm9wYWNpdHkgPSAxO1xuICAgICAgICBjb250YWluZXIuZGlzcEltYWdlQXJyYXkgPSBbXTtcblxuICAgICAgICAvL2NvbnRhaW5lci5pdGVtc1BlclBhZ2UgPSAxO1xuICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luZ0Jhc2Vkb25IVygpO1xuXG4gICAgICAgIGNvbnRhaW5lci5jdXJyZW50UGFnZSA9IDE7XG5cblxuICAgICAgICB0aGlzLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheSgpO1xuXG4gICAgICAgIC8vdGhpcy5jcmVhdGluZ0Ryb3B6b25lSW5zdGFuY2VzKCk7XG4gICAgfVxuXG4gICAgY3VycmVudFBhZ2VDaGFuZ2VkKGV2ZW50OiBhbnksIGNvbnRhaW5lcjogYW55KSB7XG5cbiAgICAgICAgY29udGFpbmVyLmN1cnJlbnRQYWdlID0gZXZlbnQucGFnZTtcblxuICAgICAgICB0aGlzLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheSgpO1xuXG4gICAgfVxuXG4gICAgbnVtYmVyT2ZQYWdlcyh0b3RhbFBhZ2VzOiBhbnksIGNvbnRhaW5lcjogYW55KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJudW1iZXJPZlBhZ2VzID4gXCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGV2ZW50KTtcblxuICAgICAgICBjb250YWluZXIudG90YWxQYWdlcyA9IHRvdGFsUGFnZXM7XG4gICAgfVxuXG4gICAgY29weUFycmF5RnJvbVRvdGFsVG9EaXNwbGF5KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcblxuICAgICAgICB2YXIgc3RhcnQgPSAoKGNvbnRhaW5lci5jdXJyZW50UGFnZSAtIDEpICogY29udGFpbmVyLml0ZW1zUGVyUGFnZSk7XG4gICAgICAgIHZhciBlbmQgPSBzdGFydCArIGNvbnRhaW5lci5pdGVtc1BlclBhZ2U7XG5cbiAgICAgICAgY29udGFpbmVyLmRpc3BJbWFnZUFycmF5LnNwbGljZSgwLCBjb250YWluZXIuZGlzcEltYWdlQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjb250YWluZXIuY29udGFpbmVyaW1hZ2VzLmxlbmd0aCA8PSBpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250YWluZXIuZGlzcEltYWdlQXJyYXkucHVzaChjb250YWluZXIuY29udGFpbmVyaW1hZ2VzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cblxuICAgIG9uQ2xpY2tQcmV2aWV3KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgaW1nTGVuZ3RoID0gc2VsZi5jb250YWluZXIuY29udGFpbmVyaW1hZ2VzLmxlbmd0aDtcblxuICAgICAgICB2YXIgZmFuY3lBcnJheSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGltZ0xlbmd0aDsgaisrKSB7XG5cbiAgICAgICAgICAgIHZhciBjb250YWluZXJpbWFnZSA9IHNlbGYuY29udGFpbmVyLmNvbnRhaW5lcmltYWdlc1tqXTtcbiAgICAgICAgICAgIHZhciBpbWdVcmwgPSBzZWxmLnNlcnZpY2VVcmwgKyBcIi91cGxvYWQvZ2FsbGVyeS9cIiArIGNvbnRhaW5lcmltYWdlLmltYWdlbmFtZTtcblxuICAgICAgICAgICAgdmFyIG9iakltYWdlID0ge1xuICAgICAgICAgICAgICAgIGhyZWY6IGltZ1VybFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZhbmN5QXJyYXkucHVzaChvYmpJbWFnZSk7XG4gICAgICAgIH1cblxuICAgICAgICAkLmZhbmN5Ym94Lm9wZW4oZmFuY3lBcnJheSwge1xuICAgICAgICAgICAgYXV0b1NpemU6IHRydWUsXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICBwcmV2RWZmZWN0OiAnbm9uZScsXG4gICAgICAgICAgICBuZXh0RWZmZWN0OiAnbm9uZScsXG4gICAgICAgICAgICBoZWxwZXJzOiB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGh1bWJzOiB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3NSxcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidXR0b25zOiB7fVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=
