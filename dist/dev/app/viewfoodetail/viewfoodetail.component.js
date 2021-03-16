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
var router_1 = require('@angular/router');
var router_2 = require('@angular/router');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var gallaryview_component_1 = require('../shared/widgets/gallaryview/gallaryview.component');
var carouselview_component_1 = require('../shared/widgets/carouselview/carouselview.component');
var auth_service_1 = require('../shared/services/auth.service');
var pagination_component_1 = require('../shared/pagination/pagination.component');
var myGlobals = require('../globals');
var substr_pipe_1 = require('../shared/pipes/substr.pipe');
var sub_substr_pipe_1 = require('../shared/pipes/sub_substr.pipe');
var commentmodal_component_1 = require('../shared/widgets/commentmodal/commentmodal.component');
var sharemodal_component_1 = require('../shared/widgets/sharemodal/sharemodal.component');
var ViewfooDetailComponent = (function () {
    function ViewfooDetailComponent(route, router, zone, authService) {
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.loading = false;
        this.currentViewfoo = {};
        this.serviceUrl = myGlobals.serviceUrl;
        this.publicfolder = [];
        this.viewfooloading = false;
        this.currViewfooComment = {};
        this.currViewfooImageShare = {};
        this.currViewfooShare = {};
        this.isModelCommentHiddenRegistered = false;
        this.imageUrl = myGlobals.imageUrl + '/upload/gallery';
        this.userhomesettings = {};
        this.currViewfooImage = {};
        this.arrayRows = [];
        this.arrayRowsHeight = [];
        this.zone = zone;
    }
    ViewfooDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            console.log("Viewfoo Detail");
            _this.viewfooid = params['viewfooid'];
            _this.loginUser = myGlobals.LoginUser;
            _this.authService.viewfooDetail(_this.viewfooid)
                .subscribe(function (result) {
                _this.loading = false;
                for (var i = 0; i < result.data.containers.length; i++) {
                    var container = result.data.containers[i];
                    container.colclass = "col-md-" + container.ngGridItemOptions.sizex + "  ";
                    container.rowheight = 98 * container.ngGridItemOptions.sizey;
                    container.leftPosition = 68 * (container.ngGridItemOptions.col - 1);
                    console.log(container.rowheight);
                }
                _this.currentViewfoo = result.data;
                _this.checkselfdestruct(_this.currentViewfoo);
                myGlobals.currentViewfoo = _this.currentViewfoo;
            }, function (error) {
                _this.errorMsg = error;
                _this.loading = false;
            });
        });
    };
    ViewfooDetailComponent.prototype.ngOnInit = function () {
        this.creatingOrFetchingViewfoo();
        this.getfolderlist();
        $(".CBimagesize").change(function () {
            var checked = $(this).is(':checked');
            $(".CBimagesize").prop('checked', false);
            if (checked) {
                $(this).prop('checked', true);
                this.imagesize = this.value;
            }
        });
        $("[data-toggle]").click(function () {
            var toggle_el = $(this).data("toggle");
            $(toggle_el).toggleClass("open-sidebar");
        });
    };
    ViewfooDetailComponent.prototype.ngAfterViewInit = function () {
    };
    ViewfooDetailComponent.prototype.deleteviewfoo = function () {
        var _this = this;
        this.currentViewfoo.deleting = true;
        this.authService.viewfoodelete(this.currentViewfoo.id)
            .subscribe(function (result) {
            _this.getPublicViewfooDetail();
        });
    };
    ViewfooDetailComponent.prototype.getPublicViewfooDetail = function () {
        var _this = this;
        console.log("publicviewfoodetail getPublicViewfooDetail viewfooid: "
            + this.viewfooid);
        this.viewfooloading = true;
        this.authService.viewfooDetail(this.viewfooid)
            .subscribe(function (result) {
            var cols = {};
            var colCount = 0;
            console.log("total container : " + result.data.containers.length);
            var maxheight = 0;
            var maxheightImageC = 0;
            var previousRow = 0;
            var currentRow = 0;
            var rows = {};
            _this.arrayRows = [];
            _this.arrayRowsHeight = [];
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
            _this.containersSorted = [];
            for (var rowkey in rows) {
                var colArray = rows[rowkey];
                for (var colkey in colArray) {
                    _this.containersSorted.push(colArray[colkey]);
                }
            }
            for (var i = 0; i < _this.containersSorted.length; i++) {
                var container = _this.containersSorted[i];
                container.imagedefaultno = parseInt(result.data.imagedefaultno);
                container.colclass = "col-md-" + container.ngGridItemOptions.sizex + "  ";
                if (result.data.imageinfoframe == 'true') {
                    container.heightSizeY = 68 * container.ngGridItemOptions.sizey;
                }
                else {
                    container.heightSizeY = 98 * container.ngGridItemOptions.sizey;
                }
            }
            _this.viewfooloading = false;
            _this.currentViewfoo = result.data;
            return;
            for (var i = 0; i < result.data.containers.length; i++) {
                var container = result.data.containers[i];
            }
            checkselfdestruct(vf);
            {
                alert(vf.id);
                if (vf.isselfdestructdate === "true") {
                    var target_date = new Date(vf.selfdestructdate).getTime();
                    var days, hours, minutes, seconds;
                    var countdown = document.getElementById('countdown');
                    setInterval(function () {
                        var current_date = new Date().getTime();
                        var seconds_left = (target_date - current_date) / 1000;
                        days = parseInt(seconds_left / 86400);
                        seconds_left = seconds_left % 86400;
                        hours = parseInt(seconds_left / 3600);
                        seconds_left = seconds_left % 3600;
                        minutes = parseInt(seconds_left / 60);
                        seconds = parseInt(seconds_left % 60);
                        document.getElementById('countdown').innerHTML = '<span class="days">' + days + ' <b>Days</b></span> <span class="hours">' + hours + ' <b>Hours</b></span> <span class="minutes">'
                            + minutes + ' <b>Minutes</b></span> <span class="seconds">' + seconds + ' <b>Seconds</b></span>';
                    }, 2000);
                }
            }
            getfolderlist();
            {
                cols[container.ngGridItemOptions.col] = container;
                colCount = colCount + container.ngGridItemOptions.sizex;
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
                    var arrCol = [];
                    for (var key in cols) {
                        if (cols.hasOwnProperty(key)) {
                            arrCol.push(cols[key]);
                        }
                    }
                    _this.arrayRows.push(arrCol);
                    if (maxheight == 0) {
                        maxheight = maxheightImageC;
                    }
                    _this.arrayRowsHeight.push(maxheight);
                    cols = {};
                    colCount = 0;
                    if (i == result.data.containers.length) {
                        break;
                    }
                }
            }
            _this.viewfooloading = false;
            _this.currentViewfoo = result.data;
        }, function (error) {
            _this.viewfooloading = false;
            console.log("viewfoo list fail: " + error);
        });
    };
    ViewfooDetailComponent.prototype.ngAfterViewInit = function () {
    };
    ViewfooDetailComponent.prototype.onViewfooComment = function (vfl) {
        this.currViewfooComment = vfl;
        this.currViewfooImage = {};
        $('#commentphoto_modal').modal('show');
        if (!this.isModelCommentHiddenRegistered) {
            this.isModelCommentHiddenRegistered = true;
            $('#commentphoto_modal').on('hidden.bs.modal', function (e) {
                this.currViewfooComment = {};
                this.currViewfooImage = {};
            });
        }
    };
    ViewfooDetailComponent.prototype.onImageComment = function (containerimage) {
        this.currViewfooImage = containerimage;
        this.currViewfooComment = {};
        $('#commentphoto_modal').modal('show');
        if (!this.isModelCommentHiddenRegistered) {
            this.isModelCommentHiddenRegistered = true;
            $('#commentphoto_modal').on('hidden.bs.modal', function (e) {
                this.currViewfooComment = {};
                this.currViewfooImage = {};
            });
        }
    };
    ViewfooDetailComponent.prototype.onViewfooShare = function (vfl) {
        this.currViewfooShare = vfl;
        this.currViewfooImageShare = {};
        $('#SelectPhotoModal').modal('show');
        if (!this.isModelShareHiddenRegistered) {
            this.isModelShareHiddenRegistered = true;
            $('#SelectPhotoModal').on('hidden.bs.modal', function (e) {
                this.currViewfooShare = {};
                this.currViewfooImageShare = {};
            });
        }
    };
    ViewfooDetailComponent.prototype.onImageShare = function (containerimage) {
        this.currViewfooImageShare = containerimage;
        this.currViewfooShare = {};
        $('#SelectPhotoModal').modal('show');
        if (!this.isModelCommentHiddenRegistered) {
            this.isModelCommentHiddenRegistered = true;
            $('#SelectPhotoModal').on('hidden.bs.modal', function (e) {
                this.currViewfooShare = {};
                this.currViewfooImageShare = {};
            });
        }
    };
    ViewfooDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'viewfoodetail',
            templateUrl: 'viewfoodetail.component.html',
            pipes: [substr_pipe_1.SubstrPipe, sub_substr_pipe_1.Sub_SubstrPipe],
            directives: [router_1.ROUTER_DIRECTIVES, pagination_component_1.PaginationComponent,
                forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, gallaryview_component_1.GallaryViewComponent, carouselview_component_1.CarouselViewComponent, commentmodal_component_1.CommentModalComponent, sharemodal_component_1.ShareModalComponent]
        }), 
        __metadata('design:paramtypes', [router_2.ActivatedRoute, router_1.Router, core_1.NgZone, auth_service_1.AuthService])
    ], ViewfooDetailComponent);
    return ViewfooDetailComponent;
}());
exports.ViewfooDetailComponent = ViewfooDetailComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC92aWV3Zm9vZGV0YWlsL3ZpZXdmb29kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxxQkFBd0MsZUFBZSxDQUFDLENBQUE7QUFDeEQsdUJBQXdDLGlCQUFpQixDQUFDLENBQUE7QUFDMUQsdUJBQXVDLGlCQUFpQixDQUFDLENBQUE7QUFFekQsdUJBQThCLGlCQUFpQixDQUFDLENBQUE7QUFDaEQsc0JBQXlDLGdCQUFnQixDQUFDLENBQUE7QUFFMUQsc0NBQXFDLHFEQUFxRCxDQUFDLENBQUE7QUFFM0YsdUNBQXNDLHVEQUF1RCxDQUFDLENBQUE7QUFHOUYsNkJBQTRCLGlDQUFpQyxDQUFDLENBQUE7QUFHOUQscUNBQWtDLDJDQUEyQyxDQUFDLENBQUE7QUFDOUUsSUFBTyxTQUFTLFdBQVcsWUFBWSxDQUFDLENBQUM7QUFDekMsNEJBQTJCLDZCQUE2QixDQUFDLENBQUE7QUFDekQsZ0NBQStCLGlDQUFpQyxDQUFDLENBQUE7QUFDakUsdUNBQXNDLHVEQUF1RCxDQUFDLENBQUE7QUFDOUYscUNBQW9DLG1EQUFtRCxDQUFDLENBQUE7QUFXeEY7SUEwQ0ksZ0NBQW9CLEtBQXFCLEVBQzdCLE1BQWMsRUFBRSxJQUFZLEVBQVUsV0FBd0I7UUFEdEQsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDN0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUF3QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQW5DMUUsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6QixtQkFBYyxHQUFZLEVBQUUsQ0FBQztRQUk3QixlQUFVLEdBQVcsU0FBUyxDQUFDLFVBQVUsQ0FBQztRQUUxQyxpQkFBWSxHQUFZLEVBQUUsQ0FBQztRQVUzQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyx1QkFBa0IsR0FBWSxFQUFFLENBQUM7UUFFakMsMEJBQXFCLEdBQWEsRUFBRSxDQUFDO1FBQ3JDLHFCQUFnQixHQUFXLEVBQUUsQ0FBQztRQUU5Qixt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LE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsS0FBSyxFQUFFLENBQUMsd0JBQVUsRUFBRSxnQ0FBYyxDQUFDO1lBQ25DLFVBQVUsRUFBRSxDQUFDLDBCQUFpQixFQUFFLDBDQUFtQjtnQkFDL0MsZ0NBQXdCLEVBQUUsd0JBQWUsRUFBRSw0Q0FBb0IsRUFBQyw4Q0FBcUIsRUFBRSw4Q0FBcUIsRUFBQywwQ0FBbUIsQ0FBQztTQUN4SSxDQUFDOzs4QkFBQTtJQTBWRiw2QkFBQztBQUFELENBelZBLEFBeVZDLElBQUE7QUF6VlksOEJBQXNCLHlCQXlWbEMsQ0FBQSIsImZpbGUiOiJhcHAvdmlld2Zvb2RldGFpbC92aWV3Zm9vZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVMsIFJvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQge0NPUkVfRElSRUNUSVZFU30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgR2FsbGFyeVZpZXdDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvd2lkZ2V0cy9nYWxsYXJ5dmlldy9nYWxsYXJ5dmlldy5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBDYXJvdXNlbFZpZXdDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvd2lkZ2V0cy9jYXJvdXNlbHZpZXcvY2Fyb3VzZWx2aWV3LmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld2ZvbyB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7UGFnaW5hdGlvbkNvbXBvbmVudH0gZnJvbSAnLi4vc2hhcmVkL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uL2dsb2JhbHMnKTtcbmltcG9ydCB7IFN1YnN0clBpcGUgfSBmcm9tICcuLi9zaGFyZWQvcGlwZXMvc3Vic3RyLnBpcGUnO1xuaW1wb3J0IHsgU3ViX1N1YnN0clBpcGUgfSBmcm9tICcuLi9zaGFyZWQvcGlwZXMvc3ViX3N1YnN0ci5waXBlJztcbmltcG9ydCB7IENvbW1lbnRNb2RhbENvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC93aWRnZXRzL2NvbW1lbnRtb2RhbC9jb21tZW50bW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IFNoYXJlTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvd2lkZ2V0cy9zaGFyZW1vZGFsL3NoYXJlbW9kYWwuY29tcG9uZW50JztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAndmlld2Zvb2RldGFpbCcsXG4gICAgdGVtcGxhdGVVcmw6ICd2aWV3Zm9vZGV0YWlsLmNvbXBvbmVudC5odG1sJyxcbiAgICBwaXBlczogW1N1YnN0clBpcGUsIFN1Yl9TdWJzdHJQaXBlXSxcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVMsIFBhZ2luYXRpb25Db21wb25lbnQsXG4gICAgICAgIFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUywgQ09SRV9ESVJFQ1RJVkVTLCBHYWxsYXJ5Vmlld0NvbXBvbmVudCxDYXJvdXNlbFZpZXdDb21wb25lbnQsIENvbW1lbnRNb2RhbENvbXBvbmVudCxTaGFyZU1vZGFsQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBWaWV3Zm9vRGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHB1YmxpYyBtc2c6IHN0cmluZztcbiAgICBsb2dpblVzZXI6IFVzZXI7XG4gICBcbiAgICBwdWJsaWMgaW1hZ2VzaXplOiBzdHJpbmc7XG4gICAgcHVibGljIGltYWdlZGVmYXVsdG5vOiBzdHJpbmc7XG5cbiAgICBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjdXJyZW50Vmlld2ZvbzogVmlld2ZvbyA9IHt9O1xuXG4gICAgdmlld2Zvb2lkOiBzdHJpbmc7XG4gICBcbiAgICBzZXJ2aWNlVXJsOiBzdHJpbmcgPSBteUdsb2JhbHMuc2VydmljZVVybDtcblxuICAgIHB1YmxpY2ZvbGRlcjogdmlld2ZvbyA9IFtdO1xuICAgIFxuICAgIHB1YmxpY0ZvbGRlckZvclNlbGVjdDogYW55O1xuICAgIHByaXZhdGVGb2xkZXJGb3JTZWxlY3Q6IGFueTtcblxuICAgIHpvbmU6IE5nWm9uZTtcbiAgICBcbiAgICBzdWJkb21haW46IHN0cmluZztcbiAgICBcbiAgICBcbiAgICB2aWV3Zm9vbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGN1cnJWaWV3Zm9vQ29tbWVudDogVmlld2ZvbyA9IHt9O1xuICAgIGNvbnRhaW5lcnNTb3J0ZWQ6IGFueTtcbiAgICBjdXJyVmlld2Zvb0ltYWdlU2hhcmU6Q29udGFpbmVyID0ge307XG4gICAgY3VyclZpZXdmb29TaGFyZTpWaWV3Zm9vID0ge307XG5cbiAgICBpc01vZGVsQ29tbWVudEhpZGRlblJlZ2lzdGVyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpbWFnZVVybDogc3RyaW5nID0gbXlHbG9iYWxzLmltYWdlVXJsICsgJy91cGxvYWQvZ2FsbGVyeSc7XG4gICAgdmlld2Zvb2NvbW1lbnR0eXBlOiBzdHJpbmc7XG4gICAgcHVibGljIHVzZXJob21lc2V0dGluZ3M6IGFueSA9IHt9O1xuICAgIGN1cnJWaWV3Zm9vSW1hZ2U6IENvbnRhaW5lciA9IHt9O1xuICAgIHN1YjogYW55O1xuXG4gICAgYXJyYXlSb3dzOiBhbnkgPSBbXTtcbiAgICBhcnJheVJvd3NIZWlnaHQ6IGFueSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy56b25lID0gem9uZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmlld2ZvbyBEZXRhaWxcIik7XG4gICAgICAgICAgICB0aGlzLnZpZXdmb29pZCA9IHBhcmFtc1sndmlld2Zvb2lkJ107XG5cbiAgICAgICAgICAgIHRoaXMubG9naW5Vc2VyID0gbXlHbG9iYWxzLkxvZ2luVXNlcjtcblxuXG4gICAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb29EZXRhaWwodGhpcy52aWV3Zm9vaWQpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQuZGF0YS5jb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gcmVzdWx0LmRhdGEuY29udGFpbmVyc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdyaWQtaXRlbS1pbWdcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jb2xjbGFzcyA9IFwiY29sLW1kLVwiK2NvbnRhaW5lci5uZ0dyaWRJdGVtT3B0aW9ucy5zaXpleCtcIiAgXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIucm93aGVpZ2h0ID0gOTgqY29udGFpbmVyLm5nR3JpZEl0ZW1PcHRpb25zLnNpemV5O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmxlZnRQb3NpdGlvbiA9IDY4Kihjb250YWluZXIubmdHcmlkSXRlbU9wdGlvbnMuY29sLTEpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIubGVmdFBvc2l0aW9uID0gNjgqKGNvbnRhaW5lci5uZ0dyaWRJdGVtT3B0aW9ucy5jb2wtMSk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwb3N0aW9uOicrY29udGFpbmVyLm5nR3JpZEl0ZW1PcHRpb25zLmNvbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29sXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Jvd1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zaXpleFxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zaXpleVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjb250YWluZXIubmdHcmlkSXRlbU9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY29udGFpbmVyLnJvd2hlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRWaWV3Zm9vID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrc2VsZmRlc3RydWN0KHRoaXMuY3VycmVudFZpZXdmb28pO1xuICAgICAgICAgICAgICAgICAgICAgbXlHbG9iYWxzLmN1cnJlbnRWaWV3Zm9vID0gdGhpcy5jdXJyZW50Vmlld2ZvbztcblxuICAgICAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRpbmdPckZldGNoaW5nVmlld2ZvbygpO1xuICAgICAgICB0aGlzLmdldGZvbGRlcmxpc3QoKTtcbiAgICAgICAgJChcIi5DQmltYWdlc2l6ZVwiKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY2hlY2tlZCA9ICQodGhpcykuaXMoJzpjaGVja2VkJyk7XG4gICAgICAgICAgICAkKFwiLkNCaW1hZ2VzaXplXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICQodGhpcykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZXNpemUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkKFwiW2RhdGEtdG9nZ2xlXVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB0b2dnbGVfZWwgPSAkKHRoaXMpLmRhdGEoXCJ0b2dnbGVcIik7XG4gICAgICAgICAgICAkKHRvZ2dsZV9lbCkudG9nZ2xlQ2xhc3MoXCJvcGVuLXNpZGViYXJcIik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG5cbiAgICB9XG4gICAgZGVsZXRldmlld2ZvbygpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50Vmlld2Zvby5kZWxldGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb2RlbGV0ZSh0aGlzLmN1cnJlbnRWaWV3Zm9vLmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuZ2V0UHVibGljVmlld2Zvb0RldGFpbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgZ2V0UHVibGljVmlld2Zvb0RldGFpbCgpIHtcbiAgICAgIFxuICAgIGNvbnNvbGUubG9nKFwicHVibGljdmlld2Zvb2RldGFpbCBnZXRQdWJsaWNWaWV3Zm9vRGV0YWlsIHZpZXdmb29pZDogXCJcbiAgICAgICsgdGhpcy52aWV3Zm9vaWQpO1xuICAgIHRoaXMudmlld2Zvb2xvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb0RldGFpbCh0aGlzLnZpZXdmb29pZClcbiAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdDogYW55KSA9PiB7XG5cbiAgICAgICAgdmFyIGNvbHM6IGFueSA9IHt9O1xuICAgICAgICB2YXIgY29sQ291bnQgPSAwO1xuICAgICAgICBjb25zb2xlLmxvZyhcInRvdGFsIGNvbnRhaW5lciA6IFwiICsgcmVzdWx0LmRhdGEuY29udGFpbmVycy5sZW5ndGgpO1xuXG4gICAgICAgIHZhciBtYXhoZWlnaHQgPSAwO1xuICAgICAgICB2YXIgbWF4aGVpZ2h0SW1hZ2VDID0gMDtcbiAgICAgICAgdmFyIHByZXZpb3VzUm93ID0gMDtcbiAgICAgICAgdmFyIGN1cnJlbnRSb3cgPSAwO1xuXG4gICAgICAgIHZhciByb3dzOiBhbnkgPSB7fVxuICAgICAgICB0aGlzLmFycmF5Um93cyA9IFtdO1xuICAgICAgICB0aGlzLmFycmF5Um93c0hlaWdodCA9IFtdO1xuXG4gICAgICAgIHZhciBjb250YWluZXJzID0gcmVzdWx0LmRhdGEuY29udGFpbmVycztcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gY29udGFpbmVyc1tpXTtcbiAgICAgICAgICB2YXIgbmdHcmlkSXRlbU9wdGlvbnNSb3cgPSBjb250YWluZXIubmdHcmlkSXRlbU9wdGlvbnMucm93O1xuICAgICAgICAgIHZhciBuZ0dyaWRJdGVtT3B0aW9uc0NvbCA9IGNvbnRhaW5lci5uZ0dyaWRJdGVtT3B0aW9ucy5jb2w7XG4gICAgICAgICAgaWYgKCFyb3dzLmhhc093blByb3BlcnR5KG5nR3JpZEl0ZW1PcHRpb25zUm93KSkge1xuICAgICAgICAgICAgcm93c1tuZ0dyaWRJdGVtT3B0aW9uc1Jvd10gPSB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcm93c1tuZ0dyaWRJdGVtT3B0aW9uc1Jvd11bbmdHcmlkSXRlbU9wdGlvbnNDb2xdID0gY29udGFpbmVyO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHJvd3MpO1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyc1NvcnRlZCA9IFtdO1xuICAgICAgICBmb3IgKHZhciByb3drZXkgaW4gcm93cykge1xuICAgICAgICAgIHZhciBjb2xBcnJheSA9IHJvd3Nbcm93a2V5XTtcbiAgICAgICAgICBmb3IgKHZhciBjb2xrZXkgaW4gY29sQXJyYXkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyc1NvcnRlZC5wdXNoKGNvbEFycmF5W2NvbGtleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNvbnRhaW5lcnNTb3J0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXJzU29ydGVkW2ldO1xuICAgICAgICAgIGNvbnRhaW5lci5pbWFnZWRlZmF1bHRubyA9IHBhcnNlSW50KHJlc3VsdC5kYXRhLmltYWdlZGVmYXVsdG5vKTtcblxuXG4gICAgICAgICAgY29udGFpbmVyLmNvbGNsYXNzID0gXCJjb2wtbWQtXCIgKyBjb250YWluZXIubmdHcmlkSXRlbU9wdGlvbnMuc2l6ZXggKyBcIiAgXCI7XG4gICAgICAgICAgLy9jb250YWluZXIucm93aGVpZ2h0ID0gMTUwICogY29udGFpbmVyLmNvbnRhaW5lcnJvd3MgKyA2MztcbiAgICAgICAgICAvL2NvbnRhaW5lci5sZWZ0UG9zaXRpb24gPSA2OCAqIChjb250YWluZXIubmdHcmlkSXRlbU9wdGlvbnMuY29sIC0gMSk7XG4gICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLmltYWdlaW5mb2ZyYW1lID09ICd0cnVlJykge1xuICAgICAgICAgICAgY29udGFpbmVyLmhlaWdodFNpemVZID0gNjggKiBjb250YWluZXIubmdHcmlkSXRlbU9wdGlvbnMuc2l6ZXk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5oZWlnaHRTaXplWSA9IDk4ICogY29udGFpbmVyLm5nR3JpZEl0ZW1PcHRpb25zLnNpemV5O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZpZXdmb29sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZXdmb28gPSByZXN1bHQuZGF0YTtcbiAgICAgICAgcmV0dXJuO1xuXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQuZGF0YS5jb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gcmVzdWx0LmRhdGEuY29udGFpbmVyc1tpXTtcblxuXG4gICAgfVxuICAgIGNoZWNrc2VsZmRlc3RydWN0KHZmKSB7XG4gICAgICAgIGFsZXJ0KHZmLmlkKTtcbiAgICAgICAgaWYgKHZmLmlzc2VsZmRlc3RydWN0ZGF0ZSA9PT0gXCJ0cnVlXCIpIHtcblxuICAgICAgICAgICAgdmFyIHRhcmdldF9kYXRlID0gbmV3IERhdGUodmYuc2VsZmRlc3RydWN0ZGF0ZSkuZ2V0VGltZSgpO1xuXG4gICAgICAgICAgICB2YXIgZGF5cywgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHM7XG4gICAgICAgICAgICB2YXIgY291bnRkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50ZG93bicpO1xuXG4gICAgICAgICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyBmaW5kIHRoZSBhbW91bnQgb2YgXCJzZWNvbmRzXCIgYmV0d2VlbiBub3cgYW5kIHRhcmdldFxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50X2RhdGUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICAgICAgICAgIHZhciBzZWNvbmRzX2xlZnQgPSAodGFyZ2V0X2RhdGUgLSBjdXJyZW50X2RhdGUpIC8gMTAwMDtcbiAgICAgICAgICAgICAgICAvLyBkbyBzb21lIHRpbWUgY2FsY3VsYXRpb25zXG4gICAgICAgICAgICAgICAgZGF5cyA9IHBhcnNlSW50KHNlY29uZHNfbGVmdCAvIDg2NDAwKTtcbiAgICAgICAgICAgICAgICBzZWNvbmRzX2xlZnQgPSBzZWNvbmRzX2xlZnQgJSA4NjQwMDtcblxuICAgICAgICAgICAgICAgIGhvdXJzID0gcGFyc2VJbnQoc2Vjb25kc19sZWZ0IC8gMzYwMCk7XG4gICAgICAgICAgICAgICAgc2Vjb25kc19sZWZ0ID0gc2Vjb25kc19sZWZ0ICUgMzYwMDtcblxuICAgICAgICAgICAgICAgIG1pbnV0ZXMgPSBwYXJzZUludChzZWNvbmRzX2xlZnQgLyA2MCk7XG4gICAgICAgICAgICAgICAgc2Vjb25kcyA9IHBhcnNlSW50KHNlY29uZHNfbGVmdCAlIDYwKTtcblxuICAgICAgICAgICAgICAgIC8vIGZvcm1hdCBjb3VudGRvd24gc3RyaW5nICsgc2V0IHRhZyB2YWx1ZVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudGRvd24nKS5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJkYXlzXCI+JyArIGRheXMgKyAnIDxiPkRheXM8L2I+PC9zcGFuPiA8c3BhbiBjbGFzcz1cImhvdXJzXCI+JyArIGhvdXJzICsgJyA8Yj5Ib3VyczwvYj48L3NwYW4+IDxzcGFuIGNsYXNzPVwibWludXRlc1wiPidcbiAgICAgICAgICAgICAgICAgICAgKyBtaW51dGVzICsgJyA8Yj5NaW51dGVzPC9iPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJzZWNvbmRzXCI+JyArIHNlY29uZHMgKyAnIDxiPlNlY29uZHM8L2I+PC9zcGFuPic7XG5cbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Zm9sZGVybGlzdCgpIHtcblxuICAgICAgICAgIGNvbHNbY29udGFpbmVyLm5nR3JpZEl0ZW1PcHRpb25zLmNvbF0gPSBjb250YWluZXI7XG4gICAgICAgICAgY29sQ291bnQgPSBjb2xDb3VudCArIGNvbnRhaW5lci5uZ0dyaWRJdGVtT3B0aW9ucy5zaXpleDtcblxuXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhcImNvbENvdW50ID4gXCIrY29sQ291bnQpO1xuICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjb250YWluZXIubmdHcmlkSXRlbU9wdGlvbnMuY29sID4gXCIrY29udGFpbmVyLm5nR3JpZEl0ZW1PcHRpb25zLmNvbCk7XG5cbiAgICAgICAgICAvLyBncmlkLWl0ZW0taW1nXG4gICAgICAgICAgY29udGFpbmVyLmNvbGNsYXNzID0gXCJjb2wtbWQtXCIgKyBjb250YWluZXIubmdHcmlkSXRlbU9wdGlvbnMuc2l6ZXggKyBcIiAgXCI7XG5cbiAgICAgICAgICBjb250YWluZXIucm93aGVpZ2h0ID0gMTUwICogY29udGFpbmVyLmNvbnRhaW5lcnJvd3MgKyA2MztcbiAgICAgICAgICBjb250YWluZXIubGVmdFBvc2l0aW9uID0gNjggKiAoY29udGFpbmVyLm5nR3JpZEl0ZW1PcHRpb25zLmNvbCAtIDEpO1xuXG4gICAgICAgICAgdmFyIGhlaWdodCA9IDE1MCAqIGNvbnRhaW5lci5jb250YWluZXJyb3dzICsgNjM7XG4gICAgICAgICAgaWYgKG1heGhlaWdodCA8IGhlaWdodCkge1xuICAgICAgICAgICAgbWF4aGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBoZWlnaHRJbWFnZUMgPSA5OCAqIGNvbnRhaW5lci5uZ0dyaWRJdGVtT3B0aW9ucy5zaXpleTtcbiAgICAgICAgICBpZiAobWF4aGVpZ2h0SW1hZ2VDIDwgaGVpZ2h0SW1hZ2VDKSB7XG4gICAgICAgICAgICBtYXhoZWlnaHRJbWFnZUMgPSBoZWlnaHRJbWFnZUM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcHJldmlvdXNSb3cgPSBjdXJyZW50Um93O1xuICAgICAgICAgIGN1cnJlbnRSb3cgPSBjb250YWluZXIubmdHcmlkSXRlbU9wdGlvbnMucm93O1xuXG5cbiAgICAgICAgICBpZiAoY3VycmVudFJvdyAhPSBwcmV2aW91c1Jvdykge1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNvbHMpKTtcblxuICAgICAgICAgICAgdmFyIGFyckNvbDogYW55ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY29scykge1xuICAgICAgICAgICAgICBpZiAoY29scy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgYXJyQ29sLnB1c2goY29sc1trZXldKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hcnJheVJvd3MucHVzaChhcnJDb2wpO1xuXG4gICAgICAgICAgICBpZiAobWF4aGVpZ2h0ID09IDApIHtcbiAgICAgICAgICAgICAgbWF4aGVpZ2h0ID0gbWF4aGVpZ2h0SW1hZ2VDO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hcnJheVJvd3NIZWlnaHQucHVzaChtYXhoZWlnaHQpO1xuXG4gICAgICAgICAgICBjb2xzID0ge307XG4gICAgICAgICAgICBjb2xDb3VudCA9IDA7XG5cbiAgICAgICAgICAgIGlmIChpID09IHJlc3VsdC5kYXRhLmNvbnRhaW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvL2NvbHMucHVzaChjb250YWluZXIpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvL3RoaXMuYXJyYXlSb3dzLnB1c2goY29scyk7XG4gICAgICAgIC8vdGhpcy5jdXJyZW50Vmlld2ZvbyA9IHJlc3VsdC5kYXRhO1xuXG4gICAgICAgIHRoaXMudmlld2Zvb2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jdXJyZW50Vmlld2ZvbyA9IHJlc3VsdC5kYXRhO1xuXG4gICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLnZpZXdmb29sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidmlld2ZvbyBsaXN0IGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblxuICAgIH1cblxuICAgb25WaWV3Zm9vQ29tbWVudCh2Zmw6IFZpZXdmb28pIHtcbiAgICAvL2FsZXJ0KHZjdCk7XG4gICAgdGhpcy5jdXJyVmlld2Zvb0NvbW1lbnQgPSB2Zmw7XG4gICAgdGhpcy5jdXJyVmlld2Zvb0ltYWdlID0ge307XG4gICAgJCgnI2NvbW1lbnRwaG90b19tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG4gICAgaWYgKCF0aGlzLmlzTW9kZWxDb21tZW50SGlkZGVuUmVnaXN0ZXJlZCkge1xuICAgICAgdGhpcy5pc01vZGVsQ29tbWVudEhpZGRlblJlZ2lzdGVyZWQgPSB0cnVlO1xuICAgICAgJCgnI2NvbW1lbnRwaG90b19tb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMuY3VyclZpZXdmb29Db21tZW50ID0ge307XG4gICAgICAgIHRoaXMuY3VyclZpZXdmb29JbWFnZSA9IHt9O1xuXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgb25JbWFnZUNvbW1lbnQoY29udGFpbmVyaW1hZ2U6IENvbnRhaW5lcikge1xuICAgIHRoaXMuY3VyclZpZXdmb29JbWFnZSA9IGNvbnRhaW5lcmltYWdlO1xuICAgIHRoaXMuY3VyclZpZXdmb29Db21tZW50ID0ge307XG4gICAgJCgnI2NvbW1lbnRwaG90b19tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG4gICAgaWYgKCF0aGlzLmlzTW9kZWxDb21tZW50SGlkZGVuUmVnaXN0ZXJlZCkge1xuICAgICAgdGhpcy5pc01vZGVsQ29tbWVudEhpZGRlblJlZ2lzdGVyZWQgPSB0cnVlO1xuICAgICAgJCgnI2NvbW1lbnRwaG90b19tb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMuY3VyclZpZXdmb29Db21tZW50ID0ge307XG4gICAgICAgIHRoaXMuY3VyclZpZXdmb29JbWFnZSA9IHt9O1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIFxuICBvblZpZXdmb29TaGFyZSh2Zmw6IFZpZXdmb28pIHtcbiAgICB0aGlzLmN1cnJWaWV3Zm9vU2hhcmUgPSB2Zmw7XG4gICAgdGhpcy5jdXJyVmlld2Zvb0ltYWdlU2hhcmUgPSB7fTtcbiAgICAkKCcjU2VsZWN0UGhvdG9Nb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG4gICAgaWYgKCF0aGlzLmlzTW9kZWxTaGFyZUhpZGRlblJlZ2lzdGVyZWQpIHtcbiAgICAgIHRoaXMuaXNNb2RlbFNoYXJlSGlkZGVuUmVnaXN0ZXJlZCA9IHRydWU7XG4gICAgICAkKCcjU2VsZWN0UGhvdG9Nb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMuY3VyclZpZXdmb29TaGFyZSA9IHt9O1xuICAgICAgICB0aGlzLmN1cnJWaWV3Zm9vSW1hZ2VTaGFyZSA9IHt9O1xuXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgb25JbWFnZVNoYXJlKGNvbnRhaW5lcmltYWdlOiBDb250YWluZXIpIHtcbiAgICAgIHRoaXMuY3VyclZpZXdmb29JbWFnZVNoYXJlID0gY29udGFpbmVyaW1hZ2U7XG4gICAgICB0aGlzLmN1cnJWaWV3Zm9vU2hhcmUgPSB7fTtcbiAgICAgICQoJyNTZWxlY3RQaG90b01vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgICAgIGlmICghdGhpcy5pc01vZGVsQ29tbWVudEhpZGRlblJlZ2lzdGVyZWQpIHtcbiAgICAgICAgICB0aGlzLmlzTW9kZWxDb21tZW50SGlkZGVuUmVnaXN0ZXJlZCA9IHRydWU7XG4gICAgICAgICAgJCgnI1NlbGVjdFBob3RvTW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICB0aGlzLmN1cnJWaWV3Zm9vU2hhcmUgPSB7fTtcbiAgICAgICAgICAgICAgdGhpcy5jdXJyVmlld2Zvb0ltYWdlU2hhcmUgPSB7fTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0gIFxuICB9XG59XG4iXX0=
