
import {Component, OnInit, NgZone} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

import {CORE_DIRECTIVES} from '@angular/common';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { GallaryViewComponent } from '../shared/widgets/gallaryview/gallaryview.component';

import { CarouselViewComponent } from '../shared/widgets/carouselview/carouselview.component';

import { User } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { Viewfoo } from '../shared/interfaces';
import { Container } from '../shared/interfaces';
import {PaginationComponent} from '../shared/pagination/pagination.component';
import myGlobals = require('../globals');
import { SubstrPipe } from '../shared/pipes/substr.pipe';
import { Sub_SubstrPipe } from '../shared/pipes/sub_substr.pipe';
import { CommentModalComponent } from '../shared/widgets/commentmodal/commentmodal.component';
import { ShareModalComponent } from '../shared/widgets/sharemodal/sharemodal.component';


@Component({
    moduleId: module.id,
    selector: 'viewfoodetail',
    templateUrl: 'viewfoodetail.component.html',
    pipes: [SubstrPipe, Sub_SubstrPipe],
    directives: [ROUTER_DIRECTIVES, PaginationComponent,
        REACTIVE_FORM_DIRECTIVES, CORE_DIRECTIVES, GallaryViewComponent,CarouselViewComponent, CommentModalComponent,ShareModalComponent]
})
export class ViewfooDetailComponent implements OnInit {

    public msg: string;
    loginUser: User;
   
    public imagesize: string;
    public imagedefaultno: string;

    loading: boolean = false;

    currentViewfoo: Viewfoo = {};

    viewfooid: string;
   
    serviceUrl: string = myGlobals.serviceUrl;

    publicfolder: viewfoo = [];
    
    publicFolderForSelect: any;
    privateFolderForSelect: any;

    zone: NgZone;
    
    subdomain: string;
    
    
    viewfooloading: boolean = false;
    currViewfooComment: Viewfoo = {};
    containersSorted: any;
    currViewfooImageShare:Container = {};
    currViewfooShare:Viewfoo = {};

    isModelCommentHiddenRegistered: boolean = false;
    imageUrl: string = myGlobals.imageUrl + '/upload/gallery';
    viewfoocommenttype: string;
    public userhomesettings: any = {};
    currViewfooImage: Container = {};
    sub: any;

    arrayRows: any = [];
    arrayRowsHeight: any = [];

    constructor(private route: ActivatedRoute,
        private router: Router, zone: NgZone, private authService: AuthService) {
        this.zone = zone;
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            console.log("Viewfoo Detail");
            this.viewfooid = params['viewfooid'];

            this.loginUser = myGlobals.LoginUser;


            this.authService.viewfooDetail(this.viewfooid)
                .subscribe((result) => {

                    this.loading = false;

                    for (var i = 0; i < result.data.containers.length; i++) {
                        var container = result.data.containers[i];
                        // grid-item-img
                        container.colclass = "col-md-"+container.ngGridItemOptions.sizex+"  ";
                        container.rowheight = 98*container.ngGridItemOptions.sizey;
                        container.leftPosition = 68*(container.ngGridItemOptions.col-1);
//                        container.leftPosition = 68*(container.ngGridItemOptions.col-1);
//                        console.log('postion:'+container.ngGridItemOptions.col);

                        //col
                        //row
                        //sizex
                        //sizey
                        //console.log(container.ngGridItemOptions);
                        console.log(container.rowheight);
                    }

                    this.currentViewfoo = result.data;
                     this.checkselfdestruct(this.currentViewfoo);
                     myGlobals.currentViewfoo = this.currentViewfoo;

                }, (error: any) => {
                    this.errorMsg = error;
                    this.loading = false;

                });
        });
    }

    ngOnInit() {
        this.creatingOrFetchingViewfoo();
        this.getfolderlist();
        $(".CBimagesize").change(function() {
            var checked = $(this).is(':checked');
            $(".CBimagesize").prop('checked', false);
            if (checked) {
                $(this).prop('checked', true);

                this.imagesize = this.value;

            }
        });
        $("[data-toggle]").click(function() {
            var toggle_el = $(this).data("toggle");
            $(toggle_el).toggleClass("open-sidebar");
        });
    }
    ngAfterViewInit() {

    }
    deleteviewfoo() {
        this.currentViewfoo.deleting = true;
        this.authService.viewfoodelete(this.currentViewfoo.id)
            .subscribe((result) => {

            this.getPublicViewfooDetail();
        }
    }


  getPublicViewfooDetail() {
      
    console.log("publicviewfoodetail getPublicViewfooDetail viewfooid: "
      + this.viewfooid);
    this.viewfooloading = true;
    this.authService.viewfooDetail(this.viewfooid)
      .subscribe((result: any) => {

        var cols: any = {};
        var colCount = 0;
        console.log("total container : " + result.data.containers.length);

        var maxheight = 0;
        var maxheightImageC = 0;
        var previousRow = 0;
        var currentRow = 0;

        var rows: any = {}
        this.arrayRows = [];
        this.arrayRowsHeight = [];

        var containers = result.data.containers;

        for (var i = 0; i < containers.length; i++) {
          var container = containers[i];
          var ngGridItemOptionsRow = container.ngGridItemOptions.row;
          var ngGridItemOptionsCol = container.ngGridItemOptions.col;
          if (!rows.hasOwnProperty(ngGridItemOptionsRow)) {
            rows[ngGridItemOptionsRow] = {};
          }
          rows[ngGridItemOptionsRow][ngGridItemOptionsCol] = container;
        }
        console.log(rows);

        this.containersSorted = [];
        for (var rowkey in rows) {
          var colArray = rows[rowkey];
          for (var colkey in colArray) {
            this.containersSorted.push(colArray[colkey]);
          }
        }


        for (var i = 0; i < this.containersSorted.length; i++) {
          var container = this.containersSorted[i];
          container.imagedefaultno = parseInt(result.data.imagedefaultno);


          container.colclass = "col-md-" + container.ngGridItemOptions.sizex + "  ";
          //container.rowheight = 150 * container.containerrows + 63;
          //container.leftPosition = 68 * (container.ngGridItemOptions.col - 1);
          if (result.data.imageinfoframe == 'true') {
            container.heightSizeY = 68 * container.ngGridItemOptions.sizey;
          } else {
            container.heightSizeY = 98 * container.ngGridItemOptions.sizey;
          }
        }
        this.viewfooloading = false;
        this.currentViewfoo = result.data;
        return;


        for (var i = 0; i < result.data.containers.length; i++) {

          var container = result.data.containers[i];


    }
    checkselfdestruct(vf) {
        alert(vf.id);
        if (vf.isselfdestructdate === "true") {

            var target_date = new Date(vf.selfdestructdate).getTime();

            var days, hours, minutes, seconds;
            var countdown = document.getElementById('countdown');

            setInterval(function() {
                // find the amount of "seconds" between now and target
                var current_date = new Date().getTime();

                var seconds_left = (target_date - current_date) / 1000;
                // do some time calculations
                days = parseInt(seconds_left / 86400);
                seconds_left = seconds_left % 86400;

                hours = parseInt(seconds_left / 3600);
                seconds_left = seconds_left % 3600;

                minutes = parseInt(seconds_left / 60);
                seconds = parseInt(seconds_left % 60);

                // format countdown string + set tag value
                document.getElementById('countdown').innerHTML = '<span class="days">' + days + ' <b>Days</b></span> <span class="hours">' + hours + ' <b>Hours</b></span> <span class="minutes">'
                    + minutes + ' <b>Minutes</b></span> <span class="seconds">' + seconds + ' <b>Seconds</b></span>';

            }, 2000);
        }
    }

    getfolderlist() {

          cols[container.ngGridItemOptions.col] = container;
          colCount = colCount + container.ngGridItemOptions.sizex;


          //console.log("colCount > "+colCount);
          //console.log("container.ngGridItemOptions.col > "+container.ngGridItemOptions.col);

          // grid-item-img
          container.colclass = "col-md-" + container.ngGridItemOptions.sizex + "  ";

          container.rowheight = 150 * container.containerrows + 63;
          container.leftPosition = 68 * (container.ngGridItemOptions.col - 1);

          var height = 150 * container.containerrows + 63;
          if (maxheight < height) {
            maxheight = height;
          }

          var heightImageC = 98 * container.ngGridItemOptions.sizey;
          if (maxheightImageC < heightImageC) {
            maxheightImageC = heightImageC;
          }

          previousRow = currentRow;
          currentRow = container.ngGridItemOptions.row;


          if (currentRow != previousRow) {

            //console.log(JSON.stringify(cols));

            var arrCol: any = [];
            for (var key in cols) {
              if (cols.hasOwnProperty(key)) {
                arrCol.push(cols[key]);
              }
            }
            this.arrayRows.push(arrCol);

            if (maxheight == 0) {
              maxheight = maxheightImageC;
            }
            this.arrayRowsHeight.push(maxheight);

            cols = {};
            colCount = 0;

            if (i == result.data.containers.length) {
              break;
            }
          }
          //cols.push(container);
        }


        //this.arrayRows.push(cols);
        //this.currentViewfoo = result.data;

        this.viewfooloading = false;
        this.currentViewfoo = result.data;

      }, (error: any) => {
        this.viewfooloading = false;
        console.log("viewfoo list fail: " + error);
      });
  }

    ngAfterViewInit() {

    }

   onViewfooComment(vfl: Viewfoo) {
    //alert(vct);
    this.currViewfooComment = vfl;
    this.currViewfooImage = {};
    $('#commentphoto_modal').modal('show');
    if (!this.isModelCommentHiddenRegistered) {
      this.isModelCommentHiddenRegistered = true;
      $('#commentphoto_modal').on('hidden.bs.modal', function(e) {
        this.currViewfooComment = {};
        this.currViewfooImage = {};

      });
    }
  }
  onImageComment(containerimage: Container) {
    this.currViewfooImage = containerimage;
    this.currViewfooComment = {};
    $('#commentphoto_modal').modal('show');
    if (!this.isModelCommentHiddenRegistered) {
      this.isModelCommentHiddenRegistered = true;
      $('#commentphoto_modal').on('hidden.bs.modal', function(e) {
        this.currViewfooComment = {};
        this.currViewfooImage = {};
      });
    }
  }
  
  onViewfooShare(vfl: Viewfoo) {
    this.currViewfooShare = vfl;
    this.currViewfooImageShare = {};
    $('#SelectPhotoModal').modal('show');
    if (!this.isModelShareHiddenRegistered) {
      this.isModelShareHiddenRegistered = true;
      $('#SelectPhotoModal').on('hidden.bs.modal', function(e) {
        this.currViewfooShare = {};
        this.currViewfooImageShare = {};

      });
    }
  }
  onImageShare(containerimage: Container) {
      this.currViewfooImageShare = containerimage;
      this.currViewfooShare = {};
      $('#SelectPhotoModal').modal('show');
      if (!this.isModelCommentHiddenRegistered) {
          this.isModelCommentHiddenRegistered = true;
          $('#SelectPhotoModal').on('hidden.bs.modal', function(e) {
              this.currViewfooShare = {};
              this.currViewfooImageShare = {};
          });
      }  
  }
}
