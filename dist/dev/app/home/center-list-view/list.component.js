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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var auth_service_1 = require('../../shared/services/auth.service');
var pagination_component_1 = require('../../shared/pagination/pagination.component');
var myGlobals = require('../../globals');
var commentmodal_component_1 = require('../../shared/widgets/commentmodal/commentmodal.component');
var sharemodal_component_1 = require('../../shared/widgets/sharemodal/sharemodal.component');
var ListViewComponent = (function () {
    function ListViewComponent(_router, authService, builder) {
        this._router = _router;
        this.authService = authService;
        this.builder = builder;
        this.onDelViewfoo = new core_1.EventEmitter();
        this.serviceUrl = myGlobals.serviceUrl + '/upload/gallery';
        this.imageUrl = myGlobals.imageUrl + '/upload/gallery';
        this.profileimageUrl = myGlobals.imageUrl + '/upload/profiles';
        this.isEnable = true;
        this.commentaddloading = false;
        this.loading = false;
        this.currViewfooComment = {};
        this.currViewfooShare = {};
        this.currViewfooImageShare = {};
        this.isModelCommentHiddenRegistered = false;
        this.isModelShareHiddenRegistered = false;
        this.viewfoocommenttext = new forms_1.FormControl("", forms_1.Validators.required);
        this.loginUser = myGlobals.LoginUser;
        this.viewfoocomment = builder.group({
            "viewfoocommenttext": this.viewfoocommenttext
        });
    }
    ListViewComponent.prototype.ngOnInit = function () {
        var formdata = this.viewfoocomment.value;
        console.log(this.viewfoolist);
        window.fbAsyncInit = function () {
            FB.init({
                appId: "1089726191119563",
                xfbml: true,
                version: 'v2.4'
            });
        };
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    };
    ListViewComponent.prototype.gotogallary = function (viewfooid) {
        var link = ['/viewfoodetail', viewfooid];
        this._router.navigate(link);
    };
    ListViewComponent.prototype.onEditViewfoo = function (viewfooid) {
        var link = ['/gallary', viewfooid];
        this._router.navigate(link);
    };
    ListViewComponent.prototype.onDeleteViewfoo = function (viewfooid, viewfooindex) {
        var _this = this;
        this.loading = true;
        this.authService.viewfoodelete(viewfooid)
            .subscribe(function (result) {
            _this.loading = false;
            _this.viewfoolist.splice(viewfooindex, 1);
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("viewfoo delete fail: " + error);
        });
    };
    ListViewComponent.prototype.onViewfooComment = function (vfl) {
        this.currViewfooComment = vfl;
        $('#commentphoto_modal').modal('show');
        if (!this.isModelCommentHiddenRegistered) {
            this.isModelCommentHiddenRegistered = true;
            $('#commentphoto_modal').on('hidden.bs.modal', function (e) {
                this.currViewfooComment = {};
            });
        }
    };
    ListViewComponent.prototype.onViewfooShare = function (vfl) {
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ListViewComponent.prototype, "viewfoolist", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ListViewComponent.prototype, "onDelViewfoo", void 0);
    ListViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'centerlistview',
            templateUrl: 'list.component.html',
            directives: [pagination_component_1.PaginationComponent, forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, commentmodal_component_1.CommentModalComponent, sharemodal_component_1.ShareModalComponent]
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService, forms_1.FormBuilder])
    ], ListViewComponent);
    return ListViewComponent;
}());
exports.ListViewComponent = ListViewComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2NlbnRlci1saXN0LXZpZXcvbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUVLLGVBQWUsQ0FBQyxDQUFBO0FBQ3JCLHVCQUFnRCxpQkFBaUIsQ0FBQyxDQUFBO0FBQ2xFLHVCQUE4QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hELHNCQUEwRixnQkFBZ0IsQ0FBQyxDQUFBO0FBRzNHLDZCQUE0QixvQ0FBb0MsQ0FBQyxDQUFBO0FBR2pFLHFDQUFrQyw4Q0FBOEMsQ0FBQyxDQUFBO0FBQ2pGLElBQU8sU0FBUyxXQUFXLGVBQWUsQ0FBQyxDQUFDO0FBQzVDLHVDQUFzQywwREFBMEQsQ0FBQyxDQUFBO0FBQ2pHLHFDQUFvQyxzREFBc0QsQ0FBQyxDQUFBO0FBUTNGO0lBdUJJLDJCQUFvQixPQUFlLEVBQVUsV0FBd0IsRUFBUyxPQUFvQjtRQUE5RSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFhO1FBcEJoRixpQkFBWSxHQUF5QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUUxRSxlQUFVLEdBQVcsU0FBUyxDQUFDLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQztRQUM5RCxhQUFRLEdBQVcsU0FBUyxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQztRQUMxRCxvQkFBZSxHQUFVLFNBQVMsQ0FBQyxRQUFRLEdBQUcsa0JBQWtCLENBQUM7UUFDMUQsYUFBUSxHQUFXLElBQUksQ0FBQztRQUMvQixzQkFBaUIsR0FBVyxLQUFLLENBQUM7UUFHbEMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUd6Qix1QkFBa0IsR0FBWSxFQUFFLENBQUM7UUFDakMscUJBQWdCLEdBQVcsRUFBRSxDQUFDO1FBQzlCLDBCQUFxQixHQUFhLEVBQUUsQ0FBQztRQUNyQyxtQ0FBOEIsR0FBWSxLQUFLLENBQUM7UUFDaEQsaUNBQTRCLEdBQVcsS0FBSyxD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MENBQW1CLENBQUM7U0FDekgsQ0FBQzs7eUJBQUE7SUEyR0Ysd0JBQUM7QUFBRCxDQTFHQSxBQTBHQyxJQUFBO0FBMUdZLHlCQUFpQixvQkEwRzdCLENBQUEiLCJmaWxlIjoiYXBwL2hvbWUvY2VudGVyLWxpc3Qtdmlldy9saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZH1cbmZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSb3V0ZXMsIFJvdXRlciwgUk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge0NPUkVfRElSRUNUSVZFU30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMsIEZvcm1CdWlsZGVyLCBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld2ZvbyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7UGFnaW5hdGlvbkNvbXBvbmVudH0gZnJvbSAnLi4vLi4vc2hhcmVkL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uLy4uL2dsb2JhbHMnKTtcbmltcG9ydCB7IENvbW1lbnRNb2RhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uL3NoYXJlZC93aWRnZXRzL2NvbW1lbnRtb2RhbC9jb21tZW50bW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IFNoYXJlTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvd2lkZ2V0cy9zaGFyZW1vZGFsL3NoYXJlbW9kYWwuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2NlbnRlcmxpc3R2aWV3JyxcbiAgICB0ZW1wbGF0ZVVybDogJ2xpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtQYWdpbmF0aW9uQ29tcG9uZW50LCBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMsIENPUkVfRElSRUNUSVZFUyxDb21tZW50TW9kYWxDb21wb25lbnQsU2hhcmVNb2RhbENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTGlzdFZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdEBJbnB1dCgpIHB1YmxpYyB2aWV3Zm9vbGlzdDogYW55O1xuICAgIEBPdXRwdXQoKSBwcml2YXRlIG9uRGVsVmlld2ZvbzogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdmlld2Zvb2NvbW1lbnRpZDpzdHJpbmc7XG4gICAgc2VydmljZVVybDogc3RyaW5nID0gbXlHbG9iYWxzLnNlcnZpY2VVcmwgKyAnL3VwbG9hZC9nYWxsZXJ5JztcbiAgICBpbWFnZVVybDogc3RyaW5nID0gbXlHbG9iYWxzLmltYWdlVXJsICsgJy91cGxvYWQvZ2FsbGVyeSc7XG4gICAgcHJvZmlsZWltYWdlVXJsOnN0cmluZyA9IG15R2xvYmFscy5pbWFnZVVybCArICcvdXBsb2FkL3Byb2ZpbGVzJztcbiAgICBwdWJsaWMgaXNFbmFibGU6Ym9vbGVhbiA9IHRydWU7XG4gICAgY29tbWVudGFkZGxvYWRpbmc6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIGxvZ2luVXNlcjogYW55O1xuICAgIHZpZXdmb29jb21tZW50czphbnk7XG4gICAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgICBcbiAgICAvL3NoYXJlIGFuZCBjb21tZW50XG4gICAgY3VyclZpZXdmb29Db21tZW50OiBWaWV3Zm9vID0ge307XG4gICAgY3VyclZpZXdmb29TaGFyZTpWaWV3Zm9vID0ge307XG4gICAgY3VyclZpZXdmb29JbWFnZVNoYXJlOkNvbnRhaW5lciA9IHt9O1xuICAgIGlzTW9kZWxDb21tZW50SGlkZGVuUmVnaXN0ZXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzTW9kZWxTaGFyZUhpZGRlblJlZ2lzdGVyZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgdmlld2Zvb2NvbW1lbnR0ZXh0OiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbChcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICB2aWV3Zm9vY29tbWVudDogRm9ybUdyb3VwO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxwcml2YXRlIGJ1aWxkZXI6IEZvcm1CdWlsZGVyKSB7XG4gICAgICAgIHRoaXMubG9naW5Vc2VyID0gbXlHbG9iYWxzLkxvZ2luVXNlcjtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudmlld2Zvb2NvbW1lbnQgPSBidWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgXCJ2aWV3Zm9vY29tbWVudHRleHRcIjogdGhpcy52aWV3Zm9vY29tbWVudHRleHRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGxldCBmb3JtZGF0YSA9IHRoaXMudmlld2Zvb2NvbW1lbnQudmFsdWU7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudmlld2Zvb2xpc3QpO1xuICAgICAgICAgd2luZG93LmZiQXN5bmNJbml0ID0gZnVuY3Rpb24gKCkge1xuXHRcdEZCLmluaXQoe1xuICAgICAgICAgICAgICAgICAgICBhcHBJZDpcIjEwODk3MjYxOTExMTk1NjNcIixcbiAgICAgICAgICAgICAgICAgICAgeGZibWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb246ICd2Mi40J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfTtcbiAgICAgICAgIChmdW5jdGlvbihkLCBzLCBpZCkge1xuICAgICAgICAgICAgIHZhciBqcywgZmpzID0gZC5nZXRFbGVtZW50c0J5VGFnTmFtZShzKVswXTtcbiAgICAgICAgICAgICBpZiAoZC5nZXRFbGVtZW50QnlJZChpZCkpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICAganMgPSBkLmNyZWF0ZUVsZW1lbnQocyk7IGpzLmlkID0gaWQ7XG4gICAgICAgICAgICAganMuc3JjID0gXCIvL2Nvbm5lY3QuZmFjZWJvb2submV0L2VuX1VTL3Nkay5qc1wiO1xuICAgICAgICAgICAgIGZqcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShqcywgZmpzKTtcbiAgICAgICAgIH0gKGRvY3VtZW50LCAnc2NyaXB0JywgJ2ZhY2Vib29rLWpzc2RrJykpO1xuICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICB9XG5cbiAgICBnb3RvZ2FsbGFyeSh2aWV3Zm9vaWQ6IGFueSkge1xuICAgICAgICBsZXQgbGluayA9IFsnL3ZpZXdmb29kZXRhaWwnLCB2aWV3Zm9vaWRdO1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUobGluayk7XG4gICAgfVxuXG4gICAgb25FZGl0Vmlld2Zvbyh2aWV3Zm9vaWQ6IGFueSkge1xuICAgICAgICBsZXQgbGluayA9IFsnL2dhbGxhcnknLCB2aWV3Zm9vaWRdO1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUobGluayk7XG4gICAgfVxuXG4gICAgb25EZWxldGVWaWV3Zm9vKHZpZXdmb29pZDogYW55LCB2aWV3Zm9vaW5kZXgpIHtcbiAgICAgICAgLy90aGlzLm9uRGVsVmlld2Zvby5lbWl0KHZpZXdmb29pZCk7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb2RlbGV0ZSh2aWV3Zm9vaWQpXG5cdFx0XHQuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcblxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld2Zvb2xpc3Quc3BsaWNlKHZpZXdmb29pbmRleCwgMSk7XG5cblx0XHRcdH0sIChlcnJvcjogYW55KSA9PiB7XG5cdFx0XHRcdHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcblx0XHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cblx0XHRcdFx0Y29uc29sZS5sb2coXCJ2aWV3Zm9vIGRlbGV0ZSBmYWlsOiBcIiArIGVycm9yKTtcblx0XHRcdH0pO1xuICAgIH1cbiAgICBcbiAgICAgICAgLy92aWV3Zm9vIHNoYXJlICYgY29tbWVudFxuICAgIG9uVmlld2Zvb0NvbW1lbnQodmZsOiBWaWV3Zm9vKSB7XG5cbiAgICAgICAgdGhpcy5jdXJyVmlld2Zvb0NvbW1lbnQgPSB2Zmw7XG4gICAgICAgICQoJyNjb21tZW50cGhvdG9fbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuXHRcdGlmICghdGhpcy5pc01vZGVsQ29tbWVudEhpZGRlblJlZ2lzdGVyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgXHR0aGlzLmlzTW9kZWxDb21tZW50SGlkZGVuUmVnaXN0ZXJlZCA9IHRydWU7XG5cdFx0XHQkKCcjY29tbWVudHBob3RvX21vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0dGhpcy5jdXJyVmlld2Zvb0NvbW1lbnQgPSB7fTtcblx0XHRcdH0pO1xuXHRcdH1cbiAgICB9XG4gICAgXG4gICAgb25WaWV3Zm9vU2hhcmUodmZsOiBWaWV3Zm9vKSB7XG5cbiAgICAgICAgdGhpcy5jdXJyVmlld2Zvb1NoYXJlID0gdmZsO1xuICAgICAgICB0aGlzLmN1cnJWaWV3Zm9vSW1hZ2VTaGFyZSA9IHt9O1xuICAgICAgICAkKCcjU2VsZWN0UGhvdG9Nb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG5cdFx0aWYgKCF0aGlzLmlzTW9kZWxTaGFyZUhpZGRlblJlZ2lzdGVyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgXHR0aGlzLmlzTW9kZWxTaGFyZUhpZGRlblJlZ2lzdGVyZWQgPSB0cnVlO1xuXHRcdFx0JCgnI1NlbGVjdFBob3RvTW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHR0aGlzLmN1cnJWaWV3Zm9vU2hhcmUgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyVmlld2Zvb0ltYWdlU2hhcmUgPSB7fTtcblx0XHRcdH0pO1xuXHRcdH1cbiAgICB9XG59XG5cbiJdfQ==
