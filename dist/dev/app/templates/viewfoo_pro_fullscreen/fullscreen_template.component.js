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
var imagesingle_component_1 = require('../imagesingle/imagesingle.component');
var auth_service_1 = require('../../shared/services/auth.service');
var pagination_component_1 = require('../../shared/pagination/pagination.component');
var myGlobals = require('../../globals');
var FullscreenTemplateComponent = (function () {
    function FullscreenTemplateComponent(route, router, zone, authService) {
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.invalid = false;
        this.sharing = false;
        this.sharingdemo = true;
        this.filename = "img/build_viewfoo/kim_sharma.jpg";
        this.setcomment = false;
        this.setsharing = false;
        this.setselection = false;
        this.setmousehover = false;
        this.setimageinfoframe = false;
        this.loading = false;
        this.currentViewfoo = {};
        this.serviceUrl = myGlobals.serviceUrl;
        this.folderlist = [];
        this.subfolderlist = [];
        this.isupload = false;
        this.zone = zone;
    }
    FullscreenTemplateComponent.prototype.creatingOrFetchingViewfoo = function () {
        var _this = this;
        this.loading = true;
        this.sub = this.route.params.subscribe(function (params) {
            console.log("FullscreenTemplateComponent > constructor ");
            console.log(params);
            _this.viewfooid = params['viewfooid'];
            _this.loginUser = myGlobals.LoginUser;
            console.log(_this.loginUser);
            if (!_this.viewfooid) {
                console.log("creating new viewfoo");
                _this.containertype = "gallery";
                _this.authService.viewfoocreate(_this.containertype, _this.loginUser.id)
                    .subscribe(function (result) {
                    if (result) {
                        console.log(result);
                        var data = result.data;
                        data.viewfoo.containers = [];
                        data.container.containerimages = [];
                        data.viewfoo.containers.push(data.container);
                        _this.currentViewfoo = data.viewfoo;
                        myGlobals.currentViewfoo = _this.currentViewfoo;
                        _this.currentViewfoo.mapContainer = {};
                        _this.currentViewfoo.mapDropzone = {};
                        if (_this.currentViewfoo.imagesize === "normal") {
                            _this.currentnormalsize = true;
                            _this.currenthiressize = false;
                        }
                        else {
                            _this.currentnormalsize = false;
                            _this.currenthiressize = true;
                        }
                        _this.loading = false;
                    }
                }, function (error) {
                    _this.errorMsg = error;
                    _this.loading = false;
                    console.log("viewfoo create fail: " + error);
                });
            }
            else {
                console.log("We have viewfoo id");
                _this.authService.viewfooDetail(_this.viewfooid)
                    .subscribe(function (result) {
                    _this.currentViewfoo = result.data;
                    myGlobals.currentViewfoo = _this.currentViewfoo;
                    _this.currentViewfoo.mapContainer = {};
                    _this.currentViewfoo.mapDropzone = {};
                    console.log(_this.currentViewfoo.imagesize);
                    if (_this.currentViewfoo.coverimage != "") {
                        _this.filename = myGlobals.serviceUrl + "/upload/gallery/" + _this.currentViewfoo.coverimage;
                    }
                    if (_this.currentViewfoo.imagesize === "normal") {
                        _this.currentnormalsize = true;
                        _this.currenthiressize = false;
                    }
                    else {
                        _this.currentnormalsize = false;
                        _this.currenthiressize = true;
                    }
                    _this.loading = false;
                }, function (error) {
                    _this.errorMsg = error;
                    _this.loading = false;
                    console.log("viewfoo create fail: " + error);
                });
            }
        });
    };
    FullscreenTemplateComponent.prototype.setviewrsettingvalue = function (Viewfoo) {
        if (Viewfoo.allowcomment === "true") {
            this.setcomment = true;
        }
        if (Viewfoo.allowsharing === "true") {
            this.setsharing = true;
        }
        if (Viewfoo.allowselection === "true") {
            this.setselection = true;
        }
        if (Viewfoo.imagedatamousehover === "true") {
            this.setmousehover = true;
        }
        if (Viewfoo.imageinfoframe === "true") {
            this.setimageinfoframe = true;
        }
    };
    FullscreenTemplateComponent.prototype.ngOnInit = function () {
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
        this.creatingOrFetchingViewfoo();
    };
    FullscreenTemplateComponent.prototype.deleteviewfoo = function () {
        var _this = this;
        this.currentViewfoo.deleting = true;
        this.authService.viewfoodelete(this.currentViewfoo.id)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
                _this.router.navigate(['/']);
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("viewfoo delete fail: " + error);
        });
    };
    FullscreenTemplateComponent.prototype.containerCreate = function (containertype) {
        var _this = this;
        console.log("gallary_template containerCreate " + containertype);
        var self = this;
        this.authService.containerCreate(containertype, this.currentViewfoo.id, this.loginUser.id)
            .subscribe(function (result) {
            console.log("Container Created");
            console.log(result);
            var container = result.data;
            container.containerimages = [];
            self.currentViewfoo.containers.push(container);
            $("html, body").animate({ scrollTop: $(document).height() }, 1000);
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("viewfoo create fail: " + error);
        });
    };
    FullscreenTemplateComponent.prototype.updatecontainer = function (containertitle, containerid) {
        var _this = this;
        this.authService.containerUpdate(containertitle, containerid)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("Container update fail: " + error);
        });
    };
    FullscreenTemplateComponent.prototype.deletecontainer = function (containerid, index) {
        var _this = this;
        console.log("deletecontainer : " + containerid + "  index : " + index);
        var self = this;
        var currContainer = self.currentViewfoo.containers[index];
        this.authService.containerDelete(containerid)
            .subscribe(function (result) {
            console.log(result);
            currContainer.deleted = true;
            setTimeout(function () {
                self.currentViewfoo.containers.splice(index, 1);
            }, 1000);
        }, function (error) {
            _this.errorMsg = error;
            console.log("Containerimage delete fail: " + error);
        });
    };
    FullscreenTemplateComponent.prototype.allowsharing = function (val) {
        var _this = this;
        var settingtype = "allowsharing";
        this.authService.viewfooupdate(this.currentViewfoo.id, val, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
                _this.setviewrsettingvalue(result.data);
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("viewfoo update fail: " + error);
        });
    };
    FullscreenTemplateComponent.prototype.allowcomment = function (val) {
        var _this = this;
        var settingtype = "allowcomment";
        this.authService.viewfooupdate(this.currentViewfoo.id, val, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
                _this.setviewrsettingvalue(result.data);
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("viewfoo update fail: " + error);
        });
    };
    FullscreenTemplateComponent.prototype.allowselection = function (val) {
        var _this = this;
        var settingtype = "allowselection";
        this.authService.viewfooupdate(this.currentViewfoo.id, val, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
                _this.setviewrsettingvalue(result.data);
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("viewfoo update fail: " + error);
        });
    };
    FullscreenTemplateComponent.prototype.changeimagesize = function (value) {
        var _this = this;
        this.iamgesize = value;
        var settingtype = "imagesize";
        this.authService.viewfooupdate(this.currentViewfoo.id, this.iamgesize, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("viewfoo update fail: " + error);
        });
    };
    FullscreenTemplateComponent.prototype.changemousehover = function (val) {
        var _this = this;
        var settingtype = "imagedatamousehover";
        this.authService.viewfooupdate(this.currentViewfoo.id, val, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
                _this.setviewrsettingvalue(result.data);
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("viewfoo update fail: " + error);
        });
    };
    FullscreenTemplateComponent.prototype.changeframe = function (val) {
        var _this = this;
        var settingtype = "imageinfoframe";
        this.authService.viewfooupdate(this.currentViewfoo.id, val, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
                _this.setviewrsettingvalue(result.data);
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("viewfoo update fail: " + error);
        });
    };
    FullscreenTemplateComponent.prototype.imagedefaultno = function (val) {
        var _this = this;
        var settingtype = "imagedefaultno";
        this.imagedefaultno = val;
        this.authService.viewfooupdate(this.currentViewfoo.id, this.imagedefaultno, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("viewfoo update fail: " + error);
        });
    };
    FullscreenTemplateComponent.prototype.changebgcolor = function (val) {
        var _this = this;
        alert(val);
        var settingtype = "backgroundcolor";
        var backgroundcolor;
        if (val === "white") {
            this.backgroundcolor = "#FFFFFF";
        }
        else if (val === "black") {
            this.backgroundcolor = "#000000";
        }
        else { }
        this.authService.viewfooupdate(this.currentViewfoo.id, this.backgroundcolor, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("viewfoo update fail: " + error);
        });
    };
    FullscreenTemplateComponent.prototype.changefontcolor = function (val) {
        var _this = this;
        var settingtype = "menufontcolor";
        if (val === "white") {
            this.menufontcolor = "#FFFFFF";
        }
        else if (val === "black") {
            this.menufontcolor = "#000000";
        }
        else { }
        this.authService.viewfooupdate(this.currentViewfoo.id, this.menufontcolor, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("viewfoo update fail: " + error);
        });
    };
    FullscreenTemplateComponent.prototype.changemenubgcolor = function (val) {
        var _this = this;
        var settingtype = "menubackgroundcolor";
        if (val === "white") {
            this.menubackgroundcolor = "#FFFFFF";
        }
        else if (val === "black") {
            this.menubackgroundcolor = "#000000";
        }
        else { }
        this.authService.viewfooupdate(this.currentViewfoo.id, this.menubackgroundcolor, settingtype)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("viewfoo update fail: " + error);
        });
    };
    FullscreenTemplateComponent.prototype.selecttemplate = function () {
        this._router.navigate(['/select_template']);
    };
    FullscreenTemplateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'fullscreen',
            templateUrl: 'fullscreen_template.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, pagination_component_1.PaginationComponent, forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, imagesingle_component_1.ImageSingleComponent]
        }), 
        __metadata('design:paramtypes', [router_2.ActivatedRoute, router_1.Router, core_1.NgZone, auth_service_1.AuthService])
    ], FullscreenTemplateComponent);
    return FullscreenTemplateComponent;
}());
exports.FullscreenTemplateComponent = FullscreenTemplateComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90ZW1wbGF0ZXMvdmlld2Zvb19wcm9fZnVsbHNjcmVlbi9mdWxsc2NyZWVuX3RlbXBsYXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EscUJBQXdDLGVBQWUsQ0FBQyxDQUFBO0FBQ3hELHVCQUF3QyxpQkFBaUIsQ0FBQyxDQUFBO0FBQzFELHVCQUF1QyxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3pELHVCQUE4QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hELHNCQUF5QyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQzFELHNDQUFxQyxzQ0FBc0MsQ0FBQyxDQUFBO0FBRTVFLDZCQUE0QixvQ0FBb0MsQ0FBQyxDQUFBO0FBR2pFLHFDQUFrQyw4Q0FBOEMsQ0FBQyxDQUFBO0FBQ2pGLElBQU8sU0FBUyxXQUFXLGVBQWUsQ0FBQyxDQUFDO0FBVTVDO0lBeUNJLHFDQUFvQixLQUFxQixFQUM3QixNQUFjLEVBQUUsSUFBWSxFQUFVLFdBQXdCO1FBRHRELFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQzdCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBd0IsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFwQzFFLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFFekIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixnQkFBVyxHQUFZLElBQUksQ0FBQztRQUdyQixhQUFRLEdBQVcsa0NBQWtDLENBQUM7UUFXdEQsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHNCQUFpQixHQUFXLEtBQUssQ0FBQztRQUV6QyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLG1CQUFjLEdBQVksRUFBRSxDQUFDO1FBRzdCLGVBQVUsR0FBVyxTQUFTLENBQUMsVUFBVSxDQUFDO1FBQzFDLGVBQVUsR0FBWSxFQUFFLENBQUM7UUFD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QzthQUN4RixTQUFTLENBQUMsVUFBQyxNQUFNO1lBQ2QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFFVCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDLEVBQUUsVUFBQyxLQUFVO1lBQ1YsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFFckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQTtJQUNWLENBQUM7SUFFRCxvREFBYyxHQUFkO1FBQ0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQXhlRDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFlBQVk7WUFDdEIsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxVQUFVLEVBQUUsQ0FBQywwQkFBaUIsRUFBRSwwQ0FBbUIsRUFBRSxnQ0FBd0IsRUFBRSx3QkFBZSxFQUFFLDRDQUFvQixDQUFDO1NBQ3hILENBQUM7O21DQUFBO0lBcWVELGtDQUFDO0FBQUQsQ0FuZUQsQUFtZUUsSUFBQTtBQW5lVyxtQ0FBMkIsOEJBbWV0QyxDQUFBIiwiZmlsZSI6ImFwcC90ZW1wbGF0ZXMvdmlld2Zvb19wcm9fZnVsbHNjcmVlbi9mdWxsc2NyZWVuX3RlbXBsYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVMsIFJvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJbWFnZVNpbmdsZUNvbXBvbmVudCB9IGZyb20gJy4uL2ltYWdlc2luZ2xlL2ltYWdlc2luZ2xlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdmb28gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQge1BhZ2luYXRpb25Db21wb25lbnR9IGZyb20gJy4uLy4uL3NoYXJlZC9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi8uLi9nbG9iYWxzJyk7XG5cblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2Z1bGxzY3JlZW4nLFxuICAgIHRlbXBsYXRlVXJsOiAnZnVsbHNjcmVlbl90ZW1wbGF0ZS5jb21wb25lbnQuaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTLCBQYWdpbmF0aW9uQ29tcG9uZW50LCBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMsIENPUkVfRElSRUNUSVZFUywgSW1hZ2VTaW5nbGVDb21wb25lbnRdXG59KVxuXG5leHBvcnQgY2xhc3MgRnVsbHNjcmVlblRlbXBsYXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuICAgIFxuICAgIFxuICAgIHB1YmxpYyB2ZnRpdGxlOiBzdHJpbmc7XG4gICAgcHVibGljIHZmdGFnczogc3RyaW5nO1xuICAgIHB1YmxpYyBtc2c6IHN0cmluZztcbiAgICBpbnZhbGlkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGNvbnRhaW5lcnR5cGU6IHN0cmluZztcbiAgICBzaGFyaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgc2hhcmluZ2RlbW86IGJvb2xlYW4gPSB0cnVlO1xuICAgIGxvZ2luVXNlcjogVXNlcjtcbiAgICB0aGlzdmlld2ZvbzogVmlld2ZvbztcbiAgICBwdWJsaWMgZmlsZW5hbWU6IHN0cmluZyA9IFwiaW1nL2J1aWxkX3ZpZXdmb28va2ltX3NoYXJtYS5qcGdcIjtcbiAgICBwdWJsaWMgaW1hZ2VzaXplOiBzdHJpbmc7XG4gICAgcHVibGljIGltYWdlZGVmYXVsdG5vOiBzdHJpbmc7XG4gICAgcHVibGljIGNvbnRhaW5lcnR5cGU6IHN0cmluZztcbiAgICBwdWJsaWMgYmFja2dyb3VuZGNvbG9yOiBzdHJpbmc7XG4gICAgcHVibGljIG1lbnVmb250Y29sb3I6IHN0cmluZztcbiAgICBwdWJsaWMgbWVudWJhY2tncm91bmRjb2xvcjogc3RyaW5nO1xuXG4gICAgcHVibGljIGN1cnJlbnRpbWFnZXNpemU6IHN0cmluZztcbiAgICBwdWJsaWMgY3VycmVudG5vcm1hbHNpemU6IHN0cmluZztcbiAgICBwdWJsaWMgY3VycmVudGhpcmVzc2l6ZTogc3RyaW5nO1xuICAgIHB1YmxpYyBzZXRjb21tZW50OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIHNldHNoYXJpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgc2V0c2VsZWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIHNldG1vdXNlaG92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgc2V0aW1hZ2VpbmZvZnJhbWU6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIFxuICAgIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjdXJyZW50Vmlld2ZvbzogVmlld2ZvbyA9IHt9O1xuICAgIHZpZXdmb29pZDogc3RyaW5nO1xuICAgIGNvbnRhaW5lcmlkOiBzdHJpbmc7XG4gICAgc2VydmljZVVybDogc3RyaW5nID0gbXlHbG9iYWxzLnNlcnZpY2VVcmw7XG4gICAgZm9sZGVybGlzdDogdmlld2ZvbyA9IFtdO1xuICAgIHN1YmZvbGRlcmxpc3Q6IHZpZXdmb28gPSBbXTtcbiAgICBpc3VwbG9hZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIG15RHJvcHpvbmU6IGFueTtcbiAgICB6b25lOiBOZ1pvbmU7XG4gICAgY3JvcENvdmVyOiBhbnk7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy56b25lID0gem9uZTtcbiAgICB9XG5cbiAgICBjcmVhdGluZ09yRmV0Y2hpbmdWaWV3Zm9vKCkge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnN1YiA9IHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGdWxsc2NyZWVuVGVtcGxhdGVDb21wb25lbnQgPiBjb25zdHJ1Y3RvciBcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xuICAgICAgICAgICAgdGhpcy52aWV3Zm9vaWQgPSBwYXJhbXNbJ3ZpZXdmb29pZCddOyAvLyAoKykgY29udmVydHMgc3RyaW5nICdpZCcgdG8gYSBudW1iZXJcblxuICAgICAgICAgICAgdGhpcy5sb2dpblVzZXIgPSBteUdsb2JhbHMuTG9naW5Vc2VyO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxvZ2luVXNlcik7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy52aWV3Zm9vaWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0aW5nIG5ldyB2aWV3Zm9vXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVydHlwZSA9IFwiZ2FsbGVyeVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb2NyZWF0ZSh0aGlzLmNvbnRhaW5lcnR5cGUsIHRoaXMubG9naW5Vc2VyLmlkKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEudmlld2Zvby5jb250YWluZXJzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5jb250YWluZXIuY29udGFpbmVyaW1hZ2VzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS52aWV3Zm9vLmNvbnRhaW5lcnMucHVzaChkYXRhLmNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRWaWV3Zm9vID0gZGF0YS52aWV3Zm9vO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15R2xvYmFscy5jdXJyZW50Vmlld2ZvbyA9IHRoaXMuY3VycmVudFZpZXdmb287XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRWaWV3Zm9vLm1hcENvbnRhaW5lciA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFZpZXdmb28ubWFwRHJvcHpvbmUgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNldHZpZXdyc2V0dGluZ3ZhbHVlKHRoaXMuY3VycmVudFZpZXdmb28pO1xuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRWaWV3Zm9vLmltYWdlc2l6ZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRub3JtYWxzaXplID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50aGlyZXNzaXplID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRub3JtYWxzaXplID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudGhpcmVzc2l6ZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWV3Zm9vIGNyZWF0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZSBoYXZlIHZpZXdmb28gaWRcIik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb29EZXRhaWwodGhpcy52aWV3Zm9vaWQpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRWaWV3Zm9vID0gcmVzdWx0LmRhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG15R2xvYmFscy5jdXJyZW50Vmlld2ZvbyA9IHRoaXMuY3VycmVudFZpZXdmb287XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFZpZXdmb28ubWFwQ29udGFpbmVyID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRWaWV3Zm9vLm1hcERyb3B6b25lID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRWaWV3Zm9vLmltYWdlc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNldHZpZXdyc2V0dGluZ3ZhbHVlKHRoaXMuY3VycmVudFZpZXdmb28pO1xuICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudFZpZXdmb28uY292ZXJpbWFnZSAhPSBcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGVuYW1lPSBteUdsb2JhbHMuc2VydmljZVVybCArIFwiL3VwbG9hZC9nYWxsZXJ5L1wiICsgdGhpcy5jdXJyZW50Vmlld2Zvby5jb3ZlcmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFZpZXdmb28uaW1hZ2VzaXplID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50bm9ybWFsc2l6ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50aGlyZXNzaXplID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRub3JtYWxzaXplID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50aGlyZXNzaXplID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpZXdmb28gY3JlYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIFxuXG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG4gICAgICAgIHNldHZpZXdyc2V0dGluZ3ZhbHVlKFZpZXdmb28pe1xuICAgICAgICAgaWYoVmlld2Zvby5hbGxvd2NvbW1lbnQ9PT1cInRydWVcIil7XG4gICAgICAgICB0aGlzLnNldGNvbW1lbnQ9dHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZihWaWV3Zm9vLmFsbG93c2hhcmluZz09PVwidHJ1ZVwiKXtcbiAgICAgICAgIHRoaXMuc2V0c2hhcmluZz10cnVlO1xuICAgICAgICB9XG4gICAgICAgICAgaWYoVmlld2Zvby5hbGxvd3NlbGVjdGlvbj09PVwidHJ1ZVwiKXtcbiAgICAgICAgIHRoaXMuc2V0c2VsZWN0aW9uPXRydWU7XG4gICAgICAgIH1cbiAgICAgICAgIGlmKFZpZXdmb28uaW1hZ2VkYXRhbW91c2Vob3Zlcj09PVwidHJ1ZVwiKXtcbiAgICAgICAgIHRoaXMuc2V0bW91c2Vob3Zlcj10cnVlO1xuICAgICAgICB9XG4gICAgICAgICBpZihWaWV3Zm9vLmltYWdlaW5mb2ZyYW1lPT09XCJ0cnVlXCIpe1xuICAgICAgICAgdGhpcy5zZXRpbWFnZWluZm9mcmFtZT10cnVlO1xuICAgICAgICB9XG4gICAgIH1cbiAgICBcblxuIG5nT25Jbml0KCkge1xuXG4gICAgICAgICQoXCIuQ0JpbWFnZXNpemVcIikuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNoZWNrZWQgPSAkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgICAgICAgJChcIi5DQmltYWdlc2l6ZVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VzaXplID0gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICQoXCJbZGF0YS10b2dnbGVdXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHRvZ2dsZV9lbCA9ICQodGhpcykuZGF0YShcInRvZ2dsZVwiKTtcbiAgICAgICAgICAgICQodG9nZ2xlX2VsKS50b2dnbGVDbGFzcyhcIm9wZW4tc2lkZWJhclwiKTtcbiAgICAgICAgfSk7XG4vLyAgICAgICAgICAgICQoJy5uYXZfYmFyJykuY2xpY2soZnVuY3Rpb24oKXtcbi8vICAgICAgICAgICAgICAgICQoJy5uYXZpZ2F0aW9uJykudG9nZ2xlQ2xhc3MoJ3Zpc2libGUnKTtcbi8vICAgICAgICAgICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnb3BhY2l0eScpO1xuLy8gICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBGaWxlIFVwbG9hZCBwbHVnaW5cbiAgICAgICAgICAgIHRoaXMuY3JlYXRpbmdPckZldGNoaW5nVmlld2ZvbygpO1xuICAgICAgICB9XG5cbiAgICBkZWxldGV2aWV3Zm9vKCkge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jdXJyZW50Vmlld2Zvby5kZWxldGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb2RlbGV0ZSh0aGlzLmN1cnJlbnRWaWV3Zm9vLmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJ10pO1xuXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlld2ZvbyBkZWxldGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgIH1cbiAgICBcbiAgICAgY29udGFpbmVyQ3JlYXRlKGNvbnRhaW5lcnR5cGU6IHN0cmluZykge1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coXCJnYWxsYXJ5X3RlbXBsYXRlIGNvbnRhaW5lckNyZWF0ZSBcIiArIGNvbnRhaW5lcnR5cGUpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UuY29udGFpbmVyQ3JlYXRlKGNvbnRhaW5lcnR5cGUsIHRoaXMuY3VycmVudFZpZXdmb28uaWQsIHRoaXMubG9naW5Vc2VyLmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb250YWluZXIgQ3JlYXRlZFwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIHZhciBjb250YWluZXI6IENvbnRhaW5lciA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5jdXJyZW50Vmlld2Zvbyk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNvbnRhaW5lcmltYWdlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50Vmlld2Zvby5jb250YWluZXJzLnB1c2goY29udGFpbmVyKTtcblxuICAgICAgICAgICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoeyBzY3JvbGxUb3A6ICQoZG9jdW1lbnQpLmhlaWdodCgpIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5pbml0Q29udGFpbmVyRm9yRHJvcHpvbmUoY29udGFpbmVyKTtcblxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHZhciBkWm9uZSA9IHNlbGYuY3JlYXRlRHJvcFpvbmUoY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWV3Zm9vIGNyZWF0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAgICAgdXBkYXRlY29udGFpbmVyKGNvbnRhaW5lcnRpdGxlLCBjb250YWluZXJpZCkge1xuICAgIFxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmNvbnRhaW5lclVwZGF0ZShjb250YWluZXJ0aXRsZSwgY29udGFpbmVyaWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbnRhaW5lciB1cGRhdGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgICAgIGRlbGV0ZWNvbnRhaW5lcihjb250YWluZXJpZDogc3RyaW5nLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIC8vYWxlcnQoXCJkZWxldGUgXCIrY29udGFpbmVyaWQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImRlbGV0ZWNvbnRhaW5lciA6IFwiICsgY29udGFpbmVyaWQgKyBcIiAgaW5kZXggOiBcIiArIGluZGV4KTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHZhciBjdXJyQ29udGFpbmVyID0gc2VsZi5jdXJyZW50Vmlld2Zvby5jb250YWluZXJzW2luZGV4XTtcblxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmNvbnRhaW5lckRlbGV0ZShjb250YWluZXJpZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICBjdXJyQ29udGFpbmVyLmRlbGV0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50Vmlld2Zvby5jb250YWluZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgICAgICAgICAvL2RlbGV0ZSBzZWxmLmN1cnJlbnRWaWV3Zm9vLm1hcENvbnRhaW5lcltjb250YWluZXJpZF07XG4gICAgICAgICAgICAgICAgLy9jcmF0ZUJsYW5rSW1nKGNpZCwgbnVtRGl2KTtcbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29udGFpbmVyaW1hZ2UgZGVsZXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWxsb3dzaGFyaW5nKHZhbCkge1xuXG4gICAgICAgIGxldCBzZXR0aW5ndHlwZTogc3RyaW5nID0gXCJhbGxvd3NoYXJpbmdcIjtcblxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb291cGRhdGUodGhpcy5jdXJyZW50Vmlld2Zvby5pZCwgdmFsLCBzZXR0aW5ndHlwZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR2aWV3cnNldHRpbmd2YWx1ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpZXdmb28gdXBkYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSlcblxuICAgIH1cbiAgICBhbGxvd2NvbW1lbnQodmFsKSB7XG5cbiAgICAgICAgbGV0IHNldHRpbmd0eXBlOiBzdHJpbmcgPSBcImFsbG93Y29tbWVudFwiO1xuXG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb3VwZGF0ZSh0aGlzLmN1cnJlbnRWaWV3Zm9vLmlkLCB2YWwsIHNldHRpbmd0eXBlKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHZpZXdyc2V0dGluZ3ZhbHVlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlld2ZvbyB1cGRhdGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KVxuXG4gICAgfVxuICAgIGFsbG93c2VsZWN0aW9uKHZhbCkge1xuXG4gICAgICAgIGxldCBzZXR0aW5ndHlwZTogc3RyaW5nID0gXCJhbGxvd3NlbGVjdGlvblwiO1xuXG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb3VwZGF0ZSh0aGlzLmN1cnJlbnRWaWV3Zm9vLmlkLCB2YWwsIHNldHRpbmd0eXBlKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHZpZXdyc2V0dGluZ3ZhbHVlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlld2ZvbyB1cGRhdGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KVxuXG4gICAgfVxuICAgIGNoYW5nZWltYWdlc2l6ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmlhbWdlc2l6ZSA9IHZhbHVlO1xuICAgICAgICBsZXQgc2V0dGluZ3R5cGU6IHN0cmluZyA9IFwiaW1hZ2VzaXplXCI7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb3VwZGF0ZSh0aGlzLmN1cnJlbnRWaWV3Zm9vLmlkLCB0aGlzLmlhbWdlc2l6ZSwgc2V0dGluZ3R5cGUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlld2ZvbyB1cGRhdGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgIH1cbiAgICBjaGFuZ2Vtb3VzZWhvdmVyKHZhbCkge1xuXG4gICAgICAgIGxldCBzZXR0aW5ndHlwZTogc3RyaW5nID0gXCJpbWFnZWRhdGFtb3VzZWhvdmVyXCI7XG5cbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS52aWV3Zm9vdXBkYXRlKHRoaXMuY3VycmVudFZpZXdmb28uaWQsIHZhbCwgc2V0dGluZ3R5cGUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dmlld3JzZXR0aW5ndmFsdWUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWV3Zm9vIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICB9XG4gICAgY2hhbmdlZnJhbWUodmFsKSB7XG5cbiAgICAgICAgbGV0IHNldHRpbmd0eXBlOiBzdHJpbmcgPSBcImltYWdlaW5mb2ZyYW1lXCI7XG5cbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS52aWV3Zm9vdXBkYXRlKHRoaXMuY3VycmVudFZpZXdmb28uaWQsIHZhbCwgc2V0dGluZ3R5cGUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dmlld3JzZXR0aW5ndmFsdWUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWV3Zm9vIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuICAgIGltYWdlZGVmYXVsdG5vKHZhbCkge1xuXG4gICAgICAgIGxldCBzZXR0aW5ndHlwZTogc3RyaW5nID0gXCJpbWFnZWRlZmF1bHRub1wiO1xuICAgICAgICB0aGlzLmltYWdlZGVmYXVsdG5vID0gdmFsO1xuXG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb3VwZGF0ZSh0aGlzLmN1cnJlbnRWaWV3Zm9vLmlkLCB0aGlzLmltYWdlZGVmYXVsdG5vLCBzZXR0aW5ndHlwZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWV3Zm9vIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBjaGFuZ2ViZ2NvbG9yKHZhbCkge1xuICAgICAgICBhbGVydCh2YWwpO1xuICAgICAgICBsZXQgc2V0dGluZ3R5cGU6IHN0cmluZyA9IFwiYmFja2dyb3VuZGNvbG9yXCI7XG4gICAgICAgIGxldCBiYWNrZ3JvdW5kY29sb3I7XG4gICAgICAgIGlmICh2YWwgPT09IFwid2hpdGVcIikge1xuICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kY29sb3IgPSBcIiNGRkZGRkZcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWwgPT09IFwiYmxhY2tcIikge1xuICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kY29sb3IgPSBcIiMwMDAwMDBcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHsgfVxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb291cGRhdGUodGhpcy5jdXJyZW50Vmlld2Zvby5pZCwgdGhpcy5iYWNrZ3JvdW5kY29sb3IsIHNldHRpbmd0eXBlKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpZXdmb28gdXBkYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSlcblxuICAgIH1cblxuICAgIGNoYW5nZWZvbnRjb2xvcih2YWwpIHtcbiAgICAgICAgbGV0IHNldHRpbmd0eXBlOiBzdHJpbmcgPSBcIm1lbnVmb250Y29sb3JcIjtcblxuICAgICAgICBpZiAodmFsID09PSBcIndoaXRlXCIpIHtcbiAgICAgICAgICAgIHRoaXMubWVudWZvbnRjb2xvciA9IFwiI0ZGRkZGRlwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbCA9PT0gXCJibGFja1wiKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnVmb250Y29sb3IgPSBcIiMwMDAwMDBcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHsgfVxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb291cGRhdGUodGhpcy5jdXJyZW50Vmlld2Zvby5pZCwgdGhpcy5tZW51Zm9udGNvbG9yLCBzZXR0aW5ndHlwZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWV3Zm9vIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBjaGFuZ2VtZW51Ymdjb2xvcih2YWwpIHtcbiAgICAgICAgbGV0IHNldHRpbmd0eXBlOiBzdHJpbmcgPSBcIm1lbnViYWNrZ3JvdW5kY29sb3JcIjtcblxuICAgICAgICBpZiAodmFsID09PSBcIndoaXRlXCIpIHtcbiAgICAgICAgICAgIHRoaXMubWVudWJhY2tncm91bmRjb2xvciA9IFwiI0ZGRkZGRlwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbCA9PT0gXCJibGFja1wiKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnViYWNrZ3JvdW5kY29sb3IgPSBcIiMwMDAwMDBcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHsgfVxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb291cGRhdGUodGhpcy5jdXJyZW50Vmlld2Zvby5pZCwgdGhpcy5tZW51YmFja2dyb3VuZGNvbG9yLCBzZXR0aW5ndHlwZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWV3Zm9vIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuICAgIFxuICAgIHNlbGVjdHRlbXBsYXRlKCl7XG4gICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9zZWxlY3RfdGVtcGxhdGUnXSk7XG59XG5cbiB9XG4gXG5cbiJdfQ==
