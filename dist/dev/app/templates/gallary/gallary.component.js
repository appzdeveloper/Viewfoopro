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
        this.imageUrl = myGlobals.imageUrl + "/upload/gallery/";
        this.zone = zone;
        this.loginUser = myGlobals.LoginUser;
    }
    Object.defineProperty(GallaryComponent.prototype, "ngGridItemEvent", {
        get: function () {
            return this._ngGridItemEvent;
        },
        set: function (v) {
            var self = this;
            if (v) {
                this._ngGridItemEvent = v;
                setTimeout(function () {
                    self.updatePagingBasedonHW();
                }, 1000);
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
        var _this = this;
        if (this.imgblock) {
            var height = this.imgblock.nativeElement.offsetHeight - 50;
            var width = this.imgblock.nativeElement.offsetWidth;
            var rows = Math.floor(height / 142);
            var cols = Math.floor(width / 138);
            var perpage = rows * cols;
            var containerupdateDict = {
                containerid: this.container.id,
                containerrows: rows,
                containercols: cols,
                itemsperpage: perpage
            };
            this.authService.containerUpdate(containerupdateDict)
                .subscribe(function (result) {
                if (result) {
                    console.log(result);
                }
            }, function (error) {
                _this.errorMsg = error;
                _this.loading = false;
                console.log("Container update fail: " + error);
            });
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
            url: myGlobals.imageUrl + "/containerimage",
            headers: { "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" },
            paramName: "image",
            autoProcessQueue: true,
            uploadMultiple: false,
            acceptedFiles: "image/*",
            thumbnailWidth: 256,
            thumbnailHeight: 256,
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
    ], GallaryComponent.prototype, "imgblock", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GallaryComponent.prototype, "container", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GallaryComponent.prototype, "currentViewfoo", void 0);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90ZW1wbGF0ZXMvZ2FsbGFyeS9nYWxsYXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EscUJBRUssZUFBZSxDQUFDLENBQUE7QUFDckIsdUJBQThCLGlCQUFpQixDQUFDLENBQUE7QUFDaEQsc0JBQXlDLGdCQUFnQixDQUFDLENBQUE7QUFHMUQsNkJBQTRCLG9DQUFvQyxDQUFDLENBQUE7QUFHakUscUNBQWtDLDhDQUE4QyxDQUFDLENBQUE7QUFDakYsSUFBTyxTQUFTLFdBQVcsZUFBZSxDQUFDLENBQUM7QUFRNUM7SUE0Q0ksMEJBQVksSUFBWSxFQUFVLG1CQUFzQyxFQUM3RCxVQUFzQixFQUNyQixXQUF3QjtRQUZGLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFDN0QsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWxCbEIsc0JBQWlCLEdBQXlCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQzdELHNCQUFpQixHQUF5QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQU8vRSxhQUFRLEdBQVcsU0FBUyxDQUFDLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQztRQVd2RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFJekMsQ0FBQztJQTVDUSxzQkFBVyw2Q0FBZTthQUExQjtZQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDakMsQ0FBQzthQUVELFVBQTJCLENBQU07WUFDN0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQztnQkFDMUIsVUFBVSxDQUFDO29CQUNQLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dC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QyxZQUFLLEVBQUU7OzJEQUFBO0lBbUJSO1FBQUMsYUFBTSxFQUFFOzsrREFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOzsrREFBQTtJQW5DYjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxVQUFVLEVBQUUsQ0FBQywwQ0FBbUIsRUFBRSxnQ0FBd0IsRUFBRSx3QkFBZSxDQUFDO1NBQy9FLENBQUM7O3dCQUFBO0lBMGRGLHVCQUFDO0FBQUQsQ0F6ZEEsQUF5ZEMsSUFBQTtBQXpkWSx3QkFBZ0IsbUJBeWQ1QixDQUFBIiwiZmlsZSI6ImFwcC90ZW1wbGF0ZXMvZ2FsbGFyeS9nYWxsYXJ5LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgTmdab25lLCBJbnB1dCwgT3V0cHV0LCBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlLCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0NoaWxkfVxuZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NPUkVfRElSRUNUSVZFU30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3Zm9vIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtQYWdpbmF0aW9uQ29tcG9uZW50fSBmcm9tICcuLi8uLi9zaGFyZWQvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vLi4vZ2xvYmFscycpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnZ2FsbGFyeXNpbmdsZScsXG4gICAgdGVtcGxhdGVVcmw6ICdnYWxsYXJ5LmNvbXBvbmVudC5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbUGFnaW5hdGlvbkNvbXBvbmVudCwgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTLCBDT1JFX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIEdhbGxhcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgICBwdWJsaWMgY29udGFpbmVydHlwZTogc3RyaW5nO1xuXG4gICAgQFZpZXdDaGlsZCgnaW1nYmxvY2snKSBpbWdibG9jazogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBjb250YWluZXI6IGFueTtcbiAgICBASW5wdXQoKSBwdWJsaWMgY3VycmVudFZpZXdmb286IGFueTtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBnZXQgbmdHcmlkSXRlbUV2ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmdHcmlkSXRlbUV2ZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgbmdHcmlkSXRlbUV2ZW50KHY6IGFueSkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICB0aGlzLl9uZ0dyaWRJdGVtRXZlbnQgPSB2O1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZVBhZ2luZ0Jhc2Vkb25IVygpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgfVxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiR2FsbGFyeUNvbXBvbmVudCBuZ0dyaWRJdGVtRXZlbnQgY2hhbmdlZFwiKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh2KTtcblxuICAgICAgICAvL3RoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcygpO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSBwcml2YXRlIG9uQ29udGFpbmVyRGVsZXRlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcHJpdmF0ZSBvbkNvbnRhaW5lclVwZGF0ZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgLy9AT3V0cHV0KCkgcHJpdmF0ZSBvbkNvbnRhaW5lckltYWdlQ2xpY2s6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgbG9naW5Vc2VyOiBVc2VyO1xuXG4gICAgdmlld2Zvb2lkOiBzdHJpbmc7XG4gICAgY29udGFpbmVyaWQ6IHN0cmluZztcbiAgICBpbWFnZVVybDogc3RyaW5nID0gbXlHbG9iYWxzLmltYWdlVXJsICsgXCIvdXBsb2FkL2dhbGxlcnkvXCI7XG4gICAgaXRlbTogYW55O1xuICAgIG15RHJvcHpvbmU6IGFueTtcblxuICAgIGRab25lOiBhbnk7XG5cbiAgICB6b25lOiBOZ1pvbmU7XG5cbiAgICBjb25zdHJ1Y3Rvcih6b25lOiBOZ1pvbmUsIHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xuICAgICAgICB0aGlzLnpvbmUgPSB6b25lO1xuXG4gICAgICAgIHRoaXMubG9naW5Vc2VyID0gbXlHbG9iYWxzLkxvZ2luVXNlcjtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiR2FsbGFyeUNvbXBvbmVudCBjb25zdHJ1Y3RvclwiKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdENvbnRhaW5lckZvckRyb3B6b25lKCk7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlUGFnaW5nQmFzZWRvbkhXKCkge1xuICAgICAgICBpZiAodGhpcy5pbWdibG9jaykge1xuXG4gICAgICAgICAgICAvLyB2YXIgaGVpZ2h0ID0gdGhpcy5pbWdibG9jay5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCAtIDY1O1xuICAgICAgICAgICAgLy8gdmFyIHdpZHRoID0gdGhpcy5pbWdibG9jay5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoO1xuXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gdGhpcy5pbWdibG9jay5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCAtIDUwO1xuICAgICAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5pbWdibG9jay5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuXG4gICAgICAgICAgICB2YXIgcm93cyA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gMTQyKTtcbiAgICAgICAgICAgIHZhciBjb2xzID0gTWF0aC5mbG9vcih3aWR0aCAvIDEzOCk7XG5cbiAgICAgICAgICAgIHZhciBwZXJwYWdlID0gcm93cyAqIGNvbHM7XG5cbiAgICAgICAgICAgIHZhciBjb250YWluZXJ1cGRhdGVEaWN0ID0ge1xuICAgIFx0XHRcdGNvbnRhaW5lcmlkOiB0aGlzLmNvbnRhaW5lci5pZCxcbiAgICAgICAgICAgICAgICBjb250YWluZXJyb3dzOiByb3dzLFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lcmNvbHM6IGNvbHMsXG4gICAgICAgICAgICAgICAgaXRlbXNwZXJwYWdlOiBwZXJwYWdlXG4gICAgXHRcdH1cblxuXHRcdFx0dGhpcy5hdXRoU2VydmljZS5jb250YWluZXJVcGRhdGUoY29udGFpbmVydXBkYXRlRGljdClcblx0XHRcdFx0LnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cblx0XHRcdFx0XHRpZiAocmVzdWx0KSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXN1bHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwgKGVycm9yOiBhbnkpID0+IHtcblx0XHRcdFx0XHR0aGlzLmVycm9yTXNnID0gZXJyb3I7XG5cdFx0XHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJDb250YWluZXIgdXBkYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuXHRcdFx0XHR9KTtcblxuXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5pdGVtc1BlclBhZ2UgPSBwZXJwYWdlO1xuICAgICAgICAgICAgdGhpcy5jb3B5QXJyYXlGcm9tVG90YWxUb0Rpc3BsYXkoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FsbGFyeUNvbXBvbmVudCBuZ0dyaWRJdGVtRXZlbnRcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhoZWlnaHQgKyBcIiAgXCIgKyB3aWR0aCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyb3dzICsgXCIgIFwiICsgY29scyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBlcnBhZ2UgIFwiICsgcGVycGFnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL25nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3BLZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XG4gICAgLy9jb25zb2xlLmxvZyhcIkdhbGxhcnkgb24gcHJvcCBjaGFuZ2VzXCIpO1xuICAgIC8vICAgICAgICBsZXQgbG9nOiBzdHJpbmdbXSA9IFtdO1xuICAgIC8vdmFyIHNlbGYgPSB0aGlzO1xuICAgIC8vZm9yIChsZXQgcHJvcE5hbWUgaW4gY2hhbmdlcykge1xuICAgIC8vY29uc29sZS5sb2coXCJuZ09uQ2hhbmdlcyBcIitwcm9wTmFtZSk7XG4gICAgLy9pZihwcm9wTmFtZSA9PSBcInRvdGFsSXRlbXNcIikge1xuICAgIC8vdGhpcy5pbml0ZWQgPSB0cnVlO1xuICAgIC8vdGhpcy5wYWdlID1cbiAgICAvL31cbiAgICAvLyAgICAgICAgICAgIGxldCBjaGFuZ2VkUHJvcCA9IGNoYW5nZXNbcHJvcE5hbWVdO1xuICAgIC8vICAgICAgICAgICAgbGV0IGZyb20gPSBKU09OLnN0cmluZ2lmeShjaGFuZ2VkUHJvcC5wcmV2aW91c1ZhbHVlKTtcbiAgICAvLyAgICAgICAgICAgIGxldCB0byA9IEpTT04uc3RyaW5naWZ5KGNoYW5nZWRQcm9wLmN1cnJlbnRWYWx1ZSk7XG4gICAgLy8gICAgICAgICAgICBsb2cucHVzaChgJHtwcm9wTmFtZX0gY2hhbmdlZCBmcm9tICR7ZnJvbX0gdG8gJHt0b31gKTtcbiAgICAvL31cbiAgICAvLyAgICAgICAgdGhpcy5jaGFuZ2VMb2cucHVzaChsb2cuam9pbignLCAnKSk7XG4gICAgLy9jb25zb2xlLmxvZyhcIm5nT25DaGFuZ2VzXCIpO1xuICAgIC8vfVxuXG4gICAgaW5pdENvbnRhaW5lckZvckRyb3B6b25lKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcblxuICAgICAgICBjb250YWluZXIub3BhY2l0eSA9IDE7XG4gICAgICAgIGNvbnRhaW5lci5kaXNwSW1hZ2VBcnJheSA9IFtdO1xuXG4gICAgICAgIC8vY29udGFpbmVyLml0ZW1zUGVyUGFnZSA9IDE7XG4gICAgICAgIHRoaXMudXBkYXRlUGFnaW5nQmFzZWRvbkhXKCk7XG5cbiAgICAgICAgY29udGFpbmVyLmN1cnJlbnRQYWdlID0gMTtcbiAgICAgICAgY29udGFpbmVyLmdvdG9MYXN0UGFnZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vW10uc2xpY2UgPT09IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbiAgICAgICAgdmFyIHRvdGFsSW1hZ2VBcnJheSA9IFtdO1xuICAgICAgICBsZXQgYmxhbmtJbWFnZUNvdW50ID0gY29udGFpbmVyLml0ZW1zUGVyUGFnZTtcblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGJsYW5rSW1hZ2VDb3VudDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVySW1hZ2UgPSBzZWxmLmNyYXRlQmxhbmtJbWFnZSgpO1xuICAgICAgICAgICAgdG90YWxJbWFnZUFycmF5LnB1c2goY29udGFpbmVySW1hZ2UpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5ID0gdG90YWxJbWFnZUFycmF5O1xuXG5cbiAgICAgICAgdGhpcy5jb3B5QXJyYXlGcm9tVG90YWxUb0Rpc3BsYXkoKTtcblxuICAgICAgICB0aGlzLmNyZWF0aW5nRHJvcHpvbmVJbnN0YW5jZXMoKTtcbiAgICB9XG5cbiAgICBjdXJyZW50UGFnZUNoYW5nZWQoZXZlbnQ6IGFueSwgY29udGFpbmVyOiBhbnkpIHtcbiAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKFwiY3VycmVudFBhZ2VDaGFuZ2VkID4gXCIpO1xuICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coZXZlbnQucGFnZSk7XG4gICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhjb250YWluZXIudG90YWxJbWFnZUFycmF5Lmxlbmd0aCk7XG5cbiAgICAgICAgY29udGFpbmVyLmN1cnJlbnRQYWdlID0gZXZlbnQucGFnZTtcblxuICAgICAgICB0aGlzLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheSgpO1xuXG4gICAgfVxuXG4gICAgbnVtYmVyT2ZQYWdlcyh0b3RhbFBhZ2VzOiBhbnksIGNvbnRhaW5lcjogYW55KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJudW1iZXJPZlBhZ2VzID4gXCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGV2ZW50KTtcblxuICAgICAgICBjb250YWluZXIudG90YWxQYWdlcyA9IHRvdGFsUGFnZXM7XG4gICAgfVxuXG4gICAgY29weUFycmF5RnJvbVRvdGFsVG9EaXNwbGF5KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcblxuICAgICAgICB2YXIgc3RhcnQgPSAoKGNvbnRhaW5lci5jdXJyZW50UGFnZSAtIDEpICogY29udGFpbmVyLml0ZW1zUGVyUGFnZSk7XG4gICAgICAgIHZhciBlbmQgPSBzdGFydCArIGNvbnRhaW5lci5pdGVtc1BlclBhZ2U7XG4gICAgICAgIC8vY29udGFpbmVyLmRpc3BJbWFnZUFycmF5ID0gY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheS5zbGljZShzdGFydCwgZW5kKTtcbiAgICAgICAgLy92YXIgZGlzcEltYWdlQXJyYXkgPSBbXTtcbiAgICAgICAgY29udGFpbmVyLmRpc3BJbWFnZUFycmF5LnNwbGljZSgwLCBjb250YWluZXIuZGlzcEltYWdlQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjb250YWluZXIudG90YWxJbWFnZUFycmF5Lmxlbmd0aCA8PSBpKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheS5wdXNoKHNlbGYuY3JhdGVCbGFua0ltYWdlKCkpO1xuICAgICAgICAgICAgfVxuXHRcdFx0Ly8gICAgICAgICAgICBpZiAoIWNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbaV0pIHtcblx0XHRcdC8vICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXkucHVzaChzZWxmLmNyYXRlQmxhbmtJbWFnZSgpKTtcblx0XHRcdC8vICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGFpbmVyLmRpc3BJbWFnZUFycmF5LnB1c2goY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtpXSk7XG4gICAgICAgICAgICAvL2Rpc3BJbWFnZUFycmF5LnB1c2goY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9zZWxmLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgLy9jb250YWluZXIuZGlzcEltYWdlQXJyYXkucHVzaChkaXNwSW1hZ2VBcnJheSk7XG4gICAgICAgIC8vfSk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJjb3B5QXJyYXlGcm9tVG90YWxUb0Rpc3BsYXkgc3RhcnQgPSBcIiArIHN0YXJ0ICsgXCIgdG90YWxFbGVtZW50OiBcIiArIGNvbnRhaW5lci5pdGVtc1BlclBhZ2UpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXkpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGNvbnRhaW5lci5kaXNwSW1hZ2VBcnJheSk7XG4gICAgfVxuXG4gICAgY3JhdGVCbGFua0ltYWdlKCkge1xuICAgICAgICB2YXIgY29udGFpbmVySW1hZ2U6IENvbnRhaW5lckltYWdlID0ge1xuICAgICAgICAgICAgaWQ6IFwiXCIsXG4gICAgICAgICAgICBpbWFnZW5hbWU6IFwiaW1nL2J1aWxkX3ZpZXdmb28vcGljMS5wbmdcIixcbiAgICAgICAgICAgIGlzQmxhbmtJbWFnZTogdHJ1ZSxcbiAgICAgICAgICAgIGlzQ29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHByb2dyZXNzOiBcIjAlXCJcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGFpbmVySW1hZ2U7XG4gICAgfVxuXG4gICAgY3JlYXRpbmdEcm9wem9uZUluc3RhbmNlcygpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG5cbiAgICAgICAgRHJvcHpvbmUuYXV0b0Rpc2NvdmVyID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5teURyb3B6b25lID0ge1xuICAgICAgICAgICAgdXJsOiBteUdsb2JhbHMuaW1hZ2VVcmwgKyBcIi9jb250YWluZXJpbWFnZVwiLFxuICAgICAgICAgICAgaGVhZGVyczogeyBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0sXG4gICAgICAgICAgICBwYXJhbU5hbWU6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgIGF1dG9Qcm9jZXNzUXVldWU6IHRydWUsXG4gICAgICAgICAgICB1cGxvYWRNdWx0aXBsZTogZmFsc2UsXG4gICAgICAgICAgICBhY2NlcHRlZEZpbGVzOiBcImltYWdlLypcIixcbiAgICAgICAgICAgIC8vY2xpY2thYmxlOiAnI3VwbG9hZC1pbWFnZSwubXlEcm9wem9uZSwudXBsb2FkLWZpbGVzJyxcbiAgICAgICAgICAgIC8vcHJldmlld1RlbXBsYXRlOiBwcmV2aWV3VGVtcGxhdGUsXG5cdFx0XHQvLyAgICAgICAgICAgIHRodW1ibmFpbFdpZHRoOiA4NjAsXG5cdFx0XHQvLyAgICAgICAgICAgIHRodW1ibmFpbEhlaWdodDogNDUwLFxuICAgICAgICAgICAgdGh1bWJuYWlsV2lkdGg6IDI1NixcbiAgICAgICAgICAgIHRodW1ibmFpbEhlaWdodDogMjU2LFxuICAgICAgICAgICAgcGFyYWxsZWxVcGxvYWRzOiAxLFxuICAgICAgICAgICAgLy9wcmV2aWV3c0NvbnRhaW5lcjogXCIuZGlzcGxheUltYWdlQmxvY2tcIixcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBzZWxmLmNvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2FsbGVkIGluaXQgXCIgKyB0aGlzLm9wdGlvbnMuY29udGFpbmVyaWQpO1xuICAgICAgICAgICAgICAgIC8vLS0tIGNyYXRlQmxhbmtJbWcodGhpcy5vcHRpb25zLmNvbnRhaW5lcmlkLCAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwiY29tcGxldGVcIiwgZnVuY3Rpb24oZmlsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0uaXNDb21wbGV0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFVwbG9hZGluZ0ZpbGVzKCkubGVuZ3RoID09PSAwICYmIHRoaXMuZ2V0UXVldWVkRmlsZXMoKS5sZW5ndGggPT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihcImFkZGVkZmlsZVwiLCBmdW5jdGlvbihmaWxlLCBhcmcxLCBhcmcyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhZGRlZGZpbGUgZXZlbnRcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZmlsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZmlsZS5pbmRleCA9IHRoaXMuaW5kZXgrKztcblxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbGUuY29udGFpbmVyaW1hZ2VpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmdvdG9MYXN0UGFnZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXkucHVzaChzZWxmLmNyYXRlQmxhbmtJbWFnZSgpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250YWluZXIuY29udGFpbmVyaW1hZ2VzW2ZpbGUuaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmNvbnRhaW5lcmltYWdlcy5wdXNoKHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0uaXNCbGFua0ltYWdlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIub3BhY2l0eSA9IDA7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWxmLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheShjb250YWluZXIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJ1cGxvYWRwcm9ncmVzc1wiLCBmdW5jdGlvbihmaWxlLCBwcm9ncmVzcywgYnl0ZXNTZW50KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdLnByb2dyZXNzID0gcHJvZ3Jlc3MgKyBcIiVcIjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImRyb3B6b25lIGV2ZW50IHVwbG9hZHByb2dyZXNzIDogXCIgKyBwcm9ncmVzcyArIFwiZmlsZWluZGV4ID4gXCIgKyBmaWxlLmluZGV4KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwic2VuZGluZ1wiLCBmdW5jdGlvbihmaWxlLCB4aHIsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgY2lkID0gZmlsZS5jb250YWluZXJpZDtcbiAgICAgICAgICAgICAgICAgICAgLy8tLS0gJChcIiNwcmV2aWV3X1wiICsgY2lkICsgXCI+LmJsYW5rbGlcIikucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihcInJlbW92ZWRmaWxlXCIsIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInJlbW92ZWRmaWxlXCIsIGZpbGUuY29udGFpbmVyaW1hZ2VpZCk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB2YXIgY2lkID0gdGhpcy5vcHRpb25zLmNvbnRhaW5lcmlkO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lcmltYWdlaWQgPSBmaWxlLmNvbnRhaW5lcmltYWdlaWQnJ1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdmFyIG51bURpdiA9ICQoXCIjcHJldmlld19cIiArIGNpZCArIFwiPi5kaXNwbGF5SW1hZ2VcIikubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgc2VsZi5hdXRoU2VydmljZS5jb250YWluZXJJbWFnZURlbGV0ZShjb250YWluZXJpbWFnZWlkKVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmF0ZUJsYW5rSW1nKGNpZCwgbnVtRGl2KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29udGFpbmVyaW1hZ2UgZGVsZXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihcInF1ZXVlY29tcGxldGVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJkcm9wem9uZSBldmVudCBxdWV1ZWNvbXBsZXRlXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJ0aHVtYm5haWxcIiwgZnVuY3Rpb24oZmlsZSwgdGh1bWJuYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJkcm9wem9uZSBldmVudCB0aHVtYm5haWxcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XS5pbWFnZW5hbWUgPSB0aHVtYm5haWw7XG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZi56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XS5pbWFnZW5hbWUgPSB0aHVtYm5haWw7XG4gICAgICAgICAgICAgICAgICAgIC8vfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIG51bURpdiA9ICQoXCIjcHJldmlld19cIiArIGNpZCArIFwiPi5kaXNwbGF5SW1hZ2VcIikubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZGlzcGxheUltYWdlTGVuZ3RoID4gXCIgKyBudW1EaXYpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICAvLy0tLSBjcmF0ZUJsYW5rSW1nKGNpZCwgbnVtRGl2KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwic3VjY2Vzc1wiLCBmdW5jdGlvbihmaWxlLCByZXMsIGUpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciByZXMgPSBKU09OLnBhcnNlKHJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1nID0gcmVzLmRhdGEuaW1hZ2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jb250YWluZXJpbWFnZXNbZmlsZS5pbmRleF0gPSBpbWc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUuY29udGFpbmVyaW1hZ2VpZCA9IGltZy5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUuY29udGFpbmVyaWQgPSBpbWcuY29udGFpbmVyaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwic3VjY2VzcyA+IFwiICsgZmlsZS5jb250YWluZXJpbWFnZWlkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVtmaWxlLmluZGV4XS5pZCA9IGltZy5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0uY29udGFpbmVyaWQgPSBpbWcuY29udGFpbmVyaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXlbZmlsZS5pbmRleF0uaWQgPSBmaWxlLmNvbnRhaW5lcmltYWdlaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG90YWxJbWFnZUFycmF5W2ZpbGUuaW5kZXhdLmNvbnRhaW5lcmlkID0gZmlsZS5jb250YWluZXJpZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwic2V0VGltZW91dCA+IFwiKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhzZWxmLmN1cnJlbnRWaWV3Zm9vKTtcbiAgICAgICAgLy9mb3IgKHZhciBpID0gMDsgaSA8IHNlbGYuY3VycmVudFZpZXdmb28uY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyAgdmFyIGNvbnRhaW5lciA9IHNlbGYuY3VycmVudFZpZXdmb28uY29udGFpbmVyc1tpXTtcblxuXG4gICAgICAgIHNlbGYuZFpvbmUgPSBzZWxmLmNyZWF0ZURyb3Bab25lKGNvbnRhaW5lcik7XG5cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKCFjb250YWluZXIuY29udGFpbmVyaW1hZ2VzKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxuICAgICAgICBsZXQgY29udGFpbmVySW1hZ2VMZW5ndGggPSBjb250YWluZXIuY29udGFpbmVyaW1hZ2VzLmxlbmd0aDtcblxuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29udGFpbmVySW1hZ2VMZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lcmltYWdlID0gY29udGFpbmVyLmNvbnRhaW5lcmltYWdlc1tqXTtcblxuICAgICAgICAgICAgdmFyIGltZ1VybCA9IHNlbGYuaW1hZ2VVcmwgKyBjb250YWluZXJpbWFnZS5pbWFnZW5hbWU7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGltZ1VybCk7XG5cbiAgICAgICAgICAgIHZhciBtb2NrRmlsZSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBpbWdVcmwsXG4gICAgICAgICAgICAgICAgLy9zaXplOiBmaWxlU2l6ZSxcbiAgICAgICAgICAgICAgICAvL3R5cGU6IGZpbGVNaW1lVHlwZSxcbiAgICAgICAgICAgICAgICBjb250YWluZXJpbWFnZWlkOiBjb250YWluZXJpbWFnZS5pZCxcbiAgICAgICAgICAgICAgICBjb250YWluZXJpZDogY29udGFpbmVyLmlkLFxuICAgICAgICAgICAgICAgIGFjY2VwdGVkOiB0cnVlXG4gICAgICAgICAgICAgICAgLy9zdGF0dXM6IERyb3B6b25lLlNVQ0NFU1NcbiAgICAgICAgICAgIH07IC8vIHVzZSBhY3R1YWwgaWQgc2VydmVyIHVzZXMgdG8gaWRlbnRpZnkgdGhlIGZpbGUgKGUuZy4gREIgdW5pcXVlIGlkZW50aWZpZXIpXG5cbiAgICAgICAgICAgIHNlbGYuZFpvbmUuZW1pdChcImFkZGVkZmlsZVwiLCBtb2NrRmlsZSk7XG4gICAgICAgICAgICBzZWxmLmRab25lLmNyZWF0ZVRodW1ibmFpbEZyb21VcmwobW9ja0ZpbGUsIGltZ1VybCwgbnVsbCwgXCJBbm9ueW1vdXNcIik7XG4gICAgICAgICAgICBzZWxmLmRab25lLmVtaXQoXCJzdWNjZXNzXCIsIG1vY2tGaWxlKTtcbiAgICAgICAgICAgIHNlbGYuZFpvbmUuZW1pdChcImNvbXBsZXRlXCIsIG1vY2tGaWxlKTtcblxuICAgICAgICAgICAgc2VsZi5kWm9uZS5maWxlcy5wdXNoKG1vY2tGaWxlKTtcbiAgICAgICAgfVxuICAgICAgICAvL30sIDEwMDApO1xuXG5cbiAgICAgICAgY29udGFpbmVyLmdvdG9MYXN0UGFnZSA9IHRydWU7XG4gICAgfVxuXG4gICAgY3JlYXRlRHJvcFpvbmUoY29udGFpbmVyKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLm15RHJvcHpvbmUuY29udGFpbmVyaWQgPSBjb250YWluZXIuaWQ7XG4gICAgICAgIC8vc2VsZi5teURyb3B6b25lLnByZXZpZXdzQ29udGFpbmVyID0gXCIjcHJldmlld19cIiArIGNvbnRhaW5lci5pZDtcbiAgICAgICAgc2VsZi5teURyb3B6b25lLnByZXZpZXdzQ29udGFpbmVyID0gZmFsc2U7XG4gICAgICAgIHNlbGYubXlEcm9wem9uZS5jbGlja2FibGUgPSBcIiN1cGxvYWRfaW1hZ2VfXCIgKyBjb250YWluZXIuaWQgKyBcIiwjZHpwaF9cIiArIGNvbnRhaW5lci5pZDtcbiAgICAgICAgdmFyIGRab25lID0gbmV3IERyb3B6b25lKFwiI2Zvcm1fXCIgKyBjb250YWluZXIuaWQsIHNlbGYubXlEcm9wem9uZSk7XG5cbiAgICAgICAgLy9zZWxmLmN1cnJlbnRWaWV3Zm9vLm1hcERyb3B6b25lW2NvbnRhaW5lci5pZF0gPSBkWm9uZTtcbiAgICAgICAgcmV0dXJuIGRab25lO1xuICAgIH1cblxuICAgIGNvbnRhaW5lckltYWdlRGVsZXRlKGNvbnRhaW5lcmlkOiBzdHJpbmcsIGNvbnRhaW5lcmltYWdlaWQ6IHN0cmluZywgaW5kZXg6IG51bWJlcikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcblxuICAgICAgICB2YXIgYWN0dWFsSW5kZXggPSAoKGNvbnRhaW5lci5jdXJyZW50UGFnZSAtIDEpICogY29udGFpbmVyLml0ZW1zUGVyUGFnZSkgKyBpbmRleDtcbiAgICAgICAgdmFyIGNvbnRhaW5lckltYWdlID0gY29udGFpbmVyLnRvdGFsSW1hZ2VBcnJheVthY3R1YWxJbmRleF07XG4gICAgICAgIGNvbnRhaW5lckltYWdlLmRlbGV0aW5nID0gdHJ1ZTtcblxuICAgICAgICBzZWxmLmF1dGhTZXJ2aWNlLmNvbnRhaW5lckltYWdlRGVsZXRlKGNvbnRhaW5lcmltYWdlaWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICBjb250YWluZXJJbWFnZS5kZWxldGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXkuc3BsaWNlKGFjdHVhbEluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY29udGFpbmVyaW1hZ2VzLnNwbGljZShhY3R1YWxJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgLy92YXIgY29udGFpbmVySW1hZ2UgPSBzZWxmLmNyYXRlQmxhbmtJbWFnZSgpO1xuICAgICAgICAgICAgICAgIC8vc2VsZi5jdXJyZW50Vmlld2Zvby5tYXBDb250YWluZXJbY29udGFpbmVyaWRdLnRvdGFsSW1hZ2VBcnJheS5wdXNoKGNvbnRhaW5lckltYWdlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRab25lLmluZGV4LS07XG4gICAgICAgICAgICAgICAgLy9zZWxmLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheShjb250YWluZXIpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29weUFycmF5RnJvbVRvdGFsVG9EaXNwbGF5KGNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuY29udGFpbmVyLmNvbnRhaW5lcmltYWdlcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbnRhaW5lci5vcGFjaXR5ID0gMTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNvbnRhaW5lcmltYWdlIGRlbGV0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRGVsZXRlQ29udGFpbmVyKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5kZWxldGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMub25Db250YWluZXJEZWxldGUuZW1pdCh0aGlzLmNvbnRhaW5lci5pZCk7XG4gICAgfVxuXG4gICAgb25VcGRhdGVDb250YWluZXIodmFsKSB7XG4gICAgICAgIHRoaXMuaXRlbSA9IHsgdGl0bGU6IHZhbCwgaWQ6IHRoaXMuY29udGFpbmVyLmlkIH07XG5cbiAgICAgICAgdGhpcy5vbkNvbnRhaW5lclVwZGF0ZS5lbWl0KHRoaXMuaXRlbSk7XG4gICAgfVxuXG4gICAgb25DbGlja1ByZXZpZXcoaW5kZXg6IG51bWJlcikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBpbWdMZW5ndGggPSBzZWxmLmNvbnRhaW5lci5jb250YWluZXJpbWFnZXMubGVuZ3RoO1xuXG4gICAgICAgIHZhciBmYW5jeUFycmF5ID0gW107XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW1nTGVuZ3RoOyBqKyspIHtcblxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lcmltYWdlID0gc2VsZi5jb250YWluZXIuY29udGFpbmVyaW1hZ2VzW2pdO1xuICAgICAgICAgICAgdmFyIGltZ1VybCA9IHNlbGYuaW1hZ2VVcmwgKyBjb250YWluZXJpbWFnZS5pbWFnZW5hbWU7XG5cbiAgICAgICAgICAgIHZhciBvYmpJbWFnZSA9IHtcbiAgICAgICAgICAgICAgICBocmVmOiBpbWdVcmxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmYW5jeUFycmF5LnB1c2gob2JqSW1hZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgJC5mYW5jeWJveC5vcGVuKGZhbmN5QXJyYXksIHtcbiAgICAgICAgICAgIGF1dG9TaXplOiB0cnVlLFxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgcHJldkVmZmVjdDogJ25vbmUnLFxuICAgICAgICAgICAgbmV4dEVmZmVjdDogJ25vbmUnLFxuICAgICAgICAgICAgaGVscGVyczoge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRodW1iczoge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzUsXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnV0dG9uczoge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19
