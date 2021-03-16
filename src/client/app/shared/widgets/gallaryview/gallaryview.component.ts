
import {Component, OnInit, NgZone, Input, Output, ElementRef,
    EventEmitter, Renderer, OnChanges, SimpleChange, ChangeDetectorRef, ViewChild}
from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { User,Viewfoo,Container  } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

import {PaginationComponent} from '../../pagination/pagination.component';
import myGlobals = require('../../../globals');

@Component({
    moduleId: module.id,
    selector: 'gallaryview',
    templateUrl: 'gallaryview.component.html',
    directives: [PaginationComponent, REACTIVE_FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class GallaryViewComponent implements OnInit {


    //@ViewChild('imgblock') imgblock: ElementRef;

    @Input() public container: any = {};
    @Input() public currentViewfoo: any = {};

    //@Output() private onContainerDelete: EventEmitter<string> = new EventEmitter();
    //@Output() private onContainerUpdate: EventEmitter<string> = new EventEmitter();
    //@Output() private onContainerImageClick: EventEmitter<string> = new EventEmitter();
    @Output() private changeComment: EventEmitter<Container> = new EventEmitter();
    @Output() private changeShare: EventEmitter<Container> = new EventEmitter();

    loginUser: User;

    viewfooid: string;
    containerid: string;

    lipercentage: string;
    liheight: string;

    currContainerImage: any;
    currViewfooComment: Viewfoo = {};
    isModelCommentHiddenRegistered: boolean = false;

    imageUrl: string = myGlobals.imageUrl + '/upload/gallery/';

    item: any;
    myDropzone: any;

    dZone: any;

    zone: NgZone;

    constructor(zone: NgZone, private _changeDetectionRef: ChangeDetectorRef,
        public elementRef: ElementRef,
        private authService: AuthService) {
        this.zone = zone;

        this.loginUser = myGlobals.LoginUser;

        //this.container.itemsPerPage = 0;
        //console.log("GallaryComponent constructor");
        //console.log(this.elementRef.nativeElement);
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        var self = this;
        setTimeout(function() {
            self.initContainerForDropzone();
        }, 1000)
        //this.initContainerForDropzone();
        //this._changeDetectionRef.detectChanges();
    }
    commentImage(containerimage: any){
        this.changeComment.emit(containerimage);
    }
    shareImage(containerimage: any){
        this.changeShare.emit(containerimage);
    }
    updatePagingBasedonHW() {

		var rows = this.container.containerrows;
		var cols = this.container.containercols;

		this.lipercentage = (100 / cols) + "%";

        var heightSizeY: any;
        if(this.currentViewfoo.imageinfoframe == 'true') {
            heightSizeY = 68 * this.container.ngGridItemOptions.sizey
        } else {
            heightSizeY = 98 * this.container.ngGridItemOptions.sizey
        }

        heightSizeY = heightSizeY - 63;

        this.liheight = (heightSizeY / rows) + "px";

		var perpage = rows * cols;

		this.container.itemsPerPage = perpage;
		this.copyArrayFromTotalToDisplay();

		console.log("GallaryViewComponent ngGridItemEvent");
		console.log(rows + "  " + cols);
		console.log("perpage  " + perpage);

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


        this.copyArrayFromTotalToDisplay();

        //this.creatingDropzoneInstances();
    }

    currentPageChanged(event: any, container: any) {

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

        container.dispImageArray.splice(0, container.dispImageArray.length);
        for (var i = start; i < end; i++) {
            if (container.containerimages.length <= i) {
                break;
            }
            container.dispImageArray.push(container.containerimages[i]);
        }

    }

    onClickImage(containerimage: any) {

        containerimage.isclicked = !containerimage.isclicked;
        if(this.currContainerImage && this.currContainerImage != containerimage) {
            this.currContainerImage.isclicked = false;
        }
        this.currContainerImage = containerimage;
    }

    onClickPreview(index: number) {
        var self = this;
        var imgLength = self.container.containerimages.length;

        var fancyArray: any = [];
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
                //                thumbs: {
                //                    width: 75,
                //                    height: 50
                //                }
                buttons: {}
            }
        });
    }




}
