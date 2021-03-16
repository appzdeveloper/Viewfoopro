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
var gallary_component_1 = require('../gallary/gallary.component');
var auth_service_1 = require('../../shared/services/auth.service');
var pagination_component_1 = require('../../shared/pagination/pagination.component');
var myGlobals = require('../../globals');
var substr_pipe_1 = require('../../shared/pipes/substr.pipe');
var sub_substr_pipe_1 = require('../../shared/pipes/sub_substr.pipe');
var GallaryTemplate1Component = (function () {
    function GallaryTemplate1Component(route, router, zone, authService) {
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.invalid = false;
        this.sharing = false;
        this.filename = "img/build_viewfoo/kim_sharma.jpg";
        this.currentViewfoo = {};
        this.serviceUrl = myGlobals.serviceUrl;
        this.folderlist = [];
        this.zone = zone;
    }
    GallaryTemplate1Component.prototype.creatingOrFetchingViewfoo = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            console.log("GallaryTemplateComponent > constructor ");
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
                        _this.currentViewfoo = data.viewfoo;
                        _this.currentViewfoo.containers = [];
                        _this.currentViewfoo.containers.push(data.container);
                        myGlobals.currentViewfoo = _this.currentViewfoo;
                        _this.currentViewfoo.mapContainer = {};
                        _this.currentViewfoo.mapDropzone = {};
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
                }, function (error) {
                    _this.errorMsg = error;
                    _this.loading = false;
                    console.log("viewfoo create fail: " + error);
                });
            }
        });
    };
    GallaryTemplate1Component.prototype.ngOnInit = function () {
        this.cropAvtar = new CropAvatar($('#crop-avatar'));
        this.creatingOrFetchingViewfoo();
        this.getfolderlist();
        var self = this;
        $(".CBimagesize").change(function () {
            var checked = $(this).is(':checked');
            $(".CBimagesize").prop('checked', false);
            if (checked) {
                $(this).prop('checked', true);
                this.imagesize = this.value;
            }
        });
        $(".private-btn").click(function () {
            $(".toggle-private").toggle();
        });
        $("[data-toggle]").click(function () {
            var toggle_el = $(this).data("toggle");
            $(toggle_el).toggleClass("open-sidebar");
        });
    };
    GallaryTemplate1Component.prototype.addnewfolder = function () {
        var _this = this;
        var val = $("#addnewfolder").val();
        this.authService.addfolder(this.loginUser.id, val)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
                _this.errorMsg = result.data;
                _this.getfolderlist();
            }
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("folder Add fail: " + error);
        });
    };
    GallaryTemplate1Component.prototype.displayTag = function (text) {
        $(".select_btn").text(text);
        $(".btn-group").removeClass("open");
    };
    GallaryTemplate1Component.prototype.setTextColor = function (picker) {
        console.log(picker.string());
    };
    GallaryTemplate1Component.prototype.selecttemplate = function () {
        this.router.navigate(['/select_template']);
    };
    GallaryTemplate1Component.prototype.containerCreate = function (containertype) {
        var _this = this;
        console.log("gallary_template containerCreate " + containertype);
        var self = this;
        this.authService.containerCreate(containertype, this.currentViewfoo.id, this.loginUser.id)
            .subscribe(function (result) {
            console.log("Container Created");
            console.log(result);
            var container = result.data;
            container.containerimages = [];
            _this.currentViewfoo.containers.push(container);
            _this.initContainerForDropzone(container);
            setTimeout(function () {
                var dZone = self.createDropZone(container);
            }, 1000);
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("viewfoo create fail: " + error);
        });
    };
    GallaryTemplate1Component.prototype.updatecontainer = function (containertitle, containerid) {
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
    GallaryTemplate1Component.prototype.deletecontainer = function (containerid, index) {
        var _this = this;
        var self = this;
        this.authService.containerDelete(containerid)
            .subscribe(function (result) {
            console.log(result);
            _this.currentViewfoo.containers.splice(index, 1);
            delete self.currentViewfoo.mapContainer[containerid];
        }, function (error) {
            _this.errorMsg = error;
            console.log("Containerimage delete fail: " + error);
        });
    };
    GallaryTemplate1Component.prototype.deleteviewfoo = function () {
        var _this = this;
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
    GallaryTemplate1Component.prototype.containerImageDelete = function (containerid, containerimageid, index) {
        var _this = this;
        var self = this;
        self.authService.containerImageDelete(containerimageid)
            .subscribe(function (result) {
            console.log(result);
            var container = self.currentViewfoo.mapContainer[containerid];
            var actualIndex = ((container.currentPage - 1) * container.itemsPerPage) + index;
            container.totalImageArray.splice(actualIndex, 1);
            container.containerimages.splice(actualIndex, 1);
            self.currentViewfoo.mapDropzone[containerid].index--;
            setTimeout(function () {
                self.copyArrayFromTotalToDisplay(container);
            }, 1000);
            if (self.currentViewfoo.mapContainer[containerid].containerimages.length == 0) {
                self.currentViewfoo.mapContainer[containerid].opacity = 1;
            }
        }, function (error) {
            _this.errorMsg = error;
            console.log("Containerimage delete fail: " + error);
        });
    };
    GallaryTemplate1Component.prototype.allowsharing = function (val) {
        var _this = this;
        var allowsharing = "no";
        var settingtype = "allowsharing";
        if (val === true) {
            allowsharing = "yes";
        }
        this.authService.viewfooupdate(this.currentViewfoo.id, allowsharing, settingtype)
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
    GallaryTemplate1Component.prototype.allowcomment = function (val) {
        var _this = this;
        var allowcomment = "no";
        var settingtype = "allowcomment";
        if (val === true) {
            allowcomment = "yes";
        }
        this.authService.viewfooupdate(this.currentViewfoo.id, allowcomment, settingtype)
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
    GallaryTemplate1Component.prototype.allowselection = function (val) {
        var _this = this;
        var allowselection = "no";
        var settingtype = "allowselection";
        if (val === true) {
            allowselection = "yes";
        }
        this.authService.viewfooupdate(this.currentViewfoo.id, allowselection, settingtype)
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
    GallaryTemplate1Component.prototype.changeimagesize = function (value) {
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
    GallaryTemplate1Component.prototype.changemousehover = function (val) {
        var _this = this;
        var imagedatamousehover = "no";
        var settingtype = "imagedatamousehover";
        if (val === true) {
            imagedatamousehover = "yes";
        }
        this.authService.viewfooupdate(this.currentViewfoo.id, imagedatamousehover, settingtype)
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
    GallaryTemplate1Component.prototype.changeframe = function (val) {
        var _this = this;
        var imageinfoframe = "no";
        var settingtype = "imageinfoframe";
        if (val === true) {
            imageinfoframe = "yes";
        }
        this.authService.viewfooupdate(this.currentViewfoo.id, imageinfoframe, settingtype)
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
    GallaryTemplate1Component.prototype.imagedefaultno = function (val) {
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
    GallaryTemplate1Component.prototype.changebgcolor = function (val) {
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
    GallaryTemplate1Component.prototype.changefontcolor = function (val) {
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
    GallaryTemplate1Component.prototype.changemenubgcolor = function (val) {
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
    GallaryTemplate1Component.prototype.onCropperPopupDone = function () {
        var $image = this.cropAvtar.$img;
        var croppedcanvas = $image.cropper('getCroppedCanvas');
        this.filename = croppedcanvas.toDataURL("image/png");
        $('#avatar-modal').modal('hide');
        $('#myPublishModal').modal('show');
    };
    GallaryTemplate1Component.prototype.uploadcover = function () {
        $('#avatar-modal').modal('show');
    };
    GallaryTemplate1Component.prototype.getfolderlist = function () {
        var _this = this;
        this.loginUser = myGlobals.LoginUser;
        this.authService.folderlist(this.loginUser.id)
            .subscribe(function (result) {
            if (result) {
                _this.folderlist = result.data;
                setTimeout(function () {
                    var Accordion = function (el, multiple) {
                        this.el = el || {};
                        console.log("Inside Accordion");
                        console.log(this.el);
                        this.multiple = multiple || false;
                        var links = this.el.find('.fa-angle-down');
                        console.log(links);
                        var links2 = this.el.find('.plusicon');
                        links.on('click', {
                            el: this.el,
                            multiple: this.multiple
                        }, this.dropdown);
                        links2.on('click', {
                            el: this.el,
                            multiple: this.multiple
                        }, this.dropdown);
                    };
                    Accordion.prototype.dropdown = function (e) {
                        var $el = e.data.el;
                        var $this = $(this);
                        var $next = $this.parent('div').next();
                        $next.slideToggle();
                        $this.parent().toggleClass('open');
                        if (!e.data.multiple) {
                        }
                    };
                    var accordion = new Accordion($('#accordion'), false);
                    $('.mainfolderadd').click(function () {
                        $('ul.accordion > li').removeClass('newcreate');
                        var functionCall = "'" + $("#addnewfolder").val() + "'";
                        $(this).parent().prev('div').removeClass('open');
                        $(this).parent().hide();
                        $('.subfolderadd').click(function () {
                            var parentUl = $(this).parent().parent().parent();
                            var text = parentUl.prev('div').children('span').text();
                            if (parentUl.parent().hasClass("latest")) {
                                var inputVal = $(this).prev('input').val();
                                var functionCall = "'" + text + "/" + inputVal + "'";
                                parentUl.append('<li onclick="displaysubtag(' + functionCall + ')"><a href="javascript:void()">' + inputVal + '</a></li>');
                            }
                        });
                    });
                    $('.subfolderadd').click(function () {
                        var parentUl = $(this).parent().parent().parent();
                        var text = parentUl.prev('div').children('span').text();
                        var inputVal = $(this).prev('input').val();
                        var functionCall = "'" + text + "/" + inputVal + "'";
                        parentUl.append('<li onclick="displaysubtag(' + functionCall + ')"><a href="javascript:void()">' + inputVal + '</a></li>');
                    });
                    function displaysubtag(text) {
                        $(".select_btn").text(text);
                        $(".btn-group").removeClass("open");
                    }
                    $(".select_btn").click(function () {
                        $(".btn-group").toggleClass("open");
                    });
                    $(".closeicon").click(function () {
                        $(".btn-group").removeClass("open");
                    });
                }, 1000);
            }
        }, function (error) {
            console.log("viewfoo list fail: " + error);
        });
    };
    GallaryTemplate1Component.prototype.publishviewfoo = function () {
        console.log(this.vftitle);
        console.log(this.vftags);
        console.log(this.filename);
        console.log(this.folderid);
    };
    GallaryTemplate1Component = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gallary',
            templateUrl: 'gallary_template1.component.html',
            pipes: [substr_pipe_1.SubstrPipe, sub_substr_pipe_1.Sub_SubstrPipe],
            directives: [router_1.ROUTER_DIRECTIVES, pagination_component_1.PaginationComponent, forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, gallary_component_1.GallaryComponent]
        }), 
        __metadata('design:paramtypes', [router_2.ActivatedRoute, router_1.Router, core_1.NgZone, auth_service_1.AuthService])
    ], GallaryTemplate1Component);
    return GallaryTemplate1Component;
}());
exports.GallaryTemplate1Component = GallaryTemplate1Component;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90ZW1wbGF0ZXMvdmlld2Zvb19wcm9fZ2FsbGFyeTEvZ2FsbGFyeV90ZW1wbGF0ZTEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxxQkFBd0MsZUFBZSxDQUFDLENBQUE7QUFDeEQsdUJBQXdDLGlCQUFpQixDQUFDLENBQUE7QUFDMUQsdUJBQXVDLGlCQUFpQixDQUFDLENBQUE7QUFFekQsdUJBQThCLGlCQUFpQixDQUFDLENBQUE7QUFDaEQsc0JBQXlDLGdCQUFnQixDQUFDLENBQUE7QUFFMUQsa0NBQWlDLDhCQUE4QixDQUFDLENBQUE7QUFHaEUsNkJBQTRCLG9DQUFvQyxDQUFDLENBQUE7QUFHakUscUNBQWtDLDhDQUE4QyxDQUFDLENBQUE7QUFDakYsSUFBTyxTQUFTLFdBQVcsZUFBZSxDQUFDLENBQUM7QUFDNUMsNEJBQTJCLGdDQUFnQyxDQUFDLENBQUE7QUFDNUQsZ0NBQStCLG9DQUFvQyxDQUFDLENBQUE7QUFTcEU7SUE4QkksbUNBQW9CLEtBQXFCLEVBQzdCLE1BQWMsRUFBRSxJQUFZLEVBQVUsV0FBd0I7UUFEdEQsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDN0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUF3QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQTNCMUUsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBR2xCLGFBQVEsR0FBVyxrQ0FBa0MsQ0FBQztRQVc3RCxtQkFBYyxHQUFZLEVBQUUsQ0FBQztRQUk3QixlQUFVLEdBQVcsU0FBUyxDQUFDLFVBQVUsQ0FBQztRQUMxQyxlQUFVLEdBQVksRUFBRSxDQUFDO1FBT3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCw2REFBeUIsR0FBekI7UUFBQSxpQkFrRUM7UUFqRUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxT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Q3pCLENBQUMsQ0FBQyxDQUFDO2dCQUl0QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDYixDQUFDO1FBQ0wsQ0FBQyxFQUFFLFVBQUMsS0FBVTtZQUVWLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7SUFFWCxDQUFDO0lBQ0Qsa0RBQWMsR0FBZDtRQUVJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRS9CLENBQUM7SUFocUJMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUUsa0NBQWtDO1lBQy9DLEtBQUssRUFBRSxDQUFDLHdCQUFVLEVBQUUsZ0NBQWMsQ0FBQztZQUNuQyxVQUFVLEVBQUUsQ0FBQywwQkFBaUIsRUFBRSwwQ0FBbUIsRUFBRSxnQ0FBd0IsRUFBRSx3QkFBZSxFQUFFLG9DQUFnQixDQUFDO1NBQ3BILENBQUM7O2lDQUFBO0lBOHBCRixnQ0FBQztBQUFELENBN3BCQSxBQTZwQkMsSUFBQTtBQTdwQlksaUNBQXlCLDRCQTZwQnJDLENBQUEiLCJmaWxlIjoiYXBwL3RlbXBsYXRlcy92aWV3Zm9vX3Byb19nYWxsYXJ5MS9nYWxsYXJ5X3RlbXBsYXRlMS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLCBSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEdhbGxhcnlDb21wb25lbnQgfSBmcm9tICcuLi9nYWxsYXJ5L2dhbGxhcnkuY29tcG9uZW50JztcblxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3Zm9vIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtQYWdpbmF0aW9uQ29tcG9uZW50fSBmcm9tICcuLi8uLi9zaGFyZWQvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vLi4vZ2xvYmFscycpO1xuaW1wb3J0IHsgU3Vic3RyUGlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9waXBlcy9zdWJzdHIucGlwZSc7XG5pbXBvcnQgeyBTdWJfU3Vic3RyUGlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9waXBlcy9zdWJfc3Vic3RyLnBpcGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnZ2FsbGFyeScsXG4gICAgdGVtcGxhdGVVcmw6ICdnYWxsYXJ5X3RlbXBsYXRlMS5jb21wb25lbnQuaHRtbCcsXG4gICAgcGlwZXM6IFtTdWJzdHJQaXBlLCBTdWJfU3Vic3RyUGlwZV0sXG4gICAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTLCBQYWdpbmF0aW9uQ29tcG9uZW50LCBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMsIENPUkVfRElSRUNUSVZFUywgR2FsbGFyeUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgR2FsbGFyeVRlbXBsYXRlMUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHVibGljIHZmdGl0bGU6IHN0cmluZztcbiAgICBwdWJsaWMgdmZ0YWdzOiBzdHJpbmc7XG4gICAgcHVibGljIG1zZzogc3RyaW5nO1xuICAgIGludmFsaWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgY29udGFpbmVydHlwZTogc3RyaW5nO1xuICAgIHNoYXJpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBsb2dpblVzZXI6IFVzZXI7XG4gICAgXG4gICAgcHVibGljIGZpbGVuYW1lOiBzdHJpbmcgPSBcImltZy9idWlsZF92aWV3Zm9vL2tpbV9zaGFybWEuanBnXCI7XG4gICAgXG4gICAgcHVibGljIGltYWdlc2l6ZTogc3RyaW5nO1xuICAgIHB1YmxpYyBpbWFnZWRlZmF1bHRubzogc3RyaW5nO1xuICAgIHB1YmxpYyBjb250YWluZXJ0eXBlOiBzdHJpbmc7XG4gICAgcHVibGljIGJhY2tncm91bmRjb2xvcjogc3RyaW5nO1xuICAgIHB1YmxpYyBtZW51Zm9udGNvbG9yOiBzdHJpbmc7XG4gICAgcHVibGljIG1lbnViYWNrZ3JvdW5kY29sb3I6IHN0cmluZztcbiAgICBwdWJsaWMgbmV3Zm9sZGVybmFtZTogc3RyaW5nO1xuXG5cbiAgICBjdXJyZW50Vmlld2ZvbzogVmlld2ZvbyA9IHt9O1xuXG4gICAgdmlld2Zvb2lkOiBzdHJpbmc7XG4gICAgY29udGFpbmVyaWQ6IHN0cmluZztcbiAgICBzZXJ2aWNlVXJsOiBzdHJpbmcgPSBteUdsb2JhbHMuc2VydmljZVVybDtcbiAgICBmb2xkZXJsaXN0OiB2aWV3Zm9vID0gW107XG5cbiAgICBteURyb3B6b25lOiBhbnk7XG5cbiAgICB6b25lOiBOZ1pvbmU7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy56b25lID0gem9uZTtcbiAgICB9XG5cbiAgICBjcmVhdGluZ09yRmV0Y2hpbmdWaWV3Zm9vKCkge1xuICAgICAgICB0aGlzLnN1YiA9IHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYWxsYXJ5VGVtcGxhdGVDb21wb25lbnQgPiBjb25zdHJ1Y3RvciBcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xuICAgICAgICAgICAgdGhpcy52aWV3Zm9vaWQgPSBwYXJhbXNbJ3ZpZXdmb29pZCddOyAvLyAoKykgY29udmVydHMgc3RyaW5nICdpZCcgdG8gYSBudW1iZXJcblxuICAgICAgICAgICAgdGhpcy5sb2dpblVzZXIgPSBteUdsb2JhbHMuTG9naW5Vc2VyO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxvZ2luVXNlcik7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy52aWV3Zm9vaWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0aW5nIG5ldyB2aWV3Zm9vXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVydHlwZSA9IFwiZ2FsbGVyeVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb2NyZWF0ZSh0aGlzLmNvbnRhaW5lcnR5cGUsIHRoaXMubG9naW5Vc2VyLmlkKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRWaWV3Zm9vID0gZGF0YS52aWV3Zm9vO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFZpZXdmb28uY29udGFpbmVycyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFZpZXdmb28uY29udGFpbmVycy5wdXNoKGRhdGEuY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuY29udGFpbmVycyA9IGRhdGEuY29udGFpbmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpZXdmb29cIit0aGlzLlZpZXdmb28pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29udGFpbmVyXCIrdGhpcy5jb250YWluZXIuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15R2xvYmFscy5jdXJyZW50Vmlld2ZvbyA9IHRoaXMuY3VycmVudFZpZXdmb287XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9teUdsb2JhbHMuVmlld2Zvb2NvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Vmlld2Zvby5tYXBDb250YWluZXIgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRWaWV3Zm9vLm1hcERyb3B6b25lID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlld2ZvbyBjcmVhdGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2UgaGF2ZSB2aWV3Zm9vIGlkXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb0RldGFpbCh0aGlzLnZpZXdmb29pZClcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFZpZXdmb28gPSByZXN1bHQuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbXlHbG9iYWxzLmN1cnJlbnRWaWV3Zm9vID0gdGhpcy5jdXJyZW50Vmlld2ZvbztcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Vmlld2Zvby5tYXBDb250YWluZXIgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFZpZXdmb28ubWFwRHJvcHpvbmUgPSB7fTtcblxuICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY3VycmVudFZpZXdmb28uY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY3VycmVudFZpZXdmb28uY29udGFpbmVyc1tpXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5pbml0Q29udGFpbmVyRm9yRHJvcHpvbmUoY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuY3VycmVudFZpZXdmb28pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuY3JlYXRpbmdEcm9wem9uZUluc3RhbmNlcygpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlld2ZvbyBjcmVhdGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIFxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY3JvcEF2dGFyID0gbmV3IENyb3BBdmF0YXIoJCgnI2Nyb3AtYXZhdGFyJykpO1xuICAgICAgICB0aGlzLmNyZWF0aW5nT3JGZXRjaGluZ1ZpZXdmb28oKTtcbiAgICAgICAgdGhpcy5nZXRmb2xkZXJsaXN0KCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgJChcIi5DQmltYWdlc2l6ZVwiKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY2hlY2tlZCA9ICQodGhpcykuaXMoJzpjaGVja2VkJyk7XG4gICAgICAgICAgICAkKFwiLkNCaW1hZ2VzaXplXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICQodGhpcykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZXNpemUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkKFwiLnByaXZhdGUtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJChcIi50b2dnbGUtcHJpdmF0ZVwiKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cblxuXG4gICAgICAgICQoXCJbZGF0YS10b2dnbGVdXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHRvZ2dsZV9lbCA9ICQodGhpcykuZGF0YShcInRvZ2dsZVwiKTtcbiAgICAgICAgICAgICQodG9nZ2xlX2VsKS50b2dnbGVDbGFzcyhcIm9wZW4tc2lkZWJhclwiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vICAgICAgICBcbiAgICAgICAgLy8gICAgICAgICAgICQoXCIuanNjb2xvICAgICAgICByXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyAgICAgICAgICAgdmFyIGpzXyAgICAgICAgY29sb3IgPSBuZXcganNjb2xvcigpO1xuICAgICAgICAvLyAgICAgICAgICAgJChcIi5qc2MgICAgICAgIG9sb3JcIikuanNjb2xvci5zaG93KCk7XG4gICAgICAgIC8vICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgLy8gICAgICAgICQoJy5uYXZfYmFyJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgJCgnLm5hdmlnYXRpb24nKS50b2dnbGVDbGFzcygndmlzaWJsZScpO1xuICAgICAgICAvLyAgICAgICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnb3BhY2l0eScpO1xuICAgICAgICAvLyAgICAgICAgfSk7XG5cblxuXG4gICAgICAgIC8vICAgICAgICAkKFwiLm9wZW5QcmV2aWV3SW1hZ2VcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgdmFyIG51bWJlciA9ICQoJy5kaXNwbGF5SW1hZ2U6bm90KC5ibGFua2xpKScpLmxlbmd0aDtcbiAgICAgICAgLy8gICAgICAgICAgICB2YXIgb3dsID0gJChcIiNvd2wtZGVtb1wiKTtcbiAgICAgICAgLy8gICAgICAgICAgICBvd2wub3dsQ2Fyb3VzZWwoKTtcbiAgICAgICAgLy8gICAgICAgICAgICBpZiAobnVtYmVyID4gMCkge1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgICAgICAgICBvd2wuZGF0YSgnb3dsQ2Fyb3VzZWwnKS5yZW1vdmVJdGVtKCk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyOyBpKyspIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy92YXIgb3dsID0gJChcIiNvd2wtZGVtb1wiKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdmFyIHRlc3QgPSAkKFwiLmRpc3BsYXlJbWFnZTplcSgnXCIgKyBpICsgXCInKSA+IC5kei1pbWFnZSBpbWdcIikuYXR0cignc3JjJyk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHZhciB0ZXN0MSA9ICc8aW1nIGFsdD1cIlwiIHNyYz1cIicgKyB0ZXN0ICsgJ1wiPic7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gXCI8ZGl2IGNsYXNzPVxcXCJpdGVtIFxcXCI+PGgxPlwiICsgdGVzdDEgKyBcIjwvaDE+PC9kaXY+XCI7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIG93bC5kYXRhKCdvd2xDYXJvdXNlbCcpLmFkZEl0ZW0oY29udGVudCk7XG4gICAgICAgIC8vICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICAkKFwiLnByaXZhdGUtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyAgICAgICAgICAgICQoXCIudG9nZ2xlLXByaXZhdGVcIikudG9nZ2xlKCk7XG4gICAgICAgIC8vICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkbmV3Zm9sZGVyKCkge1xuICAgICAgICBsZXQgdmFsID0gJChcIiNhZGRuZXdmb2xkZXJcIikudmFsKCk7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UuYWRkZm9sZGVyKHRoaXMubG9naW5Vc2VyLmlkLCB2YWwpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRmb2xkZXJsaXN0KCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvbGRlciBBZGQgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgZGlzcGxheVRhZyh0ZXh0KSB7XG4gICAgICAgIC8vIGFsZXJ0KHRleHQpO1xuICAgICAgICAkKFwiLnNlbGVjdF9idG5cIikudGV4dCh0ZXh0KTtcbiAgICAgICAgJChcIi5idG4tZ3JvdXBcIikucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpO1xuICAgIH1cbiAgICBzZXRUZXh0Q29sb3IocGlja2VyKSB7XG4gICAgICAgIC8vZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5zdHlsZS5jb2xvciA9ICcjJyArIHBpY2tlci50b1N0cmluZygpXG4gICAgICAgIGNvbnNvbGUubG9nKHBpY2tlci5zdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgc2VsZWN0dGVtcGxhdGUoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3NlbGVjdF90ZW1wbGF0ZSddKTtcbiAgICB9XG5cblxuICAgIGNvbnRhaW5lckNyZWF0ZShjb250YWluZXJ0eXBlOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJnYWxsYXJ5X3RlbXBsYXRlIGNvbnRhaW5lckNyZWF0ZSBcIiArIGNvbnRhaW5lcnR5cGUpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UuY29udGFpbmVyQ3JlYXRlKGNvbnRhaW5lcnR5cGUsIHRoaXMuY3VycmVudFZpZXdmb28uaWQsIHRoaXMubG9naW5Vc2VyLmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb250YWluZXIgQ3JlYXRlZFwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIHZhciBjb250YWluZXI6IENvbnRhaW5lciA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5jdXJyZW50Vmlld2Zvbyk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNvbnRhaW5lcmltYWdlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Vmlld2Zvby5jb250YWluZXJzLnB1c2goY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRDb250YWluZXJGb3JEcm9wem9uZShjb250YWluZXIpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRab25lID0gc2VsZi5jcmVhdGVEcm9wWm9uZShjb250YWluZXIpO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpZXdmb28gY3JlYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlY29udGFpbmVyKGNvbnRhaW5lcnRpdGxlLCBjb250YWluZXJpZCkge1xuICAgICAgICAvL2FsZXJ0KCAgICAgICAgXG4gICAgICAgIC8vIGFsZXJ0KHRoaXMuVmlld2Zvby5pZCk7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UuY29udGFpbmVyVXBkYXRlKGNvbnRhaW5lcnRpdGxlLCBjb250YWluZXJpZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29udGFpbmVyIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBkZWxldGVjb250YWluZXIoY29udGFpbmVyaWQ6IHN0cmluZywgaW5kZXg6IG51bWJlcikge1xuICAgICAgICAvL2FsZXJ0KFwiZGVsZXRlIFwiK2NvbnRhaW5lcmlkKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmNvbnRhaW5lckRlbGV0ZShjb250YWluZXJpZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRWaWV3Zm9vLmNvbnRhaW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgc2VsZi5jdXJyZW50Vmlld2Zvby5tYXBDb250YWluZXJbY29udGFpbmVyaWRdO1xuICAgICAgICAgICAgICAgIC8vY3JhdGVCbGFua0ltZyhjaWQsIG51bURpdik7XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbnRhaW5lcmltYWdlIGRlbGV0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICBkZWxldGV2aWV3Zm9vKCkge1xuXG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb2RlbGV0ZSh0aGlzLmN1cnJlbnRWaWV3Zm9vLmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJ10pO1xuXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlld2ZvbyBkZWxldGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgY29udGFpbmVySW1hZ2VEZWxldGUoY29udGFpbmVyaWQ6IHN0cmluZywgY29udGFpbmVyaW1hZ2VpZDogc3RyaW5nLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5hdXRoU2VydmljZS5jb250YWluZXJJbWFnZURlbGV0ZShjb250YWluZXJpbWFnZWlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcblxuXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHNlbGYuY3VycmVudFZpZXdmb28ubWFwQ29udGFpbmVyW2NvbnRhaW5lcmlkXTtcblxuICAgICAgICAgICAgICAgIHZhciBhY3R1YWxJbmRleCA9ICgoY29udGFpbmVyLmN1cnJlbnRQYWdlIC0gMSkgKiBjb250YWluZXIuaXRlbXNQZXJQYWdlKSArIGluZGV4O1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci50b3RhbEltYWdlQXJyYXkuc3BsaWNlKGFjdHVhbEluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY29udGFpbmVyaW1hZ2VzLnNwbGljZShhY3R1YWxJbmRleCwgMSk7XG5cblxuICAgICAgICAgICAgICAgIC8vdmFyIGNvbnRhaW5lckltYWdlID0gc2VsZi5jcmF0ZUJsYW5rSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAvL3NlbGYuY3VycmVudFZpZXdmb28ubWFwQ29udGFpbmVyW2NvbnRhaW5lcmlkXS50b3RhbEltYWdlQXJyYXkucHVzaChjb250YWluZXJJbWFnZSk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRWaWV3Zm9vLm1hcERyb3B6b25lW2NvbnRhaW5lcmlkXS5pbmRleC0tO1xuXG4gICAgICAgICAgICAgICAgLy9zZWxmLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheShjb250YWluZXIpOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvcHlBcnJheUZyb21Ub3RhbFRvRGlzcGxheShjb250YWluZXIpO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmN1cnJlbnRWaWV3Zm9vLm1hcENvbnRhaW5lcltjb250YWluZXJpZF0uY29udGFpbmVyaW1hZ2VzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFZpZXdmb28ubWFwQ29udGFpbmVyW2NvbnRhaW5lcmlkXS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb250YWluZXJpbWFnZSBkZWxldGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGFsbG93c2hhcmluZyh2YWwpIHtcblxuICAgICAgICBsZXQgYWxsb3dzaGFyaW5nOiBzdHJpbmcgPSBcIm5vXCI7XG4gICAgICAgIGxldCBzZXR0aW5ndHlwZTogc3RyaW5nID0gXCJhbGxvd3NoYXJpbmdcIjtcbiAgICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgYWxsb3dzaGFyaW5nID0gXCJ5ZXNcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb291cGRhdGUodGhpcy5jdXJyZW50Vmlld2Zvby5pZCwgYWxsb3dzaGFyaW5nLCBzZXR0aW5ndHlwZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWV3Zm9vIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICB9XG4gICAgYWxsb3djb21tZW50KHZhbCkge1xuICAgICAgICBsZXQgYWxsb3djb21tZW50OiBzdHJpbmcgPSBcIm5vXCI7XG4gICAgICAgIGxldCBzZXR0aW5ndHlwZTogc3RyaW5nID0gXCJhbGxvd2NvbW1lbnRcIjtcbiAgICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgYWxsb3djb21tZW50ID0gXCJ5ZXNcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb291cGRhdGUodGhpcy5jdXJyZW50Vmlld2Zvby5pZCwgYWxsb3djb21tZW50LCBzZXR0aW5ndHlwZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWV3Zm9vIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICB9XG4gICAgYWxsb3dzZWxlY3Rpb24odmFsKSB7XG4gICAgICAgIGxldCBhbGxvd3NlbGVjdGlvbjogc3RyaW5nID0gXCJub1wiO1xuICAgICAgICBsZXQgc2V0dGluZ3R5cGU6IHN0cmluZyA9IFwiYWxsb3dzZWxlY3Rpb25cIjtcbiAgICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgYWxsb3dzZWxlY3Rpb24gPSBcInllc1wiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb3VwZGF0ZSh0aGlzLmN1cnJlbnRWaWV3Zm9vLmlkLCBhbGxvd3NlbGVjdGlvbiwgc2V0dGluZ3R5cGUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlld2ZvbyB1cGRhdGUgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KVxuXG4gICAgfVxuICAgIGNoYW5nZWltYWdlc2l6ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmlhbWdlc2l6ZSA9IHZhbHVlO1xuICAgICAgICBsZXQgc2V0dGluZ3R5cGU6IHN0cmluZyA9IFwiaW1hZ2VzaXplXCI7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb3VwZGF0ZSh0aGlzLmN1cnJlbnRWaWV3Zm9vLmlkLCB0aGlzLmlhbWdlc2l6ZSwgc2V0dGluZ3R5cGUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpZXdmb28gdXBkYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICB9XG4gICAgY2hhbmdlbW91c2Vob3Zlcih2YWwpIHtcbiAgICAgICAgbGV0IGltYWdlZGF0YW1vdXNlaG92ZXI6IHN0cmluZyA9IFwibm9cIjtcbiAgICAgICAgbGV0IHNldHRpbmd0eXBlOiBzdHJpbmcgPSBcImltYWdlZGF0YW1vdXNlaG92ZXJcIjtcbiAgICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaW1hZ2VkYXRhbW91c2Vob3ZlciA9IFwieWVzXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS52aWV3Zm9vdXBkYXRlKHRoaXMuY3VycmVudFZpZXdmb28uaWQsIGltYWdlZGF0YW1vdXNlaG92ZXIsIHNldHRpbmd0eXBlKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpZXdmb28gdXBkYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSlcblxuICAgIH1cbiAgICBjaGFuZ2VmcmFtZSh2YWwpIHtcbiAgICAgICAgbGV0IGltYWdlaW5mb2ZyYW1lOiBzdHJpbmcgPSBcIm5vXCI7XG4gICAgICAgIGxldCBzZXR0aW5ndHlwZTogc3RyaW5nID0gXCJpbWFnZWluZm9mcmFtZVwiO1xuICAgICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpbWFnZWluZm9mcmFtZSA9IFwieWVzXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS52aWV3Zm9vdXBkYXRlKHRoaXMuY3VycmVudFZpZXdmb28uaWQsIGltYWdlaW5mb2ZyYW1lLCBzZXR0aW5ndHlwZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWV3Zm9vIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuICAgIGltYWdlZGVmYXVsdG5vKHZhbCkge1xuXG4gICAgICAgIGxldCBzZXR0aW5ndHlwZTogc3RyaW5nID0gXCJpbWFnZWRlZmF1bHRub1wiO1xuICAgICAgICB0aGlzLmltYWdlZGVmYXVsdG5vID0gdmFsO1xuXG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb3VwZGF0ZSh0aGlzLmN1cnJlbnRWaWV3Zm9vLmlkLCB0aGlzLmltYWdlZGVmYXVsdG5vLCBzZXR0aW5ndHlwZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWV3Zm9vIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBjaGFuZ2ViZ2NvbG9yKHZhbCkge1xuICAgICAgICBhbGVydCh2YWwpO1xuICAgICAgICBsZXQgc2V0dGluZ3R5cGU6IHN0cmluZyA9IFwiYmFja2dyb3VuZGNvbG9yXCI7XG4gICAgICAgIGxldCBiYWNrZ3JvdW5kY29sb3I7XG4gICAgICAgIGlmICh2YWwgPT09IFwid2hpdGVcIikge1xuICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kY29sb3IgPSBcIiNGRkZGRkZcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWwgPT09IFwiYmxhY2tcIikge1xuICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kY29sb3IgPSBcIiMwMDAwMDBcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHsgfVxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb291cGRhdGUodGhpcy5jdXJyZW50Vmlld2Zvby5pZCwgdGhpcy5iYWNrZ3JvdW5kY29sb3IsIHNldHRpbmd0eXBlKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpZXdmb28gdXBkYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSlcblxuICAgIH1cblxuICAgIGNoYW5nZWZvbnRjb2xvcih2YWwpIHtcbiAgICAgICAgbGV0IHNldHRpbmd0eXBlOiBzdHJpbmcgPSBcIm1lbnVmb250Y29sb3JcIjtcblxuICAgICAgICBpZiAodmFsID09PSBcIndoaXRlXCIpIHtcbiAgICAgICAgICAgIHRoaXMubWVudWZvbnRjb2xvciA9IFwiI0ZGRkZGRlwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbCA9PT0gXCJibGFja1wiKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnVmb250Y29sb3IgPSBcIiMwMDAwMDBcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHsgfVxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb291cGRhdGUodGhpcy5jdXJyZW50Vmlld2Zvby5pZCwgdGhpcy5tZW51Zm9udGNvbG9yLCBzZXR0aW5ndHlwZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWV3Zm9vIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBjaGFuZ2VtZW51Ymdjb2xvcih2YWwpIHtcbiAgICAgICAgbGV0IHNldHRpbmd0eXBlOiBzdHJpbmcgPSBcIm1lbnViYWNrZ3JvdW5kY29sb3JcIjtcblxuICAgICAgICBpZiAodmFsID09PSBcIndoaXRlXCIpIHtcbiAgICAgICAgICAgIHRoaXMubWVudWJhY2tncm91bmRjb2xvciA9IFwiI0ZGRkZGRlwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbCA9PT0gXCJibGFja1wiKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnViYWNrZ3JvdW5kY29sb3IgPSBcIiMwMDAwMDBcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHsgfVxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb291cGRhdGUodGhpcy5jdXJyZW50Vmlld2Zvby5pZCwgdGhpcy5tZW51YmFja2dyb3VuZGNvbG9yLCBzZXR0aW5ndHlwZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWV3Zm9vIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvL2FkZGVkIG9uIDcganVseSAyMDE2XG4gICAgb25Dcm9wcGVyUG9wdXBEb25lKCkge1xuICAgICAgICB2YXIgJGltYWdlID0gdGhpcy5jcm9wQXZ0YXIuJGltZztcbiAgICAgICAgdmFyIGNyb3BwZWRjYW52YXMgPSAkaW1hZ2UuY3JvcHBlcignZ2V0Q3JvcHBlZENhbnZhcycpO1xuICAgICAgICB0aGlzLmZpbGVuYW1lID0gY3JvcHBlZGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XG4gICAgICAgICQoJyNhdmF0YXItbW9kYWwnKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICAkKCcjbXlQdWJsaXNoTW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuXG5cbiAgICB9XG4gICAgdXBsb2FkY292ZXIoKSB7XG4gICAgICAgICQoJyNhdmF0YXItbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuXG4gICAgfVxuICAgIGdldGZvbGRlcmxpc3QoKSB7XG5cbiAgICAgICAgdGhpcy5sb2dpblVzZXIgPSBteUdsb2JhbHMuTG9naW5Vc2VyO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmZvbGRlcmxpc3QodGhpcy5sb2dpblVzZXIuaWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvbGRlcmxpc3QgPSByZXN1bHQuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICAvL2NoYW5nZXMgZG9uZSBvbiA3IGp1bHkgMjAxNlxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gJChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBBY2NvcmRpb24gPSBmdW5jdGlvbihlbCwgbXVsdGlwbGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWwgPSBlbCB8fCB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkluc2lkZSBBY2NvcmRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5lbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm11bHRpcGxlID0gbXVsdGlwbGUgfHwgZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVmFyaWFibGVzIHByaXZhZGFzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmtzID0gdGhpcy5lbC5maW5kKCcuZmEtYW5nbGUtZG93bicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxpbmtzKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmtzMiA9IHRoaXMuZWwuZmluZCgnLnBsdXNpY29uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXZlbnRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua3Mub24oJ2NsaWNrJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbDogdGhpcy5lbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGU6IHRoaXMubXVsdGlwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLmRyb3Bkb3duKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rczIub24oJ2NsaWNrJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbDogdGhpcy5lbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGU6IHRoaXMubXVsdGlwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLmRyb3Bkb3duKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBBY2NvcmRpb24ucHJvdG90eXBlLmRyb3Bkb3duID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWxlcnQoXCJIZWxsb1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGVsID0gZS5kYXRhLmVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRuZXh0ID0gJHRoaXMucGFyZW50KCdkaXYnKS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJG5leHQuc2xpZGVUb2dnbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS50b2dnbGVDbGFzcygnb3BlbicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlLmRhdGEubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8kZWwuZmluZCgnLnN1Ym1lbnUnKS5ub3QoJG5leHQpLnNsaWRlVXAoKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjY29yZGlvbiA9IG5ldyBBY2NvcmRpb24oJCgnI2FjY29yZGlvbicpLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcubWFpbmZvbGRlcmFkZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJ3VsLmFjY29yZGlvbiA+IGxpJykucmVtb3ZlQ2xhc3MoJ25ld2NyZWF0ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmdW5jdGlvbkNhbGwgPSBcIidcIiArICQoXCIjYWRkbmV3Zm9sZGVyXCIpLnZhbCgpICsgXCInXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8kKCd1bCNhZGRmb2xkZXInKS5hcHBlbmQoJzxsaSBjbGFzcz1cIm5ld2NyZWF0ZSBsYXRlc3RcIj48ZGl2IGNsYXNzPVwibGlua1wiPjxzcGFuIG9uY2xpY2s9XCJkaXNwbGF5VGFnKCcrZnVuY3Rpb25DYWxsKycpXCI+JyskKFwiI2FkZG5ld2ZvbGRlclwiKS52YWwoKSsnPC9zcGFuPjxpIGNsYXNzPVwiZmEgIGZhLWFuZ2xlLWRvd25cIj48L2k+PC9kaXY+PHVsIGNsYXNzPVwic3VibWVudVwiPjxsaT48ZGl2IGNsYXNzPVwibGluayBzdWJfYWRkXCI+PHNwYW4+QWRkIE5ldyBzdWIgZm9sZGVyPC9zcGFuPjxpIGNsYXNzPVwicGx1c2ljb25cIj48L2k+PC9kaXY+PHVsIGNsYXNzPVwic3VibWVudVwiPjxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgc3ViIGZvbGRlciBuYW1lXCIgaWQ9XCJhZGRuZXdzdWJmb2xkZXJcIj48YnV0dG9uIGNsYXNzPVwiYWRkX2J0biBzdWJmb2xkZXJhZGRcIj5BZGQ8L2J1dHRvbj48L3VsPjwvbGk+PC91bD48L2xpPicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gJCgndWwjYWRkZm9sZGVyJykuYXBwZW5kKCc8bGkgY2xhc3M9XCJuZXdjcmVhdGUgbGF0ZXN0XCI+PGRpdiBjbGFzcz1cImxpbmtcIj48c3BhbiBvbmNsaWNrPVwiZGlzcGxheVRhZygnICsgZnVuY3Rpb25DYWxsICsgJylcIj4nICsgJChcIiNhZGRuZXdmb2xkZXJcIikudmFsKCkgKyAnPC9zcGFuPjxpIGNsYXNzPVwiZmEgIGZhLWFuZ2xlLWRvd25cIj48L2k+PC9kaXY+PHVsIGNsYXNzPVwic3VibWVudVwiPjxsaT48ZGl2IGNsYXNzPVwibGluayBhZGRmb2xkZXIgc3ViX2FkZFwiPjxpIGNsYXNzPVwicGx1c2ljb25cIj48L2k+PHNwYW4+QWRkIE5ldyBzdWIgZm9sZGVyPC9zcGFuPjwvZGl2Pjx1bCBjbGFzcz1cInN1Ym1lbnVcIj48aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHN1YiBmb2xkZXIgbmFtZVwiIGlkPVwiYWRkbmV3c3ViZm9sZGVyXCI+PGJ1dHRvbiBjbGFzcz1cImFkZF9idG4gc3ViZm9sZGVyYWRkXCI+QWRkPC9idXR0b24+PC91bD48L2xpPjwvdWw+PC9saT4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2YXIgYWNjb3JkaW9uID0gbmV3IEFjY29yZGlvbigkKCcubmV3Y3JlYXRlJyksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnByZXYoJ2RpdicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5uZXdmb2xkZXJuYW1lID0gJChcIiNhZGRuZXdmb2xkZXJcIikudmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWxmLmFkZG5ld2ZvbGRlcigkKFwiI2FkZG5ld2ZvbGRlclwiKS52YWwoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxlcnQoJChcIiNhZGRuZXdmb2xkZXJcIikudmFsKCkpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3ViZm9sZGVyYWRkJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRVbCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gcGFyZW50VWwucHJldignZGl2JykuY2hpbGRyZW4oJ3NwYW4nKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnRVbC5wYXJlbnQoKS5oYXNDbGFzcyhcImxhdGVzdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0VmFsID0gJCh0aGlzKS5wcmV2KCdpbnB1dCcpLnZhbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZ1bmN0aW9uQ2FsbCA9IFwiJ1wiICsgdGV4dCArIFwiL1wiICsgaW5wdXRWYWwgKyBcIidcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudFVsLmFwcGVuZCgnPGxpIG9uY2xpY2s9XCJkaXNwbGF5c3VidGFnKCcgKyBmdW5jdGlvbkNhbGwgKyAnKVwiPjxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoKVwiPicgKyBpbnB1dFZhbCArICc8L2E+PC9saT4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnByZXYoJ2RpdicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zdWJmb2xkZXJhZGQnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50VWwgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gcGFyZW50VWwucHJldignZGl2JykuY2hpbGRyZW4oJ3NwYW4nKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0VmFsID0gJCh0aGlzKS5wcmV2KCdpbnB1dCcpLnZhbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmdW5jdGlvbkNhbGwgPSBcIidcIiArIHRleHQgKyBcIi9cIiArIGlucHV0VmFsICsgXCInXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50VWwuYXBwZW5kKCc8bGkgb25jbGljaz1cImRpc3BsYXlzdWJ0YWcoJyArIGZ1bmN0aW9uQ2FsbCArICcpXCI+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgpXCI+JyArIGlucHV0VmFsICsgJzwvYT48L2xpPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucHJldignZGl2JykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgLy99KTtcblxuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZGlzcGxheXN1YnRhZyh0ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RfYnRuXCIpLnRleHQodGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5idG4tZ3JvdXBcIikucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RfYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuYnRuLWdyb3VwXCIpLnRvZ2dsZUNsYXNzKFwib3BlblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5jbG9zZWljb25cIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiLmZvbGRlcmJsb2NrXCIpLnRvZ2dsZUNsYXNzKFwiY2xvc2VcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5idG4tZ3JvdXBcIikucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgIC8vZW5kIG9mIGNoYW5nZXMgNyBqdWx5IDIwMTZcblxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWV3Zm9vIGxpc3QgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcblxuICAgIH1cbiAgICBwdWJsaXNodmlld2ZvbygpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnZmdGl0bGUpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnZmdGFncyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZmlsZW5hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZvbGRlcmlkKTtcblxuICAgIH1cblxuICAgIC8vZW5kIG9mIGZpbGUgXG5cbn1cbiJdfQ==
