
import {Component, OnInit, NgZone, Input, Output, ElementRef,
    EventEmitter, Renderer, OnChanges, SimpleChange, ChangeDetectorRef, ViewChild}
from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { User } from '../../shared/interfaces';
import { AuthService } from '../../shared/services/auth.service';
import { Viewfoo } from '../../shared/interfaces';
import { Container } from '../../shared/interfaces';
import {PaginationComponent} from '../../shared/pagination/pagination.component';
import myGlobals = require('../../globals');

@Component({
    moduleId: module.id,
    selector: 'gallarysingle',
    templateUrl: 'gallary.component.html',
    directives: [PaginationComponent, REACTIVE_FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class GallaryComponent implements OnInit, OnChanges {

    public containertype: string;

    @ViewChild('imgblock') imgblock: ElementRef;

    @Input() public container: any;
    @Input() public currentViewfoo: any;

    @Input() public get ngGridItemEvent() {
        return this._ngGridItemEvent;
    }

    public set ngGridItemEvent(v: any) {
        var self = this;
        if (v) {
            this._ngGridItemEvent = v;
            setTimeout(function() {
                self.updatePagingBasedonHW();
            }, 1000);

        }
        //console.log("GallaryComponent ngGridItemEvent changed");
        //console.log(v);

        //this.totalPages = this.calculateTotalPages();
    }

    @Output() private onContainerDelete: EventEmitter<string> = new EventEmitter();
    @Output() private onContainerUpdate: EventEmitter<string> = new EventEmitter();
    //@Output() private onContainerImageClick: EventEmitter<string> = new EventEmitter();

    loginUser: User;

    viewfooid: string;
    containerid: string;
    imageUrl: string = myGlobals.imageUrl + "/upload/gallery/";
    item: any;
    myDropzone: any;

    dZone: any;

    zone: NgZone;

    constructor(zone: NgZone, private _changeDetectionRef: ChangeDetectorRef,
        public elementRef: ElementRef,
        private authService: AuthService) {
        this.zone = zone;

        this.loginUser = myGlobals.LoginUser;

        //console.log("GallaryComponent constructor");
        //console.log(this.elementRef.nativeElement);
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.initContainerForDropzone();
        this._changeDetectionRef.detectChanges();
    }

    updatePagingBasedonHW() {
        if (this.imgblock) {

            // var height = this.imgblock.nativeElement.clientHeight - 65;
            // var width = this.imgblock.nativeElement.clientWidth;

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
    		}

			this.authService.containerUpdate(containerupdateDict)
				.subscribe((result) => {

					if (result) {
						console.log(result);
					}
				}, (error: any) => {
					this.errorMsg = error;
					this.loading = false;
					console.log("Container update fail: " + error);
				});


            this.container.itemsPerPage = perpage;
            this.copyArrayFromTotalToDisplay();
            console.log("GallaryComponent ngGridItemEvent");
            console.log(height + "  " + width);
            console.log(rows + "  " + cols);
            console.log("perpage  " + perpage);
        }
    }

    //ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    //console.log("Gallary on prop changes");
    //        let log: string[] = [];
    //var self = this;
    //for (let propName in changes) {
    //console.log("ngOnChanges "+propName);
    //if(propName == "totalItems") {
    //this.inited = true;
    //this.page =
    //}
    //            let changedProp = changes[propName];
    //            let from = JSON.stringify(changedProp.previousValue);
    //            let to = JSON.stringify(changedProp.currentValue);
    //            log.push(`${propName} changed from ${from} to ${to}`);
    //}
    //        this.changeLog.push(log.join(', '));
    //console.log("ngOnChanges");
    //}

    initContainerForDropzone() {
        var self = this;
        var container = this.container;

        container.opacity = 1;
        container.dispImageArray = [];

        //container.itemsPerPage = 1;
        this.updatePagingBasedonHW();

        container.currentPage = 1;
        container.gotoLastPage = false;

        //[].slice === Array.prototype.slice;
        var totalImageArray = [];
        let blankImageCount = container.itemsPerPage;

        for (var j = 0; j < blankImageCount; j++) {
            var containerImage = self.crateBlankImage();
            totalImageArray.push(containerImage);

        }

        container.totalImageArray = totalImageArray;


        this.copyArrayFromTotalToDisplay();

        this.creatingDropzoneInstances();
    }

    currentPageChanged(event: any, container: any) {
        //        console.log("currentPageChanged > ");
        //        console.log(event.page);
        //        console.log(container.totalImageArray.length);

        container.currentPage = event.page;

        this.copyArrayFromTotalToDisplay();

    }

    numberOfPages(totalPages: any, container: any) {
        //console.log("numberOfPages > ");
        //console.log(event);

        container.totalPages = totalPages;
    }

    copyArrayFromTotalToDisplay() {
        var self = this;
        var container = this.container;

        var start = ((container.currentPage - 1) * container.itemsPerPage);
        var end = start + container.itemsPerPage;
        //container.dispImageArray = container.totalImageArray.slice(start, end);
        //var dispImageArray = [];
        container.dispImageArray.splice(0, container.dispImageArray.length);
        for (var i = start; i < end; i++) {
            if (container.totalImageArray.length <= i) {
                container.totalImageArray.push(self.crateBlankImage());
            }
			//            if (!container.totalImageArray[i]) {
			//                container.totalImageArray.push(self.crateBlankImage());
			//            }
            container.dispImageArray.push(container.totalImageArray[i]);
            //dispImageArray.push(container.totalImageArray[i]);
        }
        //self.zone.run(() => {
        //container.dispImageArray.push(dispImageArray);
        //});
        //console.log("copyArrayFromTotalToDisplay start = " + start + " totalElement: " + container.itemsPerPage);
        //console.log(container.totalImageArray);
        //console.log(container.dispImageArray);
    }

    crateBlankImage() {
        var containerImage: ContainerImage = {
            id: "",
            imagename: "img/build_viewfoo/pic1.png",
            isBlankImage: true,
            isCompleted: false,
            progress: "0%"
        }
        return containerImage;
    }

    creatingDropzoneInstances() {
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
            //clickable: '#upload-image,.myDropzone,.upload-files',
            //previewTemplate: previewTemplate,
			//            thumbnailWidth: 860,
			//            thumbnailHeight: 450,
            thumbnailWidth: 256,
            thumbnailHeight: 256,
            parallelUploads: 1,
            //previewsContainer: ".displayImageBlock",
            init: function() {
                var container = self.container;
                //console.log("called init " + this.options.containerid);
                //--- crateBlankImg(this.options.containerid, 0);
                this.index = 0;
                this.on("complete", function(file) {

                    container.totalImageArray[file.index].isCompleted = true;

                    if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {

                    }
                });
                this.on("addedfile", function(file, arg1, arg2) {
                    //console.log("addedfile event");
                    //console.log(file);

                    file.index = this.index++;


                    self.zone.run(() => {
                        //                        if (!file.containerimageid) {
                        //                            container.gotoLastPage = true;
                        //                        }
                        if (!container.totalImageArray[file.index]) {
                            container.totalImageArray.push(self.crateBlankImage());

                        }
                        if (!container.containerimages[file.index]) {
                            container.containerimages.push({});
                        }
                        container.totalImageArray[file.index].isBlankImage = false;
                        container.opacity = 0;


                        //self.copyArrayFromTotalToDisplay(container);
                    });

                });
                this.on("uploadprogress", function(file, progress, bytesSent) {

                    self.zone.run(() => {
                        container.totalImageArray[file.index].progress = progress + "%";
                    });

                    //console.log("dropzone event uploadprogress : " + progress + "fileindex > " + file.index);
                });
                this.on("sending", function(file, xhr, data) {
                    //var cid = file.containerid;
                    //--- $("#preview_" + cid + ">.blankli").remove();
                });
                this.on("removedfile", function(file) {
                    //console.log("removedfile", file.containerimageid);
                    //                    var cid = this.options.containerid;
                    //                    var containerimageid = file.containerimageid''
                    //                    var numDiv = $("#preview_" + cid + ">.displayImage").length;
                    //
                    //                    self.authService.containerImageDelete(containerimageid)
                    //                        .subscribe((result) => {
                    //                            console.log(result);
                    //
                    //                            crateBlankImg(cid, numDiv);
                    //                        }, (error: any) => {
                    //                            this.errorMsg = error;
                    //                            console.log("Containerimage delete fail: " + error);
                    //                        });

                });
                this.on("queuecomplete", function() {
                    //console.log("dropzone event queuecomplete");
                });
                this.on("thumbnail", function(file, thumbnail) {
                    //console.log("dropzone event thumbnail");

                    container.totalImageArray[file.index].imagename = thumbnail;
                    //self.zone.run(() => {
                    //container.totalImageArray[file.index].imagename = thumbnail;
                    //});
                    //var numDiv = $("#preview_" + cid + ">.displayImage").length;
                    //console.log("displayImageLength > " + numDiv);
                    //console.log(container.totalImageArray[file.index]);
                    //--- crateBlankImg(cid, numDiv);
                });
                this.on("success", function(file, res, e) {

                    if (res) {
                        //console.log(responseText);
                        //var res = JSON.parse(responseText);
                        var img = res.data.image;

                        container.containerimages[file.index] = img;

                        file.containerimageid = img.id;
                        file.containerid = img.containerid;
                        //console.log("success > " + file.containerimageid);

                        container.totalImageArray[file.index].id = img.id;
                        container.totalImageArray[file.index].containerid = img.containerid;
                    } else {

                        container.totalImageArray[file.index].id = file.containerimageid;
                        container.totalImageArray[file.index].containerid = file.containerid;
                    }
                });
            }
        }

        //setTimeout(function() {
        //console.log("setTimeout > ");
        //console.log(self.currentViewfoo);
        //for (var i = 0; i < self.currentViewfoo.containers.length; i++) {
        //  var container = self.currentViewfoo.containers[i];


        self.dZone = self.createDropZone(container);

        //                if (!container.containerimages) {
        //                    continue;
        //                }
        let containerImageLength = container.containerimages.length;


        for (var j = 0; j < containerImageLength; j++) {
            var containerimage = container.containerimages[j];

            var imgUrl = self.imageUrl + containerimage.imagename;
            //console.log(imgUrl);

            var mockFile = {
                name: imgUrl,
                //size: fileSize,
                //type: fileMimeType,
                containerimageid: containerimage.id,
                containerid: container.id,
                accepted: true
                //status: Dropzone.SUCCESS
            }; // use actual id server uses to identify the file (e.g. DB unique identifier)

            self.dZone.emit("addedfile", mockFile);
            self.dZone.createThumbnailFromUrl(mockFile, imgUrl, null, "Anonymous");
            self.dZone.emit("success", mockFile);
            self.dZone.emit("complete", mockFile);

            self.dZone.files.push(mockFile);
        }
        //}, 1000);


        container.gotoLastPage = true;
    }

    createDropZone(container) {
        var self = this;

        self.myDropzone.containerid = container.id;
        //self.myDropzone.previewsContainer = "#preview_" + container.id;
        self.myDropzone.previewsContainer = false;
        self.myDropzone.clickable = "#upload_image_" + container.id + ",#dzph_" + container.id;
        var dZone = new Dropzone("#form_" + container.id, self.myDropzone);

        //self.currentViewfoo.mapDropzone[container.id] = dZone;
        return dZone;
    }

    containerImageDelete(containerid: string, containerimageid: string, index: number) {
        var self = this;
        var container = this.container;

        var actualIndex = ((container.currentPage - 1) * container.itemsPerPage) + index;
        var containerImage = container.totalImageArray[actualIndex];
        containerImage.deleting = true;

        self.authService.containerImageDelete(containerimageid)
            .subscribe((result) => {
                //console.log(result);

                containerImage.deleted = true;

                container.totalImageArray.splice(actualIndex, 1);
                container.containerimages.splice(actualIndex, 1);
                //var containerImage = self.crateBlankImage();
                //self.currentViewfoo.mapContainer[containerid].totalImageArray.push(containerImage);
                self.dZone.index--;
                //self.copyArrayFromTotalToDisplay(container);
                setTimeout(function() {
                    self.copyArrayFromTotalToDisplay(container);
                }, 1000);
                if (self.container.containerimages.length == 0) {
                    self.container.opacity = 1;
                }


            }, (error: any) => {
                this.errorMsg = error;
                //console.log("Containerimage delete fail: " + error);
            });
    }

    onDeleteContainer() {
        this.container.deleting = true;
        this.onContainerDelete.emit(this.container.id);
    }

    onUpdateContainer(val) {
        this.item = { title: val, id: this.container.id };

        this.onContainerUpdate.emit(this.item);
    }

    onClickPreview(index: number) {
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
                //                thumbs: {
                //                    width: 75,
                //                    height: 50
                //                }
                buttons: {}
            }
        });
    }
}
