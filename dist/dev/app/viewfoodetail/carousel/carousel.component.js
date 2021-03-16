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
var CarouselComponent = (function () {
    function CarouselComponent(zone, _changeDetectionRef, elementRef, authService) {
        this._changeDetectionRef = _changeDetectionRef;
        this.elementRef = elementRef;
        this.authService = authService;
        this.currentViewfoo = {};
        this.onContainerDelete = new core_1.EventEmitter();
        this.onContainerUpdate = new core_1.EventEmitter();
        this.serviceUrl = myGlobals.serviceUrl;
        this.slideIndex = 1;
        this.slideWrap = true;
        this.slideInterval = 0;
        this.slidePause = "hover";
        this.slideNoTransition = true;
        this.extraSlides = false;
        this.zone = zone;
        this.loginUser = myGlobals.LoginUser;
    }
    Object.defineProperty(CarouselComponent.prototype, "ngGridItemEvent", {
        get: function () {
            return this._ngGridItemEvent;
        },
        set: function (v) {
            if (v) {
                this._ngGridItemEvent = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    CarouselComponent.prototype.ngOnInit = function () {
        var self = this;
        var container = this.container;
        this.containertype = container.containertype;
    };
    CarouselComponent.prototype.ngAfterViewInit = function () {
        this.initContainerForDropzone();
        var self = this;
        this._changeDetectionRef.detectChanges();
    };
    CarouselComponent.prototype.initContainerForDropzone = function () {
        var self = this;
        var container = this.container;
        container.opacity = 1;
        container.dispImageArray = [];
        container.itemsPerPage = 1;
        container.currentPage = 1;
        container.gotoLastPage = false;
        var totalImageArray = [];
        var blankImageCount = 1;
        for (var j = 0; j < blankImageCount; j++) {
            var containerImage2 = self.crateBlankImage();
            totalImageArray.push(containerImage2);
        }
        this.containertype = container.containertype;
        container.totalImageArray = totalImageArray;
        this.copyArrayFromTotalToDisplay();
        this.creatingDropzoneInstances();
    };
    CarouselComponent.prototype.currentPageChanged = function (event, container) {
        container.currentPage = event.page;
        this.copyArrayFromTotalToDisplay();
    };
    CarouselComponent.prototype.numberOfPages = function (totalPages, container) {
        container.totalPages = totalPages;
    };
    CarouselComponent.prototype.copyArrayFromTotalToDisplay = function () {
        var self = this;
        var container = this.container;
        this.containerimage = container.totalImageArray[(container.currentPage - 1)];
        console.log(this.containerimage);
    };
    CarouselComponent.prototype.crateBlankImage = function () {
        var containerImage = {
            id: "",
            imagename: "img/build_viewfoo/pic1.png",
            isBlankImage: true,
            isCompleted: false,
            progress: "0%"
        };
        return containerImage;
    };
    CarouselComponent.prototype.creatingDropzoneInstances = function () {
        var self = this;
        var container = this.container;
        Dropzone.autoDiscover = false;
        this.myDropzone = {
            url: myGlobals.serviceUrl + "/containerimage",
            headers: { "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" },
            paramName: "image",
            autoProcessQueue: true,
            uploadMultiple: false,
            acceptedFiles: "image/*",
            thumbnailWidth: 300,
            thumbnailHeight: 300,
            parallelUploads: 1,
            init: function () {
                var container = self.container;
                this.index = 0;
                this.on("complete", function (file) {
                    container.totalImageArray[file.index].isCompleted = true;
                    if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                    }
                });
                this.on("addedfile", function (file, arg1, arg2) {
                    file.index = this.index++;
                    self.zone.run(function () {
                        if (!container.totalImageArray[file.index]) {
                            container.totalImageArray.push(self.crateBlankImage());
                        }
                        if (!container.containerimages[file.index]) {
                            container.containerimages.push({});
                        }
                        container.totalImageArray[file.index].isBlankImage = false;
                        container.opacity = 0;
                    });
                });
                this.on("uploadprogress", function (file, progress, bytesSent) {
                    self.zone.run(function () {
                        container.totalImageArray[file.index].progress = progress + "%";
                    });
                });
                this.on("sending", function (file, xhr, data) {
                });
                this.on("removedfile", function (file) {
                });
                this.on("queuecomplete", function () {
                });
                this.on("thumbnail", function (file, thumbnail) {
                    container.totalImageArray[file.index].imagename = thumbnail;
                });
                this.on("success", function (file, res, e) {
                    if (res) {
                        var img = res.data.image;
                        container.containerimages[file.index] = img;
                        file.containerimageid = img.id;
                        file.containerid = img.containerid;
                        container.totalImageArray[file.index].id = img.id;
                        container.totalImageArray[file.index].containerid = img.containerid;
                    }
                    else {
                        container.totalImageArray[file.index].id = file.containerimageid;
                        container.totalImageArray[file.index].containerid = file.containerid;
                    }
                });
            }
        };
        self.dZone = self.createDropZone(container);
        var containerImageLength = container.containerimages.length;
        for (var j = 0; j < containerImageLength; j++) {
            var containerimage = container.containerimages[j];
            var imgUrl = self.serviceUrl + "/upload/gallery/" + containerimage.imagename;
            var mockFile = {
                name: imgUrl,
                containerimageid: containerimage.id,
                containerid: container.id,
                accepted: true
            };
            self.dZone.emit("addedfile", mockFile);
            self.dZone.createThumbnailFromUrl(mockFile, imgUrl, null, "Anonymous");
            self.dZone.emit("success", mockFile);
            self.dZone.emit("complete", mockFile);
            self.dZone.files.push(mockFile);
        }
        container.gotoLastPage = true;
    };
    CarouselComponent.prototype.createDropZone = function (container) {
        var self = this;
        self.myDropzone.containerid = container.id;
        self.myDropzone.previewsContainer = false;
        self.myDropzone.clickable = "#upload_image_" + container.id + ",#dzph_" + container.id;
        var dZone = new Dropzone("#form_" + container.id, self.myDropzone);
        return dZone;
    };
    CarouselComponent.prototype.containerImageDelete = function (containerid, containerimageid, index) {
        var _this = this;
        var self = this;
        var container = this.container;
        var actualIndex = index;
        var containerImage = container.totalImageArray[actualIndex];
        containerImage.deleting = true;
        self.authService.containerImageDelete(containerimageid)
            .subscribe(function (result) {
            containerImage.deleted = true;
            container.totalImageArray.splice(actualIndex, 1);
            container.containerimages.splice(actualIndex, 1);
            self.dZone.index--;
            setTimeout(function () {
                self.copyArrayFromTotalToDisplay(container);
            }, 1000);
            if (self.container.containerimages.length == 0) {
                self.container.opacity = 1;
            }
        }, function (error) {
            _this.errorMsg = error;
        });
    };
    CarouselComponent.prototype.previousPage = function (event, container) {
        var self = this;
        var container = this.container;
        this.container.currentPage1 = container.currentPage - 1;
        console.log(this.containerimage);
    };
    CarouselComponent.prototype.nextPage = function (event, container) {
        var self = this;
        var container = this.container;
        this.container.currentPage1 = container.currentPage + 1;
        console.log("nextPage > " + this.container.currentPage1);
        console.log(this.containerimage);
    };
    CarouselComponent.prototype.onDeleteContainer = function () {
        this.container.deleting = true;
        this.onContainerDelete.emit(this.container.id);
    };
    CarouselComponent.prototype.onUpdateContainer = function (val) {
        this.item = { title: val, id: this.container.id };
        this.onContainerUpdate.emit(this.item);
    };
    CarouselComponent.prototype.onClickPreview = function (index) {
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
    ], CarouselComponent.prototype, "imgblock", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CarouselComponent.prototype, "container", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CarouselComponent.prototype, "ngGridItemEvent", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CarouselComponent.prototype, "onContainerDelete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CarouselComponent.prototype, "onContainerUpdate", void 0);
    CarouselComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'carouselsingle',
            templateUrl: 'carousel.component.html',
            directives: [pagination_component_1.PaginationComponent, forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.NgIf]
        }), 
        __metadata('design:paramtypes', [core_1.NgZone, core_1.ChangeDetectorRef, core_1.ElementRef, auth_service_1.AuthService])
    ], CarouselComponent);
    return CarouselComponent;
}());
exports.CarouselComponent = CarouselComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC92aWV3Zm9vZGV0YWlsL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EscUJBRUssZUFBZSxDQUFDLENBQUE7QUFDckIsdUJBQW1DLGlCQUFpQixDQUFDLENBQUE7QUFDckQsc0JBQXlDLGdCQUFnQixDQUFDLENBQUE7QUFHMUQsNkJBQTRCLG9DQUFvQyxDQUFDLENBQUE7QUFHakUscUNBQWtDLDhDQUE4QyxDQUFDLENBQUE7QUFDakYsSUFBTyxTQUFTLFdBQVcsZUFBZSxDQUFDLENBQUM7QUFRNUM7SUFrREksMkJBQVksSUFBWSxFQUFVLG1CQUFzQyxFQUM3RCxVQUFzQixFQUNyQixXQUF3QjtRQUZGLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFDN0QsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWhEcEMsbUJBQWMsR0FBWSxFQUFFLENBQUM7UUFxQlgsc0JBQWlCLEdBQXlCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQzdELHNCQUFpQixHQUF5QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQU8vRSxlQUFVLEdBQVcsU0FBUyxDQUFDLFVBQVUsQ0FBQztRQVUxQyxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixlQUFVLEdBQUcsT0FBTyxDQUFDO1FBQ3JCLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUtoQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFZekMsQ0FBQztJQXpEUSxzQkFBVyw4Q0FBZTthQUExQjtZQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDakMsQ0FB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O0lBRXRCO1FBQUMsWUFBSyxFQUFFOzt3REFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzs0REFBQTtJQWVSO1FBQUMsYUFBTSxFQUFFOztnRUFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOztnRUFBQTtJQWhDYjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFVBQVUsRUFBRSxDQUFDLDBDQUFtQixFQUFFLGdDQUF3QixFQUFFLHdCQUFlLEVBQUMsYUFBSSxDQUFDO1NBQ3BGLENBQUM7O3lCQUFBO0lBNmFGLHdCQUFDO0FBQUQsQ0E1YUEsQUE0YUMsSUFBQTtBQTVhWSx5QkFBaUIsb0JBNGE3QixDQUFBIiwiZmlsZSI6ImFwcC92aWV3Zm9vZGV0YWlsL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgTmdab25lLCBJbnB1dCwgT3V0cHV0LCBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlLCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0NoaWxkfVxuZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NPUkVfRElSRUNUSVZFUyxOZ0lmfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdmb28gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQge1BhZ2luYXRpb25Db21wb25lbnR9IGZyb20gJy4uLy4uL3NoYXJlZC9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi8uLi9nbG9iYWxzJyk7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdjYXJvdXNlbHNpbmdsZScsXG4gICAgdGVtcGxhdGVVcmw6ICdjYXJvdXNlbC5jb21wb25lbnQuaHRtbCdcbiAgICBkaXJlY3RpdmVzOiBbUGFnaW5hdGlvbkNvbXBvbmVudCwgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTLCBDT1JFX0RJUkVDVElWRVMsTmdJZl1cbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHVibGljIGNvbnRhaW5lcnR5cGU6IHN0cmluZztcbiAgICBcbiAgICBjdXJyZW50Vmlld2ZvbzogVmlld2ZvbyA9IHt9O1xuICAgIFxuICAgIEBWaWV3Q2hpbGQoJ2ltZ2Jsb2NrJykgaW1nYmxvY2s6IEVsZW1lbnRSZWY7XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgY29udGFpbmVyOiBhbnk7XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgZ2V0IG5nR3JpZEl0ZW1FdmVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25nR3JpZEl0ZW1FdmVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IG5nR3JpZEl0ZW1FdmVudCh2OiBhbnkpIHtcbiAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgIHRoaXMuX25nR3JpZEl0ZW1FdmVudCA9IHY7XG4gICAgICAgICAgICAvL3RoaXMudXBkYXRlUGFnaW5nQmFzZWRvbkhXKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkdhbGxhcnlDb21wb25lbnQgbmdHcmlkSXRlbUV2ZW50IGNoYW5nZWRcIik7XG4gICAgICAgIC8vY29uc29sZS5sb2codik7XG5cbiAgICAgICAgLy90aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXMoKTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgcHJpdmF0ZSBvbkNvbnRhaW5lckRlbGV0ZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHByaXZhdGUgb25Db250YWluZXJVcGRhdGU6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIC8vQE91dHB1dCgpIHByaXZhdGUgb25Db250YWluZXJJbWFnZUNsaWNrOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGxvZ2luVXNlcjogVXNlcjtcblxuICAgIHZpZXdmb29pZDogc3RyaW5nO1xuICAgIGNvbnRhaW5lcmlkOiBzdHJpbmc7XG4gICAgc2VydmljZVVybDogc3RyaW5nID0gbXlHbG9iYWxzLnNlcnZpY2VVcmw7XG4gICAgaXRlbTogYW55O1xuICAgIG15RHJvcHpvbmU6IGFueTtcblxuICAgIGRab25lOiBhbnk7XG5cbiAgICB6b25lOiBOZ1pvbmU7XG4gICAgXG4gICAgY29udGFpbmVyaW1hZ2U6IGFueTsgICAgXG4gICAgXG4gICAgc2xpZGVJbmRleCA9IDE7XG4gICAgc2xpZGVXcmFwID0gdHJ1ZTtcbiAgICBzbGlkZUludGVydmFsID0gMDtcbiAgICBzbGlkZVBhdXNlID0gXCJob3ZlclwiO1xuICAgIHNsaWRlTm9UcmFuc2l0aW9uID0gdHJ1ZTtcbiAgICBleHRyYVNsaWRlcyA9IGZhbHNlO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuem9uZSA9IHpvbmU7XG5cbiAgICAgICAgdGhpcy5sb2dpblVzZXIgPSBteUdsb2JhbHMuTG9naW5Vc2VyO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiR2FsbGFyeUNvbXBvbmVudCBjb25zdHJ1Y3RvclwiKTsgICAgICAgIFxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbi8vICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSAxO1xuLy8gICAgICAgIHRoaXMuc2xpZGVXcmFwID0gdHJ1ZTtcbi8vICAgICAgICB0aGlzLnNsaWRlSW50ZXJ2YWwgPSA1MDAwO1xuLy8gICAgICAgIHRoaXMuc2xpZGVQYXVzZSA9IFwiaG92ZXJcIjtcbi8vICAgICAgICB0aGlzLnNsaWRlTm9UcmFuc2l0aW9uID0gZmFsc2U7XG4vLyAgICAgICAgdGhpcy5leHRyYVNsaWRlcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5jb250YWluZXJ0eXBlID0gY29udGFpbmVyLmNvbnRhaW5lcnR5cGU7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmluaXRDb250YWluZXJGb3JEcm9wem9uZSgpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0gICAgXG5cbiAgICBpbml0Q29udGFpbmVyRm9yRHJvcHpvbmUoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuXG4gICAgICAgIGNvbnRhaW5lci5vcGFjaXR5ID0gMTtcbiAgICAgICAgY29udGFpbmVyLmRpc3BJbWFnZUFycmF5ID0gW107XG5cbiAgICAgICAgY29udGFpbmVyLml0ZW1zUGVyUGFnZSA9IDE7XG4gICAgICAgIC8vdGhpcy51cGRhdGVQYWdpbmdCYXNlZG9uSFcoKTtcblxuICAgICAgICBjb250YWluZXIuY3VycmVudFBhZ2UgPSAxO1xuICAgICAgICBjb250YWluZXIuZ290b0xhc3RQYWdlID0gZmFsc2U7XG5cbiAgICAgICAgLy9bXS5zbGljZSA9PT0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuICAgICAgICB2YXIgdG90YWxJbWFnZUFycmF5ID0gW107XG4gICAgICAgIGxldCBibGFua0ltYWdlQ291bnQgPSAxO1xuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYmxhbmtJbWFnZUNvdW50OyBqKyspIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXJJbWFnZTIgPSBzZWxmLmNyYXRlQmxhbmtJbWFnZSgpO1xuICAgICAgICAgICAgdG90YWxJbWFnZUFycmF5LnB1c2goY29udGFpbmVySW1hZ2UyKTtcblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGFpbmVydHlwZSA9IGNvbnRhaW5lci5jb250YWluZXJ0eXBlO1xuICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5ID0gdG90YWxJbWFnZUFycmF5O1xuXG4gICAgICAgIHRoaXMuY29weUFycmF5RnJvbVRvdGFsVG9EaXNwbGF5KCk7XG5cbiAgICAgICAgdGhpcy5jcmVhdGluZ0Ryb3B6b25lSW5zdGFuY2VzKCk7XG4gICAgfVxuXG4gICAgY3VycmVudFBhZ2VDaGFuZ2VkKGV2ZW50OiBhbnksIGNvbnRhaW5lcjogYW55KSB7XG4gICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhcImN1cnJlbnRQYWdlQ2hhbmdlZCA+IFwiKTtcbiAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnBhZ2UpO1xuICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheS5sZW5ndGgpO1xuXG4gICAgICAgIGNvbnRhaW5lci5jdXJyZW50UGFnZSA9IGV2ZW50LnBhZ2U7XG5cbiAgICAgICAgdGhpcy5jb3B5QXJyYXlGcm9tVG90YWxUb0Rpc3BsYXkoKTtcblxuICAgIH1cblxuICAgIG51bWJlck9mUGFnZXModG90YWxQYWdlczogYW55LCBjb250YWluZXI6IGFueSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwibnVtYmVyT2ZQYWdlcyA+IFwiKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhldmVudCk7XG4gICAgICAgIGNvbnRhaW5lci50b3RhbFBhZ2VzID0gdG90YWxQYWdlcztcbiAgICB9XG5cbiAgICBjb3B5QXJyYXlGcm9tVG90YWxUb0Rpc3BsYXkoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29udGFpbmVyaW1hZ2UgPSBjb250YWluZXIudG90YWxJbWFnZUFycmF5Wyhjb250YWluZXIuY3VycmVudFBhZ2UtMSldO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvbnRhaW5lcmltYWdlKTtcbiAgICB9XG5cbiAgICBjcmF0ZUJsYW5rSW1hZ2UoKSB7XG4gICAgICAgIHZhciBjb250YWluZXJJbWFnZTogQ29udGFpbmVySW1hZ2UgPSB7XG4gICAgICAgICAgICBpZDogXCJcIixcbiAgICAgICAgICAgIGltYWdlbmFtZTogXCJpbWcvYnVpbGRfdmlld2Zvby9waWMxLnBuZ1wiLFxuICAgICAgICAgICAgaXNCbGFua0ltYWdlOiB0cnVlLFxuICAgICAgICAgICAgaXNDb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IFwiMCVcIlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250YWluZXJJbWFnZTtcbiAgICB9XG5cbiAgICBjcmVhdGluZ0Ryb3B6b25lSW5zdGFuY2VzKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcblxuICAgICAgICBEcm9wem9uZS5hdXRvRGlzY292ZXIgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLm15RHJvcHpvbmUgPSB7XG4gICAgICAgICAgICB1cmw6IG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvY29udGFpbmVyaW1hZ2VcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9LFxuICAgICAgICAgICAgcGFyYW1OYW1lOiBcImltYWdlXCIsXG4gICAgICAgICAgICBhdXRvUHJvY2Vzc1F1ZXVlOiB0cnVlLFxuICAgICAgICAgICAgdXBsb2FkTXVsdGlwbGU6IGZhbHNlLFxuICAgICAgICAgICAgYWNjZXB0ZWRGaWxlczogXCJpbWFnZS8qXCIsXG4gICAgICAgICAgICAvL2NsaWNrYWJsZTogJyN1cGxvYWQtaW1hZ2UsLm15RHJvcHpvbmUsLnVwbG9hZC1maWxlcycsXG4gICAgICAgICAgICAvL3ByZXZpZXdUZW1wbGF0ZTogcHJldmlld1RlbXBsYXRlLFxuICAgICAgICAgICAgdGh1bWJuYWlsV2lkdGg6IDMwMCxcbiAgICAgICAgICAgIHRodW1ibmFpbEhlaWdodDogMzAwLFxuICAgICAgICAgICAgcGFyYWxsZWxVcGxvYWRzOiAxLFxuICAgICAgICAgICAgLy9wcmV2aWV3c0NvbnRhaW5lcjogXCIuZGlzcGxheUltYWdlQmxvY2tcIixcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBzZWxmLmNvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2FsbGVkIGluaXQgXCIgKyB0aGlzLm9wdGlvbnMuY29udGFpbmVyaWQpO1xuICAgICAgICAgICAgICAgIC8vLS0tIGNyYXRlQmxhbmtJbWcodGhpcy5vcHRpb25zLmNvbnRhaW5lcmlkLCAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwiY29tcGxldGVcIiwgZnVuY3Rpb24oZmlsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0uaXNDb21wbGV0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFVwbG9hZGluZ0ZpbGVzKCkubGVuZ3RoID09PSAwICYmIHRoaXMuZ2V0UXVldWVkRmlsZXMoKS5sZW5ndGggPT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihcImFkZGVkZmlsZVwiLCBmdW5jdGlvbihmaWxlLCBhcmcxLCBhcmcyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhZGRlZGZpbGUgZXZlbnRcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZmlsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZmlsZS5pbmRleCA9IHRoaXMuaW5kZXgrKztcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWxlLmNvbnRhaW5lcmltYWdlaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5nb3RvTGFzdFBhZ2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5LnB1c2goc2VsZi5jcmF0ZUJsYW5rSW1hZ2UoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGFpbmVyLmNvbnRhaW5lcmltYWdlc1tmaWxlLmluZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jb250YWluZXJpbWFnZXMucHVzaCh7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdLmlzQmxhbmtJbWFnZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLm9wYWNpdHkgPSAwO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZi5jb3B5QXJyYXlGcm9tVG90YWxUb0Rpc3BsYXkoY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwidXBsb2FkcHJvZ3Jlc3NcIiwgZnVuY3Rpb24oZmlsZSwgcHJvZ3Jlc3MsIGJ5dGVzU2VudCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XS5wcm9ncmVzcyA9IHByb2dyZXNzICsgXCIlXCI7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJkcm9wem9uZSBldmVudCB1cGxvYWRwcm9ncmVzcyA6IFwiICsgcHJvZ3Jlc3MgKyBcImZpbGVpbmRleCA+IFwiICsgZmlsZS5pbmRleCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwic2VuZGluZ1wiLCBmdW5jdGlvbihmaWxlLCB4aHIsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgY2lkID0gZmlsZS5jb250YWluZXJpZDtcbiAgICAgICAgICAgICAgICAgICAgLy8tLS0gJChcIiNwcmV2aWV3X1wiICsgY2lkICsgXCI+LmJsYW5rbGlcIikucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihcInJlbW92ZWRmaWxlXCIsIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInJlbW92ZWRmaWxlXCIsIGZpbGUuY29udGFpbmVyaW1hZ2VpZCk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB2YXIgY2lkID0gdGhpcy5vcHRpb25zLmNvbnRhaW5lcmlkO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lcmltYWdlaWQgPSBmaWxlLmNvbnRhaW5lcmltYWdlaWQnJ1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdmFyIG51bURpdiA9ICQoXCIjcHJldmlld19cIiArIGNpZCArIFwiPi5kaXNwbGF5SW1hZ2VcIikubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgc2VsZi5hdXRoU2VydmljZS5jb250YWluZXJJbWFnZURlbGV0ZShjb250YWluZXJpbWFnZWlkKVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmF0ZUJsYW5rSW1nKGNpZCwgbnVtRGl2KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29udGFpbmVyaW1hZ2UgZGVsZXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihcInF1ZXVlY29tcGxldGVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJkcm9wem9uZSBldmVudCBxdWV1ZWNvbXBsZXRlXCIpOyAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihcInRodW1ibmFpbFwiLCBmdW5jdGlvbihmaWxlLCB0aHVtYm5haWwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImRyb3B6b25lIGV2ZW50IHRodW1ibmFpbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XS5pbWFnZW5hbWUgPSB0aHVtYm5haWw7XG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZi56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XS5pbWFnZW5hbWUgPSB0aHVtYm5haWw7XG4gICAgICAgICAgICAgICAgICAgIC8vfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIG51bURpdiA9ICQoXCIjcHJldmlld19cIiArIGNpZCArIFwiPi5kaXNwbGF5SW1hZ2VcIikubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZGlzcGxheUltYWdlTGVuZ3RoID4gXCIgKyBudW1EaXYpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICAvLy0tLSBjcmF0ZUJsYW5rSW1nKGNpZCwgbnVtRGl2KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwic3VjY2Vzc1wiLCBmdW5jdGlvbihmaWxlLCByZXMsIGUpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciByZXMgPSBKU09OLnBhcnNlKHJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1nID0gcmVzLmRhdGEuaW1hZ2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jb250YWluZXJpbWFnZXNbZmlsZS5pbmRleF0gPSBpbWc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUuY29udGFpbmVyaW1hZ2VpZCA9IGltZy5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUuY29udGFpbmVyaWQgPSBpbWcuY29udGFpbmVyaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwic3VjY2VzcyA+IFwiICsgZmlsZS5jb250YWluZXJpbWFnZWlkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XS5pZCA9IGltZy5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0uY29udGFpbmVyaWQgPSBpbWcuY29udGFpbmVyaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0uaWQgPSBmaWxlLmNvbnRhaW5lcmltYWdlaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdLmNvbnRhaW5lcmlkID0gZmlsZS5jb250YWluZXJpZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwic2V0VGltZW91dCA+IFwiKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhzZWxmLmN1cnJlbnRWaWV3Zm9vKTsgICAgICAgICAgICBcbiAgICAgICAgLy9mb3IgKHZhciBpID0gMDsgaSA8IHNlbGYuY3VycmVudFZpZXdmb28uY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyAgdmFyIGNvbnRhaW5lciA9IHNlbGYuY3VycmVudFZpZXdmb28uY29udGFpbmVyc1tpXTtcblxuXG4gICAgICAgIHNlbGYuZFpvbmUgPSBzZWxmLmNyZWF0ZURyb3Bab25lKGNvbnRhaW5lcik7XG5cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKCFjb250YWluZXIuY29udGFpbmVyaW1hZ2VzKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxuICAgICAgICBsZXQgY29udGFpbmVySW1hZ2VMZW5ndGggPSBjb250YWluZXIuY29udGFpbmVyaW1hZ2VzLmxlbmd0aDtcblxuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29udGFpbmVySW1hZ2VMZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lcmltYWdlID0gY29udGFpbmVyLmNvbnRhaW5lcmltYWdlc1tqXTtcbiAgICAgICAgICAgIHZhciBpbWdVcmwgPSBzZWxmLnNlcnZpY2VVcmwgKyBcIi91cGxvYWQvZ2FsbGVyeS9cIiArIGNvbnRhaW5lcmltYWdlLmltYWdlbmFtZTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coaW1nVXJsKTtcblxuICAgICAgICAgICAgdmFyIG1vY2tGaWxlID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6IGltZ1VybCxcbiAgICAgICAgICAgICAgICAvL3NpemU6IGZpbGVTaXplLFxuICAgICAgICAgICAgICAgIC8vdHlwZTogZmlsZU1pbWVUeXBlLFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lcmltYWdlaWQ6IGNvbnRhaW5lcmltYWdlLmlkLFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lcmlkOiBjb250YWluZXIuaWQsXG4gICAgICAgICAgICAgICAgYWNjZXB0ZWQ6IHRydWVcbiAgICAgICAgICAgICAgICAvL3N0YXR1czogRHJvcHpvbmUuU1VDQ0VTU1xuICAgICAgICAgICAgfTsgLy8gdXNlIGFjdHVhbCBpZCBzZXJ2ZXIgdXNlcyB0byBpZGVudGlmeSB0aGUgZmlsZSAoZS5nLiBEQiB1bmlxdWUgaWRlbnRpZmllcilcblxuICAgICAgICAgICAgc2VsZi5kWm9uZS5lbWl0KFwiYWRkZWRmaWxlXCIsIG1vY2tGaWxlKTtcbiAgICAgICAgICAgIHNlbGYuZFpvbmUuY3JlYXRlVGh1bWJuYWlsRnJvbVVybChtb2NrRmlsZSwgaW1nVXJsLCBudWxsLCBcIkFub255bW91c1wiKTtcbiAgICAgICAgICAgIHNlbGYuZFpvbmUuZW1pdChcInN1Y2Nlc3NcIiwgbW9ja0ZpbGUpO1xuICAgICAgICAgICAgc2VsZi5kWm9uZS5lbWl0KFwiY29tcGxldGVcIiwgbW9ja0ZpbGUpO1xuXG4gICAgICAgICAgICBzZWxmLmRab25lLmZpbGVzLnB1c2gobW9ja0ZpbGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vfSwgMTAwMCk7XG5cblxuICAgICAgICBjb250YWluZXIuZ290b0xhc3RQYWdlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjcmVhdGVEcm9wWm9uZShjb250YWluZXIpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYubXlEcm9wem9uZS5jb250YWluZXJpZCA9IGNvbnRhaW5lci5pZDtcbiAgICAgICAgLy9zZWxmLm15RHJvcHpvbmUucHJldmlld3NDb250YWluZXIgPSBcIiNwcmV2aWV3X1wiICsgY29udGFpbmVyLmlkO1xuICAgICAgICBzZWxmLm15RHJvcHpvbmUucHJldmlld3NDb250YWluZXIgPSBmYWxzZTtcbiAgICAgICAgc2VsZi5teURyb3B6b25lLmNsaWNrYWJsZSA9IFwiI3VwbG9hZF9pbWFnZV9cIiArIGNvbnRhaW5lci5pZCArIFwiLCNkenBoX1wiICsgY29udGFpbmVyLmlkO1xuICAgICAgICB2YXIgZFpvbmUgPSBuZXcgRHJvcHpvbmUoXCIjZm9ybV9cIiArIGNvbnRhaW5lci5pZCwgc2VsZi5teURyb3B6b25lKTtcblxuICAgICAgICAvL3NlbGYuY3VycmVudFZpZXdmb28ubWFwRHJvcHpvbmVbY29udGFpbmVyLmlkXSA9IGRab25lO1xuICAgICAgICByZXR1cm4gZFpvbmU7XG4gICAgfVxuXG4gICAgY29udGFpbmVySW1hZ2VEZWxldGUoY29udGFpbmVyaWQ6IHN0cmluZywgY29udGFpbmVyaW1hZ2VpZDogc3RyaW5nLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICB2YXIgYWN0dWFsSW5kZXggPSBpbmRleDtcbiAgICAgICAgdmFyIGNvbnRhaW5lckltYWdlID0gY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVthY3R1YWxJbmRleF07XG4gICAgICAgIGNvbnRhaW5lckltYWdlLmRlbGV0aW5nID0gdHJ1ZTtcblxuICAgICAgICBzZWxmLmF1dGhTZXJ2aWNlLmNvbnRhaW5lckltYWdlRGVsZXRlKGNvbnRhaW5lcmltYWdlaWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICBjb250YWluZXJJbWFnZS5kZWxldGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXkuc3BsaWNlKGFjdHVhbEluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY29udGFpbmVyaW1hZ2VzLnNwbGljZShhY3R1YWxJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgLy92YXIgY29udGFpbmVySW1hZ2UgPSBzZWxmLmNyYXRlQmxhbmtJbWFnZSgpO1xuICAgICAgICAgICAgICAgIC8vc2VsZi5jdXJyZW50Vmlld2Zvby5tYXBDb250YWluZXJbY29udGFpbmVyaWRdLnRvdGFsSW1hZ2VBcnJheS5wdXNoKGNvbnRhaW5lckltYWdlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRab25lLmluZGV4LS07XG4gICAgICAgICAgICAgICAgLy9zZWxmLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheShjb250YWluZXIpOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheShjb250YWluZXIpO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmNvbnRhaW5lci5jb250YWluZXJpbWFnZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb250YWluZXIub3BhY2l0eSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJDb250YWluZXJpbWFnZSBkZWxldGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgcHJldmlvdXNQYWdlKGV2ZW50OiBhbnksIGNvbnRhaW5lcjogYW55KXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICAvL3RoaXMuY29udGFpbmVyaW1hZ2UgPSBjb250YWluZXIudG90YWxJbWFnZUFycmF5Wyhjb250YWluZXIuY3VycmVudFBhZ2UtMildO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jb250YWluZXIuY3VycmVudFBhZ2UxID0gY29udGFpbmVyLmN1cnJlbnRQYWdlLTE7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29udGFpbmVyaW1hZ2UpO1xuICAgICAgICAvL3RoaXMuY3VycmVudFBhZ2VDaGFuZ2VkKGV2ZW50LCBjb250YWluZXIpO1xuICAgICAgLy8gIHRoaXMubnVtYmVyT2ZQYWdlcyh0b3RhbFBhZ2VzOiBhbnksIGNvbnRhaW5lcjogYW55KVxuICAgICAgICBcbiAgICB9XG4gICAgbmV4dFBhZ2UoZXZlbnQ6IGFueSwgY29udGFpbmVyOiBhbnkpe1xuICAgICAgICAvL2FsZXJ0KFwiSGVsbG9cIik7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgLy90aGlzLmNvbnRhaW5lcmltYWdlID0gY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVsoY29udGFpbmVyLmN1cnJlbnRQYWdlKV07XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jdXJyZW50UGFnZTEgPSBjb250YWluZXIuY3VycmVudFBhZ2UrMTtcbiAgICAgICAgY29uc29sZS5sb2coXCJuZXh0UGFnZSA+IFwiK3RoaXMuY29udGFpbmVyLmN1cnJlbnRQYWdlMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29udGFpbmVyaW1hZ2UpO1xuICAgICAgICAvL3RoaXMuY3VycmVudFBhZ2VDaGFuZ2VkKGV2ZW50LCBjb250YWluZXIpO1xuICAgICAgLy8gIHRoaXMubnVtYmVyT2ZQYWdlcyh0b3RhbFBhZ2VzOiBhbnksIGNvbnRhaW5lcjogYW55KVxuICAgICAgICBcbiAgICB9XG4gICAgb25EZWxldGVDb250YWluZXIoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmRlbGV0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbkNvbnRhaW5lckRlbGV0ZS5lbWl0KHRoaXMuY29udGFpbmVyLmlkKTtcbiAgICB9XG5cbiAgICBvblVwZGF0ZUNvbnRhaW5lcih2YWwpIHtcbiAgICAgICAgdGhpcy5pdGVtID0geyB0aXRsZTogdmFsLCBpZDogdGhpcy5jb250YWluZXIuaWQgfTtcblxuICAgICAgICB0aGlzLm9uQ29udGFpbmVyVXBkYXRlLmVtaXQodGhpcy5pdGVtKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrUHJldmlldyhpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGltZ0xlbmd0aCA9IHNlbGYuY29udGFpbmVyLmNvbnRhaW5lcmltYWdlcy5sZW5ndGg7XG5cbiAgICAgICAgdmFyIGZhbmN5QXJyYXkgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpbWdMZW5ndGg7IGorKykge1xuXG4gICAgICAgICAgICB2YXIgY29udGFpbmVyaW1hZ2UgPSBzZWxmLmNvbnRhaW5lci5jb250YWluZXJpbWFnZXNbal07XG4gICAgICAgICAgICB2YXIgaW1nVXJsID0gc2VsZi5zZXJ2aWNlVXJsICsgXCIvdXBsb2FkL2dhbGxlcnkvXCIgKyBjb250YWluZXJpbWFnZS5pbWFnZW5hbWU7XG5cbiAgICAgICAgICAgIHZhciBvYmpJbWFnZSA9IHtcbiAgICAgICAgICAgICAgICBocmVmOiBpbWdVcmxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmYW5jeUFycmF5LnB1c2gob2JqSW1hZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgJC5mYW5jeWJveC5vcGVuKGZhbmN5QXJyYXksIHtcbiAgICAgICAgICAgIGF1dG9TaXplOiB0cnVlLFxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgcHJldkVmZmVjdDogJ25vbmUnLFxuICAgICAgICAgICAgbmV4dEVmZmVjdDogJ25vbmUnLFxuICAgICAgICAgICAgaGVscGVyczoge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRodW1iczoge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzUsXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnV0dG9uczoge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxufVxuXG4iXX0=
