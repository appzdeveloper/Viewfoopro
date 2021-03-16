
import {Component, OnInit, NgZone, Input, Output, ElementRef,
    EventEmitter, Renderer, OnChanges, SimpleChange, ChangeDetectorRef, ViewChild}
from '@angular/core';
import {CORE_DIRECTIVES,NgIf} from '@angular/common';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { User } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { Viewfoo } from '../../interfaces';
import { Container } from '../../interfaces';
import {PaginationComponent} from '../../pagination/pagination.component';
import myGlobals = require('../../../globals');

@Component({
    moduleId: module.id,
    selector: 'carouselview',
    templateUrl: 'carouselview.component.html',
    directives: [PaginationComponent, REACTIVE_FORM_DIRECTIVES, CORE_DIRECTIVES,NgIf]
})
export class CarouselViewComponent implements OnInit {

    //@ViewChild('imgblock') imgblock: ElementRef;

    @Input() public container: any;
    @Input() public currentViewfoo: any = {};


    //@Output() private onContainerDelete: EventEmitter<string> = new EventEmitter();
    //@Output() private onContainerUpdate: EventEmitter<string> = new EventEmitter();
    //@Output() private onContainerImageClick: EventEmitter<string> = new EventEmitter();
    @Output() private changeComment: EventEmitter<Container> = new EventEmitter();
    @Output() private changeShare: EventEmitter<Container> = new EventEmitter();

    loginUser: User;

    viewfooid: string;
    containerid: string;

    currContainerImage: any;
    containertype:string;
    serviceUrl: string = myGlobals.serviceUrl;
    imageUrl: string = myGlobals.imageUrl + '/upload/gallery/';

    containerimage: any;

    constructor(private _changeDetectionRef: ChangeDetectorRef,
        public elementRef: ElementRef,
        private authService: AuthService) {

        this.loginUser = myGlobals.LoginUser;
    }

    ngOnInit() {
        if(!this.container.containerimages) {
            this.container.containerimages = [];
        }
     
    }

    ngAfterViewInit() {
        this.initContainerForDropzone();
        var self = this;
//        setTimeout(function(){
//            self.initContainerForDropzone();
//        },1000)
         this._changeDetectionRef.detectChanges();
    }

    commentImage(containerimage: any){
        this.changeComment.emit(containerimage);
    }
    shareImage(containerimage: any){
        this.changeShare.emit(containerimage);
    }

    initContainerForDropzone() {
        var self = this;
        var container = this.container;
        this.containertype = container.containertype;
        container.opacity = 1;
        container.dispImageArray = [];

        container.itemsPerPage = 1;
        //this.updatePagingBasedonHW();

        container.currentPage = 1;
        container.gotoLastPage = false;

        //[].slice === Array.prototype.slice;
        var totalImageArray : any = [];

        for (var j = 0; j < container.containerimages.length; j++) {
            totalImageArray.push(container.containerimages[j]);
        }

        container.totalImageArray = totalImageArray;

        this.copyArrayFromTotalToDisplay();

       // this.creatingDropzoneInstances();
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


        this.containerimage = container.totalImageArray[(container.currentPage-1)];
        console.log(this.containerimage);
    }

    previousPage(event: any, container: any){
        var self=this;
        var container = this.container;
        //this.containerimage = container.totalImageArray[(container.currentPage-2)];

        this.container.currentPage1 = container.currentPage-1;
        console.log(this.containerimage);
        //this.currentPageChanged(event, container);
      //  this.numberOfPages(totalPages: any, container: any)

    }
    nextPage(event: any, container: any){
        //alert("Hello");
        var self=this;
        var container = this.container;
        //this.containerimage = container.totalImageArray[(container.currentPage)];

        this.container.currentPage1 = container.currentPage+1;
        console.log("nextPage > "+this.container.currentPage1);
        console.log(this.containerimage);
        //this.currentPageChanged(event, container);
      //  this.numberOfPages(totalPages: any, container: any)

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

        var fancyArray : any = [];
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
