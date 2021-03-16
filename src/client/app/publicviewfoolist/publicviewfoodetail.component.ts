import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

import myGlobals = require('../globals');

import { Viewfoo, Folder, Container } from '../shared/interfaces';

import { MapToIterable } from '../shared/pipes/mapToIterable';

import { GallaryViewComponent } from '../shared/widgets/gallaryview/gallaryview.component';

import { CarouselViewComponent } from '../shared/widgets/carouselview/carouselview.component';
import { CommentModalComponent } from '../shared/widgets/commentmodal/commentmodal.component';
import { ShareModalComponent } from '../shared/widgets/sharemodal/sharemodal.component';

@Component({
  moduleId: module.id,
  selector: 'publicviewfoodetail',
  templateUrl: 'publicviewfoodetail.component.html',
  pipes: [MapToIterable],
  directives: [ROUTER_DIRECTIVES, GallaryViewComponent, CarouselViewComponent, CommentModalComponent,ShareModalComponent]
})
export class PublicViewfooDetailComponent implements OnInit {

  subdomain: string;
  viewfooid: string;
  currentViewfoo: any = {};
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

  isSingleViewfoo: boolean = false;
  isDashboard: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {

    console.log("PublicViewfooDetailComponent constructor");
    // authService.publicViewfooChanged$.subscribe(
    //     item => {
    //         //console.log("PublicViewfooListComponent publicViewfooChanged "+JSON.stringify(item));
    //         if (item.action == "publichomepagesetting") {
    //             this.userhomesettings = item.data;
    //
    //
    //         } else if (item.action == "onFolderClick") {
    //
    //         }
    //         //this.refreshImage(item);
    //     });

    // this.getPublicViewfoolist();
  }

  ngOnInit() {
    if (this.route.url.value[0].path == "singleviewfoo") {
      this.isSingleViewfoo = true;
    }

    if (this.route.url.value[0].path == "viewfoodetail") {
      this.isDashboard = true;
      //alert("dashboard");
    }

    this.sub = this.route.params.subscribe(params => {
      this.viewfooid = params['viewfooid'];
      this.getPublicViewfooDetail();
    });

    if (!this.isSingleViewfoo) {
      this.sub = this.router.routerState.parent(this.route).params.subscribe(params => {
        this.subdomain = params['subdomain'];

        this.getUserHomepageSettings();
      });
    }
  }

  getUserHomepageSettings() {
    this.authService.userpublichomesettings(this.subdomain)
      .subscribe((result: any) => {

        // this.authService.publicViewfooChangeSource.next({
        //     action: "publichomepagesetting",
        //     data: result.data
        // });

        this.userhomesettings = result.data;

        if (this.userhomesettings.disablerightmousebtn == 'true') {
          // document.onmousedown = function(event) {
          //     var status="Right Click Disabled";
          //     if (event.button == 2) {
          // 		alert(status);
          // 		return false;
          // 	}
          // };
        }

      }, (error: any) => {
        console.log("public homepage setting fail: " + error);
      });
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


          for(var ci=0; ci < container.containerimages.length; ci++) {
              var objCI: any = container.containerimages[ci];

              if(objCI.imagename) {
                  objCI.imagename = this.imageUrl+"/"+objCI.imagename;
              }
              if(objCI.thumbimagename) {
                  objCI.thumbimagename = this.imageUrl+"/"+objCI.thumbimagename;
              }
          }

        }
        this.viewfooloading = false;
        this.currentViewfoo = result.data;


      }, (error: any) => {
        this.viewfooloading = false;
        console.log("viewfoo list fail: " + error);
      });
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
