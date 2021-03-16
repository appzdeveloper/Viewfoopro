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
var GallaryComponent = (function () {
    function GallaryComponent(zone, _changeDetectionRef, elementRef, authService) {
        this._changeDetectionRef = _changeDetectionRef;
        this.elementRef = elementRef;
        this.authService = authService;
        this.onContainerDelete = new core_1.EventEmitter();
        this.onContainerUpdate = new core_1.EventEmitter();
        this.serviceUrl = myGlobals.serviceUrl;
        this.zone = zone;
        this.loginUser = myGlobals.LoginUser;
    }
    Object.defineProperty(GallaryComponent.prototype, "ngGridItemEvent", {
        get: function () {
            return this._ngGridItemEvent;
        },
        set: function (v) {
            if (v) {
                this._ngGridItemEvent = v;
                this.updatePagingBasedonHW();
            }
        },
        enumerable: true,
        configurable: true
    });
    GallaryComponent.prototype.ngOnInit = function () {
    };
    GallaryComponent.prototype.ngAfterViewInit = function () {
        this.initContainerForDropzone();
        this._changeDetectionRef.detectChanges();
    };
    GallaryComponent.prototype.updatePagingBasedonHW = function () {
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
    GallaryComponent.prototype.initContainerForDropzone = function () {
        var self = this;
        var container = this.container;
        container.opacity = 1;
        container.dispImageArray = [];
        this.updatePagingBasedonHW();
        container.currentPage = 1;
        container.gotoLastPage = false;
        var totalImageArray = [];
        var blankImageCount = container.itemsPerPage;
        for (var j = 0; j < blankImageCount; j++) {
            var containerImage = self.crateBlankImage();
            totalImageArray.push(containerImage);
        }
        container.totalImageArray = totalImageArray;
        this.copyArrayFromTotalToDisplay();
        this.creatingDropzoneInstances();
    };
    GallaryComponent.prototype.currentPageChanged = function (event, container) {
        container.currentPage = event.page;
        this.copyArrayFromTotalToDisplay();
    };
    GallaryComponent.prototype.numberOfPages = function (totalPages, container) {
        container.totalPages = totalPages;
    };
    GallaryComponent.prototype.copyArrayFromTotalToDisplay = function () {
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
    GallaryComponent.prototype.crateBlankImage = function () {
        var containerImage = {
            id: "",
            imagename: "img/build_viewfoo/pic1.png",
            isBlankImage: true,
            isCompleted: false,
            progress: "0%"
        };
        return containerImage;
    };
    GallaryComponent.prototype.creatingDropzoneInstances = function () {
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
            thumbnailWidth: 860,
            thumbnailHeight: 450,
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
    GallaryComponent.prototype.createDropZone = function (container) {
        var self = this;
        self.myDropzone.containerid = container.id;
        self.myDropzone.previewsContainer = false;
        self.myDropzone.clickable = "#upload_image_" + container.id + ",#dzph_" + container.id;
        var dZone = new Dropzone("#form_" + container.id, self.myDropzone);
        return dZone;
    };
    GallaryComponent.prototype.containerImageDelete = function (containerid, containerimageid, index) {
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
    GallaryComponent.prototype.onDeleteContainer = function () {
        this.container.deleting = true;
        this.onContainerDelete.emit(this.container.id);
    };
    GallaryComponent.prototype.onUpdateContainer = function (val) {
        this.item = { title: val, id: this.container.id };
        this.onContainerUpdate.emit(this.item);
    };
    GallaryComponent.prototype.onClickPreview = function (index) {
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
    ], GallaryComponent.prototype, "imgblock", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GallaryComponent.prototype, "container", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GallaryComponent.prototype, "ngGridItemEvent", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], GallaryComponent.prototype, "onContainerDelete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], GallaryComponent.prototype, "onContainerUpdate", void 0);
    GallaryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gallarysingle',
            templateUrl: 'gallary.component.html',
            directives: [pagination_component_1.PaginationComponent, forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [core_1.NgZone, core_1.ChangeDetectorRef, core_1.ElementRef, auth_service_1.AuthService])
    ], GallaryComponent);
    return GallaryComponent;
}());
exports.GallaryComponent = GallaryComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC92aWV3Zm9vZGV0YWlsL3ZpZXdmb28tZ2FsbGFyeS1kZXRhaWwvZ2FsbGFyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHFCQUVLLGVBQWUsQ0FBQyxDQUFBO0FBQ3JCLHVCQUE4QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hELHNCQUF5QyxnQkFBZ0IsQ0FBQyxDQUFBO0FBRzFELDZCQUE0QixvQ0FBb0MsQ0FBQyxDQUFBO0FBR2pFLHFDQUFrQyw4Q0FBOEMsQ0FBQyxDQUFBO0FBQ2pGLElBQU8sU0FBUyxXQUFXLGVBQWUsQ0FBQyxDQUFDO0FBUTVDO0lBdUNJLDBCQUFZLElBQVksRUFBVSxtQkFBc0MsRUFDN0QsVUFBc0IsRUFDckIsV0FBd0I7UUFGRix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW1CO1FBQzdELGVBQVUsR0FBVixVQUFVLENBQVk7UUFDckIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFsQmxCLHNCQUFpQixHQUF5QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUM3RCxzQkFBaUIsR0FBeUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFPL0UsZUFBVSxHQUFXLFNBQVMsQ0FBQyxVQUFVLENBQUM7UUFXdEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBSXpDLENBQUM7SUF4Q1Esc0JBQVcsNkNBQWU7YUFBMUI7WUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pDLENBQUM7YUFFRCxVQUEyQixDQUFNO1lBQzdCLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDakMsQ0FBQztRQUtMLENBQUM7OztPQVhBO0lBd0NELG1DQUFRLEdB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YUFDZixDQUFDO1lBQ0YsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRUQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3hCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLEtBQUs7WUFDWixVQUFVLEVBQUUsTUFBTTtZQUNsQixVQUFVLEVBQUUsTUFBTTtZQUNsQixPQUFPLEVBQUU7Z0JBS0wsT0FBTyxFQUFFLEVBQUU7YUFDZDtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUF0YkQ7UUFBQyxnQkFBUyxDQUFDLFVBQVUsQ0FBQzs7c0RBQUE7SUFFdEI7UUFBQyxZQUFLLEVBQUU7O3VEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzJEQUFBO0lBZVI7UUFBQyxhQUFNLEVBQUU7OytEQUFBO0lBQ1Q7UUFBQyxhQUFNLEVBQUU7OytEQUFBO0lBOUJiO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFVBQVUsRUFBRSxDQUFDLDBDQUFtQixFQUFFLGdDQUF3QixFQUFFLHdCQUFlLENBQUM7U0FDL0UsQ0FBQzs7d0JBQUE7SUE0YkYsdUJBQUM7QUFBRCxDQTNiQSxBQTJiQyxJQUFBO0FBM2JZLHdCQUFnQixtQkEyYjVCLENBQUEiLCJmaWxlIjoiYXBwL3ZpZXdmb29kZXRhaWwvdmlld2Zvby1nYWxsYXJ5LWRldGFpbC9nYWxsYXJ5LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgTmdab25lLCBJbnB1dCwgT3V0cHV0LCBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlLCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0NoaWxkfVxuZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NPUkVfRElSRUNUSVZFU30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3Zm9vIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtQYWdpbmF0aW9uQ29tcG9uZW50fSBmcm9tICcuLi8uLi9zaGFyZWQvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vLi4vZ2xvYmFscycpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnZ2FsbGFyeXNpbmdsZScsXG4gICAgdGVtcGxhdGVVcmw6ICdnYWxsYXJ5LmNvbXBvbmVudC5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbUGFnaW5hdGlvbkNvbXBvbmVudCwgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTLCBDT1JFX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIEdhbGxhcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgICBwdWJsaWMgY29udGFpbmVydHlwZTogc3RyaW5nO1xuXG4gICAgQFZpZXdDaGlsZCgnaW1nYmxvY2snKSBpbWdibG9jazogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBjb250YWluZXI6IGFueTtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBnZXQgbmdHcmlkSXRlbUV2ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmdHcmlkSXRlbUV2ZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgbmdHcmlkSXRlbUV2ZW50KHY6IGFueSkge1xuICAgICAgICBpZih2KSB7XG4gICAgICAgICAgICB0aGlzLl9uZ0dyaWRJdGVtRXZlbnQgPSB2O1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmdCYXNlZG9uSFcoKTtcbiAgICAgICAgfVxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiR2FsbGFyeUNvbXBvbmVudCBuZ0dyaWRJdGVtRXZlbnQgY2hhbmdlZFwiKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh2KTtcblxuICAgICAgICAvL3RoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcygpO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSBwcml2YXRlIG9uQ29udGFpbmVyRGVsZXRlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcHJpdmF0ZSBvbkNvbnRhaW5lclVwZGF0ZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgLy9AT3V0cHV0KCkgcHJpdmF0ZSBvbkNvbnRhaW5lckltYWdlQ2xpY2s6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgbG9naW5Vc2VyOiBVc2VyO1xuXG4gICAgdmlld2Zvb2lkOiBzdHJpbmc7XG4gICAgY29udGFpbmVyaWQ6IHN0cmluZztcbiAgICBzZXJ2aWNlVXJsOiBzdHJpbmcgPSBteUdsb2JhbHMuc2VydmljZVVybDtcbiAgICBpdGVtOiBhbnk7XG4gICAgbXlEcm9wem9uZTogYW55O1xuXG4gICAgZFpvbmU6IGFueTtcblxuICAgIHpvbmU6IE5nWm9uZTtcblxuICAgIGNvbnN0cnVjdG9yKHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuem9uZSA9IHpvbmU7XG5cbiAgICAgICAgdGhpcy5sb2dpblVzZXIgPSBteUdsb2JhbHMuTG9naW5Vc2VyO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJHYWxsYXJ5Q29tcG9uZW50IGNvbnN0cnVjdG9yXCIpOyAgICAgICAgXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmluaXRDb250YWluZXJGb3JEcm9wem9uZSgpO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIHVwZGF0ZVBhZ2luZ0Jhc2Vkb25IVygpIHtcbiAgICAgICAgaWYgKHRoaXMuaW1nYmxvY2spIHtcblxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IHRoaXMuaW1nYmxvY2submF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQgLSA2NTtcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IHRoaXMuaW1nYmxvY2submF0aXZlRWxlbWVudC5jbGllbnRXaWR0aDtcblxuICAgICAgICAgICAgdmFyIHJvd3MgPSBNYXRoLmZsb29yKGhlaWdodCAvIDE0Mik7XG4gICAgICAgICAgICB2YXIgY29scyA9IE1hdGguZmxvb3Iod2lkdGggLyAxMzkpO1xuXG4gICAgICAgICAgICB2YXIgcGVycGFnZSA9IHJvd3MgKiBjb2xzO1xuXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5pdGVtc1BlclBhZ2UgPSBwZXJwYWdlO1xuICAgICAgICAgICAgdGhpcy5jb3B5QXJyYXlGcm9tVG90YWxUb0Rpc3BsYXkoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FsbGFyeUNvbXBvbmVudCBuZ0dyaWRJdGVtRXZlbnRcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhoZWlnaHQrXCIgIFwiK3dpZHRoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJvd3MrXCIgIFwiK2NvbHMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwZXJwYWdlICBcIitwZXJwYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbcHJvcEtleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcbiAgICAvL2NvbnNvbGUubG9nKFwiR2FsbGFyeSBvbiBwcm9wIGNoYW5nZXNcIik7XG4gICAgLy8gICAgICAgIGxldCBsb2c6IHN0cmluZ1tdID0gW107XG4gICAgLy92YXIgc2VsZiA9IHRoaXM7XG4gICAgLy9mb3IgKGxldCBwcm9wTmFtZSBpbiBjaGFuZ2VzKSB7XG4gICAgLy9jb25zb2xlLmxvZyhcIm5nT25DaGFuZ2VzIFwiK3Byb3BOYW1lKTtcbiAgICAvL2lmKHByb3BOYW1lID09IFwidG90YWxJdGVtc1wiKSB7XG4gICAgLy90aGlzLmluaXRlZCA9IHRydWU7XG4gICAgLy90aGlzLnBhZ2UgPSBcbiAgICAvL30gICAgICAgICAgIFxuICAgIC8vICAgICAgICAgICAgbGV0IGNoYW5nZWRQcm9wID0gY2hhbmdlc1twcm9wTmFtZV07XG4gICAgLy8gICAgICAgICAgICBsZXQgZnJvbSA9IEpTT04uc3RyaW5naWZ5KGNoYW5nZWRQcm9wLnByZXZpb3VzVmFsdWUpO1xuICAgIC8vICAgICAgICAgICAgbGV0IHRvID0gSlNPTi5zdHJpbmdpZnkoY2hhbmdlZFByb3AuY3VycmVudFZhbHVlKTtcbiAgICAvLyAgICAgICAgICAgIGxvZy5wdXNoKGAke3Byb3BOYW1lfSBjaGFuZ2VkIGZyb20gJHtmcm9tfSB0byAke3RvfWApO1xuICAgIC8vfVxuICAgIC8vICAgICAgICB0aGlzLmNoYW5nZUxvZy5wdXNoKGxvZy5qb2luKCcsICcpKTtcbiAgICAvL2NvbnNvbGUubG9nKFwibmdPbkNoYW5nZXNcIik7XG4gICAgLy99XG5cbiAgICBpbml0Q29udGFpbmVyRm9yRHJvcHpvbmUoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBcbiAgICAgICAgY29udGFpbmVyLm9wYWNpdHkgPSAxO1xuICAgICAgICBjb250YWluZXIuZGlzcEltYWdlQXJyYXkgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIC8vY29udGFpbmVyLml0ZW1zUGVyUGFnZSA9IDE7XG4gICAgICAgIHRoaXMudXBkYXRlUGFnaW5nQmFzZWRvbkhXKCk7XG5cbiAgICAgICAgY29udGFpbmVyLmN1cnJlbnRQYWdlID0gMTtcbiAgICAgICAgY29udGFpbmVyLmdvdG9MYXN0UGFnZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vW10uc2xpY2UgPT09IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbiAgICAgICAgdmFyIHRvdGFsSW1hZ2VBcnJheSA9IFtdO1xuICAgICAgICBsZXQgYmxhbmtJbWFnZUNvdW50ID0gY29udGFpbmVyLml0ZW1zUGVyUGFnZTtcblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGJsYW5rSW1hZ2VDb3VudDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVySW1hZ2UgPSBzZWxmLmNyYXRlQmxhbmtJbWFnZSgpO1xuICAgICAgICAgICAgdG90YWxJbWFnZUFycmF5LnB1c2goY29udGFpbmVySW1hZ2UpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5ID0gdG90YWxJbWFnZUFycmF5O1xuICAgICAgICBcblxuICAgICAgICB0aGlzLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheSgpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRpbmdEcm9wem9uZUluc3RhbmNlcygpO1xuICAgIH1cblxuICAgIGN1cnJlbnRQYWdlQ2hhbmdlZChldmVudDogYW55LCBjb250YWluZXI6IGFueSkge1xuICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coXCJjdXJyZW50UGFnZUNoYW5nZWQgPiBcIik7XG4gICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhldmVudC5wYWdlKTtcbiAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXkubGVuZ3RoKTtcblxuICAgICAgICBjb250YWluZXIuY3VycmVudFBhZ2UgPSBldmVudC5wYWdlO1xuXG4gICAgICAgIHRoaXMuY29weUFycmF5RnJvbVRvdGFsVG9EaXNwbGF5KCk7XG5cbiAgICB9XG5cbiAgICBudW1iZXJPZlBhZ2VzKHRvdGFsUGFnZXM6IGFueSwgY29udGFpbmVyOiBhbnkpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIm51bWJlck9mUGFnZXMgPiBcIik7XG4gICAgICAgIC8vY29uc29sZS5sb2coZXZlbnQpO1xuXG4gICAgICAgIGNvbnRhaW5lci50b3RhbFBhZ2VzID0gdG90YWxQYWdlcztcbiAgICB9XG5cbiAgICBjb3B5QXJyYXlGcm9tVG90YWxUb0Rpc3BsYXkoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuXG4gICAgICAgIHZhciBzdGFydCA9ICgoY29udGFpbmVyLmN1cnJlbnRQYWdlIC0gMSkgKiBjb250YWluZXIuaXRlbXNQZXJQYWdlKTtcbiAgICAgICAgdmFyIGVuZCA9IHN0YXJ0ICsgY29udGFpbmVyLml0ZW1zUGVyUGFnZTtcbiAgICAgICAgLy9jb250YWluZXIuZGlzcEltYWdlQXJyYXkgPSBjb250YWluZXIudG90YWxJbWFnZUFycmF5LnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgICAgICAvL3ZhciBkaXNwSW1hZ2VBcnJheSA9IFtdO1xuICAgICAgICBjb250YWluZXIuZGlzcEltYWdlQXJyYXkuc3BsaWNlKDAsIGNvbnRhaW5lci5kaXNwSW1hZ2VBcnJheS5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXkubGVuZ3RoIDw9IGkpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5LnB1c2goc2VsZi5jcmF0ZUJsYW5rSW1hZ2UoKSk7XG4gICAgICAgICAgICB9XG4vLyAgICAgICAgICAgIGlmICghY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtpXSkge1xuLy8gICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheS5wdXNoKHNlbGYuY3JhdGVCbGFua0ltYWdlKCkpO1xuLy8gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250YWluZXIuZGlzcEltYWdlQXJyYXkucHVzaChjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ldKTtcbiAgICAgICAgICAgIC8vZGlzcEltYWdlQXJyYXkucHVzaChjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ldKTtcbiAgICAgICAgfVxuICAgICAgICAvL3NlbGYuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAvL2NvbnRhaW5lci5kaXNwSW1hZ2VBcnJheS5wdXNoKGRpc3BJbWFnZUFycmF5KTtcbiAgICAgICAgLy99KTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheSBzdGFydCA9IFwiICsgc3RhcnQgKyBcIiB0b3RhbEVsZW1lbnQ6IFwiICsgY29udGFpbmVyLml0ZW1zUGVyUGFnZSk7XG4gICAgICAgIC8vY29uc29sZS5sb2coY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheSk7XG4gICAgICAgIC8vY29uc29sZS5sb2coY29udGFpbmVyLmRpc3BJbWFnZUFycmF5KTtcbiAgICB9XG5cbiAgICBjcmF0ZUJsYW5rSW1hZ2UoKSB7XG4gICAgICAgIHZhciBjb250YWluZXJJbWFnZTogQ29udGFpbmVySW1hZ2UgPSB7XG4gICAgICAgICAgICBpZDogXCJcIixcbiAgICAgICAgICAgIGltYWdlbmFtZTogXCJpbWcvYnVpbGRfdmlld2Zvby9waWMxLnBuZ1wiLFxuICAgICAgICAgICAgaXNCbGFua0ltYWdlOiB0cnVlLFxuICAgICAgICAgICAgaXNDb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IFwiMCVcIlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250YWluZXJJbWFnZTtcbiAgICB9XG5cbiAgICBjcmVhdGluZ0Ryb3B6b25lSW5zdGFuY2VzKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcblxuICAgICAgICBEcm9wem9uZS5hdXRvRGlzY292ZXIgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLm15RHJvcHpvbmUgPSB7XG4gICAgICAgICAgICB1cmw6IG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvY29udGFpbmVyaW1hZ2VcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9LFxuICAgICAgICAgICAgcGFyYW1OYW1lOiBcImltYWdlXCIsXG4gICAgICAgICAgICBhdXRvUHJvY2Vzc1F1ZXVlOiB0cnVlLFxuICAgICAgICAgICAgdXBsb2FkTXVsdGlwbGU6IGZhbHNlLFxuICAgICAgICAgICAgYWNjZXB0ZWRGaWxlczogXCJpbWFnZS8qXCIsXG4gICAgICAgICAgICAvL2NsaWNrYWJsZTogJyN1cGxvYWQtaW1hZ2UsLm15RHJvcHpvbmUsLnVwbG9hZC1maWxlcycsXG4gICAgICAgICAgICAvL3ByZXZpZXdUZW1wbGF0ZTogcHJldmlld1RlbXBsYXRlLFxuICAgICAgICAgICAgdGh1bWJuYWlsV2lkdGg6IDg2MCxcbiAgICAgICAgICAgIHRodW1ibmFpbEhlaWdodDogNDUwLFxuICAgICAgICAgICAgcGFyYWxsZWxVcGxvYWRzOiAxLFxuICAgICAgICAgICAgLy9wcmV2aWV3c0NvbnRhaW5lcjogXCIuZGlzcGxheUltYWdlQmxvY2tcIixcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBzZWxmLmNvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2FsbGVkIGluaXQgXCIgKyB0aGlzLm9wdGlvbnMuY29udGFpbmVyaWQpO1xuICAgICAgICAgICAgICAgIC8vLS0tIGNyYXRlQmxhbmtJbWcodGhpcy5vcHRpb25zLmNvbnRhaW5lcmlkLCAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwiY29tcGxldGVcIiwgZnVuY3Rpb24oZmlsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0uaXNDb21wbGV0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFVwbG9hZGluZ0ZpbGVzKCkubGVuZ3RoID09PSAwICYmIHRoaXMuZ2V0UXVldWVkRmlsZXMoKS5sZW5ndGggPT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihcImFkZGVkZmlsZVwiLCBmdW5jdGlvbihmaWxlLCBhcmcxLCBhcmcyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhZGRlZGZpbGUgZXZlbnRcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZmlsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZmlsZS5pbmRleCA9IHRoaXMuaW5kZXgrKztcblxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbGUuY29udGFpbmVyaW1hZ2VpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmdvdG9MYXN0UGFnZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXkucHVzaChzZWxmLmNyYXRlQmxhbmtJbWFnZSgpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250YWluZXIuY29udGFpbmVyaW1hZ2VzW2ZpbGUuaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmNvbnRhaW5lcmltYWdlcy5wdXNoKHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0uaXNCbGFua0ltYWdlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIub3BhY2l0eSA9IDA7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWxmLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheShjb250YWluZXIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJ1cGxvYWRwcm9ncmVzc1wiLCBmdW5jdGlvbihmaWxlLCBwcm9ncmVzcywgYnl0ZXNTZW50KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdLnByb2dyZXNzID0gcHJvZ3Jlc3MgKyBcIiVcIjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImRyb3B6b25lIGV2ZW50IHVwbG9hZHByb2dyZXNzIDogXCIgKyBwcm9ncmVzcyArIFwiZmlsZWluZGV4ID4gXCIgKyBmaWxlLmluZGV4KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwic2VuZGluZ1wiLCBmdW5jdGlvbihmaWxlLCB4aHIsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgY2lkID0gZmlsZS5jb250YWluZXJpZDtcbiAgICAgICAgICAgICAgICAgICAgLy8tLS0gJChcIiNwcmV2aWV3X1wiICsgY2lkICsgXCI+LmJsYW5rbGlcIikucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihcInJlbW92ZWRmaWxlXCIsIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInJlbW92ZWRmaWxlXCIsIGZpbGUuY29udGFpbmVyaW1hZ2VpZCk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB2YXIgY2lkID0gdGhpcy5vcHRpb25zLmNvbnRhaW5lcmlkO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lcmltYWdlaWQgPSBmaWxlLmNvbnRhaW5lcmltYWdlaWQnJ1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdmFyIG51bURpdiA9ICQoXCIjcHJldmlld19cIiArIGNpZCArIFwiPi5kaXNwbGF5SW1hZ2VcIikubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgc2VsZi5hdXRoU2VydmljZS5jb250YWluZXJJbWFnZURlbGV0ZShjb250YWluZXJpbWFnZWlkKVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmF0ZUJsYW5rSW1nKGNpZCwgbnVtRGl2KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29udGFpbmVyaW1hZ2UgZGVsZXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihcInF1ZXVlY29tcGxldGVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJkcm9wem9uZSBldmVudCBxdWV1ZWNvbXBsZXRlXCIpOyAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihcInRodW1ibmFpbFwiLCBmdW5jdGlvbihmaWxlLCB0aHVtYm5haWwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImRyb3B6b25lIGV2ZW50IHRodW1ibmFpbFwiKTtcblxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdLmltYWdlbmFtZSA9IHRodW1ibmFpbDtcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxmLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdLmltYWdlbmFtZSA9IHRodW1ibmFpbDtcbiAgICAgICAgICAgICAgICAgICAgLy99KTtcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgbnVtRGl2ID0gJChcIiNwcmV2aWV3X1wiICsgY2lkICsgXCI+LmRpc3BsYXlJbWFnZVwiKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJkaXNwbGF5SW1hZ2VMZW5ndGggPiBcIiArIG51bURpdik7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgIC8vLS0tIGNyYXRlQmxhbmtJbWcoY2lkLCBudW1EaXYpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJzdWNjZXNzXCIsIGZ1bmN0aW9uKGZpbGUsIHJlcywgZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHJlcyA9IEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbWcgPSByZXMuZGF0YS5pbWFnZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmNvbnRhaW5lcmltYWdlc1tmaWxlLmluZGV4XSA9IGltZztcblxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5jb250YWluZXJpbWFnZWlkID0gaW1nLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5jb250YWluZXJpZCA9IGltZy5jb250YWluZXJpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJzdWNjZXNzID4gXCIgKyBmaWxlLmNvbnRhaW5lcmltYWdlaWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdLmlkID0gaW1nLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XS5jb250YWluZXJpZCA9IGltZy5jb250YWluZXJpZDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XS5pZCA9IGZpbGUuY29udGFpbmVyaW1hZ2VpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0uY29udGFpbmVyaWQgPSBmaWxlLmNvbnRhaW5lcmlkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL3NldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJzZXRUaW1lb3V0ID4gXCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHNlbGYuY3VycmVudFZpZXdmb28pOyAgICAgICAgICAgIFxuICAgICAgICAvL2ZvciAodmFyIGkgPSAwOyBpIDwgc2VsZi5jdXJyZW50Vmlld2Zvby5jb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vICB2YXIgY29udGFpbmVyID0gc2VsZi5jdXJyZW50Vmlld2Zvby5jb250YWluZXJzW2ldO1xuXG5cbiAgICAgICAgc2VsZi5kWm9uZSA9IHNlbGYuY3JlYXRlRHJvcFpvbmUoY29udGFpbmVyKTtcblxuICAgICAgICAvLyAgICAgICAgICAgICAgICBpZiAoIWNvbnRhaW5lci5jb250YWluZXJpbWFnZXMpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICB9XG4gICAgICAgIGxldCBjb250YWluZXJJbWFnZUxlbmd0aCA9IGNvbnRhaW5lci5jb250YWluZXJpbWFnZXMubGVuZ3RoO1xuXG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb250YWluZXJJbWFnZUxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyaW1hZ2UgPSBjb250YWluZXIuY29udGFpbmVyaW1hZ2VzW2pdO1xuXG4gICAgICAgICAgICB2YXIgaW1nVXJsID0gc2VsZi5zZXJ2aWNlVXJsICsgXCIvdXBsb2FkL2dhbGxlcnkvXCIgKyBjb250YWluZXJpbWFnZS5pbWFnZW5hbWU7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGltZ1VybCk7XG5cbiAgICAgICAgICAgIHZhciBtb2NrRmlsZSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBpbWdVcmwsXG4gICAgICAgICAgICAgICAgLy9zaXplOiBmaWxlU2l6ZSxcbiAgICAgICAgICAgICAgICAvL3R5cGU6IGZpbGVNaW1lVHlwZSxcbiAgICAgICAgICAgICAgICBjb250YWluZXJpbWFnZWlkOiBjb250YWluZXJpbWFnZS5pZCxcbiAgICAgICAgICAgICAgICBjb250YWluZXJpZDogY29udGFpbmVyLmlkLFxuICAgICAgICAgICAgICAgIGFjY2VwdGVkOiB0cnVlXG4gICAgICAgICAgICAgICAgLy9zdGF0dXM6IERyb3B6b25lLlNVQ0NFU1NcbiAgICAgICAgICAgIH07IC8vIHVzZSBhY3R1YWwgaWQgc2VydmVyIHVzZXMgdG8gaWRlbnRpZnkgdGhlIGZpbGUgKGUuZy4gREIgdW5pcXVlIGlkZW50aWZpZXIpXG5cbiAgICAgICAgICAgIHNlbGYuZFpvbmUuZW1pdChcImFkZGVkZmlsZVwiLCBtb2NrRmlsZSk7XG4gICAgICAgICAgICBzZWxmLmRab25lLmNyZWF0ZVRodW1ibmFpbEZyb21VcmwobW9ja0ZpbGUsIGltZ1VybCwgbnVsbCwgXCJBbm9ueW1vdXNcIik7XG4gICAgICAgICAgICBzZWxmLmRab25lLmVtaXQoXCJzdWNjZXNzXCIsIG1vY2tGaWxlKTtcbiAgICAgICAgICAgIHNlbGYuZFpvbmUuZW1pdChcImNvbXBsZXRlXCIsIG1vY2tGaWxlKTtcblxuICAgICAgICAgICAgc2VsZi5kWm9uZS5maWxlcy5wdXNoKG1vY2tGaWxlKTtcbiAgICAgICAgfVxuICAgICAgICAvL30sIDEwMDApO1xuXG5cbiAgICAgICAgY29udGFpbmVyLmdvdG9MYXN0UGFnZSA9IHRydWU7XG4gICAgfVxuXG4gICAgY3JlYXRlRHJvcFpvbmUoY29udGFpbmVyKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLm15RHJvcHpvbmUuY29udGFpbmVyaWQgPSBjb250YWluZXIuaWQ7XG4gICAgICAgIC8vc2VsZi5teURyb3B6b25lLnByZXZpZXdzQ29udGFpbmVyID0gXCIjcHJldmlld19cIiArIGNvbnRhaW5lci5pZDtcbiAgICAgICAgc2VsZi5teURyb3B6b25lLnByZXZpZXdzQ29udGFpbmVyID0gZmFsc2U7XG4gICAgICAgIHNlbGYubXlEcm9wem9uZS5jbGlja2FibGUgPSBcIiN1cGxvYWRfaW1hZ2VfXCIgKyBjb250YWluZXIuaWQgKyBcIiwjZHpwaF9cIiArIGNvbnRhaW5lci5pZDtcbiAgICAgICAgdmFyIGRab25lID0gbmV3IERyb3B6b25lKFwiI2Zvcm1fXCIgKyBjb250YWluZXIuaWQsIHNlbGYubXlEcm9wem9uZSk7XG5cbiAgICAgICAgLy9zZWxmLmN1cnJlbnRWaWV3Zm9vLm1hcERyb3B6b25lW2NvbnRhaW5lci5pZF0gPSBkWm9uZTtcbiAgICAgICAgcmV0dXJuIGRab25lO1xuICAgIH1cblxuICAgIGNvbnRhaW5lckltYWdlRGVsZXRlKGNvbnRhaW5lcmlkOiBzdHJpbmcsIGNvbnRhaW5lcmltYWdlaWQ6IHN0cmluZywgaW5kZXg6IG51bWJlcikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcblxuICAgICAgICB2YXIgYWN0dWFsSW5kZXggPSAoKGNvbnRhaW5lci5jdXJyZW50UGFnZSAtIDEpICogY29udGFpbmVyLml0ZW1zUGVyUGFnZSkgKyBpbmRleDtcbiAgICAgICAgdmFyIGNvbnRhaW5lckltYWdlID0gY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVthY3R1YWxJbmRleF07XG4gICAgICAgIGNvbnRhaW5lckltYWdlLmRlbGV0aW5nID0gdHJ1ZTtcblxuICAgICAgICBzZWxmLmF1dGhTZXJ2aWNlLmNvbnRhaW5lckltYWdlRGVsZXRlKGNvbnRhaW5lcmltYWdlaWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICBjb250YWluZXJJbWFnZS5kZWxldGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXkuc3BsaWNlKGFjdHVhbEluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY29udGFpbmVyaW1hZ2VzLnNwbGljZShhY3R1YWxJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgLy92YXIgY29udGFpbmVySW1hZ2UgPSBzZWxmLmNyYXRlQmxhbmtJbWFnZSgpO1xuICAgICAgICAgICAgICAgIC8vc2VsZi5jdXJyZW50Vmlld2Zvby5tYXBDb250YWluZXJbY29udGFpbmVyaWRdLnRvdGFsSW1hZ2VBcnJheS5wdXNoKGNvbnRhaW5lckltYWdlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRab25lLmluZGV4LS07XG4gICAgICAgICAgICAgICAgLy9zZWxmLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheShjb250YWluZXIpOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheShjb250YWluZXIpO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmNvbnRhaW5lci5jb250YWluZXJpbWFnZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb250YWluZXIub3BhY2l0eSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJDb250YWluZXJpbWFnZSBkZWxldGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkRlbGV0ZUNvbnRhaW5lcigpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuZGVsZXRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLm9uQ29udGFpbmVyRGVsZXRlLmVtaXQodGhpcy5jb250YWluZXIuaWQpO1xuICAgIH1cblxuICAgIG9uVXBkYXRlQ29udGFpbmVyKHZhbCkge1xuICAgICAgICB0aGlzLml0ZW0gPSB7IHRpdGxlOiB2YWwsIGlkOiB0aGlzLmNvbnRhaW5lci5pZCB9O1xuXG4gICAgICAgIHRoaXMub25Db250YWluZXJVcGRhdGUuZW1pdCh0aGlzLml0ZW0pO1xuICAgIH1cblxuICAgIG9uQ2xpY2tQcmV2aWV3KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgaW1nTGVuZ3RoID0gc2VsZi5jb250YWluZXIuY29udGFpbmVyaW1hZ2VzLmxlbmd0aDtcblxuICAgICAgICB2YXIgZmFuY3lBcnJheSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGltZ0xlbmd0aDsgaisrKSB7XG5cbiAgICAgICAgICAgIHZhciBjb250YWluZXJpbWFnZSA9IHNlbGYuY29udGFpbmVyLmNvbnRhaW5lcmltYWdlc1tqXTtcbiAgICAgICAgICAgIHZhciBpbWdVcmwgPSBzZWxmLnNlcnZpY2VVcmwgKyBcIi91cGxvYWQvZ2FsbGVyeS9cIiArIGNvbnRhaW5lcmltYWdlLmltYWdlbmFtZTtcblxuICAgICAgICAgICAgdmFyIG9iakltYWdlID0ge1xuICAgICAgICAgICAgICAgIGhyZWY6IGltZ1VybFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZhbmN5QXJyYXkucHVzaChvYmpJbWFnZSk7XG4gICAgICAgIH1cblxuICAgICAgICAkLmZhbmN5Ym94Lm9wZW4oZmFuY3lBcnJheSwge1xuICAgICAgICAgICAgYXV0b1NpemU6IHRydWUsXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICBwcmV2RWZmZWN0OiAnbm9uZScsXG4gICAgICAgICAgICBuZXh0RWZmZWN0OiAnbm9uZScsXG4gICAgICAgICAgICBoZWxwZXJzOiB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGh1bWJzOiB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3NSxcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidXR0b25zOiB7fVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=
