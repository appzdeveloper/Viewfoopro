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
var ImageSingleComponent = (function () {
    function ImageSingleComponent(zone, _changeDetectionRef, elementRef, authService) {
        this._changeDetectionRef = _changeDetectionRef;
        this.elementRef = elementRef;
        this.authService = authService;
        this.serviceUrl = myGlobals.serviceUrl;
        this.onContainerDelete = new core_1.EventEmitter();
        this.onContainerUpdate = new core_1.EventEmitter();
        this.zone = zone;
        this.loginUser = myGlobals.LoginUser;
    }
    Object.defineProperty(ImageSingleComponent.prototype, "ngGridItemEvent", {
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
    ImageSingleComponent.prototype.ngOnInit = function () {
    };
    ImageSingleComponent.prototype.ngAfterViewInit = function () {
        this.initContainerForDropzone();
        this._changeDetectionRef.detectChanges();
    };
    ImageSingleComponent.prototype.initContainerForDropzone = function () {
        var self = this;
        var container = this.container;
        container.opacity = 1;
        container.dispImageArray = [];
        container.currentPage = 1;
        container.gotoLastPage = false;
        var totalImageArray = [];
        var blankImageCount = container.itemsPerPage;
        var blankImageCount = 1;
        for (var j = 0; j < blankImageCount; j++) {
            var containerImage = self.crateBlankImage();
            totalImageArray.push(containerImage);
        }
        container.totalImageArray = totalImageArray;
        this.copyArrayFromTotalToDisplay();
        this.creatingDropzoneInstances();
    };
    ImageSingleComponent.prototype.currentPageChanged = function (event, container) {
        container.currentPage = event.page;
        this.copyArrayFromTotalToDisplay();
    };
    ImageSingleComponent.prototype.numberOfPages = function (totalPages, container) {
        container.totalPages = totalPages;
    };
    ImageSingleComponent.prototype.copyArrayFromTotalToDisplay = function () {
        var self = this;
        var container = this.container;
        var start = ((container.currentPage - 1) * container.itemsPerPage);
        var end = start + container.itemsPerPage;
        container.dispImageArray.splice(0, container.dispImageArray.length);
        for (var i = start; i < end; i++) {
            if (container.totalImageArray.length <= i) {
                container.totalImageArray.push(self.crateBlankImage());
            }
            container.dispImageArray.push(container.totalImageArray[i]);
        }
    };
    ImageSingleComponent.prototype.crateBlankImage = function () {
        var containerImage = {
            id: "",
            imagename: "img/select_template/third_view_icon.png",
            isBlankImage: true,
            isCompleted: false,
            progress: "0%"
        };
        return containerImage;
    };
    ImageSingleComponent.prototype.updatePagingBasedonHW = function () {
        if (this.imgblock) {
            var height = this.imgblock.nativeElement.clientHeight - 65;
            var width = this.imgblock.nativeElement.clientWidth;
            var rows = Math.floor(height / 142);
            var cols = Math.floor(width / 139);
            var perpage = 1;
            this.container.itemsPerPage = perpage;
            this.copyArrayFromTotalToDisplay();
            console.log("GallaryComponent ngGridItemEvent");
            console.log(height + "  " + width);
            console.log(rows + "  " + cols);
            console.log("perpage  " + perpage);
        }
    };
    ImageSingleComponent.prototype.creatingDropzoneInstances = function () {
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
    ImageSingleComponent.prototype.createDropZone = function (container) {
        var self = this;
        self.myDropzone.containerid = container.id;
        self.myDropzone.previewsContainer = false;
        self.myDropzone.clickable = "#upload_image_" + container.id + ",#dzph_" + container.id;
        var dZone = new Dropzone("#form_" + container.id, self.myDropzone);
        return dZone;
    };
    ImageSingleComponent.prototype.containerImageDelete = function (containerid, containerimageid, index) {
        var _this = this;
        var self = this;
        var container = this.container;
        var actualIndex = ((container.currentPage - 1) * container.itemsPerPage) + index;
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
    ImageSingleComponent.prototype.onClickPreview = function (index) {
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
    ImageSingleComponent.prototype.onUpdateContainer = function (val) {
        this.item = { title: val, id: this.container.id };
        this.onContainerUpdate.emit(this.item);
    };
    ImageSingleComponent.prototype.onDeleteContainer = function () {
        this.container.deleting = true;
        this.onContainerDelete.emit(this.container.id);
    };
    __decorate([
        core_1.ViewChild('imgblock'), 
        __metadata('design:type', core_1.ElementRef)
    ], ImageSingleComponent.prototype, "imgblock", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ImageSingleComponent.prototype, "container", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ImageSingleComponent.prototype, "ngGridItemEvent", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ImageSingleComponent.prototype, "onContainerDelete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ImageSingleComponent.prototype, "onContainerUpdate", void 0);
    ImageSingleComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'imagesingle',
            templateUrl: 'imagesingle.component.html',
            directives: [pagination_component_1.PaginationComponent, forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [core_1.NgZone, core_1.ChangeDetectorRef, core_1.ElementRef, auth_service_1.AuthService])
    ], ImageSingleComponent);
    return ImageSingleComponent;
}());
exports.ImageSingleComponent = ImageSingleComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90ZW1wbGF0ZXMvaW1hZ2VzaW5nbGUvaW1hZ2VzaW5nbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFFSyxlQUFlLENBQUMsQ0FBQTtBQUNyQix1QkFBOEIsaUJBQWlCLENBQUMsQ0FBQTtBQUNoRCxzQkFBeUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUcxRCw2QkFBNEIsb0NBQW9DLENBQUMsQ0FBQTtBQUdqRSxxQ0FBa0MsOENBQThDLENBQUMsQ0FBQTtBQUNqRixJQUFPLFNBQVMsV0FBVyxlQUFlLENBQUMsQ0FBQztBQVE1QztJQWtDSSw4QkFBWSxJQUFZLEVBQVUsbUJBQXNDLEVBQzdELFVBQXNCLEVBQ3JCLFdBQXdCO1FBRkYsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFtQjtRQUM3RCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3JCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBWnBDLGVBQVUsR0FBVyxTQUFTLENBQUMsVUFBVSxDQUFDO1FBUXhCLHNCQUFpQixHQUF5QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUM3RCxzQkFBaUIsR0FBeUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFJM0UsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBSXpDLENBQUM7SUF0Q1ksc0JBQVcsaURBQWU7YUFBMUI7WUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pDLENBQUM7YUFFRCxVQUEyQixDQUFNO1lBQzdCLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQztZQUU5QixDQUFDO1FBS0wsQ0FBQzs7O09BWEE7SUFxQ0csdUNBQVEsR0FBUjtJQUVKLENBQUM7SUFDSSw4Q0FBZSxHQUFmO1FBQ0QsSUFBSSxDQUFDLHdC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QUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELGdEQUFpQixHQUFqQjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQXpjSjtRQUFDLGdCQUFTLENBQUMsVUFBVSxDQUFDOzswREFBQTtJQUVuQjtRQUFDLFlBQUssRUFBRTs7MkRBQUE7SUFDSjtRQUFDLFlBQUssRUFBRTs7K0RBQUE7SUEyQlo7UUFBQyxhQUFNLEVBQUU7O21FQUFBO0lBQ1Q7UUFBQyxhQUFNLEVBQUU7O21FQUFBO0lBdkNiO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFVBQVUsRUFBRSxDQUFDLDBDQUFtQixFQUFFLGdDQUF3QixFQUFFLHdCQUFlLENBQUM7U0FDL0UsQ0FBQzs7NEJBQUE7SUE2Y0YsMkJBQUM7QUFBRCxDQTVjQSxBQTRjQyxJQUFBO0FBNWNZLDRCQUFvQix1QkE0Y2hDLENBQUEiLCJmaWxlIjoiYXBwL3RlbXBsYXRlcy9pbWFnZXNpbmdsZS9pbWFnZXNpbmdsZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUsIElucHV0LCBPdXRwdXQsIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLCBSZW5kZXJlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2UsIENoYW5nZURldGVjdG9yUmVmLCBWaWV3Q2hpbGR9XG5mcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdmb28gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQge1BhZ2luYXRpb25Db21wb25lbnR9IGZyb20gJy4uLy4uL3NoYXJlZC9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi8uLi9nbG9iYWxzJyk7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdpbWFnZXNpbmdsZScsXG4gICAgdGVtcGxhdGVVcmw6ICdpbWFnZXNpbmdsZS5jb21wb25lbnQuaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW1BhZ2luYXRpb25Db21wb25lbnQsIFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUywgQ09SRV9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBJbWFnZVNpbmdsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBwdWJsaWMgY29udGFpbmVydHlwZTogc3RyaW5nO1xuIEBWaWV3Q2hpbGQoJ2ltZ2Jsb2NrJykgaW1nYmxvY2s6IEVsZW1lbnRSZWY7XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgY29udGFpbmVyOiBhbnk7XG4gICAgICAgIEBJbnB1dCgpIHB1YmxpYyBnZXQgbmdHcmlkSXRlbUV2ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmdHcmlkSXRlbUV2ZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgbmdHcmlkSXRlbUV2ZW50KHY6IGFueSkge1xuICAgICAgICBpZih2KSB7XG4gICAgICAgICAgICB0aGlzLl9uZ0dyaWRJdGVtRXZlbnQgPSB2O1xuICAgICAgICAgICAgLy90aGlzLnVwZGF0ZVBhZ2luZ0Jhc2Vkb25IVygpO1xuICAgICAgICB9XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJHYWxsYXJ5Q29tcG9uZW50IG5nR3JpZEl0ZW1FdmVudCBjaGFuZ2VkXCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHYpO1xuXG4gICAgICAgIC8vdGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKCk7XG4gICAgfVxuXG4gICAgbG9naW5Vc2VyOiBVc2VyO1xuXG4gICAgdmlld2Zvb2lkOiBzdHJpbmc7XG4gICAgY29udGFpbmVyaWQ6IHN0cmluZztcbiAgICBzZXJ2aWNlVXJsOiBzdHJpbmcgPSBteUdsb2JhbHMuc2VydmljZVVybDtcbiAgICBpdGVtOiBhbnk7XG4gICAgbXlEcm9wem9uZTogYW55O1xuXG4gICAgZFpvbmU6IGFueTtcblxuICAgIHpvbmU6IE5nWm9uZTtcblxuICAgIEBPdXRwdXQoKSBwcml2YXRlIG9uQ29udGFpbmVyRGVsZXRlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcHJpdmF0ZSBvbkNvbnRhaW5lclVwZGF0ZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgY29uc3RydWN0b3Ioem9uZTogTmdab25lLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy56b25lID0gem9uZTtcblxuICAgICAgICB0aGlzLmxvZ2luVXNlciA9IG15R2xvYmFscy5Mb2dpblVzZXI7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkdhbGxhcnlDb21wb25lbnQgY29uc3RydWN0b3JcIik7ICAgICAgICBcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICAgICAgICBuZ09uSW5pdCgpIHtcblxuICAgIH1cbiAgICAgICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0Q29udGFpbmVyRm9yRHJvcHpvbmUoKTtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4vLyAgICAgICAgdXBkYXRlUGFnaW5nQmFzZWRvbkhXKCkge1xuLy8gICAgICAgIGlmICh0aGlzLmltZ2Jsb2NrKSB7XG4vL1xuLy8gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gdGhpcy5pbWdibG9jay5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCAtIDY1O1xuLy8gICAgICAgICAgICB2YXIgd2lkdGggPSB0aGlzLmltZ2Jsb2NrLm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGg7XG4vL1xuLy8gICAgICAgICAgICB2YXIgcm93cyA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gMTQyKTtcbi8vICAgICAgICAgICAgdmFyIGNvbHMgPSBNYXRoLmZsb29yKHdpZHRoIC8gMTM5KTtcbi8vXG4vLyAgICAgICAgICAgIHZhciBwZXJwYWdlID0gcm93cyAqIGNvbHM7XG4vL1xuLy8gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5pdGVtc1BlclBhZ2UgPSBwZXJwYWdlO1xuLy8gICAgICAgICAgICB0aGlzLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheSgpO1xuLy8gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbGxhcnlDb21wb25lbnQgbmdHcmlkSXRlbUV2ZW50XCIpO1xuLy8gICAgICAgICAgICBjb25zb2xlLmxvZyhoZWlnaHQrXCIgIFwiK3dpZHRoKTtcbi8vICAgICAgICAgICAgY29uc29sZS5sb2cocm93cytcIiAgXCIrY29scyk7XG4vLyAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGVycGFnZSAgXCIrcGVycGFnZSk7XG4vLyAgICAgICAgfVxuLy8gICAgfVxuLy8gICAgICAgaW5pdENvbnRhaW5lckZvckRyb3B6b25lKCkge1xuLy8gICAgICAgIHZhciBzZWxmID0gdGhpcztcbi8vICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4vL1xuLy8gICAgICAgIGNvbnRhaW5lci5vcGFjaXR5ID0gMTtcbi8vICAgICAgICBjb250YWluZXIuaXRlbXNQZXJQYWdlID0gMTtcbi8vICAgICAgICBjb250YWluZXIuY3VycmVudFBhZ2UgPSAxO1xuLy8gICAgICAgIGNvbnRhaW5lci5nb3RvTGFzdFBhZ2UgPSBmYWxzZTtcbi8vXG4vLyAgICAgICAgLy9bXS5zbGljZSA9PT0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuLy8gICAgICAgIHZhciB0b3RhbEltYWdlQXJyYXkgPSBbXTtcbi8vICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmdCYXNlZG9uSFcoKTtcbi8vICAgICAgICBsZXQgYmxhbmtJbWFnZUNvdW50ID0gY29udGFpbmVyLml0ZW1zUGVyUGFnZTtcbi8vXG4vLyAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBibGFua0ltYWdlQ291bnQ7IGorKykge1xuLy8gICAgICAgICAgICB2YXIgY29udGFpbmVySW1hZ2UgPSBzZWxmLmNyYXRlQmxhbmtJbWFnZSgpO1xuLy8gICAgICAgICAgICB0b3RhbEltYWdlQXJyYXkucHVzaChjb250YWluZXJJbWFnZSk7XG4vL1xuLy8gICAgICAgIH1cbi8vICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5ID0gdG90YWxJbWFnZUFycmF5O1xuLy8gICAgICAgIGNvbnRhaW5lci5kaXNwSW1hZ2VBcnJheSA9IFtdO1xuLy9cbi8vICAgICAgICB0aGlzLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheSgpO1xuLy9cbi8vICAgICAgICB0aGlzLmNyZWF0aW5nRHJvcHpvbmVJbnN0YW5jZXMoKTtcbi8vICAgIH1cbiAgICAgaW5pdENvbnRhaW5lckZvckRyb3B6b25lKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgXG4gICAgICAgIGNvbnRhaW5lci5vcGFjaXR5ID0gMTtcbiAgICAgICAgY29udGFpbmVyLmRpc3BJbWFnZUFycmF5ID0gW107XG4gICAgICAgIFxuICAgICAgICAvL2NvbnRhaW5lci5pdGVtc1BlclBhZ2UgPSAxO1xuICAgICAgICAvL3RoaXMudXBkYXRlUGFnaW5nQmFzZWRvbkhXKCk7XG5cbiAgICAgICAgY29udGFpbmVyLmN1cnJlbnRQYWdlID0gMTtcbiAgICAgICAgY29udGFpbmVyLmdvdG9MYXN0UGFnZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vW10uc2xpY2UgPT09IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbiAgICAgICAgdmFyIHRvdGFsSW1hZ2VBcnJheSA9IFtdO1xuICAgICAgICBsZXQgYmxhbmtJbWFnZUNvdW50ID0gY29udGFpbmVyLml0ZW1zUGVyUGFnZTtcbiAgICAgICAgICAgIGxldCBibGFua0ltYWdlQ291bnQgPSAxO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGJsYW5rSW1hZ2VDb3VudDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVySW1hZ2UgPSBzZWxmLmNyYXRlQmxhbmtJbWFnZSgpO1xuICAgICAgICAgICAgdG90YWxJbWFnZUFycmF5LnB1c2goY29udGFpbmVySW1hZ2UpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5ID0gdG90YWxJbWFnZUFycmF5O1xuICAgICAgICBcblxuICAgICAgICB0aGlzLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheSgpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRpbmdEcm9wem9uZUluc3RhbmNlcygpO1xuICAgIH1cbiAgICAgICAgY3VycmVudFBhZ2VDaGFuZ2VkKGV2ZW50OiBhbnksIGNvbnRhaW5lcjogYW55KSB7XG4gICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhcImN1cnJlbnRQYWdlQ2hhbmdlZCA+IFwiKTtcbiAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnBhZ2UpO1xuICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheS5sZW5ndGgpO1xuXG4gICAgICAgIGNvbnRhaW5lci5jdXJyZW50UGFnZSA9IGV2ZW50LnBhZ2U7XG5cbiAgICAgICAgdGhpcy5jb3B5QXJyYXlGcm9tVG90YWxUb0Rpc3BsYXkoKTtcblxuICAgIH1cbiAgICAgICAgbnVtYmVyT2ZQYWdlcyh0b3RhbFBhZ2VzOiBhbnksIGNvbnRhaW5lcjogYW55KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJudW1iZXJPZlBhZ2VzID4gXCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGV2ZW50KTtcblxuICAgICAgICBjb250YWluZXIudG90YWxQYWdlcyA9IHRvdGFsUGFnZXM7XG4gICAgfVxuICAgIFxuICAgIGNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheSgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG5cbiAgICAgICAgdmFyIHN0YXJ0ID0gKChjb250YWluZXIuY3VycmVudFBhZ2UgLSAxKSAqIGNvbnRhaW5lci5pdGVtc1BlclBhZ2UpO1xuICAgICAgICB2YXIgZW5kID0gc3RhcnQgKyBjb250YWluZXIuaXRlbXNQZXJQYWdlO1xuICAgICAgICAvL2NvbnRhaW5lci5kaXNwSW1hZ2VBcnJheSA9IGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXkuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gICAgICAgIC8vdmFyIGRpc3BJbWFnZUFycmF5ID0gW107XG4gICAgICAgIGNvbnRhaW5lci5kaXNwSW1hZ2VBcnJheS5zcGxpY2UoMCwgY29udGFpbmVyLmRpc3BJbWFnZUFycmF5Lmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheS5sZW5ndGggPD0gaSkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXkucHVzaChzZWxmLmNyYXRlQmxhbmtJbWFnZSgpKTtcbiAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgaWYgKCFjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ldKSB7XG4vLyAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5LnB1c2goc2VsZi5jcmF0ZUJsYW5rSW1hZ2UoKSk7XG4vLyAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRhaW5lci5kaXNwSW1hZ2VBcnJheS5wdXNoKGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbaV0pO1xuICAgICAgICAgICAgLy9kaXNwSW1hZ2VBcnJheS5wdXNoKGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbaV0pO1xuICAgICAgICB9XG4gICAgICAgIC8vc2VsZi56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIC8vY29udGFpbmVyLmRpc3BJbWFnZUFycmF5LnB1c2goZGlzcEltYWdlQXJyYXkpO1xuICAgICAgICAvL30pO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiY29weUFycmF5RnJvbVRvdGFsVG9EaXNwbGF5IHN0YXJ0ID0gXCIgKyBzdGFydCArIFwiIHRvdGFsRWxlbWVudDogXCIgKyBjb250YWluZXIuaXRlbXNQZXJQYWdlKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhjb250YWluZXIudG90YWxJbWFnZUFycmF5KTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhjb250YWluZXIuZGlzcEltYWdlQXJyYXkpO1xuICAgIH1cbiAgXG4gICAgXG4gICAgICAgIGNyYXRlQmxhbmtJbWFnZSgpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lckltYWdlOiBDb250YWluZXJJbWFnZSA9IHtcbiAgICAgICAgICAgIGlkOiBcIlwiLFxuICAgICAgICAgICAgaW1hZ2VuYW1lOiBcImltZy9zZWxlY3RfdGVtcGxhdGUvdGhpcmRfdmlld19pY29uLnBuZ1wiLFxuICAgICAgICAgICAgaXNCbGFua0ltYWdlOiB0cnVlLFxuICAgICAgICAgICAgaXNDb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IFwiMCVcIlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250YWluZXJJbWFnZTtcbiAgICB9XG4gICAgICAgIHVwZGF0ZVBhZ2luZ0Jhc2Vkb25IVygpIHtcbiAgICAgICAgaWYgKHRoaXMuaW1nYmxvY2spIHtcblxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IHRoaXMuaW1nYmxvY2submF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQgLSA2NTtcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IHRoaXMuaW1nYmxvY2submF0aXZlRWxlbWVudC5jbGllbnRXaWR0aDtcblxuICAgICAgICAgICAgdmFyIHJvd3MgPSBNYXRoLmZsb29yKGhlaWdodCAvIDE0Mik7XG4gICAgICAgICAgICB2YXIgY29scyA9IE1hdGguZmxvb3Iod2lkdGggLyAxMzkpO1xuXG4gICAgICAgICAgICB2YXIgcGVycGFnZSA9IDE7XG5cbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLml0ZW1zUGVyUGFnZSA9IHBlcnBhZ2U7XG4gICAgICAgICAgICB0aGlzLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYWxsYXJ5Q29tcG9uZW50IG5nR3JpZEl0ZW1FdmVudFwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGhlaWdodCtcIiAgXCIrd2lkdGgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocm93cytcIiAgXCIrY29scyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBlcnBhZ2UgIFwiK3BlcnBhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgICAgY3JlYXRpbmdEcm9wem9uZUluc3RhbmNlcygpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG5cbiAgICAgICAgRHJvcHpvbmUuYXV0b0Rpc2NvdmVyID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5teURyb3B6b25lID0ge1xuICAgICAgICAgICAgdXJsOiBteUdsb2JhbHMuc2VydmljZVVybCArIFwiL2NvbnRhaW5lcmltYWdlXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7IFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSxcbiAgICAgICAgICAgIHBhcmFtTmFtZTogXCJpbWFnZVwiLFxuICAgICAgICAgICAgYXV0b1Byb2Nlc3NRdWV1ZTogdHJ1ZSxcbiAgICAgICAgICAgIHVwbG9hZE11bHRpcGxlOiBmYWxzZSxcbiAgICAgICAgICAgIGFjY2VwdGVkRmlsZXM6IFwiaW1hZ2UvKlwiLFxuICAgICAgICAgICAgLy9jbGlja2FibGU6ICcjdXBsb2FkLWltYWdlLC5teURyb3B6b25lLC51cGxvYWQtZmlsZXMnLFxuICAgICAgICAgICAgLy9wcmV2aWV3VGVtcGxhdGU6IHByZXZpZXdUZW1wbGF0ZSxcbiAgICAgICAgICAgIHRodW1ibmFpbFdpZHRoOiAzMDAsXG4gICAgICAgICAgICB0aHVtYm5haWxIZWlnaHQ6IDMwMCxcbiAgICAgICAgICAgIHBhcmFsbGVsVXBsb2FkczogMSxcbiAgICAgICAgICAgIC8vcHJldmlld3NDb250YWluZXI6IFwiLmRpc3BsYXlJbWFnZUJsb2NrXCIsXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gc2VsZi5jb250YWluZXI7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImNhbGxlZCBpbml0IFwiICsgdGhpcy5vcHRpb25zLmNvbnRhaW5lcmlkKTtcbiAgICAgICAgICAgICAgICAvLy0tLSBjcmF0ZUJsYW5rSW1nKHRoaXMub3B0aW9ucy5jb250YWluZXJpZCwgMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihcImNvbXBsZXRlXCIsIGZ1bmN0aW9uKGZpbGUpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdLmlzQ29tcGxldGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRVcGxvYWRpbmdGaWxlcygpLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmdldFF1ZXVlZEZpbGVzKCkubGVuZ3RoID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJhZGRlZGZpbGVcIiwgZnVuY3Rpb24oZmlsZSwgYXJnMSwgYXJnMikge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiYWRkZWRmaWxlIGV2ZW50XCIpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGZpbGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZpbGUuaW5kZXggPSB0aGlzLmluZGV4Kys7XG5cblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWxlLmNvbnRhaW5lcmltYWdlaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5nb3RvTGFzdFBhZ2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5LnB1c2goc2VsZi5jcmF0ZUJsYW5rSW1hZ2UoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGFpbmVyLmNvbnRhaW5lcmltYWdlc1tmaWxlLmluZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jb250YWluZXJpbWFnZXMucHVzaCh7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdLmlzQmxhbmtJbWFnZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLm9wYWNpdHkgPSAwO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZi5jb3B5QXJyYXlGcm9tVG90YWxUb0Rpc3BsYXkoY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwidXBsb2FkcHJvZ3Jlc3NcIiwgZnVuY3Rpb24oZmlsZSwgcHJvZ3Jlc3MsIGJ5dGVzU2VudCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XS5wcm9ncmVzcyA9IHByb2dyZXNzICsgXCIlXCI7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJkcm9wem9uZSBldmVudCB1cGxvYWRwcm9ncmVzcyA6IFwiICsgcHJvZ3Jlc3MgKyBcImZpbGVpbmRleCA+IFwiICsgZmlsZS5pbmRleCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihcInNlbmRpbmdcIiwgZnVuY3Rpb24oZmlsZSwgeGhyLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIGNpZCA9IGZpbGUuY29udGFpbmVyaWQ7XG4gICAgICAgICAgICAgICAgICAgIC8vLS0tICQoXCIjcHJldmlld19cIiArIGNpZCArIFwiPi5ibGFua2xpXCIpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJyZW1vdmVkZmlsZVwiLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJyZW1vdmVkZmlsZVwiLCBmaWxlLmNvbnRhaW5lcmltYWdlaWQpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdmFyIGNpZCA9IHRoaXMub3B0aW9ucy5jb250YWluZXJpZDtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHZhciBjb250YWluZXJpbWFnZWlkID0gZmlsZS5jb250YWluZXJpbWFnZWlkJydcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHZhciBudW1EaXYgPSAkKFwiI3ByZXZpZXdfXCIgKyBjaWQgKyBcIj4uZGlzcGxheUltYWdlXCIpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHNlbGYuYXV0aFNlcnZpY2UuY29udGFpbmVySW1hZ2VEZWxldGUoY29udGFpbmVyaW1hZ2VpZClcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JhdGVCbGFua0ltZyhjaWQsIG51bURpdik7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbnRhaW5lcmltYWdlIGRlbGV0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJxdWV1ZWNvbXBsZXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZHJvcHpvbmUgZXZlbnQgcXVldWVjb21wbGV0ZVwiKTsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJ0aHVtYm5haWxcIiwgZnVuY3Rpb24oZmlsZSwgdGh1bWJuYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJkcm9wem9uZSBldmVudCB0aHVtYm5haWxcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XS5pbWFnZW5hbWUgPSB0aHVtYm5haWw7XG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZi56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XS5pbWFnZW5hbWUgPSB0aHVtYm5haWw7XG4gICAgICAgICAgICAgICAgICAgIC8vfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIG51bURpdiA9ICQoXCIjcHJldmlld19cIiArIGNpZCArIFwiPi5kaXNwbGF5SW1hZ2VcIikubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZGlzcGxheUltYWdlTGVuZ3RoID4gXCIgKyBudW1EaXYpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICAvLy0tLSBjcmF0ZUJsYW5rSW1nKGNpZCwgbnVtRGl2KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwic3VjY2Vzc1wiLCBmdW5jdGlvbihmaWxlLCByZXMsIGUpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciByZXMgPSBKU09OLnBhcnNlKHJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1nID0gcmVzLmRhdGEuaW1hZ2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jb250YWluZXJpbWFnZXNbZmlsZS5pbmRleF0gPSBpbWc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUuY29udGFpbmVyaW1hZ2VpZCA9IGltZy5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUuY29udGFpbmVyaWQgPSBpbWcuY29udGFpbmVyaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwic3VjY2VzcyA+IFwiICsgZmlsZS5jb250YWluZXJpbWFnZWlkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XS5pZCA9IGltZy5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0uY29udGFpbmVyaWQgPSBpbWcuY29udGFpbmVyaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0uaWQgPSBmaWxlLmNvbnRhaW5lcmltYWdlaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdLmNvbnRhaW5lcmlkID0gZmlsZS5jb250YWluZXJpZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwic2V0VGltZW91dCA+IFwiKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhzZWxmLmN1cnJlbnRWaWV3Zm9vKTsgICAgICAgICAgICBcbiAgICAgICAgLy9mb3IgKHZhciBpID0gMDsgaSA8IHNlbGYuY3VycmVudFZpZXdmb28uY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyAgdmFyIGNvbnRhaW5lciA9IHNlbGYuY3VycmVudFZpZXdmb28uY29udGFpbmVyc1tpXTtcblxuXG4gICAgICAgIHNlbGYuZFpvbmUgPSBzZWxmLmNyZWF0ZURyb3Bab25lKGNvbnRhaW5lcik7XG5cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKCFjb250YWluZXIuY29udGFpbmVyaW1hZ2VzKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxuICAgICAgICBsZXQgY29udGFpbmVySW1hZ2VMZW5ndGggPSBjb250YWluZXIuY29udGFpbmVyaW1hZ2VzLmxlbmd0aDtcblxuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29udGFpbmVySW1hZ2VMZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lcmltYWdlID0gY29udGFpbmVyLmNvbnRhaW5lcmltYWdlc1tqXTtcblxuICAgICAgICAgICAgdmFyIGltZ1VybCA9IHNlbGYuc2VydmljZVVybCArIFwiL3VwbG9hZC9nYWxsZXJ5L1wiICsgY29udGFpbmVyaW1hZ2UuaW1hZ2VuYW1lO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhpbWdVcmwpO1xuXG4gICAgICAgICAgICB2YXIgbW9ja0ZpbGUgPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogaW1nVXJsLFxuICAgICAgICAgICAgICAgIC8vc2l6ZTogZmlsZVNpemUsXG4gICAgICAgICAgICAgICAgLy90eXBlOiBmaWxlTWltZVR5cGUsXG4gICAgICAgICAgICAgICAgY29udGFpbmVyaW1hZ2VpZDogY29udGFpbmVyaW1hZ2UuaWQsXG4gICAgICAgICAgICAgICAgY29udGFpbmVyaWQ6IGNvbnRhaW5lci5pZCxcbiAgICAgICAgICAgICAgICBhY2NlcHRlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIC8vc3RhdHVzOiBEcm9wem9uZS5TVUNDRVNTXG4gICAgICAgICAgICB9OyAvLyB1c2UgYWN0dWFsIGlkIHNlcnZlciB1c2VzIHRvIGlkZW50aWZ5IHRoZSBmaWxlIChlLmcuIERCIHVuaXF1ZSBpZGVudGlmaWVyKVxuXG4gICAgICAgICAgICBzZWxmLmRab25lLmVtaXQoXCJhZGRlZGZpbGVcIiwgbW9ja0ZpbGUpO1xuICAgICAgICAgICAgc2VsZi5kWm9uZS5jcmVhdGVUaHVtYm5haWxGcm9tVXJsKG1vY2tGaWxlLCBpbWdVcmwsIG51bGwsIFwiQW5vbnltb3VzXCIpO1xuICAgICAgICAgICAgc2VsZi5kWm9uZS5lbWl0KFwic3VjY2Vzc1wiLCBtb2NrRmlsZSk7XG4gICAgICAgICAgICBzZWxmLmRab25lLmVtaXQoXCJjb21wbGV0ZVwiLCBtb2NrRmlsZSk7XG5cbiAgICAgICAgICAgIHNlbGYuZFpvbmUuZmlsZXMucHVzaChtb2NrRmlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy99LCAxMDAwKTtcblxuXG4gICAgICAgIGNvbnRhaW5lci5nb3RvTGFzdFBhZ2UgPSB0cnVlO1xuICAgIH1cblxuICAgY3JlYXRlRHJvcFpvbmUoY29udGFpbmVyKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLm15RHJvcHpvbmUuY29udGFpbmVyaWQgPSBjb250YWluZXIuaWQ7XG4gICAgICAgIC8vc2VsZi5teURyb3B6b25lLnByZXZpZXdzQ29udGFpbmVyID0gXCIjcHJldmlld19cIiArIGNvbnRhaW5lci5pZDtcbiAgICAgICAgc2VsZi5teURyb3B6b25lLnByZXZpZXdzQ29udGFpbmVyID0gZmFsc2U7XG4gICAgICAgIHNlbGYubXlEcm9wem9uZS5jbGlja2FibGUgPSBcIiN1cGxvYWRfaW1hZ2VfXCIgKyBjb250YWluZXIuaWQgKyBcIiwjZHpwaF9cIiArIGNvbnRhaW5lci5pZDtcbiAgICAgICAgdmFyIGRab25lID0gbmV3IERyb3B6b25lKFwiI2Zvcm1fXCIgKyBjb250YWluZXIuaWQsIHNlbGYubXlEcm9wem9uZSk7XG5cbiAgICAgICAgLy9zZWxmLmN1cnJlbnRWaWV3Zm9vLm1hcERyb3B6b25lW2NvbnRhaW5lci5pZF0gPSBkWm9uZTtcbiAgICAgICAgcmV0dXJuIGRab25lO1xuICAgIH1cbiAgICBjb250YWluZXJJbWFnZURlbGV0ZShjb250YWluZXJpZDogc3RyaW5nLCBjb250YWluZXJpbWFnZWlkOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG5cbiAgICAgICAgdmFyIGFjdHVhbEluZGV4ID0gKChjb250YWluZXIuY3VycmVudFBhZ2UgLSAxKSAqIGNvbnRhaW5lci5pdGVtc1BlclBhZ2UpICsgaW5kZXg7XG4gICAgICAgIHZhciBjb250YWluZXJJbWFnZSA9IGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbYWN0dWFsSW5kZXhdO1xuICAgICAgICBjb250YWluZXJJbWFnZS5kZWxldGluZyA9IHRydWU7XG5cbiAgICAgICAgc2VsZi5hdXRoU2VydmljZS5jb250YWluZXJJbWFnZURlbGV0ZShjb250YWluZXJpbWFnZWlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXN1bHQpO1xuXG4gICAgICAgICAgICAgICAgY29udGFpbmVySW1hZ2UuZGVsZXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5LnNwbGljZShhY3R1YWxJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNvbnRhaW5lcmltYWdlcy5zcGxpY2UoYWN0dWFsSW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIC8vdmFyIGNvbnRhaW5lckltYWdlID0gc2VsZi5jcmF0ZUJsYW5rSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAvL3NlbGYuY3VycmVudFZpZXdmb28ubWFwQ29udGFpbmVyW2NvbnRhaW5lcmlkXS50b3RhbEltYWdlQXJyYXkucHVzaChjb250YWluZXJJbWFnZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5kWm9uZS5pbmRleC0tO1xuICAgICAgICAgICAgICAgIC8vc2VsZi5jb3B5QXJyYXlGcm9tVG90YWxUb0Rpc3BsYXkoY29udGFpbmVyKTsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb3B5QXJyYXlGcm9tVG90YWxUb0Rpc3BsYXkoY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5jb250YWluZXIuY29udGFpbmVyaW1hZ2VzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29udGFpbmVyLm9wYWNpdHkgPSAxO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ29udGFpbmVyaW1hZ2UgZGVsZXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuIFxuICAgIFxuICAgIFxuICAgIG9uQ2xpY2tQcmV2aWV3KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgaW1nTGVuZ3RoID0gc2VsZi5jb250YWluZXIuY29udGFpbmVyaW1hZ2VzLmxlbmd0aDtcblxuICAgICAgICB2YXIgZmFuY3lBcnJheSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGltZ0xlbmd0aDsgaisrKSB7XG5cbiAgICAgICAgICAgIHZhciBjb250YWluZXJpbWFnZSA9IHNlbGYuY29udGFpbmVyLmNvbnRhaW5lcmltYWdlc1tqXTtcbiAgICAgICAgICAgIHZhciBpbWdVcmwgPSBzZWxmLnNlcnZpY2VVcmwgKyBcIi91cGxvYWQvZ2FsbGVyeS9cIiArIGNvbnRhaW5lcmltYWdlLmltYWdlbmFtZTtcblxuICAgICAgICAgICAgdmFyIG9iakltYWdlID0ge1xuICAgICAgICAgICAgICAgIGhyZWY6IGltZ1VybFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZhbmN5QXJyYXkucHVzaChvYmpJbWFnZSk7XG4gICAgICAgIH1cblxuICAgICAgICAkLmZhbmN5Ym94Lm9wZW4oZmFuY3lBcnJheSwge1xuICAgICAgICAgICAgYXV0b1NpemU6IHRydWUsXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICBwcmV2RWZmZWN0OiAnbm9uZScsXG4gICAgICAgICAgICBuZXh0RWZmZWN0OiAnbm9uZScsXG4gICAgICAgICAgICBoZWxwZXJzOiB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGh1bWJzOiB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3NSxcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidXR0b25zOiB7fVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICBvblVwZGF0ZUNvbnRhaW5lcih2YWwpIHtcbiAgICAgICBcbiAgICAgICAgdGhpcy5pdGVtID0geyB0aXRsZTogdmFsLCBpZDogdGhpcy5jb250YWluZXIuaWR9O1xuICAgICAgICB0aGlzLm9uQ29udGFpbmVyVXBkYXRlLmVtaXQodGhpcy5pdGVtKTtcbiAgICB9XG4gICAgIFxuICAgIG9uRGVsZXRlQ29udGFpbmVyKCl7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmRlbGV0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbkNvbnRhaW5lckRlbGV0ZS5lbWl0KHRoaXMuY29udGFpbmVyLmlkKTtcbiAgICB9XG59XG4iXX0=
