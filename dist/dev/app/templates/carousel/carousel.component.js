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
        this.onContainerDelete = new core_1.EventEmitter();
        this.onContainerUpdate = new core_1.EventEmitter();
        this.imageUrl = myGlobals.imageUrl + "/upload/gallery/";
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
        if (this.containertype == 'carousel') {
            this.containertitle = "Carousel container title";
        }
        else {
            this.containertitle = "Image container title";
        }
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
            url: myGlobals.imageUrl + "/containerimage",
            headers: { "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" },
            paramName: "image",
            autoProcessQueue: true,
            uploadMultiple: false,
            acceptedFiles: "image/*",
            thumbnailWidth: null,
            thumbnailHeight: null,
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
            var imgUrl = self.imageUrl + containerimage.imagename;
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
            var imgUrl = self.imageUrl + containerimage.imagename;
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
    ], CarouselComponent.prototype, "currentViewfoo", void 0);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90ZW1wbGF0ZXMvY2Fyb3VzZWwvY2Fyb3VzZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxxQkFFSyxlQUFlLENBQUMsQ0FBQTtBQUNyQix1QkFBbUMsaUJBQWlCLENBQUMsQ0FBQTtBQUNyRCxzQkFBeUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUcxRCw2QkFBNEIsb0NBQW9DLENBQUMsQ0FBQTtBQUdqRSxxQ0FBa0MsOENBQThDLENBQUMsQ0FBQTtBQUNqRixJQUFPLFNBQVMsV0FBVyxlQUFlLENBQUMsQ0FBQztBQVE1QztJQXVESSwyQkFBWSxJQUFZLEVBQVUsbUJBQXNDLEVBQzdELFVBQXNCLEVBQ3JCLFdBQXdCO1FBRkYsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFtQjtRQUM3RCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3JCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBL0JsQixzQkFBaUIsR0FBeUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDN0Qsc0JBQWlCLEdBQXlCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBUy9FLGFBQVEsR0FBVyxTQUFTLENBQUMsUUFBUSxHQUFHLGtCQUFrQixDQUFDO1FBRTNELGVBQVUsR0FBVyxTQUFTLENBQUMsVUFBVSxDQUFDO1FBVTFDLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxPQUFPLENBQUM7UUFDckIsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBTWhCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQVl6QyxDQUFDO0lBOURRLHNCQUFXLDhDQUFlO2FBQTFCO1lBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqQyxDQUFDO2FBRUQsVUFBMkIsQ0FBTTtZQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7WUFFOUIsQ0FBQztRQUtMLENBQUM7OztPQVhBO0lBOERELG9DQUFRLEdBQVI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7UUFDN0MsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxjQUFjLEdBQUcsMEJBQTBCLENBQUM7UUFDckQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGNBQWMsR0FBRyx1QkFBdUIsQ0FBQztRQUNsRCxDQUFDO0lBQ0wsQ0FBQztJQUVELDJDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNoQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFFaEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxvREFBd0IsR0FBeEI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUUvQixTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUN0QixTQUFTLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUU5QixTQUFTLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUczQixTQUFTLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUMxQixTQUFTLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUcvQixJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDO1FBRXhCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdkMsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQzdDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFMUMsQ0FBQztRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztRQUM3QyxTQUFTLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUU1QyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUVuQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsOENBQWtCLEdBQWxCLFVBQW1CLEtBQVUsRUFBRSxTQUFjO1FBS3pDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUVuQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztJQUV2QyxDQUFDO0lBRUQseUNBQWEsR0FBYixVQUFjLFVBQWUsRUFBRSxTQUFjO1FBR3pDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ3RDLENBQUM7SUFFRCx1REFBMkIsR0FBM0I7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUcvQixJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELDJDQUFlLEdBQWY7UUFDSSxJQUFJLGNBQWMsR0FBbUI7WUFDakMsRUFBRSxFQUFFLEVBQUU7WUFDTixTQUFTLEVBQUUsNEJBQTRCO1lBQ3ZDLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUE7UUFDRCxNQUFNLENBQUMsY0FBYyxDQUFDO0lBQzFCLENBQUM7SUFFRCxxREFBeUIsR0FBekI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUUvQixRQUFRLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUU5QixJQUFJLENBQUMsVUFBVSxHQUFHO1lBQ2QsR0FBRyxFQUFFLFNBQVMsQ0FBQyxRQUFRLEdBQUcsaUJBQWlCO1lBQzNDLE9BQU8sRUFBRSxFQUFFLGVBQWUsRUFBRSxvREFBb0QsRUFBRTtZQUNsRixTQUFTLEVBQUUsT0FBTztZQUNsQixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLGFBQWEsRUFBRSxTQUFTO1lBR3hCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGVBQWUsRUFBRSxDQUFDO1lBRWxCLElBQUksRUFBRTtnQkFDRixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUcvQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFTLElBQUk7b0JBRTdCLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7b0JBRXpELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVsRixDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQVMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO29CQUkxQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7d0JBSVYsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3pDLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO3dCQUUzRCxDQUFDO3dCQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN6QyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDdkMsQ0FBQzt3QkFDRCxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO3dCQUMzRCxTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztvQkFJMUIsQ0FBQyxDQUFDLENBQUM7Z0JBRVAsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFTLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUztvQkFFeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7d0JBQ1YsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxHQUFHLFFBQVEsR0FBRyxHQUFHLENBQUM7b0JBQ3BFLENBQUMsQ0FBQyxDQUFDO2dCQUdQLENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJO2dCQUczQyxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxVQUFTLElBQUk7Z0JBZ0JwQyxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRTtnQkFFekIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBUyxJQUFJLEVBQUUsU0FBUztvQkFFekMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFRaEUsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBUyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUM7b0JBRXBDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBR04sSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7d0JBRXpCLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQzt3QkFFNUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0JBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQzt3QkFHbkMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0JBQ2xELFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDO29CQUN4RSxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUVKLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7d0JBQ2pFLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO29CQUN6RSxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztTQUNKLENBQUE7UUFTRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFLNUMsSUFBSSxvQkFBb0IsR0FBRyxTQUFTLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztRQUc1RCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFvQixFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDNUMsSUFBSSxjQUFjLEdBQUcsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUFHdEQsSUFBSSxRQUFRLEdBQUc7Z0JBQ1gsSUFBSSxFQUFFLE1BQU07Z0JBR1osZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLEVBQUU7Z0JBQ25DLFdBQVcsRUFBRSxTQUFTLENBQUMsRUFBRTtnQkFDekIsUUFBUSxFQUFFLElBQUk7YUFFakIsQ0FBQztZQUVGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFJRCxTQUFTLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUNsQyxDQUFDO0lBRUQsMENBQWMsR0FBZCxVQUFlLFNBQVM7UUFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWhCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUM7UUFFM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLEVBQUUsR0FBRyxTQUFTLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQztRQUN2RixJQUFJLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFHbkUsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsZ0RBQW9CLEdBQXBCLFVBQXFCLFdBQW1CLEVBQUUsZ0JBQXdCLEVBQUUsS0FBYTtRQUFqRixpQkErQkM7UUE5QkcsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDL0IsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksY0FBYyxHQUFHLFNBQVMsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUQsY0FBYyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQzthQUNsRCxTQUFTLENBQUMsVUFBQyxNQUFNO1lBR2QsY0FBYyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFFOUIsU0FBUyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pELFNBQVMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUdqRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRW5CLFVBQVUsQ0FBQztnQkFDUCxJQUFJLENBQUMsMkJBQTJCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEQsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUMvQixDQUFDO1FBR0wsQ0FBQyxFQUFFLFVBQUMsS0FBVTtZQUNWLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRTFCLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNELHdDQUFZLEdBQVosVUFBYSxLQUFVLEVBQUUsU0FBYztRQUNuQyxJQUFJLElBQUksR0FBQyxJQUFJLENBQUM7UUFDZCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRy9CLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDO1FBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBSXJDLENBQUM7SUFDRCxvQ0FBUSxHQUFSLFVBQVMsS0FBVSxFQUFFLFNBQWM7UUFFL0IsSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDO1FBQ2QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUcvQixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQztRQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBSXJDLENBQUM7SUFDRCw2Q0FBaUIsR0FBakI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCw2Q0FBaUIsR0FBakIsVUFBa0IsR0FBRztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUVsRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsMENBQWMsR0FBZCxVQUFlLEtBQWE7UUFDeEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztRQUV0RCxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDcEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUVqQyxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUFFdEQsSUFBSSxRQUFRLEdBQUc7Z0JBQ1gsSUFBSSxFQUFFLE1BQU07YUFDZixDQUFDO1lBQ0YsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRUQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3hCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLEtBQUs7WUFDWixVQUFVLEVBQUUsTUFBTTtZQUNsQixVQUFVLEVBQUUsTUFBTTtZQUNsQixPQUFPLEVBQUU7Z0JBS0wsT0FBTyxFQUFFLEVBQUU7YUFDZDtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUEvYUQ7UUFBQyxnQkFBUyxDQUFDLFVBQVUsQ0FBQzs7dURBQUE7SUFFdEI7UUFBQyxZQUFLLEVBQUU7O3dEQUFBO0lBQ1I7UUFBQyxZQUFLLEVBQUU7OzZEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzREQUFBO0lBZVI7UUFBQyxhQUFNLEVBQUU7O2dFQUFBO0lBQ1Q7UUFBQyxhQUFNLEVBQUU7O2dFQUFBO0lBakNiO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsVUFBVSxFQUFFLENBQUMsMENBQW1CLEVBQUUsZ0NBQXdCLEVBQUUsd0JBQWUsRUFBQyxhQUFJLENBQUM7U0FDcEYsQ0FBQzs7eUJBQUE7SUF3YkYsd0JBQUM7QUFBRCxDQXZiQSxBQXViQyxJQUFBO0FBdmJZLHlCQUFpQixvQkF1YjdCLENBQUEiLCJmaWxlIjoiYXBwL3RlbXBsYXRlcy9jYXJvdXNlbC9jYXJvdXNlbC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZH1cbmZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVMsTmdJZn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3Zm9vIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtQYWdpbmF0aW9uQ29tcG9uZW50fSBmcm9tICcuLi8uLi9zaGFyZWQvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vLi4vZ2xvYmFscycpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnY2Fyb3VzZWxzaW5nbGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnY2Fyb3VzZWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtQYWdpbmF0aW9uQ29tcG9uZW50LCBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMsIENPUkVfRElSRUNUSVZFUyxOZ0lmXVxufSlcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwdWJsaWMgY29udGFpbmVydHlwZTogc3RyaW5nO1xuXG4gICAgcHVibGljIF9uZ0dyaWRJdGVtRXZlbnQ6IGFueTtcblxuICAgIEBWaWV3Q2hpbGQoJ2ltZ2Jsb2NrJykgaW1nYmxvY2s6IEVsZW1lbnRSZWY7XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgY29udGFpbmVyOiBhbnk7XG4gICAgQElucHV0KCkgcHVibGljIGN1cnJlbnRWaWV3Zm9vOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgcHVibGljIGdldCBuZ0dyaWRJdGVtRXZlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uZ0dyaWRJdGVtRXZlbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBuZ0dyaWRJdGVtRXZlbnQodjogYW55KSB7XG4gICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICB0aGlzLl9uZ0dyaWRJdGVtRXZlbnQgPSB2O1xuICAgICAgICAgICAgLy90aGlzLnVwZGF0ZVBhZ2luZ0Jhc2Vkb25IVygpO1xuICAgICAgICB9XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJHYWxsYXJ5Q29tcG9uZW50IG5nR3JpZEl0ZW1FdmVudCBjaGFuZ2VkXCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHYpO1xuXG4gICAgICAgIC8vdGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKCk7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIHByaXZhdGUgb25Db250YWluZXJEZWxldGU6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBwcml2YXRlIG9uQ29udGFpbmVyVXBkYXRlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAvL0BPdXRwdXQoKSBwcml2YXRlIG9uQ29udGFpbmVySW1hZ2VDbGljazogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjb250YWluZXJ0aXRsZTogc3RyaW5nO1xuXG4gICAgbG9naW5Vc2VyOiBVc2VyO1xuXG4gICAgdmlld2Zvb2lkOiBzdHJpbmc7XG4gICAgY29udGFpbmVyaWQ6IHN0cmluZztcbiAgICBpbWFnZVVybDogc3RyaW5nID0gbXlHbG9iYWxzLmltYWdlVXJsICsgXCIvdXBsb2FkL2dhbGxlcnkvXCI7XG5cbiAgICBzZXJ2aWNlVXJsOiBzdHJpbmcgPSBteUdsb2JhbHMuc2VydmljZVVybDtcbiAgICBpdGVtOiBhbnk7XG4gICAgbXlEcm9wem9uZTogYW55O1xuXG4gICAgZFpvbmU6IGFueTtcblxuICAgIHpvbmU6IE5nWm9uZTtcblxuICAgIGNvbnRhaW5lcmltYWdlOiBhbnk7XG5cbiAgICBzbGlkZUluZGV4ID0gMTtcbiAgICBzbGlkZVdyYXAgPSB0cnVlO1xuICAgIHNsaWRlSW50ZXJ2YWwgPSAwO1xuICAgIHNsaWRlUGF1c2UgPSBcImhvdmVyXCI7XG4gICAgc2xpZGVOb1RyYW5zaXRpb24gPSB0cnVlO1xuICAgIGV4dHJhU2xpZGVzID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcih6b25lOiBOZ1pvbmUsIHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xuXG4gICAgICAgIHRoaXMuem9uZSA9IHpvbmU7XG5cbiAgICAgICAgdGhpcy5sb2dpblVzZXIgPSBteUdsb2JhbHMuTG9naW5Vc2VyO1xuXG5cblxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiR2FsbGFyeUNvbXBvbmVudCBjb25zdHJ1Y3RvclwiKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4vLyAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gMTtcbi8vICAgICAgICB0aGlzLnNsaWRlV3JhcCA9IHRydWU7XG4vLyAgICAgICAgdGhpcy5zbGlkZUludGVydmFsID0gNTAwMDtcbi8vICAgICAgICB0aGlzLnNsaWRlUGF1c2UgPSBcImhvdmVyXCI7XG4vLyAgICAgICAgdGhpcy5zbGlkZU5vVHJhbnNpdGlvbiA9IGZhbHNlO1xuLy8gICAgICAgIHRoaXMuZXh0cmFTbGlkZXMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIHRoaXMuY29udGFpbmVydHlwZSA9IGNvbnRhaW5lci5jb250YWluZXJ0eXBlO1xuICAgICAgICBpZih0aGlzLmNvbnRhaW5lcnR5cGU9PSdjYXJvdXNlbCcpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVydGl0bGUgPSBcIkNhcm91c2VsIGNvbnRhaW5lciB0aXRsZVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXJ0aXRsZSA9IFwiSW1hZ2UgY29udGFpbmVyIHRpdGxlXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdENvbnRhaW5lckZvckRyb3B6b25lKCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIGluaXRDb250YWluZXJGb3JEcm9wem9uZSgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG5cbiAgICAgICAgY29udGFpbmVyLm9wYWNpdHkgPSAxO1xuICAgICAgICBjb250YWluZXIuZGlzcEltYWdlQXJyYXkgPSBbXTtcblxuICAgICAgICBjb250YWluZXIuaXRlbXNQZXJQYWdlID0gMTtcbiAgICAgICAgLy90aGlzLnVwZGF0ZVBhZ2luZ0Jhc2Vkb25IVygpO1xuXG4gICAgICAgIGNvbnRhaW5lci5jdXJyZW50UGFnZSA9IDE7XG4gICAgICAgIGNvbnRhaW5lci5nb3RvTGFzdFBhZ2UgPSBmYWxzZTtcblxuICAgICAgICAvL1tdLnNsaWNlID09PSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG4gICAgICAgIHZhciB0b3RhbEltYWdlQXJyYXkgPSBbXTtcbiAgICAgICAgbGV0IGJsYW5rSW1hZ2VDb3VudCA9IDE7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBibGFua0ltYWdlQ291bnQ7IGorKykge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lckltYWdlMiA9IHNlbGYuY3JhdGVCbGFua0ltYWdlKCk7XG4gICAgICAgICAgICB0b3RhbEltYWdlQXJyYXkucHVzaChjb250YWluZXJJbWFnZTIpO1xuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250YWluZXJ0eXBlID0gY29udGFpbmVyLmNvbnRhaW5lcnR5cGU7XG4gICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXkgPSB0b3RhbEltYWdlQXJyYXk7XG5cbiAgICAgICAgdGhpcy5jb3B5QXJyYXlGcm9tVG90YWxUb0Rpc3BsYXkoKTtcblxuICAgICAgICB0aGlzLmNyZWF0aW5nRHJvcHpvbmVJbnN0YW5jZXMoKTtcbiAgICB9XG5cbiAgICBjdXJyZW50UGFnZUNoYW5nZWQoZXZlbnQ6IGFueSwgY29udGFpbmVyOiBhbnkpIHtcbiAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKFwiY3VycmVudFBhZ2VDaGFuZ2VkID4gXCIpO1xuICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coZXZlbnQucGFnZSk7XG4gICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhjb250YWluZXIudG90YWxJbWFnZUFycmF5Lmxlbmd0aCk7XG5cbiAgICAgICAgY29udGFpbmVyLmN1cnJlbnRQYWdlID0gZXZlbnQucGFnZTtcblxuICAgICAgICB0aGlzLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheSgpO1xuXG4gICAgfVxuXG4gICAgbnVtYmVyT2ZQYWdlcyh0b3RhbFBhZ2VzOiBhbnksIGNvbnRhaW5lcjogYW55KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJudW1iZXJPZlBhZ2VzID4gXCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgICAgY29udGFpbmVyLnRvdGFsUGFnZXMgPSB0b3RhbFBhZ2VzO1xuICAgIH1cblxuICAgIGNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheSgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG5cblxuICAgICAgICB0aGlzLmNvbnRhaW5lcmltYWdlID0gY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVsoY29udGFpbmVyLmN1cnJlbnRQYWdlLTEpXTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb250YWluZXJpbWFnZSk7XG4gICAgfVxuXG4gICAgY3JhdGVCbGFua0ltYWdlKCkge1xuICAgICAgICB2YXIgY29udGFpbmVySW1hZ2U6IENvbnRhaW5lckltYWdlID0ge1xuICAgICAgICAgICAgaWQ6IFwiXCIsXG4gICAgICAgICAgICBpbWFnZW5hbWU6IFwiaW1nL2J1aWxkX3ZpZXdmb28vcGljMS5wbmdcIixcbiAgICAgICAgICAgIGlzQmxhbmtJbWFnZTogdHJ1ZSxcbiAgICAgICAgICAgIGlzQ29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHByb2dyZXNzOiBcIjAlXCJcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGFpbmVySW1hZ2U7XG4gICAgfVxuXG4gICAgY3JlYXRpbmdEcm9wem9uZUluc3RhbmNlcygpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG5cbiAgICAgICAgRHJvcHpvbmUuYXV0b0Rpc2NvdmVyID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5teURyb3B6b25lID0ge1xuICAgICAgICAgICAgdXJsOiBteUdsb2JhbHMuaW1hZ2VVcmwgKyBcIi9jb250YWluZXJpbWFnZVwiLFxuICAgICAgICAgICAgaGVhZGVyczogeyBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0sXG4gICAgICAgICAgICBwYXJhbU5hbWU6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgIGF1dG9Qcm9jZXNzUXVldWU6IHRydWUsXG4gICAgICAgICAgICB1cGxvYWRNdWx0aXBsZTogZmFsc2UsXG4gICAgICAgICAgICBhY2NlcHRlZEZpbGVzOiBcImltYWdlLypcIixcbiAgICAgICAgICAgIC8vY2xpY2thYmxlOiAnI3VwbG9hZC1pbWFnZSwubXlEcm9wem9uZSwudXBsb2FkLWZpbGVzJyxcbiAgICAgICAgICAgIC8vcHJldmlld1RlbXBsYXRlOiBwcmV2aWV3VGVtcGxhdGUsXG4gICAgICAgICAgICB0aHVtYm5haWxXaWR0aDogbnVsbCxcbiAgICAgICAgICAgIHRodW1ibmFpbEhlaWdodDogbnVsbCxcbiAgICAgICAgICAgIHBhcmFsbGVsVXBsb2FkczogMSxcbiAgICAgICAgICAgIC8vcHJldmlld3NDb250YWluZXI6IFwiLmRpc3BsYXlJbWFnZUJsb2NrXCIsXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gc2VsZi5jb250YWluZXI7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImNhbGxlZCBpbml0IFwiICsgdGhpcy5vcHRpb25zLmNvbnRhaW5lcmlkKTtcbiAgICAgICAgICAgICAgICAvLy0tLSBjcmF0ZUJsYW5rSW1nKHRoaXMub3B0aW9ucy5jb250YWluZXJpZCwgMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihcImNvbXBsZXRlXCIsIGZ1bmN0aW9uKGZpbGUpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdLmlzQ29tcGxldGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRVcGxvYWRpbmdGaWxlcygpLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmdldFF1ZXVlZEZpbGVzKCkubGVuZ3RoID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJhZGRlZGZpbGVcIiwgZnVuY3Rpb24oZmlsZSwgYXJnMSwgYXJnMikge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiYWRkZWRmaWxlIGV2ZW50XCIpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGZpbGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZpbGUuaW5kZXggPSB0aGlzLmluZGV4Kys7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmlsZS5jb250YWluZXJpbWFnZWlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuZ290b0xhc3RQYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheS5wdXNoKHNlbGYuY3JhdGVCbGFua0ltYWdlKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnRhaW5lci5jb250YWluZXJpbWFnZXNbZmlsZS5pbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuY29udGFpbmVyaW1hZ2VzLnB1c2goe30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XS5pc0JsYW5rSW1hZ2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5vcGFjaXR5ID0gMDtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlbGYuY29weUFycmF5RnJvbVRvdGFsVG9EaXNwbGF5KGNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihcInVwbG9hZHByb2dyZXNzXCIsIGZ1bmN0aW9uKGZpbGUsIHByb2dyZXNzLCBieXRlc1NlbnQpIHtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0ucHJvZ3Jlc3MgPSBwcm9ncmVzcyArIFwiJVwiO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZHJvcHpvbmUgZXZlbnQgdXBsb2FkcHJvZ3Jlc3MgOiBcIiArIHByb2dyZXNzICsgXCJmaWxlaW5kZXggPiBcIiArIGZpbGUuaW5kZXgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vbihcInNlbmRpbmdcIiwgZnVuY3Rpb24oZmlsZSwgeGhyLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIGNpZCA9IGZpbGUuY29udGFpbmVyaWQ7XG4gICAgICAgICAgICAgICAgICAgIC8vLS0tICQoXCIjcHJldmlld19cIiArIGNpZCArIFwiPi5ibGFua2xpXCIpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJyZW1vdmVkZmlsZVwiLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJyZW1vdmVkZmlsZVwiLCBmaWxlLmNvbnRhaW5lcmltYWdlaWQpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdmFyIGNpZCA9IHRoaXMub3B0aW9ucy5jb250YWluZXJpZDtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHZhciBjb250YWluZXJpbWFnZWlkID0gZmlsZS5jb250YWluZXJpbWFnZWlkJydcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHZhciBudW1EaXYgPSAkKFwiI3ByZXZpZXdfXCIgKyBjaWQgKyBcIj4uZGlzcGxheUltYWdlXCIpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHNlbGYuYXV0aFNlcnZpY2UuY29udGFpbmVySW1hZ2VEZWxldGUoY29udGFpbmVyaW1hZ2VpZClcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JhdGVCbGFua0ltZyhjaWQsIG51bURpdik7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbnRhaW5lcmltYWdlIGRlbGV0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJxdWV1ZWNvbXBsZXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZHJvcHpvbmUgZXZlbnQgcXVldWVjb21wbGV0ZVwiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwidGh1bWJuYWlsXCIsIGZ1bmN0aW9uKGZpbGUsIHRodW1ibmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZHJvcHpvbmUgZXZlbnQgdGh1bWJuYWlsXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdLmltYWdlbmFtZSA9IHRodW1ibmFpbDtcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxmLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdLmltYWdlbmFtZSA9IHRodW1ibmFpbDtcbiAgICAgICAgICAgICAgICAgICAgLy99KTtcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgbnVtRGl2ID0gJChcIiNwcmV2aWV3X1wiICsgY2lkICsgXCI+LmRpc3BsYXlJbWFnZVwiKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJkaXNwbGF5SW1hZ2VMZW5ndGggPiBcIiArIG51bURpdik7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgIC8vLS0tIGNyYXRlQmxhbmtJbWcoY2lkLCBudW1EaXYpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJzdWNjZXNzXCIsIGZ1bmN0aW9uKGZpbGUsIHJlcywgZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHJlcyA9IEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbWcgPSByZXMuZGF0YS5pbWFnZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmNvbnRhaW5lcmltYWdlc1tmaWxlLmluZGV4XSA9IGltZztcblxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5jb250YWluZXJpbWFnZWlkID0gaW1nLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5jb250YWluZXJpZCA9IGltZy5jb250YWluZXJpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJzdWNjZXNzID4gXCIgKyBmaWxlLmNvbnRhaW5lcmltYWdlaWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdLmlkID0gaW1nLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XS5jb250YWluZXJpZCA9IGltZy5jb250YWluZXJpZDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XS5pZCA9IGZpbGUuY29udGFpbmVyaW1hZ2VpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0uY29udGFpbmVyaWQgPSBmaWxlLmNvbnRhaW5lcmlkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL3NldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJzZXRUaW1lb3V0ID4gXCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHNlbGYuY3VycmVudFZpZXdmb28pO1xuICAgICAgICAvL2ZvciAodmFyIGkgPSAwOyBpIDwgc2VsZi5jdXJyZW50Vmlld2Zvby5jb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vICB2YXIgY29udGFpbmVyID0gc2VsZi5jdXJyZW50Vmlld2Zvby5jb250YWluZXJzW2ldO1xuXG5cbiAgICAgICAgc2VsZi5kWm9uZSA9IHNlbGYuY3JlYXRlRHJvcFpvbmUoY29udGFpbmVyKTtcblxuICAgICAgICAvLyAgICAgICAgICAgICAgICBpZiAoIWNvbnRhaW5lci5jb250YWluZXJpbWFnZXMpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICB9XG4gICAgICAgIGxldCBjb250YWluZXJJbWFnZUxlbmd0aCA9IGNvbnRhaW5lci5jb250YWluZXJpbWFnZXMubGVuZ3RoO1xuXG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb250YWluZXJJbWFnZUxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyaW1hZ2UgPSBjb250YWluZXIuY29udGFpbmVyaW1hZ2VzW2pdO1xuICAgICAgICAgICAgdmFyIGltZ1VybCA9IHNlbGYuaW1hZ2VVcmwgKyBjb250YWluZXJpbWFnZS5pbWFnZW5hbWU7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGltZ1VybCk7XG5cbiAgICAgICAgICAgIHZhciBtb2NrRmlsZSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBpbWdVcmwsXG4gICAgICAgICAgICAgICAgLy9zaXplOiBmaWxlU2l6ZSxcbiAgICAgICAgICAgICAgICAvL3R5cGU6IGZpbGVNaW1lVHlwZSxcbiAgICAgICAgICAgICAgICBjb250YWluZXJpbWFnZWlkOiBjb250YWluZXJpbWFnZS5pZCxcbiAgICAgICAgICAgICAgICBjb250YWluZXJpZDogY29udGFpbmVyLmlkLFxuICAgICAgICAgICAgICAgIGFjY2VwdGVkOiB0cnVlXG4gICAgICAgICAgICAgICAgLy9zdGF0dXM6IERyb3B6b25lLlNVQ0NFU1NcbiAgICAgICAgICAgIH07IC8vIHVzZSBhY3R1YWwgaWQgc2VydmVyIHVzZXMgdG8gaWRlbnRpZnkgdGhlIGZpbGUgKGUuZy4gREIgdW5pcXVlIGlkZW50aWZpZXIpXG5cbiAgICAgICAgICAgIHNlbGYuZFpvbmUuZW1pdChcImFkZGVkZmlsZVwiLCBtb2NrRmlsZSk7XG4gICAgICAgICAgICBzZWxmLmRab25lLmNyZWF0ZVRodW1ibmFpbEZyb21VcmwobW9ja0ZpbGUsIGltZ1VybCwgbnVsbCwgXCJBbm9ueW1vdXNcIik7XG4gICAgICAgICAgICBzZWxmLmRab25lLmVtaXQoXCJzdWNjZXNzXCIsIG1vY2tGaWxlKTtcbiAgICAgICAgICAgIHNlbGYuZFpvbmUuZW1pdChcImNvbXBsZXRlXCIsIG1vY2tGaWxlKTtcblxuICAgICAgICAgICAgc2VsZi5kWm9uZS5maWxlcy5wdXNoKG1vY2tGaWxlKTtcbiAgICAgICAgfVxuICAgICAgICAvL30sIDEwMDApO1xuXG5cbiAgICAgICAgY29udGFpbmVyLmdvdG9MYXN0UGFnZSA9IHRydWU7XG4gICAgfVxuXG4gICAgY3JlYXRlRHJvcFpvbmUoY29udGFpbmVyKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLm15RHJvcHpvbmUuY29udGFpbmVyaWQgPSBjb250YWluZXIuaWQ7XG4gICAgICAgIC8vc2VsZi5teURyb3B6b25lLnByZXZpZXdzQ29udGFpbmVyID0gXCIjcHJldmlld19cIiArIGNvbnRhaW5lci5pZDtcbiAgICAgICAgc2VsZi5teURyb3B6b25lLnByZXZpZXdzQ29udGFpbmVyID0gZmFsc2U7XG4gICAgICAgIHNlbGYubXlEcm9wem9uZS5jbGlja2FibGUgPSBcIiN1cGxvYWRfaW1hZ2VfXCIgKyBjb250YWluZXIuaWQgKyBcIiwjZHpwaF9cIiArIGNvbnRhaW5lci5pZDtcbiAgICAgICAgdmFyIGRab25lID0gbmV3IERyb3B6b25lKFwiI2Zvcm1fXCIgKyBjb250YWluZXIuaWQsIHNlbGYubXlEcm9wem9uZSk7XG5cbiAgICAgICAgLy9zZWxmLmN1cnJlbnRWaWV3Zm9vLm1hcERyb3B6b25lW2NvbnRhaW5lci5pZF0gPSBkWm9uZTtcbiAgICAgICAgcmV0dXJuIGRab25lO1xuICAgIH1cblxuICAgIGNvbnRhaW5lckltYWdlRGVsZXRlKGNvbnRhaW5lcmlkOiBzdHJpbmcsIGNvbnRhaW5lcmltYWdlaWQ6IHN0cmluZywgaW5kZXg6IG51bWJlcikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgdmFyIGFjdHVhbEluZGV4ID0gaW5kZXg7XG4gICAgICAgIHZhciBjb250YWluZXJJbWFnZSA9IGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbYWN0dWFsSW5kZXhdO1xuICAgICAgICBjb250YWluZXJJbWFnZS5kZWxldGluZyA9IHRydWU7XG5cbiAgICAgICAgc2VsZi5hdXRoU2VydmljZS5jb250YWluZXJJbWFnZURlbGV0ZShjb250YWluZXJpbWFnZWlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXN1bHQpO1xuXG4gICAgICAgICAgICAgICAgY29udGFpbmVySW1hZ2UuZGVsZXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5LnNwbGljZShhY3R1YWxJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNvbnRhaW5lcmltYWdlcy5zcGxpY2UoYWN0dWFsSW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIC8vdmFyIGNvbnRhaW5lckltYWdlID0gc2VsZi5jcmF0ZUJsYW5rSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAvL3NlbGYuY3VycmVudFZpZXdmb28ubWFwQ29udGFpbmVyW2NvbnRhaW5lcmlkXS50b3RhbEltYWdlQXJyYXkucHVzaChjb250YWluZXJJbWFnZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5kWm9uZS5pbmRleC0tO1xuICAgICAgICAgICAgICAgIC8vc2VsZi5jb3B5QXJyYXlGcm9tVG90YWxUb0Rpc3BsYXkoY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheShjb250YWluZXIpO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmNvbnRhaW5lci5jb250YWluZXJpbWFnZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb250YWluZXIub3BhY2l0eSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJDb250YWluZXJpbWFnZSBkZWxldGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgcHJldmlvdXNQYWdlKGV2ZW50OiBhbnksIGNvbnRhaW5lcjogYW55KXtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICAvL3RoaXMuY29udGFpbmVyaW1hZ2UgPSBjb250YWluZXIudG90YWxJbWFnZUFycmF5Wyhjb250YWluZXIuY3VycmVudFBhZ2UtMildO1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmN1cnJlbnRQYWdlMSA9IGNvbnRhaW5lci5jdXJyZW50UGFnZS0xO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvbnRhaW5lcmltYWdlKTtcbiAgICAgICAgLy90aGlzLmN1cnJlbnRQYWdlQ2hhbmdlZChldmVudCwgY29udGFpbmVyKTtcbiAgICAgIC8vICB0aGlzLm51bWJlck9mUGFnZXModG90YWxQYWdlczogYW55LCBjb250YWluZXI6IGFueSlcblxuICAgIH1cbiAgICBuZXh0UGFnZShldmVudDogYW55LCBjb250YWluZXI6IGFueSl7XG4gICAgICAgIC8vYWxlcnQoXCJIZWxsb1wiKTtcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICAvL3RoaXMuY29udGFpbmVyaW1hZ2UgPSBjb250YWluZXIudG90YWxJbWFnZUFycmF5Wyhjb250YWluZXIuY3VycmVudFBhZ2UpXTtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jdXJyZW50UGFnZTEgPSBjb250YWluZXIuY3VycmVudFBhZ2UrMTtcbiAgICAgICAgY29uc29sZS5sb2coXCJuZXh0UGFnZSA+IFwiK3RoaXMuY29udGFpbmVyLmN1cnJlbnRQYWdlMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29udGFpbmVyaW1hZ2UpO1xuICAgICAgICAvL3RoaXMuY3VycmVudFBhZ2VDaGFuZ2VkKGV2ZW50LCBjb250YWluZXIpO1xuICAgICAgLy8gIHRoaXMubnVtYmVyT2ZQYWdlcyh0b3RhbFBhZ2VzOiBhbnksIGNvbnRhaW5lcjogYW55KVxuXG4gICAgfVxuICAgIG9uRGVsZXRlQ29udGFpbmVyKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5kZWxldGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMub25Db250YWluZXJEZWxldGUuZW1pdCh0aGlzLmNvbnRhaW5lci5pZCk7XG4gICAgfVxuXG4gICAgb25VcGRhdGVDb250YWluZXIodmFsKSB7XG4gICAgICAgIHRoaXMuaXRlbSA9IHsgdGl0bGU6IHZhbCwgaWQ6IHRoaXMuY29udGFpbmVyLmlkIH07XG5cbiAgICAgICAgdGhpcy5vbkNvbnRhaW5lclVwZGF0ZS5lbWl0KHRoaXMuaXRlbSk7XG4gICAgfVxuXG4gICAgb25DbGlja1ByZXZpZXcoaW5kZXg6IG51bWJlcikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBpbWdMZW5ndGggPSBzZWxmLmNvbnRhaW5lci5jb250YWluZXJpbWFnZXMubGVuZ3RoO1xuXG4gICAgICAgIHZhciBmYW5jeUFycmF5ID0gW107XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW1nTGVuZ3RoOyBqKyspIHtcblxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lcmltYWdlID0gc2VsZi5jb250YWluZXIuY29udGFpbmVyaW1hZ2VzW2pdO1xuICAgICAgICAgICAgdmFyIGltZ1VybCA9IHNlbGYuaW1hZ2VVcmwgKyBjb250YWluZXJpbWFnZS5pbWFnZW5hbWU7XG5cbiAgICAgICAgICAgIHZhciBvYmpJbWFnZSA9IHtcbiAgICAgICAgICAgICAgICBocmVmOiBpbWdVcmxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmYW5jeUFycmF5LnB1c2gob2JqSW1hZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgJC5mYW5jeWJveC5vcGVuKGZhbmN5QXJyYXksIHtcbiAgICAgICAgICAgIGF1dG9TaXplOiB0cnVlLFxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgcHJldkVmZmVjdDogJ25vbmUnLFxuICAgICAgICAgICAgbmV4dEVmZmVjdDogJ25vbmUnLFxuICAgICAgICAgICAgaGVscGVyczoge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRodW1iczoge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzUsXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnV0dG9uczoge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=
