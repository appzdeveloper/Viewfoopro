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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC92aWV3Zm9vZGV0YWlsL2Nhcm91c2Vsdmlldy9jYXJvdXNlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHFCQUVLLGVBQWUsQ0FBQyxDQUFBO0FBQ3JCLHVCQUFtQyxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3JELHNCQUF5QyxnQkFBZ0IsQ0FBQyxDQUFBO0FBRzFELDZCQUE0QixvQ0FBb0MsQ0FBQyxDQUFBO0FBR2pFLHFDQUFrQyw4Q0FBOEMsQ0FBQyxDQUFBO0FBQ2pGLElBQU8sU0FBUyxXQUFXLGVBQWUsQ0FBQyxDQUFDO0FBUTVDO0lBa0RJLDJCQUFZLElBQVksRUFBVSxtQkFBc0MsRUFDN0QsVUFBc0IsRUFDckIsV0FBd0I7UUFGRix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW1CO1FBQzdELGVBQVUsR0FBVixVQUFVLENBQVk7UUFDckIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFoRHBDLG1CQUFjLEdBQVksRUFBRSxDQUFDO1FBcUJYLHNCQUFpQixHQUF5QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUM3RCxzQkFBaUIsR0FBeUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFPL0UsZUFBVSxHQUFXLFNBQVMsQ0FBQyxVQUFVLENBQUM7UUFVMUMsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsZUFBVSxHQUFHLE9BQU8sQ0FBQztRQUNyQixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFLaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBWXpDLENBQUM7SUF6RFEsc0JBQVcsOENBQWU7YUFBMUI7WUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pD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REFBQTtJQUV0QjtRQUFDLFlBQUssRUFBRTs7d0RBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7NERBQUE7SUFlUjtRQUFDLGFBQU0sRUFBRTs7Z0VBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7Z0VBQUE7SUFoQ2I7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxVQUFVLEVBQUUsQ0FBQywwQ0FBbUIsRUFBRSxnQ0FBd0IsRUFBRSx3QkFBZSxFQUFDLGFBQUksQ0FBQztTQUNwRixDQUFDOzt5QkFBQTtJQTZhRix3QkFBQztBQUFELENBNWFBLEFBNGFDLElBQUE7QUE1YVkseUJBQWlCLG9CQTRhN0IsQ0FBQSIsImZpbGUiOiJhcHAvdmlld2Zvb2RldGFpbC9jYXJvdXNlbHZpZXcvY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUsIElucHV0LCBPdXRwdXQsIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLCBSZW5kZXJlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2UsIENoYW5nZURldGVjdG9yUmVmLCBWaWV3Q2hpbGR9XG5mcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTLE5nSWZ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld2ZvbyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7UGFnaW5hdGlvbkNvbXBvbmVudH0gZnJvbSAnLi4vLi4vc2hhcmVkL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uLy4uL2dsb2JhbHMnKTtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2Nhcm91c2Vsc2luZ2xlJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2Nhcm91c2VsLmNvbXBvbmVudC5odG1sJ1xuICAgIGRpcmVjdGl2ZXM6IFtQYWdpbmF0aW9uQ29tcG9uZW50LCBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMsIENPUkVfRElSRUNUSVZFUyxOZ0lmXVxufSlcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwdWJsaWMgY29udGFpbmVydHlwZTogc3RyaW5nO1xuICAgIFxuICAgIGN1cnJlbnRWaWV3Zm9vOiBWaWV3Zm9vID0ge307XG4gICAgXG4gICAgQFZpZXdDaGlsZCgnaW1nYmxvY2snKSBpbWdibG9jazogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBjb250YWluZXI6IGFueTtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBnZXQgbmdHcmlkSXRlbUV2ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmdHcmlkSXRlbUV2ZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgbmdHcmlkSXRlbUV2ZW50KHY6IGFueSkge1xuICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgdGhpcy5fbmdHcmlkSXRlbUV2ZW50ID0gdjtcbiAgICAgICAgICAgIC8vdGhpcy51cGRhdGVQYWdpbmdCYXNlZG9uSFcoKTtcbiAgICAgICAgfVxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiR2FsbGFyeUNvbXBvbmVudCBuZ0dyaWRJdGVtRXZlbnQgY2hhbmdlZFwiKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh2KTtcblxuICAgICAgICAvL3RoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcygpO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSBwcml2YXRlIG9uQ29udGFpbmVyRGVsZXRlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcHJpdmF0ZSBvbkNvbnRhaW5lclVwZGF0ZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgLy9AT3V0cHV0KCkgcHJpdmF0ZSBvbkNvbnRhaW5lckltYWdlQ2xpY2s6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgbG9naW5Vc2VyOiBVc2VyO1xuXG4gICAgdmlld2Zvb2lkOiBzdHJpbmc7XG4gICAgY29udGFpbmVyaWQ6IHN0cmluZztcbiAgICBzZXJ2aWNlVXJsOiBzdHJpbmcgPSBteUdsb2JhbHMuc2VydmljZVVybDtcbiAgICBpdGVtOiBhbnk7XG4gICAgbXlEcm9wem9uZTogYW55O1xuXG4gICAgZFpvbmU6IGFueTtcblxuICAgIHpvbmU6IE5nWm9uZTtcbiAgICBcbiAgICBjb250YWluZXJpbWFnZTogYW55OyAgICBcbiAgICBcbiAgICBzbGlkZUluZGV4ID0gMTtcbiAgICBzbGlkZVdyYXAgPSB0cnVlO1xuICAgIHNsaWRlSW50ZXJ2YWwgPSAwO1xuICAgIHNsaWRlUGF1c2UgPSBcImhvdmVyXCI7XG4gICAgc2xpZGVOb1RyYW5zaXRpb24gPSB0cnVlO1xuICAgIGV4dHJhU2xpZGVzID0gZmFsc2U7XG4gICAgXG4gICAgY29uc3RydWN0b3Ioem9uZTogTmdab25lLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy56b25lID0gem9uZTtcblxuICAgICAgICB0aGlzLmxvZ2luVXNlciA9IG15R2xvYmFscy5Mb2dpblVzZXI7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJHYWxsYXJ5Q29tcG9uZW50IGNvbnN0cnVjdG9yXCIpOyAgICAgICAgXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuLy8gICAgICAgIHRoaXMuc2xpZGVJbmRleCA9IDE7XG4vLyAgICAgICAgdGhpcy5zbGlkZVdyYXAgPSB0cnVlO1xuLy8gICAgICAgIHRoaXMuc2xpZGVJbnRlcnZhbCA9IDUwMDA7XG4vLyAgICAgICAgdGhpcy5zbGlkZVBhdXNlID0gXCJob3ZlclwiO1xuLy8gICAgICAgIHRoaXMuc2xpZGVOb1RyYW5zaXRpb24gPSBmYWxzZTtcbi8vICAgICAgICB0aGlzLmV4dHJhU2xpZGVzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICB0aGlzLmNvbnRhaW5lcnR5cGUgPSBjb250YWluZXIuY29udGFpbmVydHlwZTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdENvbnRhaW5lckZvckRyb3B6b25lKCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSAgICBcblxuICAgIGluaXRDb250YWluZXJGb3JEcm9wem9uZSgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG5cbiAgICAgICAgY29udGFpbmVyLm9wYWNpdHkgPSAxO1xuICAgICAgICBjb250YWluZXIuZGlzcEltYWdlQXJyYXkgPSBbXTtcblxuICAgICAgICBjb250YWluZXIuaXRlbXNQZXJQYWdlID0gMTtcbiAgICAgICAgLy90aGlzLnVwZGF0ZVBhZ2luZ0Jhc2Vkb25IVygpO1xuXG4gICAgICAgIGNvbnRhaW5lci5jdXJyZW50UGFnZSA9IDE7XG4gICAgICAgIGNvbnRhaW5lci5nb3RvTGFzdFBhZ2UgPSBmYWxzZTtcblxuICAgICAgICAvL1tdLnNsaWNlID09PSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG4gICAgICAgIHZhciB0b3RhbEltYWdlQXJyYXkgPSBbXTtcbiAgICAgICAgbGV0IGJsYW5rSW1hZ2VDb3VudCA9IDE7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBibGFua0ltYWdlQ291bnQ7IGorKykge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lckltYWdlMiA9IHNlbGYuY3JhdGVCbGFua0ltYWdlKCk7XG4gICAgICAgICAgICB0b3RhbEltYWdlQXJyYXkucHVzaChjb250YWluZXJJbWFnZTIpO1xuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250YWluZXJ0eXBlID0gY29udGFpbmVyLmNvbnRhaW5lcnR5cGU7XG4gICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXkgPSB0b3RhbEltYWdlQXJyYXk7XG5cbiAgICAgICAgdGhpcy5jb3B5QXJyYXlGcm9tVG90YWxUb0Rpc3BsYXkoKTtcblxuICAgICAgICB0aGlzLmNyZWF0aW5nRHJvcHpvbmVJbnN0YW5jZXMoKTtcbiAgICB9XG5cbiAgICBjdXJyZW50UGFnZUNoYW5nZWQoZXZlbnQ6IGFueSwgY29udGFpbmVyOiBhbnkpIHtcbiAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKFwiY3VycmVudFBhZ2VDaGFuZ2VkID4gXCIpO1xuICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coZXZlbnQucGFnZSk7XG4gICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhjb250YWluZXIudG90YWxJbWFnZUFycmF5Lmxlbmd0aCk7XG5cbiAgICAgICAgY29udGFpbmVyLmN1cnJlbnRQYWdlID0gZXZlbnQucGFnZTtcblxuICAgICAgICB0aGlzLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheSgpO1xuXG4gICAgfVxuXG4gICAgbnVtYmVyT2ZQYWdlcyh0b3RhbFBhZ2VzOiBhbnksIGNvbnRhaW5lcjogYW55KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJudW1iZXJPZlBhZ2VzID4gXCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgICAgY29udGFpbmVyLnRvdGFsUGFnZXMgPSB0b3RhbFBhZ2VzO1xuICAgIH1cblxuICAgIGNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheSgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdGhpcy5jb250YWluZXJpbWFnZSA9IGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbKGNvbnRhaW5lci5jdXJyZW50UGFnZS0xKV07XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29udGFpbmVyaW1hZ2UpO1xuICAgIH1cblxuICAgIGNyYXRlQmxhbmtJbWFnZSgpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lckltYWdlOiBDb250YWluZXJJbWFnZSA9IHtcbiAgICAgICAgICAgIGlkOiBcIlwiLFxuICAgICAgICAgICAgaW1hZ2VuYW1lOiBcImltZy9idWlsZF92aWV3Zm9vL3BpYzEucG5nXCIsXG4gICAgICAgICAgICBpc0JsYW5rSW1hZ2U6IHRydWUsXG4gICAgICAgICAgICBpc0NvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgICAgICBwcm9ncmVzczogXCIwJVwiXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lckltYWdlO1xuICAgIH1cblxuICAgIGNyZWF0aW5nRHJvcHpvbmVJbnN0YW5jZXMoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuXG4gICAgICAgIERyb3B6b25lLmF1dG9EaXNjb3ZlciA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMubXlEcm9wem9uZSA9IHtcbiAgICAgICAgICAgIHVybDogbXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9jb250YWluZXJpbWFnZVwiLFxuICAgICAgICAgICAgaGVhZGVyczogeyBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0sXG4gICAgICAgICAgICBwYXJhbU5hbWU6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgIGF1dG9Qcm9jZXNzUXVldWU6IHRydWUsXG4gICAgICAgICAgICB1cGxvYWRNdWx0aXBsZTogZmFsc2UsXG4gICAgICAgICAgICBhY2NlcHRlZEZpbGVzOiBcImltYWdlLypcIixcbiAgICAgICAgICAgIC8vY2xpY2thYmxlOiAnI3VwbG9hZC1pbWFnZSwubXlEcm9wem9uZSwudXBsb2FkLWZpbGVzJyxcbiAgICAgICAgICAgIC8vcHJldmlld1RlbXBsYXRlOiBwcmV2aWV3VGVtcGxhdGUsXG4gICAgICAgICAgICB0aHVtYm5haWxXaWR0aDogMzAwLFxuICAgICAgICAgICAgdGh1bWJuYWlsSGVpZ2h0OiAzMDAsXG4gICAgICAgICAgICBwYXJhbGxlbFVwbG9hZHM6IDEsXG4gICAgICAgICAgICAvL3ByZXZpZXdzQ29udGFpbmVyOiBcIi5kaXNwbGF5SW1hZ2VCbG9ja1wiLFxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHNlbGYuY29udGFpbmVyO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjYWxsZWQgaW5pdCBcIiArIHRoaXMub3B0aW9ucy5jb250YWluZXJpZCk7XG4gICAgICAgICAgICAgICAgLy8tLS0gY3JhdGVCbGFua0ltZyh0aGlzLm9wdGlvbnMuY29udGFpbmVyaWQsIDApO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJjb21wbGV0ZVwiLCBmdW5jdGlvbihmaWxlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XS5pc0NvbXBsZXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0VXBsb2FkaW5nRmlsZXMoKS5sZW5ndGggPT09IDAgJiYgdGhpcy5nZXRRdWV1ZWRGaWxlcygpLmxlbmd0aCA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwiYWRkZWRmaWxlXCIsIGZ1bmN0aW9uKGZpbGUsIGFyZzEsIGFyZzIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImFkZGVkZmlsZSBldmVudFwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhmaWxlKTtcblxuICAgICAgICAgICAgICAgICAgICBmaWxlLmluZGV4ID0gdGhpcy5pbmRleCsrO1xuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbGUuY29udGFpbmVyaW1hZ2VpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmdvdG9MYXN0UGFnZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXkucHVzaChzZWxmLmNyYXRlQmxhbmtJbWFnZSgpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250YWluZXIuY29udGFpbmVyaW1hZ2VzW2ZpbGUuaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmNvbnRhaW5lcmltYWdlcy5wdXNoKHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0uaXNCbGFua0ltYWdlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIub3BhY2l0eSA9IDA7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWxmLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheShjb250YWluZXIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJ1cGxvYWRwcm9ncmVzc1wiLCBmdW5jdGlvbihmaWxlLCBwcm9ncmVzcywgYnl0ZXNTZW50KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdLnByb2dyZXNzID0gcHJvZ3Jlc3MgKyBcIiVcIjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImRyb3B6b25lIGV2ZW50IHVwbG9hZHByb2dyZXNzIDogXCIgKyBwcm9ncmVzcyArIFwiZmlsZWluZGV4ID4gXCIgKyBmaWxlLmluZGV4KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMub24oXCJzZW5kaW5nXCIsIGZ1bmN0aW9uKGZpbGUsIHhociwgZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAvL3ZhciBjaWQgPSBmaWxlLmNvbnRhaW5lcmlkO1xuICAgICAgICAgICAgICAgICAgICAvLy0tLSAkKFwiI3ByZXZpZXdfXCIgKyBjaWQgKyBcIj4uYmxhbmtsaVwiKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwicmVtb3ZlZGZpbGVcIiwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicmVtb3ZlZGZpbGVcIiwgZmlsZS5jb250YWluZXJpbWFnZWlkKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHZhciBjaWQgPSB0aGlzLm9wdGlvbnMuY29udGFpbmVyaWQ7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyaW1hZ2VpZCA9IGZpbGUuY29udGFpbmVyaW1hZ2VpZCcnXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB2YXIgbnVtRGl2ID0gJChcIiNwcmV2aWV3X1wiICsgY2lkICsgXCI+LmRpc3BsYXlJbWFnZVwiKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBzZWxmLmF1dGhTZXJ2aWNlLmNvbnRhaW5lckltYWdlRGVsZXRlKGNvbnRhaW5lcmltYWdlaWQpXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyYXRlQmxhbmtJbWcoY2lkLCBudW1EaXYpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb250YWluZXJpbWFnZSBkZWxldGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwicXVldWVjb21wbGV0ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImRyb3B6b25lIGV2ZW50IHF1ZXVlY29tcGxldGVcIik7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwidGh1bWJuYWlsXCIsIGZ1bmN0aW9uKGZpbGUsIHRodW1ibmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZHJvcHpvbmUgZXZlbnQgdGh1bWJuYWlsXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdLmltYWdlbmFtZSA9IHRodW1ibmFpbDtcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxmLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdLmltYWdlbmFtZSA9IHRodW1ibmFpbDtcbiAgICAgICAgICAgICAgICAgICAgLy99KTtcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgbnVtRGl2ID0gJChcIiNwcmV2aWV3X1wiICsgY2lkICsgXCI+LmRpc3BsYXlJbWFnZVwiKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJkaXNwbGF5SW1hZ2VMZW5ndGggPiBcIiArIG51bURpdik7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgIC8vLS0tIGNyYXRlQmxhbmtJbWcoY2lkLCBudW1EaXYpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJzdWNjZXNzXCIsIGZ1bmN0aW9uKGZpbGUsIHJlcywgZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHJlcyA9IEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbWcgPSByZXMuZGF0YS5pbWFnZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmNvbnRhaW5lcmltYWdlc1tmaWxlLmluZGV4XSA9IGltZztcblxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5jb250YWluZXJpbWFnZWlkID0gaW1nLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5jb250YWluZXJpZCA9IGltZy5jb250YWluZXJpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJzdWNjZXNzID4gXCIgKyBmaWxlLmNvbnRhaW5lcmltYWdlaWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdLmlkID0gaW1nLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XS5jb250YWluZXJpZCA9IGltZy5jb250YWluZXJpZDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XS5pZCA9IGZpbGUuY29udGFpbmVyaW1hZ2VpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0uY29udGFpbmVyaWQgPSBmaWxlLmNvbnRhaW5lcmlkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL3NldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJzZXRUaW1lb3V0ID4gXCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHNlbGYuY3VycmVudFZpZXdmb28pOyAgICAgICAgICAgIFxuICAgICAgICAvL2ZvciAodmFyIGkgPSAwOyBpIDwgc2VsZi5jdXJyZW50Vmlld2Zvby5jb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vICB2YXIgY29udGFpbmVyID0gc2VsZi5jdXJyZW50Vmlld2Zvby5jb250YWluZXJzW2ldO1xuXG5cbiAgICAgICAgc2VsZi5kWm9uZSA9IHNlbGYuY3JlYXRlRHJvcFpvbmUoY29udGFpbmVyKTtcblxuICAgICAgICAvLyAgICAgICAgICAgICAgICBpZiAoIWNvbnRhaW5lci5jb250YWluZXJpbWFnZXMpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICB9XG4gICAgICAgIGxldCBjb250YWluZXJJbWFnZUxlbmd0aCA9IGNvbnRhaW5lci5jb250YWluZXJpbWFnZXMubGVuZ3RoO1xuXG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb250YWluZXJJbWFnZUxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyaW1hZ2UgPSBjb250YWluZXIuY29udGFpbmVyaW1hZ2VzW2pdO1xuICAgICAgICAgICAgdmFyIGltZ1VybCA9IHNlbGYuc2VydmljZVVybCArIFwiL3VwbG9hZC9nYWxsZXJ5L1wiICsgY29udGFpbmVyaW1hZ2UuaW1hZ2VuYW1lO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhpbWdVcmwpO1xuXG4gICAgICAgICAgICB2YXIgbW9ja0ZpbGUgPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogaW1nVXJsLFxuICAgICAgICAgICAgICAgIC8vc2l6ZTogZmlsZVNpemUsXG4gICAgICAgICAgICAgICAgLy90eXBlOiBmaWxlTWltZVR5cGUsXG4gICAgICAgICAgICAgICAgY29udGFpbmVyaW1hZ2VpZDogY29udGFpbmVyaW1hZ2UuaWQsXG4gICAgICAgICAgICAgICAgY29udGFpbmVyaWQ6IGNvbnRhaW5lci5pZCxcbiAgICAgICAgICAgICAgICBhY2NlcHRlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIC8vc3RhdHVzOiBEcm9wem9uZS5TVUNDRVNTXG4gICAgICAgICAgICB9OyAvLyB1c2UgYWN0dWFsIGlkIHNlcnZlciB1c2VzIHRvIGlkZW50aWZ5IHRoZSBmaWxlIChlLmcuIERCIHVuaXF1ZSBpZGVudGlmaWVyKVxuXG4gICAgICAgICAgICBzZWxmLmRab25lLmVtaXQoXCJhZGRlZGZpbGVcIiwgbW9ja0ZpbGUpO1xuICAgICAgICAgICAgc2VsZi5kWm9uZS5jcmVhdGVUaHVtYm5haWxGcm9tVXJsKG1vY2tGaWxlLCBpbWdVcmwsIG51bGwsIFwiQW5vbnltb3VzXCIpO1xuICAgICAgICAgICAgc2VsZi5kWm9uZS5lbWl0KFwic3VjY2Vzc1wiLCBtb2NrRmlsZSk7XG4gICAgICAgICAgICBzZWxmLmRab25lLmVtaXQoXCJjb21wbGV0ZVwiLCBtb2NrRmlsZSk7XG5cbiAgICAgICAgICAgIHNlbGYuZFpvbmUuZmlsZXMucHVzaChtb2NrRmlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy99LCAxMDAwKTtcblxuXG4gICAgICAgIGNvbnRhaW5lci5nb3RvTGFzdFBhZ2UgPSB0cnVlO1xuICAgIH1cblxuICAgIGNyZWF0ZURyb3Bab25lKGNvbnRhaW5lcikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5teURyb3B6b25lLmNvbnRhaW5lcmlkID0gY29udGFpbmVyLmlkO1xuICAgICAgICAvL3NlbGYubXlEcm9wem9uZS5wcmV2aWV3c0NvbnRhaW5lciA9IFwiI3ByZXZpZXdfXCIgKyBjb250YWluZXIuaWQ7XG4gICAgICAgIHNlbGYubXlEcm9wem9uZS5wcmV2aWV3c0NvbnRhaW5lciA9IGZhbHNlO1xuICAgICAgICBzZWxmLm15RHJvcHpvbmUuY2xpY2thYmxlID0gXCIjdXBsb2FkX2ltYWdlX1wiICsgY29udGFpbmVyLmlkICsgXCIsI2R6cGhfXCIgKyBjb250YWluZXIuaWQ7XG4gICAgICAgIHZhciBkWm9uZSA9IG5ldyBEcm9wem9uZShcIiNmb3JtX1wiICsgY29udGFpbmVyLmlkLCBzZWxmLm15RHJvcHpvbmUpO1xuXG4gICAgICAgIC8vc2VsZi5jdXJyZW50Vmlld2Zvby5tYXBEcm9wem9uZVtjb250YWluZXIuaWRdID0gZFpvbmU7XG4gICAgICAgIHJldHVybiBkWm9uZTtcbiAgICB9XG5cbiAgICBjb250YWluZXJJbWFnZURlbGV0ZShjb250YWluZXJpZDogc3RyaW5nLCBjb250YWluZXJpbWFnZWlkOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIHZhciBhY3R1YWxJbmRleCA9IGluZGV4O1xuICAgICAgICB2YXIgY29udGFpbmVySW1hZ2UgPSBjb250YWluZXIudG90YWxJbWFnZUFycmF5W2FjdHVhbEluZGV4XTtcbiAgICAgICAgY29udGFpbmVySW1hZ2UuZGVsZXRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHNlbGYuYXV0aFNlcnZpY2UuY29udGFpbmVySW1hZ2VEZWxldGUoY29udGFpbmVyaW1hZ2VpZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzdWx0KTtcblxuICAgICAgICAgICAgICAgIGNvbnRhaW5lckltYWdlLmRlbGV0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheS5zcGxpY2UoYWN0dWFsSW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jb250YWluZXJpbWFnZXMuc3BsaWNlKGFjdHVhbEluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAvL3ZhciBjb250YWluZXJJbWFnZSA9IHNlbGYuY3JhdGVCbGFua0ltYWdlKCk7XG4gICAgICAgICAgICAgICAgLy9zZWxmLmN1cnJlbnRWaWV3Zm9vLm1hcENvbnRhaW5lcltjb250YWluZXJpZF0udG90YWxJbWFnZUFycmF5LnB1c2goY29udGFpbmVySW1hZ2UpO1xuICAgICAgICAgICAgICAgIHNlbGYuZFpvbmUuaW5kZXgtLTtcbiAgICAgICAgICAgICAgICAvL3NlbGYuY29weUFycmF5RnJvbVRvdGFsVG9EaXNwbGF5KGNvbnRhaW5lcik7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29weUFycmF5RnJvbVRvdGFsVG9EaXNwbGF5KGNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuY29udGFpbmVyLmNvbnRhaW5lcmltYWdlcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbnRhaW5lci5vcGFjaXR5ID0gMTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNvbnRhaW5lcmltYWdlIGRlbGV0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBwcmV2aW91c1BhZ2UoZXZlbnQ6IGFueSwgY29udGFpbmVyOiBhbnkpe1xuICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIC8vdGhpcy5jb250YWluZXJpbWFnZSA9IGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbKGNvbnRhaW5lci5jdXJyZW50UGFnZS0yKV07XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jdXJyZW50UGFnZTEgPSBjb250YWluZXIuY3VycmVudFBhZ2UtMTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb250YWluZXJpbWFnZSk7XG4gICAgICAgIC8vdGhpcy5jdXJyZW50UGFnZUNoYW5nZWQoZXZlbnQsIGNvbnRhaW5lcik7XG4gICAgICAvLyAgdGhpcy5udW1iZXJPZlBhZ2VzKHRvdGFsUGFnZXM6IGFueSwgY29udGFpbmVyOiBhbnkpXG4gICAgICAgIFxuICAgIH1cbiAgICBuZXh0UGFnZShldmVudDogYW55LCBjb250YWluZXI6IGFueSl7XG4gICAgICAgIC8vYWxlcnQoXCJIZWxsb1wiKTtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICAvL3RoaXMuY29udGFpbmVyaW1hZ2UgPSBjb250YWluZXIudG90YWxJbWFnZUFycmF5Wyhjb250YWluZXIuY3VycmVudFBhZ2UpXTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmN1cnJlbnRQYWdlMSA9IGNvbnRhaW5lci5jdXJyZW50UGFnZSsxO1xuICAgICAgICBjb25zb2xlLmxvZyhcIm5leHRQYWdlID4gXCIrdGhpcy5jb250YWluZXIuY3VycmVudFBhZ2UxKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb250YWluZXJpbWFnZSk7XG4gICAgICAgIC8vdGhpcy5jdXJyZW50UGFnZUNoYW5nZWQoZXZlbnQsIGNvbnRhaW5lcik7XG4gICAgICAvLyAgdGhpcy5udW1iZXJPZlBhZ2VzKHRvdGFsUGFnZXM6IGFueSwgY29udGFpbmVyOiBhbnkpXG4gICAgICAgIFxuICAgIH1cbiAgICBvbkRlbGV0ZUNvbnRhaW5lcigpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuZGVsZXRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLm9uQ29udGFpbmVyRGVsZXRlLmVtaXQodGhpcy5jb250YWluZXIuaWQpO1xuICAgIH1cblxuICAgIG9uVXBkYXRlQ29udGFpbmVyKHZhbCkge1xuICAgICAgICB0aGlzLml0ZW0gPSB7IHRpdGxlOiB2YWwsIGlkOiB0aGlzLmNvbnRhaW5lci5pZCB9O1xuXG4gICAgICAgIHRoaXMub25Db250YWluZXJVcGRhdGUuZW1pdCh0aGlzLml0ZW0pO1xuICAgIH1cblxuICAgIG9uQ2xpY2tQcmV2aWV3KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgaW1nTGVuZ3RoID0gc2VsZi5jb250YWluZXIuY29udGFpbmVyaW1hZ2VzLmxlbmd0aDtcblxuICAgICAgICB2YXIgZmFuY3lBcnJheSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGltZ0xlbmd0aDsgaisrKSB7XG5cbiAgICAgICAgICAgIHZhciBjb250YWluZXJpbWFnZSA9IHNlbGYuY29udGFpbmVyLmNvbnRhaW5lcmltYWdlc1tqXTtcbiAgICAgICAgICAgIHZhciBpbWdVcmwgPSBzZWxmLnNlcnZpY2VVcmwgKyBcIi91cGxvYWQvZ2FsbGVyeS9cIiArIGNvbnRhaW5lcmltYWdlLmltYWdlbmFtZTtcblxuICAgICAgICAgICAgdmFyIG9iakltYWdlID0ge1xuICAgICAgICAgICAgICAgIGhyZWY6IGltZ1VybFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZhbmN5QXJyYXkucHVzaChvYmpJbWFnZSk7XG4gICAgICAgIH1cblxuICAgICAgICAkLmZhbmN5Ym94Lm9wZW4oZmFuY3lBcnJheSwge1xuICAgICAgICAgICAgYXV0b1NpemU6IHRydWUsXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICBwcmV2RWZmZWN0OiAnbm9uZScsXG4gICAgICAgICAgICBuZXh0RWZmZWN0OiAnbm9uZScsXG4gICAgICAgICAgICBoZWxwZXJzOiB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGh1bWJzOiB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3NSxcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidXR0b25zOiB7fVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG59XG5cbiJdfQ==
