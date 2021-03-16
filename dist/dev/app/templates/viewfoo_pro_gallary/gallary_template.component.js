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
var gallary_component_1 = require('../gallary/gallary.component');
var carousel_component_1 = require('../carousel/carousel.component');
var forms_1 = require('@angular/forms');
var auth_service_1 = require('../../shared/services/auth.service');
var pagination_component_1 = require('../../shared/pagination/pagination.component');
var myGlobals = require('../../globals');
var substr_pipe_1 = require('../../shared/pipes/substr.pipe');
var sub_substr_pipe_1 = require('../../shared/pipes/sub_substr.pipe');
var angular2_grid_1 = require('angular2-grid');
var CustomValidators_1 = require('../../shared/utils/CustomValidators');
var passwordprotectmodal_component_1 = require('../../shared/widgets/passwordprotectmodal/passwordprotectmodal.component');
var selfdestructmodal_component_1 = require('../../shared/widgets/selfdestructmodal/selfdestructmodal.component');
var GallaryTemplateComponent = (function () {
    function GallaryTemplateComponent(route, router, zone, authService, builder) {
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.builder = builder;
        this.ngGridOptions = {
            'margins': [0, 20, 30, 0],
            'draggable': true,
            'resizable': true,
            'max_cols': 0,
            'max_rows': 0,
            'visible_cols': 0,
            'visible_rows': 0,
            'min_cols': 1,
            'min_rows': 1,
            'col_width': 68,
            'row_height': 68,
            'cascade': 'up',
            'min_width': 68,
            'min_height': 68,
            'fix_to_grid': false,
            'auto_style': true,
            'auto_resize': false,
            'maintain_ratio': false,
            'prefer_new': false,
            'limit_to_screen': false
        };
        this.invalid = false;
        this.sharing = false;
        this.sharingdemo = true;
        this.filename = "img/build_viewfoo/kim_sharma.jpg";
        this.setcomment = false;
        this.setsharing = false;
        this.setselection = false;
        this.setmousehover = false;
        this.setimageinfoframe = false;
        this.setimagewatermark = false;
        this.inputfile = false;
        this.addprivatefolder = false;
        this.addpublicfolder = false;
        this.addnewpublicfolder = false;
        this.addnewpublicsubfolder = false;
        this.addnewprivatesubfolder = false;
        this.addnewprivatefolder = false;
        this.sublimit = true;
        this.folderadd = false;
        this.loading = false;
        this.folderloading = false;
        this.currentday = 0;
        this.currenthour = 0;
        this.currentminute = 0;
        this.currentsecond = 0;
        this.serviceUrl = myGlobals.serviceUrl;
        this.currentViewfoo = {
            viewfootitle: "",
            viewfootype: "private",
            userid: "",
            id: "",
            containers: []
        };
        this.currentFolder = {
            id: ""
        };
        this.privatefolder = [];
        this.publicfolder = [];
        this.backupfolder = [];
        this.publicFolderForSelect = [];
        this.privateFolderForSelect = [];
        this.isupload = false;
        this.publicclick = false;
        this.privateclick = false;
        this.isFolder = false;
        this.isSubFolder = false;
        this.folderForSelect = [];
        this.parentFolders = [];
        this.parentfolderid = "";
        this.foldername = "";
        this.isModelHiddenRegistered = false;
        this.timeoutseconds = 5000;
        this.uploadingWatermark = false;
        this.uploadingCroperImage = false;
        this.zone = zone;
        this.viewfoopassword = builder.group({
            "password": this.password,
            "generatedpassword": this.generatedpassword,
            "chkmail": this.chkmail,
            "chksms": this.chksms,
            confirmpassword: this.confirmpassword,
        }, { validator: CustomValidators_1.CustomValidators.matchingPasswords('password', 'confirmpassword') });
    }
    GallaryTemplateComponent.prototype.creatingOrFetchingViewfoo = function () {
        var _this = this;
        this.loading = true;
        this.paramSubscribed = this.route.params.subscribe(function (params) {
            _this.viewfooid = params['viewfooid'];
            _this.loginUser = myGlobals.LoginUser;
            _this.authService.viewfooDetail(_this.viewfooid)
                .subscribe(function (result) {
                _this.currentViewfoo = result.data;
                console.log(_this.currentViewfoo);
                myGlobals.currentViewfoo = _this.currentViewfoo;
                _this.currentViewfoo.mapContainer = {};
                _this.setviewrsettingvalue(_this.currentViewfoo);
                if (_this.currentViewfoo.coverimage != "") {
                    _this.filename = myGlobals.imageUrl + "/upload/gallery/" + _this.currentViewfoo.coverimage;
                }
                if (_this.currentViewfoo.imagewatermark != "") {
                    _this.imagewatermark = myGlobals.imageUrl + "/upload/gallery/" + _this.currentViewfoo.imagewatermark;
                }
                if (_this.currentViewfoo.imagesize === "normal") {
                    _this.currentnormalsize = true;
                    _this.currenthiressize = false;
                }
                else {
                    _this.currentnormalsize = false;
                    _this.currenthiressize = true;
                }
                console.log("viewfoo folder");
                console.log(_this.currentViewfoo.folderid);
                if (_this.currentViewfoo.folderid) {
                    _this.currentFolder = _this.currentViewfoo.folderid;
                }
                _this.loading = false;
                for (var i = 0; i < _this.currentViewfoo.containers.length; i++) {
                    var container = _this.currentViewfoo.containers[i];
                    container.ngGridItemOptions.dragHandle = ".gridMover";
                    _this.currentViewfoo.mapContainer[container.id] = container;
                }
            }, function (error) {
                _this.errorMsg = error;
                _this.loading = false;
            });
        });
    };
    GallaryTemplateComponent.prototype.updateItem = function (index, event) {
    };
    GallaryTemplateComponent.prototype.onPublishViewfoo = function () {
        this.privateclick = false;
        this.publicclick = false;
        $('#myPublishModal').modal('show');
        if (!this.isModelHiddenRegistered) {
            this.isModelHiddenRegistered = true;
            $('#myPublishModal').on('hidden.bs.modal', function (e) {
                if ($('.toggle-private').css('display') != 'none') {
                    $(".toggle-private").slideToggle("slow");
                }
            });
        }
    };
    GallaryTemplateComponent.prototype.publishviewfoopopup = function (vtype) {
        this.viewfootype = vtype;
        if (vtype == 'public') {
            this.arrangeFolderforSelection(this.publicfolder);
            this.strSelectFolderType = "Select a Public folder";
            $('#publicbtn').addClass("active");
            $('#privatebtn').removeClass("active");
            if ($('.toggle-private').css('display') == 'none'
                && this.publicclick == false) {
                $(".toggle-private").slideToggle("slow");
                this.publicclick = true;
            }
            else if ($('.toggle-private').css('display') != 'none'
                && this.publicclick == true) {
                $(".toggle-private").slideToggle("slow");
                this.publicclick = false;
            }
            else if ($('.toggle-private').css('display') != 'none'
                && this.privateclick == true) {
                this.publicclick = true;
                this.privateclick = false;
            }
        }
        else if (vtype == 'private') {
            this.arrangeFolderforSelection(this.privatefolder);
            this.strSelectFolderType = "Select a Private folder";
            $('#publicbtn').removeClass("active");
            $('#privatebtn').addClass("active");
            if ($('.toggle-private').css('display') == 'none'
                && this.privateclick == false) {
                $(".toggle-private").slideToggle("slow");
                this.privateclick = true;
            }
            else if ($('.toggle-private').css('display') != 'none'
                && this.privateclick == true) {
                $(".toggle-private").slideToggle("slow");
                this.privateclick = false;
            }
            else if ($('.toggle-private').css('display') != 'none'
                && this.publicclick == true) {
                this.privateclick = true;
                this.publicclick = false;
            }
        }
        if (!this.currentViewfoo.coverimage) {
            if (this.currentViewfoo.containers.length) {
                if (this.currentViewfoo.containers[0].containerimages.length) {
                    var imgUrl = this.serviceUrl
                        + "/upload/gallery/"
                        + this.currentViewfoo.containers[0].containerimages[0].imagename;
                    this.cropCover.url = imgUrl;
                    this.cropCover.startCropper();
                }
            }
        }
    };
    GallaryTemplateComponent.prototype.arrangeFolderforSelection = function (folderArray) {
        this.folderForSelect = [];
        this.parentFolders = folderArray;
        for (var i = 0; i < folderArray.length; i++) {
            this.folderForSelect.push({
                folderid: folderArray[i].id,
                foldername: folderArray[i].foldername
            });
            if (folderArray[i].subfolder) {
                var subfolders = folderArray[i].subfolder;
                for (var j = 0; j < subfolders.length; j++) {
                    var objsubfolder = subfolders[j];
                    var subfoldername = objsubfolder.foldername;
                    var splitArray = subfoldername.split("/");
                    subfoldername = "--- " + splitArray[splitArray.length - 1];
                    this.folderForSelect.push({
                        folderid: objsubfolder.id,
                        foldername: subfoldername
                    });
                }
            }
        }
    };
    GallaryTemplateComponent.prototype.showAddFolderRow = function (isFol, isSubFol) {
        this.isFolder = isFol;
        this.isSubFolder = isSubFol;
    };
    GallaryTemplateComponent.prototype.createFolder = function () {
        var _this = this;
        var foldertype = this.viewfootype;
        if (this.foldername != '') {
            this.folderloading = true;
            this.authService.addfolder(this.loginUser.id, this.foldername, foldertype, this.parentfolderid)
                .subscribe(function (result) {
                if (!_this.parentfolderid) {
                    _this.currentFolder = result.data;
                    if (foldertype == 'public') {
                        _this.publicfolder.push(result.data);
                        _this.arrangeFolderforSelection(_this.publicfolder);
                    }
                    else if (foldertype == 'private') {
                        _this.privatefolder.push(result.data);
                        _this.arrangeFolderforSelection(_this.privatefolder);
                    }
                }
                else {
                    if (foldertype == 'public') {
                        for (var i = 0; i < _this.publicfolder.length; i++) {
                            if (_this.publicfolder[i].id === result.data.id) {
                                _this.publicfolder[i].subfolder.push(result.data);
                            }
                        }
                        _this.arrangeFolderforSelection(_this.publicfolder);
                    }
                    else if (foldertype == 'private') {
                        for (var i = 0; i < _this.privatefolder.length; i++) {
                            if (_this.privatefolder[i].id === result.data.id) {
                                _this.privatefolder[i].subfolder.push(result.data);
                            }
                        }
                        _this.arrangeFolderforSelection(_this.privatefolder);
                    }
                }
                _this.folderloading = false;
                _this.showAddFolderRow(false, false);
            }, function (error) {
                _this.folderloading = false;
            });
        }
    };
    GallaryTemplateComponent.prototype.getFolderListFromServer = function () {
        var _this = this;
        this.authService.folderlist(this.loginUser.id)
            .subscribe(function (result) {
            var pubfolder = [];
            var privfolder = [];
            for (var i = 0; i < result.data.length; i++) {
                var temp_foldertype = result.data[i].foldertype;
                if (temp_foldertype == 'backup') {
                }
                else if (temp_foldertype == 'public') {
                    pubfolder.push(result.data[i]);
                }
                else if (temp_foldertype == 'private') {
                    privfolder.push(result.data[i]);
                }
            }
            _this.publicfolder = pubfolder;
            _this.privatefolder = privfolder;
        }, function (error) {
            var pubfolder = [];
            var privfolder = [];
            _this.publicfolder = pubfolder;
            _this.privatefolder = privfolder;
            _this.errorMsg = error;
            console.log("folder Add fail: " + error);
        });
    };
    GallaryTemplateComponent.prototype.displaysubtag = function (text, id) {
        $(".select_btn").text(text);
        $(".btn-group").removeClass("open");
        this.folderid = id;
    };
    GallaryTemplateComponent.prototype.updateItems = function (event) {
        console.log("updateItems");
        console.log(event);
        for (var i = 0; i < event.length; i++) {
            var object = event[i];
            var container = this.currentViewfoo.mapContainer[object.payload.containerid];
            container.ngGridItemEvent = object;
            container.ngGridItemOptions.col = container.ngGridItemEvent.col;
            container.ngGridItemOptions.height = container.ngGridItemEvent.height;
            container.ngGridItemOptions.left = container.ngGridItemEvent.left;
            container.ngGridItemOptions.row = container.ngGridItemEvent.row;
            container.ngGridItemOptions.sizex = container.ngGridItemEvent.sizex;
            container.ngGridItemOptions.sizey = container.ngGridItemEvent.sizey;
            container.ngGridItemOptions.top = container.ngGridItemEvent.top;
            container.ngGridItemOptions.width = container.ngGridItemEvent.width;
            container.ngGridItemOptions.containerid = container.id;
            var json = container.ngGridItemOptions;
            this.authService.griditemoption(json)
                .subscribe(function (result) {
                if (result) {
                    console.log(result);
                }
            }, function (error) {
                console.log(error);
                console.log("grid item update fail: " + error);
            });
        }
    };
    GallaryTemplateComponent.prototype.attachGridOptionsToContainer = function (container) {
        container.ngGridItemOptions = {
            'col': 1,
            'row': 1,
            'sizex': 5,
            'sizey': 5,
            'dragHandle': null,
            'resizeHandle': null,
            'fixed': false,
            'draggable': true,
            'resizable': true,
            'payload': null,
            'maxCols': 0,
            'minCols': 0,
            'maxRows': 0,
            'minRows': 0,
            'minWidth': 0,
            'minHeight': 0,
            payload: {
                containerid: container.id
            }
        };
    };
    GallaryTemplateComponent.prototype.setviewrsettingvalue = function (Viewfoo) {
        console.log(Viewfoo);
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
        if (Viewfoo.applywatermark === true) {
            this.setapplywatermark = true;
        }
        if (Viewfoo.backgroundcolor == "#FFFFFF") {
            $("#radio1").prop('checked', true);
        }
        else if (Viewfoo.backgroundcolor == "#000000") {
            $("#radio2").prop('checked', true);
        }
        else {
            $("#color6").css("background-color", Viewfoo.backgroundcolor);
            $("#radio1").prop('checked', false);
            $("#radio2").prop('checked', false);
        }
        if (Viewfoo.menufontcolor == "#FFFFFF") {
            $("#radio3").prop('checked', true);
        }
        else if (Viewfoo.menufontcolor == "#000000") {
            $("#radio4").prop('checked', true);
        }
        else {
            $("#color7").css("background-color", Viewfoo.menufontcolor);
            $("#radio3").prop('checked', false);
            $("#radio4").prop('checked', false);
        }
        if (Viewfoo.menubackgroundcolor == "#FFFFFF") {
            $("#radio5").prop('checked', true);
        }
        else if (Viewfoo.menubackgroundcolor == "#000000") {
            $("#radio6").prop('checked', true);
        }
        else {
            $("#color8").css("background-color", Viewfoo.menubackgroundcolor);
            $("#radio5").prop('checked', false);
            $("#radio6").prop('checked', false);
        }
    };
    GallaryTemplateComponent.prototype.ngOnInit = function () {
        this.creatingOrFetchingViewfoo();
        this.getFolderListFromServer();
        $(".CBimagesize").change(function () {
            var checked = $(this).is(':checked');
            $(".CBimagesize").prop('checked', false);
            if (checked) {
                $(this).prop('checked', true);
                this.imagesize = this.value;
            }
        });
        $(".CBpasswordtype").change(function () {
            var checked = $(this).is(':checked');
            $(".CBpasswordtype").prop('checked', false);
            if (checked) {
                $(this).prop('checked', true);
            }
        });
        $("[data-toggle]").click(function () {
            var toggle_el = $(this).data("toggle");
            $(toggle_el).toggleClass("open-sidebar");
        });
    };
    GallaryTemplateComponent.prototype.ngAfterViewInit = function () {
        this.cropCover = new CropCover($('#crop-avatar'));
        jscolor.init();
    };
    GallaryTemplateComponent.prototype.setTextColor = function (picker) {
        console.log(picker.string());
    };
    GallaryTemplateComponent.prototype.selecttemplate = function () {
        this.router.navigate(['/select_template']);
    };
    GallaryTemplateComponent.prototype.containerCreate = function (containertype) {
        var _this = this;
        console.log("gallary_template containerCreate " + containertype);
        var self = this;
        this.authService.containerCreate(containertype, this.currentViewfoo.id, this.loginUser.id)
            .subscribe(function (result) {
            console.log("Container Created");
            var container = result.data;
            console.log(container.ngGridItemOptions);
            container.containerimages = [];
            container.ngGridItemOptions.dragHandle = ".gridMover";
            _this.currentViewfoo.mapContainer[container.id] = container;
            self.currentViewfoo.containers.push(container);
            $("html, body").animate({ scrollTop: $(document).height() }, 'slow');
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("container create fail: " + error);
        });
    };
    GallaryTemplateComponent.prototype.updatecontainer = function (event) {
        var _this = this;
        var containertitle = event.title;
        var containerid = event.id;
        var containerupdateDict = {
            containerid: containerid,
            containertitle: containertitle
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
    };
    GallaryTemplateComponent.prototype.deletecontainer = function (containerid, index) {
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
            delete self.currentViewfoo.mapContainer[containerid];
        }, function (error) {
            _this.errorMsg = error;
            console.log("Containerimage delete fail: " + error);
        });
    };
    GallaryTemplateComponent.prototype.deleteviewfoo = function () {
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
    GallaryTemplateComponent.prototype.allowsharing = function (val) {
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
    GallaryTemplateComponent.prototype.allowcomment = function (val) {
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
    GallaryTemplateComponent.prototype.allowselection = function (val) {
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
    GallaryTemplateComponent.prototype.changeimagesize = function (value) {
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
    GallaryTemplateComponent.prototype.changemousehover = function (val) {
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
    GallaryTemplateComponent.prototype.changeframe = function (val) {
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
    GallaryTemplateComponent.prototype.changeApplyWatermark = function (val) {
        var _this = this;
        var settingtype = "applywatermark";
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
    GallaryTemplateComponent.prototype.imagedefaultnoFun = function (val) {
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
    GallaryTemplateComponent.prototype.changebgcolor = function (val) {
        var _this = this;
        var settingtype = "backgroundcolor";
        var backgroundcolor;
        if (val === "white") {
            this.backgroundcolor = "#FFFFFF";
            $("#color6").css("background-color", "#000000");
        }
        else if (val === "black") {
            this.backgroundcolor = "#000000";
            $("#color6").css("background-color", "#000000");
        }
        else {
            var color = $("#color6").val();
            this.backgroundcolor = '#' + color;
        }
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
    GallaryTemplateComponent.prototype.changefontcolor = function (val) {
        var _this = this;
        var settingtype = "menufontcolor";
        if (val === "white") {
            this.menufontcolor = "#FFFFFF";
            $("#color7").css("background-color", "#000000");
        }
        else if (val === "black") {
            this.menufontcolor = "#000000";
            $("#color7").css("background-color", "#000000");
        }
        else {
            var color = $("#color7").val();
            this.menufontcolor = '#' + color;
        }
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
    GallaryTemplateComponent.prototype.changemenubgcolor = function (val) {
        var _this = this;
        var settingtype = "menubackgroundcolor";
        if (val === "white") {
            this.menubackgroundcolor = "#FFFFFF";
            $("#color8").css("background-color", "#000000");
        }
        else if (val === "black") {
            this.menubackgroundcolor = "#000000";
            $("#color8").css("background-color", "#000000");
        }
        else {
            var color = $("#color8").val();
            this.menubackgroundcolor = '#' + color;
        }
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
    GallaryTemplateComponent.prototype.fileChangeWatermark = function (fileInput) {
        this.uploadingWatermark = true;
        var fileSelected = fileInput.target.files[0];
        var formData = new FormData();
        formData.append('viewfooid', this.currentViewfoo.id);
        formData.append('userid', this.loginUser.id);
        formData.append("imagewatermark", fileSelected, fileSelected.name);
        var self = this;
        $.ajax(myGlobals.imageUrl + "/viewfoo/imagewatermark", {
            method: "POST",
            headers: {
                'Authorization': 'Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=',
            },
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                console.log('Watermark Upload success');
                console.log(JSON.stringify(result));
                setTimeout(function () {
                    self.uploadingWatermark = false;
                    self.imagewatermark = myGlobals.imageUrl + "/upload/gallery/" + result.data.imagewatermark;
                    myGlobals.currentViewfoo.imagewatermark = result.data.coverimage;
                }, this.timeoutseconds);
            },
            error: function () {
                self.uploadingWatermark = false;
                console.log('Upload error');
            }
        });
    };
    GallaryTemplateComponent.prototype.oncroppopupdone = function () {
        this.uploadingCroperImage = true;
        this.isupload = false;
        var $image = this.cropCover.$img;
        var img = document.getElementById('avtarimg');
        var self = this;
        blobUtil.imgSrcToBlob(img.src).then(function (blob) {
            blob.lastModifiedDate = new Date();
            blob.name = self.currentViewfoo.id + ".jpg";
            console.log("Blob success");
            console.log(blob);
            console.log(self.cropCover.$fileCover);
            var formData = new FormData();
            var cropdata = $image.cropper('getData');
            cropdata.width = parseInt(cropdata.width);
            cropdata.height = parseInt(cropdata.height);
            cropdata.x = parseInt(cropdata.x);
            cropdata.y = parseInt(cropdata.y);
            formData.append('id', self.currentViewfoo.id);
            formData.append('userid', self.loginUser.id);
            formData.append("cropdata", JSON.stringify(cropdata));
            formData.append('coverimage', blob, self.currentViewfoo.id + ".jpg");
            $.ajax(myGlobals.imageUrl + "/coverimage/viewfoo", {
                method: "POST",
                headers: {
                    'Authorization': 'Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=',
                },
                data: formData,
                processData: false,
                contentType: false,
                success: function (result) {
                    console.log('Upload success');
                    console.log(JSON.stringify(result));
                    setTimeout(function () {
                        self.uploadingCroperImage = false;
                        self.cropCover.stopCropper();
                        self.filename = myGlobals.imageUrl + "/upload/gallery/" + result.data.coverimage;
                        var $img = $('<img src="' + self.filename + '" id="avtarimg" class="coverimg">');
                        $('#coverWrapper').empty().html($img);
                        $("#frmBrowse")[0].reset();
                        myGlobals.currentViewfoo.coverimage = result.data.coverimage;
                    }, this.timeoutseconds);
                },
                error: function () {
                    self.uploadingCroperImage = false;
                    console.log('Upload error');
                }
            });
        }).catch(function (err) {
            console.log("Blob err");
            console.log(err);
        });
    };
    GallaryTemplateComponent.prototype.uploadclick = function () {
        this.isupload = true;
    };
    GallaryTemplateComponent.prototype.publishviewfoo = function () {
        var _this = this;
        this.authService.publishviewfooupdate(this.currentViewfoo.id, this.currentViewfoo.viewfootitle, this.currentViewfoo.tags, this.currentFolder.id, this.viewfootype)
            .subscribe(function (result) {
            console.log(result);
            $("#myPublishModal").modal('hide');
            _this.router.navigate(['/']);
        }, function (error) {
            _this.errorMsg = error;
            _this.loading = false;
            console.log("viewfoo update fail: " + error);
        });
    };
    GallaryTemplateComponent.prototype.openpasswordpopup = function (currid) {
        this.viewfoopasswordid = currid;
        $('#passwordModal').modal('show');
    };
    GallaryTemplateComponent.prototype.openselfdestructpopup = function (currid) {
        this.viewfooselfdestructid = currid;
        $('#selfdestructModal').modal('show');
    };
    GallaryTemplateComponent.prototype.changeinviewfoolist = function (event) {
        var id = event.id;
        var value = event.value;
    };
    GallaryTemplateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gallary',
            templateUrl: 'gallary_template.component.html',
            pipes: [substr_pipe_1.SubstrPipe, sub_substr_pipe_1.Sub_SubstrPipe],
            directives: [router_1.ROUTER_DIRECTIVES, pagination_component_1.PaginationComponent,
                common_1.CORE_DIRECTIVES, gallary_component_1.GallaryComponent,
                carousel_component_1.CarouselComponent,
                angular2_grid_1.NgGrid, angular2_grid_1.NgGridItem, forms_1.REACTIVE_FORM_DIRECTIVES, passwordprotectmodal_component_1.PasswordProtectModal, selfdestructmodal_component_1.SelfDestructModal]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, core_1.NgZone, auth_service_1.AuthService, forms_1.FormBuilder])
    ], GallaryTemplateComponent);
    return GallaryTemplateComponent;
}());
exports.GallaryTemplateComponent = GallaryTemplateComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90ZW1wbGF0ZXMvdmlld2Zvb19wcm9fZ2FsbGFyeS9nYWxsYXJ5X3RlbXBsYXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EscUJBQTBDLGVBQWUsQ0FBQyxDQUFBO0FBQzFELHVCQUEwRCxpQkFBaUIsQ0FBQyxDQUFBO0FBRTVFLHVCQUFnQyxpQkFBaUIsQ0FBQyxDQUFBO0FBR2xELGtDQUFpQyw4QkFBOEIsQ0FBQyxDQUFBO0FBRWhFLG1DQUFrQyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ25FLHNCQUEwRixnQkFBZ0IsQ0FBQyxDQUFBO0FBRTNHLDZCQUE0QixvQ0FBb0MsQ0FBQyxDQUFBO0FBS2pFLHFDQUFvQyw4Q0FBOEMsQ0FBQyxDQUFBO0FBTW5GLElBQU8sU0FBUyxXQUFXLGVBQWUsQ0FBQyxDQUFDO0FBQzVDLDRCQUEyQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQzVELGdDQUErQixvQ0FBb0MsQ0FBQyxDQUFBO0FBRXBFLDhCQUFtQyxlQUFlLENBQUMsQ0FBQTtBQUNuRCxpQ0FBK0IscUNBQXFDLENBQUMsQ0FBQTtBQUNyRSwrQ0FBcUMsMEVBQTBFLENBQUMsQ0FBQTtBQUNoSCw0Q0FBa0Msb0VBQW9FLENBQUMsQ0FBQTtBQVd2RztJQXVJQyxrQ0FDUyxLQUFxQixFQUNyQixNQUFjLEVBQ3RCLElBQVksRUFDSixXQUF3QixFQUFVLE9BQW9CO1FBSHRELFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFFZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQWE7UUF6SS9ELGtCQUFhLEdBQUc7WUFDZixTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekIsV0FBVyxFQUFFLElBQUk7WUFDakIsV0FBVyxFQUFFLElBQUk7WUFDakIsVUFBVSxFQUFFLENBQUM7WUFDYixVQUFVLEVB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QUksRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDbEIsSUFBSSxLQUFLLEdBQVksS0FBSyxDQUFDLEtBQUssQ0FBQztJQU9yQyxDQUFDO0lBbHBDVDtRQUFDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxLQUFLLEVBQUUsQ0FBQyx3QkFBVSxFQUFFLGdDQUFjLENBQUM7WUFDbkMsVUFBVSxFQUFFLENBQUMsMEJBQWlCLEVBQUUsMENBQW1CO2dCQUNsRCx3QkFBZSxFQUFFLG9DQUFnQjtnQkFDakMsc0NBQWlCO2dCQUNqQixzQkFBTSxFQUFFLDBCQUFVLEVBQUUsZ0NBQXdCLEVBQUMscURBQW9CLEVBQUMsK0NBQWlCLENBQUM7U0FDckYsQ0FBQzs7Z0NBQUE7SUE0b0NGLCtCQUFDO0FBQUQsQ0Ezb0NBLEFBMm9DQyxJQUFBO0FBM29DWSxnQ0FBd0IsMkJBMm9DcEMsQ0FBQSIsImZpbGUiOiJhcHAvdGVtcGxhdGVzL3ZpZXdmb29fcHJvX2dhbGxhcnkvZ2FsbGFyeV90ZW1wbGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJPVVRFUl9ESVJFQ1RJVkVTLCBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgQ09SRV9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuXG5pbXBvcnQgeyBHYWxsYXJ5Q29tcG9uZW50IH0gZnJvbSAnLi4vZ2FsbGFyeS9nYWxsYXJ5LmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IENhcm91c2VsQ29tcG9uZW50IH0gZnJvbSAnLi4vY2Fyb3VzZWwvY2Fyb3VzZWwuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMsIEZvcm1CdWlsZGVyLCBSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdmb28gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBGb2xkZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7IFBhZ2luYXRpb25Db21wb25lbnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG4vLyBpbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JzLCBGb3JtQnVpbGRlciwgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTIH1cbi8vIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIGltcG9ydCB7Q3VzdG9tVmFsaWRhdG9yc30gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL0N1c3RvbVZhbGlkYXRvcnMnO1xuaW1wb3J0IHsgTmdGb3JtIH0gICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vLi4vZ2xvYmFscycpO1xuaW1wb3J0IHsgU3Vic3RyUGlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9waXBlcy9zdWJzdHIucGlwZSc7XG5pbXBvcnQgeyBTdWJfU3Vic3RyUGlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9waXBlcy9zdWJfc3Vic3RyLnBpcGUnO1xuXG5pbXBvcnQgeyBOZ0dyaWQsIE5nR3JpZEl0ZW0gfSBmcm9tICdhbmd1bGFyMi1ncmlkJztcbmltcG9ydCB7Q3VzdG9tVmFsaWRhdG9yc30gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL0N1c3RvbVZhbGlkYXRvcnMnO1xuaW1wb3J0IHsgUGFzc3dvcmRQcm90ZWN0TW9kYWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvd2lkZ2V0cy9wYXNzd29yZHByb3RlY3Rtb2RhbC9wYXNzd29yZHByb3RlY3Rtb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZkRlc3RydWN0TW9kYWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvd2lkZ2V0cy9zZWxmZGVzdHJ1Y3Rtb2RhbC9zZWxmZGVzdHJ1Y3Rtb2RhbC5jb21wb25lbnQnO1xuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnZ2FsbGFyeScsXG5cdHRlbXBsYXRlVXJsOiAnZ2FsbGFyeV90ZW1wbGF0ZS5jb21wb25lbnQuaHRtbCcsXG5cdHBpcGVzOiBbU3Vic3RyUGlwZSwgU3ViX1N1YnN0clBpcGVdLFxuXHRkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVMsIFBhZ2luYXRpb25Db21wb25lbnQsXG5cdFx0Q09SRV9ESVJFQ1RJVkVTLCBHYWxsYXJ5Q29tcG9uZW50LFxuXHRcdENhcm91c2VsQ29tcG9uZW50LFxuXHRcdE5nR3JpZCwgTmdHcmlkSXRlbSwgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTLFBhc3N3b3JkUHJvdGVjdE1vZGFsLFNlbGZEZXN0cnVjdE1vZGFsXVxufSlcbmV4cG9ydCBjbGFzcyBHYWxsYXJ5VGVtcGxhdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdG5nR3JpZE9wdGlvbnMgPSB7XG5cdFx0J21hcmdpbnMnOiBbMCwgMjAsIDMwLCAwXSwgICAgICAgICAgICAvLyAgVGhlIHNpemUgb2YgdGhlIG1hcmdpbnMgb2YgZWFjaCBpdGVtLiBTdXBwb3J0cyB1cCB0byBmb3VyIHZhbHVlcyBpbiB0aGUgc2FtZSB3YXkgYXMgQ1NTIG1hcmdpbnMuIENhbiBiZSB1cGRhdGVkIHVzaW5nIHNldE1hcmdpbnMoKVxuXHRcdCdkcmFnZ2FibGUnOiB0cnVlLCAgICAgICAgICAvLyAgV2hldGhlciB0aGUgaXRlbXMgY2FuIGJlIGRyYWdnZWQuIENhbiBiZSB1cGRhdGVkIHVzaW5nIGVuYWJsZURyYWcoKS9kaXNhYmxlRHJhZygpXG5cdFx0J3Jlc2l6YWJsZSc6IHRydWUsICAgICAgICAgIC8vICBXaGV0aGVyIHRoZSBpdGVtcyBjYW4gYmUgcmVzaXplZC4gQ2FuIGJlIHVwZGF0ZWQgdXNpbmcgZW5hYmxlUmVzaXplKCkvZGlzYWJsZVJlc2l6ZSgpXG5cdFx0J21heF9jb2xzJzogMCwgICAgICAgICAgICAgIC8vICBUaGUgbWF4aW11bSBudW1iZXIgb2YgY29sdW1ucyBhbGxvd2VkLiBTZXQgdG8gMCBmb3IgaW5maW5pdGUuIENhbm5vdCBiZSB1c2VkIHdpdGggbWF4X3Jvd3Ncblx0XHQnbWF4X3Jvd3MnOiAwLCAgICAgICAgICAgICAgLy8gIFRoZSBtYXhpbXVtIG51bWJlciBvZiByb3dzIGFsbG93ZWQuIFNldCB0byAwIGZvciBpbmZpbml0ZS4gQ2Fubm90IGJlIHVzZWQgd2l0aCBtYXhfY29sc1xuXHRcdCd2aXNpYmxlX2NvbHMnOiAwLCAgICAgICAgICAvLyAgVGhlIG51bWJlciBvZiBjb2x1bW5zIHNob3duIG9uIHNjcmVlbiB3aGVuIGF1dG9fcmVzaXplIGlzIHNldCB0byB0cnVlLiBTZXQgdG8gMCB0byBub3QgYXV0b19yZXNpemUuIFdpbGwgYmUgb3ZlcnJpZGVuIGJ5IG1heF9jb2xzXG5cdFx0J3Zpc2libGVfcm93cyc6IDAsICAgICAgICAgIC8vICBUaGUgbnVtYmVyIG9mIHJvd3Mgc2hvd24gb24gc2NyZWVuIHdoZW4gYXV0b19yZXNpemUgaXMgc2V0IHRvIHRydWUuIFNldCB0byAwIHRvIG5vdCBhdXRvX3Jlc2l6ZS4gV2lsbCBiZSBvdmVycmlkZW4gYnkgbWF4X3Jvd3Ncblx0XHQnbWluX2NvbHMnOiAxLCAgICAgICAgICAgICAgLy8gIFRoZSBtaW5pbXVtIG51bWJlciBvZiBjb2x1bW5zIGFsbG93ZWQuIENhbiBiZSBhbnkgbnVtYmVyIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAxLlxuXHRcdCdtaW5fcm93cyc6IDEsICAgICAgICAgICAgICAvLyAgVGhlIG1pbmltdW0gbnVtYmVyIG9mIHJvd3MgYWxsb3dlZC4gQ2FuIGJlIGFueSBudW1iZXIgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIDEuXG5cdFx0J2NvbF93aWR0aCc6IDY4LCAgICAgICAgICAgLy8gIFRoZSB3aWR0aCBvZiBlYWNoIGNvbHVtblxuXHRcdCdyb3dfaGVpZ2h0JzogNjgsICAgICAgICAgIC8vICBUaGUgaGVpZ2h0IG9mIGVhY2ggcm93XG5cdFx0J2Nhc2NhZGUnOiAndXAnLCAgICAgICAgICAgIC8vICBUaGUgZGlyZWN0aW9uIHRvIGNhc2NhZGUgZ3JpZCBpdGVtcyAoJ3VwJywgJ3JpZ2h0JywgJ2Rvd24nLCAnbGVmdCcpXG5cdFx0J21pbl93aWR0aCc6IDY4LCAgICAgICAgICAgLy8gIFRoZSBtaW5pbXVtIHdpZHRoIG9mIGFuIGl0ZW0uIElmIGdyZWF0ZXIgdGhhbiBjb2xfd2lkdGgsIHRoaXMgd2lsbCB1cGRhdGUgdGhlIHZhbHVlIG9mIG1pbl9jb2xzXG5cdFx0J21pbl9oZWlnaHQnOiA2OCwgICAgICAgICAgLy8gIFRoZSBtaW5pbXVtIGhlaWdodCBvZiBhbiBpdGVtLiBJZiBncmVhdGVyIHRoYW4gcm93X2hlaWdodCwgdGhpcyB3aWxsIHVwZGF0ZSB0aGUgdmFsdWUgb2YgbWluX3Jvd3Ncblx0XHQnZml4X3RvX2dyaWQnOiBmYWxzZSwgICAgICAgLy8gIEZpeCBhbGwgaXRlbSBtb3ZlbWVudHMgdG8gdGhlIGdyaWRcblx0XHQnYXV0b19zdHlsZSc6IHRydWUsICAgICAgICAgLy8gIEF1dG9tYXRpY2FsbHkgYWRkIHJlcXVpcmVkIGVsZW1lbnQgc3R5bGVzIGF0IHJ1bi10aW1lXG5cdFx0J2F1dG9fcmVzaXplJzogZmFsc2UsICAgICAgIC8vICBBdXRvbWF0aWNhbGx5IHNldCBjb2xfd2lkdGgvcm93X2hlaWdodCBzbyB0aGF0IG1heF9jb2xzL21heF9yb3dzIGZpbGxzIHRoZSBzY3JlZW4uIE9ubHkgaGFzIGVmZmVjdCBpcyBtYXhfY29scyBvciBtYXhfcm93cyBpcyBzZXRcblx0XHQnbWFpbnRhaW5fcmF0aW8nOiBmYWxzZSwgICAgLy8gIEF0dGVtcHRzIHRvIG1haW50YWluIGFzcGVjdCByYXRpbyBiYXNlZCBvbiB0aGUgY29sV2lkdGgvcm93SGVpZ2h0IHZhbHVlcyBzZXQgaW4gdGhlIGNvbmZpZ1xuXHRcdCdwcmVmZXJfbmV3JzogZmFsc2UsICAgICAgICAvLyAgV2hlbiBhZGRpbmcgbmV3IGl0ZW1zLCB3aWxsIHVzZSB0aGF0IGl0ZW1zIHBvc2l0aW9uIGFoZWFkIG9mIGV4aXN0aW5nIGl0ZW1zXG5cdFx0J2xpbWl0X3RvX3NjcmVlbic6IGZhbHNlICAgLy8gIFdoZW4gcmVzaXppbmcgdGhlIHNjcmVlbiwgd2l0aCB0aGlzIHRydWUgYW5kIGF1dG9fcmVzaXplIGZhbHNlLCB0aGUgZ3JpZCB3aWxsIHJlLWFycmFuZ2UgdG8gZml0IHRoZSBzY3JlZW4gc2l6ZS4gUGxlYXNlIG5vdGUsIGF0IHByZXNlbnQgdGhpcyBvbmx5IHdvcmtzIHdpdGggY2FzY2FkZSBkaXJlY3Rpb24gdXAuXG5cblx0fVxuXG5cdC8vLS0tLS0gRm9ybSBWYWxpZGF0aW9uIFZhcmlhYmxlcyAtLS0tLS1cblx0Ly8gZm9ybV92aWV3Zm9vdGl0bGU6IEZvcm1Db250cm9sO1xuXHQvLyBmb3JtX3ZpZXdmb290YWdzOiBGb3JtQ29udHJvbDtcblx0Ly8gZm9ybV92aWV3Zm9vZm9sZGVyOiBGb3JtQ29udHJvbDtcblx0Ly9cblx0Ly8gZm9ybVZpZWZvb0dyb3VwOiBGb3JtR3JvdXA7XG5cdC8vLS0tLS0tLSBGb3JtIFZhbGlkYXRpb24gRG9uZSAtLS0tXG5cblx0cHVibGljIHZmdGl0bGU6IHN0cmluZztcblx0cHVibGljIHZmdGFnczogc3RyaW5nO1xuXHRwdWJsaWMgbXNnOiBzdHJpbmc7XG5cdGludmFsaWQ6IGJvb2xlYW4gPSBmYWxzZTtcblx0cHVibGljIGNvbnRhaW5lcnR5cGU6IHN0cmluZztcblx0c2hhcmluZzogYm9vbGVhbiA9IGZhbHNlO1xuXHRzaGFyaW5nZGVtbzogYm9vbGVhbiA9IHRydWU7XG5cdGxvZ2luVXNlcjogVXNlcjtcblx0dGhpc3ZpZXdmb286IFZpZXdmb287XG5cdHB1YmxpYyBmaWxlbmFtZTogc3RyaW5nID0gXCJpbWcvYnVpbGRfdmlld2Zvby9raW1fc2hhcm1hLmpwZ1wiO1xuXHRwdWJsaWMgaW1hZ2VzaXplOiBzdHJpbmc7XG5cdHB1YmxpYyBpbWFnZWRlZmF1bHRubzogc3RyaW5nO1xuXG5cdHB1YmxpYyBiYWNrZ3JvdW5kY29sb3I6IHN0cmluZztcblx0cHVibGljIG1lbnVmb250Y29sb3I6IHN0cmluZztcblx0cHVibGljIG1lbnViYWNrZ3JvdW5kY29sb3I6IHN0cmluZztcblx0cHVibGljIG5ld2ZvbGRlcm5hbWU6IHN0cmluZztcblx0cHVibGljIGZvbGRlcmlkOiBzdHJpbmc7XG5cdHB1YmxpYyBjdXJyZW50aW1hZ2VzaXplOiBzdHJpbmc7XG5cdHB1YmxpYyBjdXJyZW50bm9ybWFsc2l6ZTogc3RyaW5nO1xuXHRwdWJsaWMgY3VycmVudGhpcmVzc2l6ZTogc3RyaW5nO1xuXHRwdWJsaWMgc2V0Y29tbWVudDogYm9vbGVhbiA9IGZhbHNlO1xuXHRwdWJsaWMgc2V0c2hhcmluZzogYm9vbGVhbiA9IGZhbHNlO1xuXHRwdWJsaWMgc2V0c2VsZWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cdHB1YmxpYyBzZXRtb3VzZWhvdmVyOiBib29sZWFuID0gZmFsc2U7XG5cdHB1YmxpYyBzZXRpbWFnZWluZm9mcmFtZTogYm9vbGVhbiA9IGZhbHNlO1xuXHRwdWJsaWMgc2V0aW1hZ2V3YXRlcm1hcms6IGJvb2xlYW4gPSBmYWxzZTtcblx0cHVibGljIGlucHV0ZmlsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG5cdHB1YmxpYyBhZGRwcml2YXRlZm9sZGVyOiBib29sZWFuID0gZmFsc2U7XG5cdHB1YmxpYyBhZGRwdWJsaWNmb2xkZXI6IGJvb2xlYW4gPSBmYWxzZTtcblx0cHVibGljIGFkZG5ld3B1YmxpY2ZvbGRlcjogYm9vbGVhbiA9IGZhbHNlO1xuXHRwdWJsaWMgYWRkbmV3cHVibGljc3ViZm9sZGVyOiBib29sZWFuID0gZmFsc2U7XG5cdHB1YmxpYyBhZGRuZXdwcml2YXRlc3ViZm9sZGVyOiBib29sZWFuID0gZmFsc2U7XG5cdHB1YmxpYyBhZGRuZXdwcml2YXRlZm9sZGVyOiBib29sZWFuID0gZmFsc2U7XG5cdHB1YmxpYyBzdWJsaW1pdDogYm9vbGVhbiA9IHRydWU7XG5cdHB1YmxpYyBuZXdmb2xkZXJpZDogc3RyaW5nO1xuXHRwdWJsaWMgc2VsZWN0ZWRmb2xkZXJuYW1lOiBhbnk7XG5cdHB1YmxpYyBmb2xkZXJhZGQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuXHRwdWJsaWMgZXJyb3JNc2c6IGFueTtcblx0cHVibGljIHBhcmFtU3Vic2NyaWJlZDogYW55O1xuXHRsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cdHB1YmxpYyBmb2xkZXJsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cdC8vZm9yIHBhc3Nwd3JkIHByb3RlY3RlZFxuLy9cdHB1YmxpYyBpc0VuYWJsZTogYm9vbGVhbiA9IHRydWU7XG4vL1x0dmlld2Zvb3Bhc3N3b3JkOiBGb3JtR3JvdXA7XG4vL1x0bG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuLy9cdHBhc3N3b3JkOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbChcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbi8vXHRjb25maXJtcGFzc3dvcmQ6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKFwiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuLy9cdGdlbmVyYXRlZHBhc3N3b3JkOiBGb3JtQ29udHJvbDtcbi8vXHR2aWV3Zm9vcGFzc3dvcmRpZDogc3RyaW5nO1xuLy9cdHZpZXdmb29wYXNzd29yZHR5cGU6IHN0cmluZyA9IFwiYXV0b3Bhc3N3b3JkXCI7XG4vL1x0Z2VuZXJhdGVvd25wYXNzd29yZDogYm9vbGVhbiA9IHRydWU7XG4vL1x0Y2hrbWFpbDogRm9ybUNvbnRyb2wgPSBmYWxzZTtcbi8vXHRjaGtzbXM6IEZvcm1Db250cm9sID0gZmFsc2U7XG4vL1x0cHVibGljIGNoZWNrZW1haWw6IGJvb2xlYW4gPSBmYWxzZTtcbi8vXHRwdWJsaWMgY2hlY2tzbXM6IGJvb2xlYW4gPSBmYWxzZTtcbi8vXHRwdWJsaWMgdW5sb2Nrdmlld2Zvb2lkOiBzdHJpbmc7XG4vL1x0cHVibGljIGlzZXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbi8vXHRwdWJsaWMgY2hlY2t1bmxvY2tzbXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvL2VuZCBvZiBwYXNzd29yZCBwcm90ZWN0ZWRcbiAgICAgICAgXG4gICAgICAgIC8vc2VsZmRlc3RydWN0Ly9cbiAgICAgICAgcHVibGljIGN1cnJlbnRkYXk6bnVtYmVyPTA7XG4gICAgICAgIHB1YmxpYyBjdXJyZW50aG91cjpudW1iZXI9MDtcbiAgICAgICAgcHVibGljIGN1cnJlbnRtaW51dGU6bnVtYmVyPTA7XG4gICAgICAgIHB1YmxpYyBjdXJyZW50c2Vjb25kOm51bWJlcj0wO1xuICAgICAgICAvL2VuZCBvZiBzZWxmIGRlc3RydWN0Ly9cbiAgXG5cdHNlcnZpY2VVcmw6IHN0cmluZyA9IG15R2xvYmFscy5zZXJ2aWNlVXJsO1xuXHRjdXJyZW50Vmlld2ZvbzogVmlld2ZvbyA9IHtcblx0XHR2aWV3Zm9vdGl0bGU6IFwiXCIsXG5cdFx0dmlld2Zvb3R5cGU6IFwicHJpdmF0ZVwiLFxuXHRcdHVzZXJpZDogXCJcIixcblx0XHRpZDogXCJcIixcblx0XHRjb250YWluZXJzOiBbXVxuXHR9O1xuXG5cdGN1cnJlbnRGb2xkZXI6IGFueSA9IHtcblx0XHRpZDogXCJcIlxuXHR9O1xuXG5cdHZpZXdmb29pZDogc3RyaW5nO1xuXHRjb250YWluZXJpZDogc3RyaW5nO1xuXG5cblx0cHJpdmF0ZWZvbGRlcjogVmlld2Zvb1tdID0gW107XG5cdHB1YmxpY2ZvbGRlcjogVmlld2Zvb1tdID0gW107XG5cdGJhY2t1cGZvbGRlcjogVmlld2Zvb1tdID0gW107XG5cblx0cHVibGljRm9sZGVyRm9yU2VsZWN0OiBGb2xkZXJbXSA9IFtdO1xuXHRwcml2YXRlRm9sZGVyRm9yU2VsZWN0OiBGb2xkZXJbXSA9IFtdO1xuXG5cdGlzdXBsb2FkOiBib29sZWFuID0gZmFsc2U7XG5cdG15RHJvcHpvbmU6IGFueTtcblxuXHR6b25lOiBOZ1pvbmU7XG5cblx0Y3JvcENvdmVyOiBhbnk7XG5cblx0Y29uc3RydWN0b3IoLy9wcml2YXRlIGJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuXHRcdHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuXHRcdHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG5cdFx0em9uZTogTmdab25lLFxuXHRcdHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIGJ1aWxkZXI6IEZvcm1CdWlsZGVyKSB7XG5cdFx0dGhpcy56b25lID0gem9uZTtcblxuXHRcdC8vIHRoaXMuZm9ybV92aWV3Zm9vdGl0bGUgPSBuZXcgRm9ybUNvbnRyb2woXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG5cdFx0Ly8gdGhpcy5mb3JtX3ZpZXdmb290YWdzID0gbmV3IEZvcm1Db250cm9sKFwiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuXHRcdC8vIHRoaXMuZm9ybV92aWV3Zm9vZm9sZGVyID0gbmV3IEZvcm1Db250cm9sKFwiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuXHRcdC8vXG5cdFx0Ly8gdGhpcy5mb3JtVmllZm9vR3JvdXAgPSB0aGlzLmJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAvLyAgICAgXCJmb3JtX3ZpZXdmb290aXRsZVwiOiB0aGlzLmZvcm1fdmlld2Zvb3RpdGxlLFxuICAgICAgICAvLyAgICAgXCJmb3JtX3ZpZXdmb290YWdzXCI6IHRoaXMuZm9ybV92aWV3Zm9vdGFncyxcbiAgICAgICAgLy8gICAgIFwiZm9ybV92aWV3Zm9vZm9sZGVyXCI6IHRoaXMuZm9ybV92aWV3Zm9vZm9sZGVyXG4gICAgICAgIC8vIH0pO1xuXG5cdFx0Ly9mb3IgcGFzc3dvcmQgcHJvdGVjdGVkXG4gICAgICAgIHRoaXMudmlld2Zvb3Bhc3N3b3JkID0gYnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICBcInBhc3N3b3JkXCI6IHRoaXMucGFzc3dvcmQsXG4gICAgICAgICAgICBcImdlbmVyYXRlZHBhc3N3b3JkXCI6IHRoaXMuZ2VuZXJhdGVkcGFzc3dvcmQsXG4gICAgICAgICAgICBcImNoa21haWxcIjogdGhpcy5jaGttYWlsLFxuICAgICAgICAgICAgXCJjaGtzbXNcIjogdGhpcy5jaGtzbXMsXG4gICAgICAgICAgICBjb25maXJtcGFzc3dvcmQ6IHRoaXMuY29uZmlybXBhc3N3b3JkLFxuXG4gICAgICAgIH0sXG5cdFx0XHR7IHZhbGlkYXRvcjogQ3VzdG9tVmFsaWRhdG9ycy5tYXRjaGluZ1Bhc3N3b3JkcygncGFzc3dvcmQnLCAnY29uZmlybXBhc3N3b3JkJykgfSk7XG4gICAgICAgIC8vZW5kIG9mIHBhc3N3b3JkIHByb3RlY3RlZFxuXHR9XG5cblx0Y3JlYXRpbmdPckZldGNoaW5nVmlld2ZvbygpIHtcblx0XHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXHRcdHRoaXMucGFyYW1TdWJzY3JpYmVkID0gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG5cdFx0XHQvL2NvbnNvbGUubG9nKFwiR2FsbGFyeVRlbXBsYXRlQ29tcG9uZW50ID4gY29uc3RydWN0b3IgXCIpO1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhwYXJhbXMpO1xuXHRcdFx0dGhpcy52aWV3Zm9vaWQgPSBwYXJhbXNbJ3ZpZXdmb29pZCddOyAvLyAoKykgY29udmVydHMgc3RyaW5nICdpZCcgdG8gYSBudW1iZXJcblxuXHRcdFx0dGhpcy5sb2dpblVzZXIgPSBteUdsb2JhbHMuTG9naW5Vc2VyO1xuXG5cdFx0XHR0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb29EZXRhaWwodGhpcy52aWV3Zm9vaWQpXG5cdFx0XHRcdC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50Vmlld2ZvbyA9IHJlc3VsdC5kYXRhO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMuY3VycmVudFZpZXdmb28pO1xuXG5cdFx0XHRcdFx0bXlHbG9iYWxzLmN1cnJlbnRWaWV3Zm9vID0gdGhpcy5jdXJyZW50Vmlld2ZvbztcblxuXHRcdFx0XHRcdHRoaXMuY3VycmVudFZpZXdmb28ubWFwQ29udGFpbmVyID0ge307XG5cblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKHRoaXMuY3VycmVudFZpZXdmb28uaW1hZ2VzaXplKTtcblx0XHRcdFx0XHR0aGlzLnNldHZpZXdyc2V0dGluZ3ZhbHVlKHRoaXMuY3VycmVudFZpZXdmb28pO1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuY3VycmVudFZpZXdmb28uY292ZXJpbWFnZSAhPSBcIlwiKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmZpbGVuYW1lID0gbXlHbG9iYWxzLmltYWdlVXJsICsgXCIvdXBsb2FkL2dhbGxlcnkvXCIgKyB0aGlzLmN1cnJlbnRWaWV3Zm9vLmNvdmVyaW1hZ2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh0aGlzLmN1cnJlbnRWaWV3Zm9vLmltYWdld2F0ZXJtYXJrICE9IFwiXCIpIHtcblx0XHRcdFx0XHRcdHRoaXMuaW1hZ2V3YXRlcm1hcmsgPSBteUdsb2JhbHMuaW1hZ2VVcmwgKyBcIi91cGxvYWQvZ2FsbGVyeS9cIiArIHRoaXMuY3VycmVudFZpZXdmb28uaW1hZ2V3YXRlcm1hcms7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh0aGlzLmN1cnJlbnRWaWV3Zm9vLmltYWdlc2l6ZSA9PT0gXCJub3JtYWxcIikge1xuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50bm9ybWFsc2l6ZSA9IHRydWU7XG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRoaXJlc3NpemUgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRub3JtYWxzaXplID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRoaXJlc3NpemUgPSB0cnVlO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJ2aWV3Zm9vIGZvbGRlclwiKTtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRWaWV3Zm9vLmZvbGRlcmlkKTtcblxuXHRcdFx0XHRcdGlmICh0aGlzLmN1cnJlbnRWaWV3Zm9vLmZvbGRlcmlkKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRGb2xkZXIgPSB0aGlzLmN1cnJlbnRWaWV3Zm9vLmZvbGRlcmlkO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coXCJjdXJyZW50IHZpZXdmb28gYWxsb3cgc2hhcmluZyBpczpcIisgdGhpcy5jdXJyZW50Vmlld2Zvby5hbGxvd3NoYXJpbmcpO1xuXG5cdFx0XHRcdFx0Ly90aGlzLmNyZWF0aW5nRHJvcHpvbmVJbnN0YW5jZXMoKTtcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY3VycmVudFZpZXdmb28uY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0dmFyIGNvbnRhaW5lciA9IHRoaXMuY3VycmVudFZpZXdmb28uY29udGFpbmVyc1tpXTtcblxuXHRcdFx0XHRcdFx0Y29udGFpbmVyLm5nR3JpZEl0ZW1PcHRpb25zLmRyYWdIYW5kbGUgPSBcIi5ncmlkTW92ZXJcIjtcblxuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50Vmlld2Zvby5tYXBDb250YWluZXJbY29udGFpbmVyLmlkXSA9IGNvbnRhaW5lcjtcblxuXHRcdFx0XHRcdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJuZy1ncmlkLWNvbnRhaW5lci1vcHRpb25cIik7XG5cdFx0XHRcdFx0XHQvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb250YWluZXIpXG5cdFx0XHRcdFx0XHQvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb250YWluZXIubmdHcmlkSXRlbU9wdGlvbnMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coXCJ0aGlzLmN1cnJlbnRWaWV3Zm9vLm1hcENvbnRhaW5lclwiKTtcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKHRoaXMuY3VycmVudFZpZXdmb28ubWFwQ29udGFpbmVyKTtcblx0XHRcdFx0fSwgKGVycm9yOiBhbnkpID0+IHtcblx0XHRcdFx0XHR0aGlzLmVycm9yTXNnID0gZXJyb3I7XG5cdFx0XHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcInZpZXdmb28gY3JlYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuXHRcdFx0XHR9KVxuXG5cdFx0XHQvL2NvbnNvbGUubG9nKFwiY3VycmVudCB2aWV3Zm9vIGFsbG93IHNoYXJpbmcgaXM6XCIgKyB0aGlzLmN1cnJlbnRWaWV3Zm9vLmFsbG93c2hhcmluZyk7XG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGVJdGVtKGluZGV4LCBldmVudCkge1xuXHRcdC8vIGNvbnNvbGUubG9nKFwidXBkYXRlSXRlbVwiKTtcblx0XHQvLyBjb25zb2xlLmxvZyhpbmRleCk7XG5cdFx0Ly9jb25zb2xlLmxvZyhldmVudCk7XG5cdFx0Ly8tLS0tLS0tLS0tIGV2ZW50LnBheWxvYWQuY29udGFpbmVyaWRcblx0fVxuXG5cdC8vLS0tLS0tIEZvbGRlci9TdWJmb2xkZXIgQWRkIC0tLS0tLVxuICAgIHB1YmxpYyB2aWV3Zm9vdHlwZTogc3RyaW5nO1xuICAgIHB1YmxpYyBwdWJsaWNjbGljazogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBwcml2YXRlY2xpY2s6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgc3RyU2VsZWN0Rm9sZGVyVHlwZTogc3RyaW5nO1xuICAgIHB1YmxpYyBpc0ZvbGRlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBpc1N1YkZvbGRlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBmb2xkZXJGb3JTZWxlY3Q6IGFueSA9IFtdO1xuICAgIHB1YmxpYyBwYXJlbnRGb2xkZXJzOiBhbnkgPSBbXTtcbiAgICBwdWJsaWMgcGFyZW50Zm9sZGVyaWQ6IHN0cmluZyA9IFwiXCI7XG4gICAgcHVibGljIGZvbGRlcm5hbWU6IHN0cmluZyA9IFwiXCI7XG4gICAgaXNNb2RlbEhpZGRlblJlZ2lzdGVyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblx0b25QdWJsaXNoVmlld2ZvbygpIHtcblx0XHR0aGlzLnByaXZhdGVjbGljayA9IGZhbHNlO1xuXHRcdHRoaXMucHVibGljY2xpY2sgPSBmYWxzZTtcblxuXHRcdCQoJyNteVB1Ymxpc2hNb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG5cdFx0aWYgKCF0aGlzLmlzTW9kZWxIaWRkZW5SZWdpc3RlcmVkKSB7XG5cdFx0XHR0aGlzLmlzTW9kZWxIaWRkZW5SZWdpc3RlcmVkID0gdHJ1ZTtcblx0XHRcdCQoJyNteVB1Ymxpc2hNb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGlmICgkKCcudG9nZ2xlLXByaXZhdGUnKS5jc3MoJ2Rpc3BsYXknKSAhPSAnbm9uZScpIHtcblx0XHRcdFx0XHQkKFwiLnRvZ2dsZS1wcml2YXRlXCIpLnNsaWRlVG9nZ2xlKFwic2xvd1wiKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0cHVibGlzaHZpZXdmb29wb3B1cCh2dHlwZSkge1xuXG5cdFx0dGhpcy52aWV3Zm9vdHlwZSA9IHZ0eXBlO1xuXG5cdFx0aWYgKHZ0eXBlID09ICdwdWJsaWMnKSB7XG5cdFx0XHR0aGlzLmFycmFuZ2VGb2xkZXJmb3JTZWxlY3Rpb24odGhpcy5wdWJsaWNmb2xkZXIpO1xuXHRcdFx0dGhpcy5zdHJTZWxlY3RGb2xkZXJUeXBlID0gXCJTZWxlY3QgYSBQdWJsaWMgZm9sZGVyXCI7XG5cblx0XHRcdCQoJyNwdWJsaWNidG4nKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblx0XHRcdCQoJyNwcml2YXRlYnRuJykucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG5cdFx0XHRpZiAoJCgnLnRvZ2dsZS1wcml2YXRlJykuY3NzKCdkaXNwbGF5JykgPT0gJ25vbmUnXG5cdFx0XHRcdCYmIHRoaXMucHVibGljY2xpY2sgPT0gZmFsc2UpIHtcblx0XHRcdFx0JChcIi50b2dnbGUtcHJpdmF0ZVwiKS5zbGlkZVRvZ2dsZShcInNsb3dcIik7XG5cdFx0XHRcdHRoaXMucHVibGljY2xpY2sgPSB0cnVlO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCQoJy50b2dnbGUtcHJpdmF0ZScpLmNzcygnZGlzcGxheScpICE9ICdub25lJ1xuXHRcdFx0XHQmJiB0aGlzLnB1YmxpY2NsaWNrID09IHRydWUpIHtcblxuXHRcdFx0XHQkKFwiLnRvZ2dsZS1wcml2YXRlXCIpLnNsaWRlVG9nZ2xlKFwic2xvd1wiKTtcblx0XHRcdFx0dGhpcy5wdWJsaWNjbGljayA9IGZhbHNlO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCQoJy50b2dnbGUtcHJpdmF0ZScpLmNzcygnZGlzcGxheScpICE9ICdub25lJ1xuXHRcdFx0XHQmJiB0aGlzLnByaXZhdGVjbGljayA9PSB0cnVlKSB7XG5cdFx0XHRcdHRoaXMucHVibGljY2xpY2sgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLnByaXZhdGVjbGljayA9IGZhbHNlO1xuXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHZ0eXBlID09ICdwcml2YXRlJykge1xuXHRcdFx0dGhpcy5hcnJhbmdlRm9sZGVyZm9yU2VsZWN0aW9uKHRoaXMucHJpdmF0ZWZvbGRlcik7XG5cblx0XHRcdHRoaXMuc3RyU2VsZWN0Rm9sZGVyVHlwZSA9IFwiU2VsZWN0IGEgUHJpdmF0ZSBmb2xkZXJcIjtcblxuXHRcdFx0JCgnI3B1YmxpY2J0bicpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXHRcdFx0JCgnI3ByaXZhdGVidG4nKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblx0XHRcdGlmICgkKCcudG9nZ2xlLXByaXZhdGUnKS5jc3MoJ2Rpc3BsYXknKSA9PSAnbm9uZSdcblx0XHRcdFx0JiYgdGhpcy5wcml2YXRlY2xpY2sgPT0gZmFsc2UpIHtcblxuXHRcdFx0XHQkKFwiLnRvZ2dsZS1wcml2YXRlXCIpLnNsaWRlVG9nZ2xlKFwic2xvd1wiKTtcblx0XHRcdFx0dGhpcy5wcml2YXRlY2xpY2sgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoJCgnLnRvZ2dsZS1wcml2YXRlJykuY3NzKCdkaXNwbGF5JykgIT0gJ25vbmUnXG5cdFx0XHRcdCYmIHRoaXMucHJpdmF0ZWNsaWNrID09IHRydWUpIHtcblxuXHRcdFx0XHQkKFwiLnRvZ2dsZS1wcml2YXRlXCIpLnNsaWRlVG9nZ2xlKFwic2xvd1wiKTtcblx0XHRcdFx0dGhpcy5wcml2YXRlY2xpY2sgPSBmYWxzZTtcblxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoJCgnLnRvZ2dsZS1wcml2YXRlJykuY3NzKCdkaXNwbGF5JykgIT0gJ25vbmUnXG5cdFx0XHRcdCYmIHRoaXMucHVibGljY2xpY2sgPT0gdHJ1ZSkge1xuXG5cdFx0XHRcdHRoaXMucHJpdmF0ZWNsaWNrID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5wdWJsaWNjbGljayA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuICAgICAgICBpZiAoIXRoaXMuY3VycmVudFZpZXdmb28uY292ZXJpbWFnZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFZpZXdmb28uY29udGFpbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50Vmlld2Zvby5jb250YWluZXJzWzBdLmNvbnRhaW5lcmltYWdlcy5sZW5ndGgpIHtcblx0XHRcdFx0XHQvL2FsZXJ0KFwiQ3JvcHBlciBjYWxsZWRcIik7XG5cdFx0XHRcdFx0dmFyIGltZ1VybCA9IHRoaXMuc2VydmljZVVybFxuXHRcdFx0XHRcdFx0KyBcIi91cGxvYWQvZ2FsbGVyeS9cIlxuXHRcdFx0XHRcdFx0KyB0aGlzLmN1cnJlbnRWaWV3Zm9vLmNvbnRhaW5lcnNbMF0uY29udGFpbmVyaW1hZ2VzWzBdLmltYWdlbmFtZTtcblx0XHRcdFx0XHR0aGlzLmNyb3BDb3Zlci51cmwgPSBpbWdVcmw7XG5cdFx0XHRcdFx0dGhpcy5jcm9wQ292ZXIuc3RhcnRDcm9wcGVyKCk7XG5cdFx0XHRcdH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vXG4gICAgICAgIH1cblxuXHR9XG5cblx0YXJyYW5nZUZvbGRlcmZvclNlbGVjdGlvbihmb2xkZXJBcnJheTogYW55KSB7XG5cblx0XHR0aGlzLmZvbGRlckZvclNlbGVjdCA9IFtdOy8vbXlHbG9iYWxzLlB1YmxpY0ZvbGRlcjtcblx0XHR0aGlzLnBhcmVudEZvbGRlcnMgPSBmb2xkZXJBcnJheTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZm9sZGVyQXJyYXkubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRoaXMuZm9sZGVyRm9yU2VsZWN0LnB1c2goe1xuXHRcdFx0XHRmb2xkZXJpZDogZm9sZGVyQXJyYXlbaV0uaWQsXG5cdFx0XHRcdGZvbGRlcm5hbWU6IGZvbGRlckFycmF5W2ldLmZvbGRlcm5hbWVcblx0XHRcdH0pO1xuXHRcdFx0aWYgKGZvbGRlckFycmF5W2ldLnN1YmZvbGRlcikge1xuXHRcdFx0XHRsZXQgc3ViZm9sZGVycyA9IGZvbGRlckFycmF5W2ldLnN1YmZvbGRlcjtcblxuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHN1YmZvbGRlcnMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRsZXQgb2Jqc3ViZm9sZGVyID0gc3ViZm9sZGVyc1tqXTtcblx0XHRcdFx0XHRsZXQgc3ViZm9sZGVybmFtZSA9IG9ianN1YmZvbGRlci5mb2xkZXJuYW1lO1xuXHRcdFx0XHRcdHZhciBzcGxpdEFycmF5ID0gc3ViZm9sZGVybmFtZS5zcGxpdChcIi9cIik7XG5cdFx0XHRcdFx0c3ViZm9sZGVybmFtZSA9IFwiLS0tIFwiICsgc3BsaXRBcnJheVtzcGxpdEFycmF5Lmxlbmd0aCAtIDFdO1xuXG5cdFx0XHRcdFx0dGhpcy5mb2xkZXJGb3JTZWxlY3QucHVzaCh7XG5cdFx0XHRcdFx0XHRmb2xkZXJpZDogb2Jqc3ViZm9sZGVyLmlkLFxuXHRcdFx0XHRcdFx0Zm9sZGVybmFtZTogc3ViZm9sZGVybmFtZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c2hvd0FkZEZvbGRlclJvdyhpc0ZvbDogYm9vbGVhbiwgaXNTdWJGb2w6IGJvb2xlYW4pIHtcblx0XHR0aGlzLmlzRm9sZGVyID0gaXNGb2w7XG5cdFx0dGhpcy5pc1N1YkZvbGRlciA9IGlzU3ViRm9sO1xuXHR9XG5cblx0Y3JlYXRlRm9sZGVyKCkge1xuXG5cdFx0bGV0IGZvbGRlcnR5cGUgPSB0aGlzLnZpZXdmb290eXBlO1xuXG5cdFx0aWYgKHRoaXMuZm9sZGVybmFtZSAhPSAnJykge1xuXHRcdFx0dGhpcy5mb2xkZXJsb2FkaW5nID0gdHJ1ZTtcblx0XHRcdHRoaXMuYXV0aFNlcnZpY2UuYWRkZm9sZGVyKHRoaXMubG9naW5Vc2VyLmlkLCB0aGlzLmZvbGRlcm5hbWUsIGZvbGRlcnR5cGUsIHRoaXMucGFyZW50Zm9sZGVyaWQpXG5cdFx0XHRcdC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRcdGlmICghdGhpcy5wYXJlbnRmb2xkZXJpZCkge1xuXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRGb2xkZXIgPSByZXN1bHQuZGF0YTtcblxuXHRcdFx0XHRcdFx0aWYgKGZvbGRlcnR5cGUgPT0gJ3B1YmxpYycpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5wdWJsaWNmb2xkZXIucHVzaChyZXN1bHQuZGF0YSk7XG5cdFx0XHRcdFx0XHRcdHRoaXMuYXJyYW5nZUZvbGRlcmZvclNlbGVjdGlvbih0aGlzLnB1YmxpY2ZvbGRlcik7XG5cblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZm9sZGVydHlwZSA9PSAncHJpdmF0ZScpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5wcml2YXRlZm9sZGVyLnB1c2gocmVzdWx0LmRhdGEpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLmFycmFuZ2VGb2xkZXJmb3JTZWxlY3Rpb24odGhpcy5wcml2YXRlZm9sZGVyKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKGZvbGRlcnR5cGUgPT0gJ3B1YmxpYycpIHtcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnB1YmxpY2ZvbGRlci5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzLnB1YmxpY2ZvbGRlcltpXS5pZCA9PT0gcmVzdWx0LmRhdGEuaWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMucHVibGljZm9sZGVyW2ldLnN1YmZvbGRlci5wdXNoKHJlc3VsdC5kYXRhKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dGhpcy5hcnJhbmdlRm9sZGVyZm9yU2VsZWN0aW9uKHRoaXMucHVibGljZm9sZGVyKTtcblxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChmb2xkZXJ0eXBlID09ICdwcml2YXRlJykge1xuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucHJpdmF0ZWZvbGRlci5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzLnByaXZhdGVmb2xkZXJbaV0uaWQgPT09IHJlc3VsdC5kYXRhLmlkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnByaXZhdGVmb2xkZXJbaV0uc3ViZm9sZGVyLnB1c2gocmVzdWx0LmRhdGEpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR0aGlzLmFycmFuZ2VGb2xkZXJmb3JTZWxlY3Rpb24odGhpcy5wcml2YXRlZm9sZGVyKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5mb2xkZXJsb2FkaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0dGhpcy5zaG93QWRkRm9sZGVyUm93KGZhbHNlLCBmYWxzZSk7XG5cblx0XHRcdFx0fSwgKGVycm9yOiBhbnkpID0+IHtcblx0XHRcdFx0XHQvL3RoaXMuZXJyb3JNc2cgPSBlcnJvcjtcblx0XHRcdFx0XHR0aGlzLmZvbGRlcmxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0gRm9sZGVyIERvbmUgLS0tLS0tLS1cblxuXHRnZXRGb2xkZXJMaXN0RnJvbVNlcnZlcigpIHtcblxuXHRcdHRoaXMuYXV0aFNlcnZpY2UuZm9sZGVybGlzdCh0aGlzLmxvZ2luVXNlci5pZClcblx0XHRcdC5zdWJzY3JpYmUoKHJlc3VsdDogYW55KSA9PiB7XG5cblx0XHRcdFx0dmFyIHB1YmZvbGRlcjogYW55ID0gW107XG5cdFx0XHRcdHZhciBwcml2Zm9sZGVyOiBhbnkgPSBbXTtcblxuXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0LmRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRsZXQgdGVtcF9mb2xkZXJ0eXBlID0gcmVzdWx0LmRhdGFbaV0uZm9sZGVydHlwZTtcblx0XHRcdFx0XHRpZiAodGVtcF9mb2xkZXJ0eXBlID09ICdiYWNrdXAnKSB7XG5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZiAodGVtcF9mb2xkZXJ0eXBlID09ICdwdWJsaWMnKSB7XG5cblx0XHRcdFx0XHRcdHB1YmZvbGRlci5wdXNoKHJlc3VsdC5kYXRhW2ldKTtcblxuXHRcdFx0XHRcdH0gZWxzZSBpZiAodGVtcF9mb2xkZXJ0eXBlID09ICdwcml2YXRlJykge1xuXG5cdFx0XHRcdFx0XHRwcml2Zm9sZGVyLnB1c2gocmVzdWx0LmRhdGFbaV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMucHVibGljZm9sZGVyID0gcHViZm9sZGVyO1xuXHRcdFx0XHR0aGlzLnByaXZhdGVmb2xkZXIgPSBwcml2Zm9sZGVyO1xuXG5cblx0XHRcdH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHB1YmZvbGRlcjogYW55ID0gW107XG5cdFx0XHRcdHZhciBwcml2Zm9sZGVyOiBhbnkgPSBbXTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHVibGljZm9sZGVyID0gcHViZm9sZGVyO1xuXHRcdFx0XHR0aGlzLnByaXZhdGVmb2xkZXIgPSBwcml2Zm9sZGVyO1xuXG5cdFx0XHRcdHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJmb2xkZXIgQWRkIGZhaWw6IFwiICsgZXJyb3IpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRkaXNwbGF5c3VidGFnKHRleHQsIGlkKSB7XG5cdFx0JChcIi5zZWxlY3RfYnRuXCIpLnRleHQodGV4dCk7XG5cdFx0JChcIi5idG4tZ3JvdXBcIikucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpO1xuXHRcdHRoaXMuZm9sZGVyaWQgPSBpZDtcblx0fVxuXG5cdC8vZW5kIG9mIHB1Ymxpc2ggbm93IGZvbGRlciBjb2RlXG5cblx0dXBkYXRlSXRlbXMoZXZlbnQpIHtcblx0XHRjb25zb2xlLmxvZyhcInVwZGF0ZUl0ZW1zXCIpO1xuXHRcdGNvbnNvbGUubG9nKGV2ZW50KTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgb2JqZWN0ID0gZXZlbnRbaV07XG5cdFx0XHR2YXIgY29udGFpbmVyID0gdGhpcy5jdXJyZW50Vmlld2Zvby5tYXBDb250YWluZXJbb2JqZWN0LnBheWxvYWQuY29udGFpbmVyaWRdO1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhcImNvbnRhaW5lcjpcIiArIGNvbnRhaW5lci5pZCk7XG5cdFx0XHRjb250YWluZXIubmdHcmlkSXRlbUV2ZW50ID0gb2JqZWN0O1xuXHRcdFx0Y29udGFpbmVyLm5nR3JpZEl0ZW1PcHRpb25zLmNvbCA9IGNvbnRhaW5lci5uZ0dyaWRJdGVtRXZlbnQuY29sO1xuXHRcdFx0Y29udGFpbmVyLm5nR3JpZEl0ZW1PcHRpb25zLmhlaWdodCA9IGNvbnRhaW5lci5uZ0dyaWRJdGVtRXZlbnQuaGVpZ2h0O1xuXHRcdFx0Y29udGFpbmVyLm5nR3JpZEl0ZW1PcHRpb25zLmxlZnQgPSBjb250YWluZXIubmdHcmlkSXRlbUV2ZW50LmxlZnQ7XG5cdFx0XHRjb250YWluZXIubmdHcmlkSXRlbU9wdGlvbnMucm93ID0gY29udGFpbmVyLm5nR3JpZEl0ZW1FdmVudC5yb3c7XG5cdFx0XHRjb250YWluZXIubmdHcmlkSXRlbU9wdGlvbnMuc2l6ZXggPSBjb250YWluZXIubmdHcmlkSXRlbUV2ZW50LnNpemV4O1xuXHRcdFx0Y29udGFpbmVyLm5nR3JpZEl0ZW1PcHRpb25zLnNpemV5ID0gY29udGFpbmVyLm5nR3JpZEl0ZW1FdmVudC5zaXpleTtcblx0XHRcdGNvbnRhaW5lci5uZ0dyaWRJdGVtT3B0aW9ucy50b3AgPSBjb250YWluZXIubmdHcmlkSXRlbUV2ZW50LnRvcDtcblx0XHRcdGNvbnRhaW5lci5uZ0dyaWRJdGVtT3B0aW9ucy53aWR0aCA9IGNvbnRhaW5lci5uZ0dyaWRJdGVtRXZlbnQud2lkdGg7XG5cdFx0XHRjb250YWluZXIubmdHcmlkSXRlbU9wdGlvbnMuY29udGFpbmVyaWQgPSBjb250YWluZXIuaWQ7XG5cdFx0XHR2YXIganNvbiA9IGNvbnRhaW5lci5uZ0dyaWRJdGVtT3B0aW9ucztcblx0XHRcdHRoaXMuYXV0aFNlcnZpY2UuZ3JpZGl0ZW1vcHRpb24oanNvbilcblx0XHRcdFx0LnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdCkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2cocmVzdWx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sIChlcnJvcjogYW55KSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiZ3JpZCBpdGVtIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcblx0XHRcdFx0fSlcblxuXG5cdFx0fVxuXG5cdH1cblxuXHRhdHRhY2hHcmlkT3B0aW9uc1RvQ29udGFpbmVyKGNvbnRhaW5lcjogYW55KSB7XG5cdFx0Y29udGFpbmVyLm5nR3JpZEl0ZW1PcHRpb25zID0ge1xuXHRcdFx0J2NvbCc6IDEsICAgICAgICAgICAgICAgLy8gIFRoZSBzdGFydCBjb2x1bW4gZm9yIHRoZSBpdGVtXG5cdFx0XHQncm93JzogMSwgICAgICAgICAgICAgICAvLyAgVGhlIHN0YXJ0IHJvdyBmb3IgdGhlIGl0ZW1cblx0XHRcdCdzaXpleCc6IDUsICAgICAgICAgICAgIC8vICBUaGUgc3RhcnQgd2lkdGggaW4gdGVybXMgb2YgY29sdW1ucyBmb3IgdGhlIGl0ZW1cblx0XHRcdCdzaXpleSc6IDUsICAgICAgICAgICAgIC8vICBUaGUgc3RhcnQgaGVpZ2h0IGluIHRlcm1zIG9mIHJvd3MgZm9yIHRoZSBpdGVtXG5cdFx0XHQnZHJhZ0hhbmRsZSc6IG51bGwsICAgICAvLyAgVGhlIHNlbGVjdG9yIHRvIGJlIHVzZWQgZm9yIHRoZSBkcmFnIGhhbmRsZS4gSWYgbnVsbCwgdXNlcyB0aGUgd2hvbGUgaXRlbVxuXHRcdFx0J3Jlc2l6ZUhhbmRsZSc6IG51bGwsICAgLy8gIFRoZSBzZWxlY3RvciB0byBiZSB1c2VkIGZvciB0aGUgcmVzaXplIGhhbmRsZS4gSWYgbnVsbCwgdXNlcyAnYm9yZGVyU2l6ZScgcGl4ZWxzIGZyb20gdGhlIHJpZ2h0IGZvciBob3Jpem9udGFsIHJlc2l6ZSxcblx0XHRcdC8vICAgICdib3JkZXJTaXplJyBwaXhlbHMgZnJvbSB0aGUgYm90dG9tIGZvciB2ZXJ0aWNhbCwgYW5kIHRoZSBzcXVhcmUgaW4gdGhlIGNvcm5lciBib3R0b20tcmlnaHQgZm9yIGJvdGhcblx0XHRcdC8vJ2JvcmRlclNpemUnOiAxNSxcblx0XHRcdCdmaXhlZCc6IGZhbHNlLCAgICAgICAgIC8vICBJZiB0aGUgZ3JpZCBpdGVtIHNob3VsZCBiZSBjYXNjYWRlZCBvciBub3QuIElmIHllcywgbWFudWFsIG1vdmVtZW50IGlzIHJlcXVpcmVkXG5cdFx0XHQnZHJhZ2dhYmxlJzogdHJ1ZSwgICAgICAvLyAgSWYgdGhlIGdyaWQgaXRlbSBjYW4gYmUgZHJhZ2dlZC4gSWYgdGhpcyBvciB0aGUgZ2xvYmFsIHNldHRpbmcgaXMgc2V0IHRvIGZhbHNlLCB0aGUgaXRlbSBjYW5ub3QgYmUgZHJhZ2dlZC5cblx0XHRcdCdyZXNpemFibGUnOiB0cnVlLCAgICAgIC8vICBJZiB0aGUgZ3JpZCBpdGVtIGNhbiBiZSByZXNpemVkLiBJZiB0aGlzIG9yIHRoZSBnbG9iYWwgc2V0dGluZyBpcyBzZXQgdG8gZmFsc2UsIHRoZSBpdGVtIGNhbm5vdCBiZSByZXNpemVkLlxuXHRcdFx0J3BheWxvYWQnOiBudWxsLCAgICAgICAgLy8gIEFuIG9wdGlvbmFsIGN1c3RvbSBwYXlsb2FkIChzdHJpbmcvbnVtYmVyL29iamVjdCkgdG8gYmUgdXNlZCB0byBpZGVudGlmeSB0aGUgaXRlbSBmb3Igc2VyaWFsaXphdGlvblxuXHRcdFx0J21heENvbHMnOiAwLCAgICAgICAgICAgLy8gIFRoZSBtYXhpbXVtIG51bWJlciBvZiBjb2x1bW5zIGZvciBhIHBhcnRpY3VsYXIgaXRlbS4gVGhpcyB2YWx1ZSB3aWxsIG9ubHkgb3ZlcnJpZGUgdGhlIHZhbHVlIGZyb20gdGhlIGdyaWQgKGlmIHNldCkgaWYgaXQgaXMgc21hbGxlclxuXHRcdFx0J21pbkNvbHMnOiAwLCAgICAgICAgICAgLy8gIFRoZSBtaW5pbXVtIG51bWJlciBvZiBjb2x1bW5zIGZvciBhIHBhcnRpY3VsYXIgaXRlbS4gVGhpcyB2YWx1ZSB3aWxsIG9ubHkgb3ZlcnJpZGUgdGhlIHZhbHVlIGZyb20gdGhlIGdyaWQgaWYgbGFyZ2VyXG5cdFx0XHQnbWF4Um93cyc6IDAsICAgICAgICAgICAvLyAgVGhlIG1heGltdW0gbnVtYmVyIG9mIHJvd3MgZm9yIGEgcGFydGljdWxhciBpdGVtLiBUaGlzIHZhbHVlIHdpbGwgb25seSBvdmVycmlkZSB0aGUgdmFsdWUgZnJvbSB0aGUgZ3JpZCAoaWYgc2V0KSBpZiBpdCBpcyBzbWFsbGVyXG5cdFx0XHQnbWluUm93cyc6IDAsICAgICAgICAgICAvLyAgVGhlIG1pbmltdW0gbnVtYmVyIG9mIHJvd3MgZm9yIGEgcGFydGljdWxhciBpdGVtLiBUaGlzIHZhbHVlIHdpbGwgb25seSBvdmVycmlkZSB0aGUgdmFsdWUgZnJvbSB0aGUgZ3JpZCBpZiBsYXJnZXJcblx0XHRcdCdtaW5XaWR0aCc6IDAsICAgICAgICAgIC8vICBUaGUgbWluaW11bSB3aWR0aCBvZiBhIHBhcnRpY3VsYXIgaXRlbS4gVGhpcyB2YWx1ZSB3aWxsIG92ZXJyaWRlIHRoZSB2YWx1ZSBmcm9tIHRoZSBncmlkLCBhcyB3ZWxsIGFzIHRoZSBtaW5pbXVtIGNvbHVtbnMgaWYgdGhlIHJlc3VsdGluZyBzaXplIGlzIGxhcmdlclxuXHRcdFx0J21pbkhlaWdodCc6IDAsICAgICAgICAvLyAgVGhlIG1pbmltdW0gaGVpZ2h0IG9mIGEgcGFydGljdWxhciBpdGVtLiBUaGlzIHZhbHVlIHdpbGwgb3ZlcnJpZGUgdGhlIHZhbHVlIGZyb20gdGhlIGdyaWQsIGFzIHdlbGwgYXMgdGhlIG1pbmltdW0gcm93cyBpZiB0aGUgcmVzdWx0aW5nIHNpemUgaXMgbGFyZ2VyXG5cdFx0XHRwYXlsb2FkOiB7XG5cdFx0XHRcdGNvbnRhaW5lcmlkOiBjb250YWluZXIuaWRcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRzZXR2aWV3cnNldHRpbmd2YWx1ZShWaWV3Zm9vKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coVmlld2Zvbyk7XG4gICAgICAgXG5cdFx0aWYgKFZpZXdmb28uYWxsb3djb21tZW50ID09PSBcInRydWVcIikge1xuXHRcdFx0dGhpcy5zZXRjb21tZW50ID0gdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKFZpZXdmb28uYWxsb3dzaGFyaW5nID09PSBcInRydWVcIikge1xuXHRcdFx0dGhpcy5zZXRzaGFyaW5nID0gdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKFZpZXdmb28uYWxsb3dzZWxlY3Rpb24gPT09IFwidHJ1ZVwiKSB7XG5cdFx0XHR0aGlzLnNldHNlbGVjdGlvbiA9IHRydWU7XG5cdFx0fVxuXHRcdGlmIChWaWV3Zm9vLmltYWdlZGF0YW1vdXNlaG92ZXIgPT09IFwidHJ1ZVwiKSB7XG5cdFx0XHR0aGlzLnNldG1vdXNlaG92ZXIgPSB0cnVlO1xuXHRcdH1cblx0XHRpZiAoVmlld2Zvby5pbWFnZWluZm9mcmFtZSA9PT0gXCJ0cnVlXCIpIHtcblx0XHRcdHRoaXMuc2V0aW1hZ2VpbmZvZnJhbWUgPSB0cnVlO1xuXHRcdH1cblx0XHRpZiAoVmlld2Zvby5hcHBseXdhdGVybWFyayA9PT0gdHJ1ZSkge1xuXHRcdFx0dGhpcy5zZXRhcHBseXdhdGVybWFyayA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKFZpZXdmb28uYmFja2dyb3VuZGNvbG9yID09IFwiI0ZGRkZGRlwiKSB7XG5cdFx0XHQkKFwiI3JhZGlvMVwiKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKFZpZXdmb28uYmFja2dyb3VuZGNvbG9yID09IFwiIzAwMDAwMFwiKSB7XG5cdFx0XHQkKFwiI3JhZGlvMlwiKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0JChcIiNjb2xvcjZcIikuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBWaWV3Zm9vLmJhY2tncm91bmRjb2xvcik7XG5cdFx0XHQkKFwiI3JhZGlvMVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXHRcdFx0JChcIiNyYWRpbzJcIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblx0XHR9XG5cdFx0aWYgKFZpZXdmb28ubWVudWZvbnRjb2xvciA9PSBcIiNGRkZGRkZcIikge1xuXHRcdFx0JChcIiNyYWRpbzNcIikucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH1cblx0XHRlbHNlIGlmIChWaWV3Zm9vLm1lbnVmb250Y29sb3IgPT0gXCIjMDAwMDAwXCIpIHtcblx0XHRcdCQoXCIjcmFkaW80XCIpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHQkKFwiI2NvbG9yN1wiKS5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFZpZXdmb28ubWVudWZvbnRjb2xvcik7XG5cdFx0XHQkKFwiI3JhZGlvM1wiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXHRcdFx0JChcIiNyYWRpbzRcIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblx0XHR9XG5cdFx0aWYgKFZpZXdmb28ubWVudWJhY2tncm91bmRjb2xvciA9PSBcIiNGRkZGRkZcIikge1xuXHRcdFx0JChcIiNyYWRpbzVcIikucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH1cblx0XHRlbHNlIGlmIChWaWV3Zm9vLm1lbnViYWNrZ3JvdW5kY29sb3IgPT0gXCIjMDAwMDAwXCIpIHtcblx0XHRcdCQoXCIjcmFkaW82XCIpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHR9XG5cdFx0ZWxzZSAge1xuXHRcdFx0JChcIiNjb2xvcjhcIikuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBWaWV3Zm9vLm1lbnViYWNrZ3JvdW5kY29sb3IpO1xuXHRcdFx0JChcIiNyYWRpbzVcIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblx0XHRcdCQoXCIjcmFkaW82XCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cdFx0fVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cblx0XHQvLyAgICAgICAgICAgIHRoaXMudmlld2Zvb3Bhc3N3b3JkLmNvbnRyb2xzWydjaGttYWlsJ10udXBkYXRlVmFsdWUoZmFsc2UpO1xuXHRcdC8vICAgICAgICAgICAgdGhpcy52aWV3Zm9vcGFzc3dvcmQuY29udHJvbHNbJ2Noa3NtcyddLnVwZGF0ZVZhbHVlKGZhbHNlKTtcblx0XHR0aGlzLmNyZWF0aW5nT3JGZXRjaGluZ1ZpZXdmb28oKTtcblxuXHRcdHRoaXMuZ2V0Rm9sZGVyTGlzdEZyb21TZXJ2ZXIoKTtcblxuXHRcdCQoXCIuQ0JpbWFnZXNpemVcIikuY2hhbmdlKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGNoZWNrZWQgPSAkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpO1xuXHRcdFx0JChcIi5DQmltYWdlc2l6ZVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXHRcdFx0aWYgKGNoZWNrZWQpIHtcblx0XHRcdFx0JCh0aGlzKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cblx0XHRcdFx0dGhpcy5pbWFnZXNpemUgPSB0aGlzLnZhbHVlO1xuXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0JChcIi5DQnBhc3N3b3JkdHlwZVwiKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgY2hlY2tlZCA9ICQodGhpcykuaXMoJzpjaGVja2VkJyk7XG5cdFx0XHQkKFwiLkNCcGFzc3dvcmR0eXBlXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cdFx0XHRpZiAoY2hlY2tlZCkge1xuXHRcdFx0XHQkKHRoaXMpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHRcdFx0Ly90aGlzLmltYWdlc2l6ZSA9IHRoaXMudmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXG5cdFx0JChcIltkYXRhLXRvZ2dsZV1cIikuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdG9nZ2xlX2VsID0gJCh0aGlzKS5kYXRhKFwidG9nZ2xlXCIpO1xuXHRcdFx0JCh0b2dnbGVfZWwpLnRvZ2dsZUNsYXNzKFwib3Blbi1zaWRlYmFyXCIpO1xuXHRcdH0pO1xuXG5cdH1cblxuXG5cblx0bmdBZnRlclZpZXdJbml0KCkge1xuXHRcdC8vd2luZG93LmpzY29sb3IoKTtcblxuXHRcdHRoaXMuY3JvcENvdmVyID0gbmV3IENyb3BDb3ZlcigkKCcjY3JvcC1hdmF0YXInKSk7XG5cdFx0anNjb2xvci5pbml0KCk7XG5cdH1cblxuXG5cdHNldFRleHRDb2xvcihwaWNrZXIpIHtcblx0XHQvL2RvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uc3R5bGUuY29sb3IgPSAnIycgKyBwaWNrZXIudG9TdHJpbmcoKVxuXHRcdGNvbnNvbGUubG9nKHBpY2tlci5zdHJpbmcoKSk7XG5cdH1cblxuXHRzZWxlY3R0ZW1wbGF0ZSgpIHtcblx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zZWxlY3RfdGVtcGxhdGUnXSk7XG5cdH1cblxuXG5cdGNvbnRhaW5lckNyZWF0ZShjb250YWluZXJ0eXBlOiBzdHJpbmcpIHtcblxuXHRcdGNvbnNvbGUubG9nKFwiZ2FsbGFyeV90ZW1wbGF0ZSBjb250YWluZXJDcmVhdGUgXCIgKyBjb250YWluZXJ0eXBlKTtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0dGhpcy5hdXRoU2VydmljZS5jb250YWluZXJDcmVhdGUoY29udGFpbmVydHlwZSwgdGhpcy5jdXJyZW50Vmlld2Zvby5pZCwgdGhpcy5sb2dpblVzZXIuaWQpXG5cdFx0XHQuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJDb250YWluZXIgQ3JlYXRlZFwiKTtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhyZXN1bHQpO1xuXHRcdFx0XHR2YXIgY29udGFpbmVyOiBDb250YWluZXIgPSByZXN1bHQuZGF0YTtcblx0XHRcdFx0Y29uc29sZS5sb2coY29udGFpbmVyLm5nR3JpZEl0ZW1PcHRpb25zKTtcblxuXHRcdFx0XHRjb250YWluZXIuY29udGFpbmVyaW1hZ2VzID0gW107XG5cblx0XHRcdFx0Y29udGFpbmVyLm5nR3JpZEl0ZW1PcHRpb25zLmRyYWdIYW5kbGUgPSBcIi5ncmlkTW92ZXJcIjtcblx0XHRcdFx0dGhpcy5jdXJyZW50Vmlld2Zvby5tYXBDb250YWluZXJbY29udGFpbmVyLmlkXSA9IGNvbnRhaW5lcjtcblx0XHRcdFx0Ly8gY29udGFpbmVyLm5nR3JpZEl0ZW1PcHRpb25zPXRoaXMuY3VycmVudFZpZXdmb28uY29udGFpbmVyLm5nR3JpZEl0ZW1PcHRpb25zO1xuXHRcdFx0XHQvL3RoaXMuYXR0YWNoR3JpZE9wdGlvbnNUb0NvbnRhaW5lcihjb250YWluZXIpO1xuXHRcdFx0XHRzZWxmLmN1cnJlbnRWaWV3Zm9vLmNvbnRhaW5lcnMucHVzaChjb250YWluZXIpO1xuXG5cdFx0XHRcdCQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoeyBzY3JvbGxUb3A6ICQoZG9jdW1lbnQpLmhlaWdodCgpIH0sICdzbG93Jyk7XG5cdFx0XHRcdC8vdGhpcy5pbml0Q29udGFpbmVyRm9yRHJvcHpvbmUoY29udGFpbmVyKTtcblxuXHRcdFx0XHQvLyAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQvLyAgICAgICAgICAgICAgICAgICAgdmFyIGRab25lID0gc2VsZi5jcmVhdGVEcm9wWm9uZShjb250YWluZXIpO1xuXHRcdFx0XHQvLyAgICAgICAgICAgICAgICB9LCAxMDAwKTtcblxuXHRcdFx0fSwgKGVycm9yOiBhbnkpID0+IHtcblx0XHRcdFx0dGhpcy5lcnJvck1zZyA9IGVycm9yO1xuXHRcdFx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJjb250YWluZXIgY3JlYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHR1cGRhdGVjb250YWluZXIoZXZlbnQ6IGFueSkge1xuXHRcdC8vYWxlcnQoXG5cdFx0Ly9hbGVydChcIm5hbWU6XCIrZXZlbnQubmFtZSk7XG5cdFx0Ly9hbGVydChcImlkOlwiK2V2ZW50LmlkKTtcblx0XHRsZXQgY29udGFpbmVydGl0bGUgPSBldmVudC50aXRsZTtcblx0XHRsZXQgY29udGFpbmVyaWQgPSBldmVudC5pZDtcblx0XHR2YXIgY29udGFpbmVydXBkYXRlRGljdCA9IHtcblx0XHRcdGNvbnRhaW5lcmlkOiBjb250YWluZXJpZCxcbiAgICAgICAgICAgIGNvbnRhaW5lcnRpdGxlOiBjb250YWluZXJ0aXRsZVxuXHRcdH1cblx0XHR0aGlzLmF1dGhTZXJ2aWNlLmNvbnRhaW5lclVwZGF0ZShjb250YWluZXJ1cGRhdGVEaWN0KVxuXHRcdFx0LnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cblx0XHRcdFx0aWYgKHJlc3VsdCkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIChlcnJvcjogYW55KSA9PiB7XG5cdFx0XHRcdHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcblx0XHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiQ29udGFpbmVyIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0ZGVsZXRlY29udGFpbmVyKGNvbnRhaW5lcmlkOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpIHtcblx0XHQvL2FsZXJ0KFwiZGVsZXRlIFwiK2NvbnRhaW5lcmlkKTtcblx0XHRjb25zb2xlLmxvZyhcImRlbGV0ZWNvbnRhaW5lciA6IFwiICsgY29udGFpbmVyaWQgKyBcIiAgaW5kZXggOiBcIiArIGluZGV4KTtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHR2YXIgY3VyckNvbnRhaW5lciA9IHNlbGYuY3VycmVudFZpZXdmb28uY29udGFpbmVyc1tpbmRleF07XG5cdFx0dGhpcy5hdXRoU2VydmljZS5jb250YWluZXJEZWxldGUoY29udGFpbmVyaWQpXG5cdFx0XHQuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2cocmVzdWx0KTtcblxuXHRcdFx0XHRjdXJyQ29udGFpbmVyLmRlbGV0ZWQgPSB0cnVlO1xuXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0c2VsZi5jdXJyZW50Vmlld2Zvby5jb250YWluZXJzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdH0sIDEwMDApO1xuXG5cdFx0XHRcdGRlbGV0ZSBzZWxmLmN1cnJlbnRWaWV3Zm9vLm1hcENvbnRhaW5lcltjb250YWluZXJpZF07XG5cdFx0XHRcdC8vY3JhdGVCbGFua0ltZyhjaWQsIG51bURpdik7XG5cdFx0XHR9LCAoZXJyb3I6IGFueSkgPT4ge1xuXHRcdFx0XHR0aGlzLmVycm9yTXNnID0gZXJyb3I7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiQ29udGFpbmVyaW1hZ2UgZGVsZXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRkZWxldGV2aWV3Zm9vKCkge1xuXHRcdHRoaXMuY3VycmVudFZpZXdmb28uZGVsZXRpbmcgPSB0cnVlO1xuXHRcdHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb2RlbGV0ZSh0aGlzLmN1cnJlbnRWaWV3Zm9vLmlkKVxuXHRcdFx0LnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cblx0XHRcdFx0aWYgKHJlc3VsdCkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cblx0XHRcdFx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nXSk7XG5cblx0XHRcdFx0fVxuXHRcdFx0fSwgKGVycm9yOiBhbnkpID0+IHtcblx0XHRcdFx0dGhpcy5lcnJvck1zZyA9IGVycm9yO1xuXHRcdFx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuXHRcdFx0XHRjb25zb2xlLmxvZyhcInZpZXdmb28gZGVsZXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuXHRcdFx0fSlcblx0fVxuXG5cdGFsbG93c2hhcmluZyh2YWwpIHtcblxuXHRcdGxldCBzZXR0aW5ndHlwZTogc3RyaW5nID0gXCJhbGxvd3NoYXJpbmdcIjtcblxuXHRcdHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb3VwZGF0ZSh0aGlzLmN1cnJlbnRWaWV3Zm9vLmlkLCB2YWwsIHNldHRpbmd0eXBlKVxuXHRcdFx0LnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cdFx0XHRcdGlmIChyZXN1bHQpIHtcblxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cdFx0XHRcdFx0dGhpcy5zZXR2aWV3cnNldHRpbmd2YWx1ZShyZXN1bHQuZGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIChlcnJvcjogYW55KSA9PiB7XG5cdFx0XHRcdHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcblx0XHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cblx0XHRcdFx0Y29uc29sZS5sb2coXCJ2aWV3Zm9vIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcblx0XHRcdH0pXG5cblx0fVxuXG5cdGFsbG93Y29tbWVudCh2YWwpIHtcblxuXHRcdGxldCBzZXR0aW5ndHlwZTogc3RyaW5nID0gXCJhbGxvd2NvbW1lbnRcIjtcblxuXHRcdHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb3VwZGF0ZSh0aGlzLmN1cnJlbnRWaWV3Zm9vLmlkLCB2YWwsIHNldHRpbmd0eXBlKVxuXHRcdFx0LnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cdFx0XHRcdGlmIChyZXN1bHQpIHtcblxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cdFx0XHRcdFx0dGhpcy5zZXR2aWV3cnNldHRpbmd2YWx1ZShyZXN1bHQuZGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIChlcnJvcjogYW55KSA9PiB7XG5cdFx0XHRcdHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcblx0XHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cblx0XHRcdFx0Y29uc29sZS5sb2coXCJ2aWV3Zm9vIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcblx0XHRcdH0pXG5cblx0fVxuXG5cdGFsbG93c2VsZWN0aW9uKHZhbCkge1xuXG5cdFx0bGV0IHNldHRpbmd0eXBlOiBzdHJpbmcgPSBcImFsbG93c2VsZWN0aW9uXCI7XG5cblx0XHR0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb291cGRhdGUodGhpcy5jdXJyZW50Vmlld2Zvby5pZCwgdmFsLCBzZXR0aW5ndHlwZSlcblx0XHRcdC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRpZiAocmVzdWx0KSB7XG5cblx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXN1bHQpO1xuXHRcdFx0XHRcdHRoaXMuc2V0dmlld3JzZXR0aW5ndmFsdWUocmVzdWx0LmRhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCAoZXJyb3I6IGFueSkgPT4ge1xuXHRcdFx0XHR0aGlzLmVycm9yTXNnID0gZXJyb3I7XG5cdFx0XHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwidmlld2ZvbyB1cGRhdGUgZmFpbDogXCIgKyBlcnJvcik7XG5cdFx0XHR9KVxuXG5cdH1cblxuXHRjaGFuZ2VpbWFnZXNpemUodmFsdWUpIHtcblx0XHR0aGlzLmlhbWdlc2l6ZSA9IHZhbHVlO1xuXHRcdGxldCBzZXR0aW5ndHlwZTogc3RyaW5nID0gXCJpbWFnZXNpemVcIjtcblx0XHR0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb291cGRhdGUodGhpcy5jdXJyZW50Vmlld2Zvby5pZCwgdGhpcy5pYW1nZXNpemUsIHNldHRpbmd0eXBlKVxuXHRcdFx0LnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cdFx0XHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXN1bHQpO1xuXG5cdFx0XHRcdH1cblx0XHRcdH0sIChlcnJvcjogYW55KSA9PiB7XG5cdFx0XHRcdHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcblx0XHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cblx0XHRcdFx0Y29uc29sZS5sb2coXCJ2aWV3Zm9vIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcblx0XHRcdH0pXG5cdH1cblxuXHRjaGFuZ2Vtb3VzZWhvdmVyKHZhbCkge1xuXG5cdFx0bGV0IHNldHRpbmd0eXBlOiBzdHJpbmcgPSBcImltYWdlZGF0YW1vdXNlaG92ZXJcIjtcblxuXHRcdHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb3VwZGF0ZSh0aGlzLmN1cnJlbnRWaWV3Zm9vLmlkLCB2YWwsIHNldHRpbmd0eXBlKVxuXHRcdFx0LnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cdFx0XHRcdGlmIChyZXN1bHQpIHtcblxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cdFx0XHRcdFx0dGhpcy5zZXR2aWV3cnNldHRpbmd2YWx1ZShyZXN1bHQuZGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIChlcnJvcjogYW55KSA9PiB7XG5cdFx0XHRcdHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcblx0XHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cblx0XHRcdFx0Y29uc29sZS5sb2coXCJ2aWV3Zm9vIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcblx0XHRcdH0pXG5cblx0fVxuXG5cdGNoYW5nZWZyYW1lKHZhbCkge1xuXG5cdFx0bGV0IHNldHRpbmd0eXBlOiBzdHJpbmcgPSBcImltYWdlaW5mb2ZyYW1lXCI7XG5cblx0XHR0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb291cGRhdGUodGhpcy5jdXJyZW50Vmlld2Zvby5pZCwgdmFsLCBzZXR0aW5ndHlwZSlcblx0XHRcdC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRpZiAocmVzdWx0KSB7XG5cblx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXN1bHQpO1xuXHRcdFx0XHRcdHRoaXMuc2V0dmlld3JzZXR0aW5ndmFsdWUocmVzdWx0LmRhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCAoZXJyb3I6IGFueSkgPT4ge1xuXHRcdFx0XHR0aGlzLmVycm9yTXNnID0gZXJyb3I7XG5cdFx0XHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwidmlld2ZvbyB1cGRhdGUgZmFpbDogXCIgKyBlcnJvcik7XG5cdFx0XHR9KVxuXHR9XG5cblx0Y2hhbmdlQXBwbHlXYXRlcm1hcmsodmFsKSB7XG5cblx0XHRsZXQgc2V0dGluZ3R5cGU6IHN0cmluZyA9IFwiYXBwbHl3YXRlcm1hcmtcIjtcblxuXHRcdHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb3VwZGF0ZSh0aGlzLmN1cnJlbnRWaWV3Zm9vLmlkLCB2YWwsIHNldHRpbmd0eXBlKVxuXHRcdFx0LnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cdFx0XHRcdGlmIChyZXN1bHQpIHtcblxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cdFx0XHRcdFx0dGhpcy5zZXR2aWV3cnNldHRpbmd2YWx1ZShyZXN1bHQuZGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIChlcnJvcjogYW55KSA9PiB7XG5cdFx0XHRcdHRoaXMuZXJyb3JNc2cgPSBlcnJvcjtcblx0XHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cblx0XHRcdFx0Y29uc29sZS5sb2coXCJ2aWV3Zm9vIHVwZGF0ZSBmYWlsOiBcIiArIGVycm9yKTtcblx0XHRcdH0pXG5cdH1cblxuXHRpbWFnZWRlZmF1bHRub0Z1bih2YWwpIHtcblxuXHRcdGxldCBzZXR0aW5ndHlwZTogc3RyaW5nID0gXCJpbWFnZWRlZmF1bHRub1wiO1xuXHRcdHRoaXMuaW1hZ2VkZWZhdWx0bm8gPSB2YWw7XG5cblx0XHR0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb291cGRhdGUodGhpcy5jdXJyZW50Vmlld2Zvby5pZCwgdGhpcy5pbWFnZWRlZmF1bHRubywgc2V0dGluZ3R5cGUpXG5cdFx0XHQuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcblx0XHRcdFx0aWYgKHJlc3VsdCkge1xuXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cocmVzdWx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgKGVycm9yOiBhbnkpID0+IHtcblx0XHRcdFx0dGhpcy5lcnJvck1zZyA9IGVycm9yO1xuXHRcdFx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuXHRcdFx0XHRjb25zb2xlLmxvZyhcInZpZXdmb28gdXBkYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuXHRcdFx0fSlcblxuXHR9XG5cblx0Y2hhbmdlYmdjb2xvcih2YWwpIHtcblxuXHRcdGxldCBzZXR0aW5ndHlwZTogc3RyaW5nID0gXCJiYWNrZ3JvdW5kY29sb3JcIjtcblx0XHRsZXQgYmFja2dyb3VuZGNvbG9yO1xuXHRcdGlmICh2YWwgPT09IFwid2hpdGVcIikge1xuXHRcdFx0dGhpcy5iYWNrZ3JvdW5kY29sb3IgPSBcIiNGRkZGRkZcIjtcblx0XHRcdCQoXCIjY29sb3I2XCIpLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgXCIjMDAwMDAwXCIpO1xuXHRcdH1cblx0XHRlbHNlIGlmICh2YWwgPT09IFwiYmxhY2tcIikge1xuXG5cdFx0XHR0aGlzLmJhY2tncm91bmRjb2xvciA9IFwiIzAwMDAwMFwiO1xuXHRcdFx0JChcIiNjb2xvcjZcIikuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiMwMDAwMDBcIik7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dmFyIGNvbG9yID0gJChcIiNjb2xvcjZcIikudmFsKCk7XG5cdFx0XHR0aGlzLmJhY2tncm91bmRjb2xvciA9ICcjJyArIGNvbG9yO1xuXG5cdFx0fVxuXHRcdHRoaXMuYXV0aFNlcnZpY2Uudmlld2Zvb3VwZGF0ZSh0aGlzLmN1cnJlbnRWaWV3Zm9vLmlkLCB0aGlzLmJhY2tncm91bmRjb2xvciwgc2V0dGluZ3R5cGUpXG5cdFx0XHQuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcblx0XHRcdFx0aWYgKHJlc3VsdCkge1xuXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cocmVzdWx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgKGVycm9yOiBhbnkpID0+IHtcblx0XHRcdFx0dGhpcy5lcnJvck1zZyA9IGVycm9yO1xuXHRcdFx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuXHRcdFx0XHRjb25zb2xlLmxvZyhcInZpZXdmb28gdXBkYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuXHRcdFx0fSlcblx0fVxuXG5cdGNoYW5nZWZvbnRjb2xvcih2YWwpIHtcblx0XHRsZXQgc2V0dGluZ3R5cGU6IHN0cmluZyA9IFwibWVudWZvbnRjb2xvclwiO1xuXG5cdFx0aWYgKHZhbCA9PT0gXCJ3aGl0ZVwiKSB7XG5cdFx0XHR0aGlzLm1lbnVmb250Y29sb3IgPSBcIiNGRkZGRkZcIjtcblx0XHRcdCQoXCIjY29sb3I3XCIpLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgXCIjMDAwMDAwXCIpO1xuXHRcdH1cblx0XHRlbHNlIGlmICh2YWwgPT09IFwiYmxhY2tcIikge1xuXHRcdFx0dGhpcy5tZW51Zm9udGNvbG9yID0gXCIjMDAwMDAwXCI7XG5cdFx0XHQkKFwiI2NvbG9yN1wiKS5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzAwMDAwMFwiKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgY29sb3IgPSAkKFwiI2NvbG9yN1wiKS52YWwoKTtcblx0XHRcdHRoaXMubWVudWZvbnRjb2xvciA9ICcjJyArIGNvbG9yO1xuXHRcdH1cblx0XHR0aGlzLmF1dGhTZXJ2aWNlLnZpZXdmb291cGRhdGUodGhpcy5jdXJyZW50Vmlld2Zvby5pZCwgdGhpcy5tZW51Zm9udGNvbG9yLCBzZXR0aW5ndHlwZSlcblx0XHRcdC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRpZiAocmVzdWx0KSB7XG5cblx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXN1bHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCAoZXJyb3I6IGFueSkgPT4ge1xuXHRcdFx0XHR0aGlzLmVycm9yTXNnID0gZXJyb3I7XG5cdFx0XHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwidmlld2ZvbyB1cGRhdGUgZmFpbDogXCIgKyBlcnJvcik7XG5cdFx0XHR9KVxuXHR9XG5cblx0Y2hhbmdlbWVudWJnY29sb3IodmFsKSB7XG5cdFx0bGV0IHNldHRpbmd0eXBlOiBzdHJpbmcgPSBcIm1lbnViYWNrZ3JvdW5kY29sb3JcIjtcblxuXHRcdGlmICh2YWwgPT09IFwid2hpdGVcIikge1xuXHRcdFx0dGhpcy5tZW51YmFja2dyb3VuZGNvbG9yID0gXCIjRkZGRkZGXCI7XG5cdFx0XHQkKFwiI2NvbG9yOFwiKS5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzAwMDAwMFwiKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAodmFsID09PSBcImJsYWNrXCIpIHtcblx0XHRcdHRoaXMubWVudWJhY2tncm91bmRjb2xvciA9IFwiIzAwMDAwMFwiO1xuXHRcdFx0JChcIiNjb2xvcjhcIikuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiMwMDAwMDBcIik7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dmFyIGNvbG9yID0gJChcIiNjb2xvcjhcIikudmFsKCk7XG5cdFx0XHR0aGlzLm1lbnViYWNrZ3JvdW5kY29sb3IgPSAnIycgKyBjb2xvcjtcblx0XHR9XG5cdFx0dGhpcy5hdXRoU2VydmljZS52aWV3Zm9vdXBkYXRlKHRoaXMuY3VycmVudFZpZXdmb28uaWQsIHRoaXMubWVudWJhY2tncm91bmRjb2xvciwgc2V0dGluZ3R5cGUpXG5cdFx0XHQuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcblx0XHRcdFx0aWYgKHJlc3VsdCkge1xuXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cocmVzdWx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgKGVycm9yOiBhbnkpID0+IHtcblx0XHRcdFx0dGhpcy5lcnJvck1zZyA9IGVycm9yO1xuXHRcdFx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuXHRcdFx0XHRjb25zb2xlLmxvZyhcInZpZXdmb28gdXBkYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuXHRcdFx0fSlcblxuXHR9XG5cblx0dGltZW91dHNlY29uZHM6IG51bWJlciA9IDUwMDA7XG5cdHVwbG9hZGluZ1dhdGVybWFyazogYm9vbGVhbiA9IGZhbHNlO1xuXHRmaWxlQ2hhbmdlV2F0ZXJtYXJrKGZpbGVJbnB1dDogYW55KSB7XG5cblx0XHR0aGlzLnVwbG9hZGluZ1dhdGVybWFyayA9IHRydWU7XG5cdFx0dmFyIGZpbGVTZWxlY3RlZCA9IGZpbGVJbnB1dC50YXJnZXQuZmlsZXNbMF07XG5cblx0XHR2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuXHRcdGZvcm1EYXRhLmFwcGVuZCgndmlld2Zvb2lkJywgdGhpcy5jdXJyZW50Vmlld2Zvby5pZCk7XG5cdFx0Zm9ybURhdGEuYXBwZW5kKCd1c2VyaWQnLCB0aGlzLmxvZ2luVXNlci5pZCk7XG5cdFx0Zm9ybURhdGEuYXBwZW5kKFwiaW1hZ2V3YXRlcm1hcmtcIiwgZmlsZVNlbGVjdGVkLCBmaWxlU2VsZWN0ZWQubmFtZSk7XG5cblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0JC5hamF4KG15R2xvYmFscy5pbWFnZVVybCArIFwiL3ZpZXdmb28vaW1hZ2V3YXRlcm1hcmtcIiwge1xuXHRcdFx0bWV0aG9kOiBcIlBPU1RcIixcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0J0F1dGhvcml6YXRpb24nOiAnQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT0nLFxuXHRcdFx0XHQvLydYX0NTUkZfVE9LRU4nOid4eHh4eHh4eHh4eHh4eHh4eHh4eCcsXG5cdFx0XHRcdC8vJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuXHRcdFx0fSxcblx0XHRcdGRhdGE6IGZvcm1EYXRhLFxuXHRcdFx0cHJvY2Vzc0RhdGE6IGZhbHNlLFxuXHRcdFx0Y29udGVudFR5cGU6IGZhbHNlLFxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdXYXRlcm1hcmsgVXBsb2FkIHN1Y2Nlc3MnKTtcblx0XHRcdFx0Y29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XG5cblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRzZWxmLnVwbG9hZGluZ1dhdGVybWFyayA9IGZhbHNlO1xuXHRcdFx0XHRcdHNlbGYuaW1hZ2V3YXRlcm1hcmsgPSBteUdsb2JhbHMuaW1hZ2VVcmwgKyBcIi91cGxvYWQvZ2FsbGVyeS9cIiArIHJlc3VsdC5kYXRhLmltYWdld2F0ZXJtYXJrO1xuXG5cdFx0XHRcdFx0bXlHbG9iYWxzLmN1cnJlbnRWaWV3Zm9vLmltYWdld2F0ZXJtYXJrID0gcmVzdWx0LmRhdGEuY292ZXJpbWFnZTtcblxuXHRcdFx0XHR9LCB0aGlzLnRpbWVvdXRzZWNvbmRzKTtcblx0XHRcdH0sXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYudXBsb2FkaW5nV2F0ZXJtYXJrID0gZmFsc2U7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdVcGxvYWQgZXJyb3InKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9XG5cdHVwbG9hZGluZ0Nyb3BlckltYWdlOiBib29sZWFuID0gZmFsc2U7XG5cdG9uY3JvcHBvcHVwZG9uZSgpIHtcblxuXHRcdHRoaXMudXBsb2FkaW5nQ3JvcGVySW1hZ2UgPSB0cnVlO1xuXHRcdHRoaXMuaXN1cGxvYWQgPSBmYWxzZTtcblx0XHR2YXIgJGltYWdlID0gdGhpcy5jcm9wQ292ZXIuJGltZztcblxuXHRcdC8vdmFyIGNyb3BwZWRjYW52YXMgPSAkaW1hZ2UuY3JvcHBlcignZ2V0Q3JvcHBlZENhbnZhcycpO1xuXHRcdC8vdGhpcy5maWxlbmFtZSA9IGNyb3BwZWRjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xuXG5cdFx0Ly92YXIgJGltZyA9ICQoJzxpbWcgc3JjPVwiJyArIHRoaXMuZmlsZW5hbWUgKyAnXCIgaWQ9XCJhdnRhcmltZ1wiIGNsYXNzPVwiY292ZXJpbWdcIj4nKTtcblx0XHQvLyQoJyNjb3ZlcldyYXBwZXInKS5lbXB0eSgpLmh0bWwoJGltZyk7XG5cdFx0Ly8kKFwiI2ZybUJyb3dzZVwiKVswXS5yZXNldCgpO1xuXG5cdFx0dmFyIGltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdnRhcmltZycpO1xuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRibG9iVXRpbC5pbWdTcmNUb0Jsb2IoaW1nLnNyYykudGhlbihmdW5jdGlvbihibG9iKSB7XG5cdFx0XHRibG9iLmxhc3RNb2RpZmllZERhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0YmxvYi5uYW1lID0gc2VsZi5jdXJyZW50Vmlld2Zvby5pZCArIFwiLmpwZ1wiO1xuXG5cdFx0XHQvL3ZhciBmaWxlID0gbmV3IEZpbGUoW2Jsb2JdLCBzZWxmLmN1cnJlbnRWaWV3Zm9vLmlkK1wiLmpwZ1wiKTtcblxuXHRcdFx0Y29uc29sZS5sb2coXCJCbG9iIHN1Y2Nlc3NcIik7XG5cdFx0XHRjb25zb2xlLmxvZyhibG9iKTtcblx0XHRcdGNvbnNvbGUubG9nKHNlbGYuY3JvcENvdmVyLiRmaWxlQ292ZXIpO1xuXG5cdFx0XHR2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblx0XHRcdC8vZm9ybURhdGEuYXBwZW5kKCdjb3ZlcmltYWdlJywgZmlsZSk7IC8vc2VsZi5jdXJyZW50Vmlld2Zvby5pZCtcIi5qcGdcIlxuXG5cdFx0XHR2YXIgY3JvcGRhdGEgPSAkaW1hZ2UuY3JvcHBlcignZ2V0RGF0YScpO1xuXHRcdFx0Y3JvcGRhdGEud2lkdGggPSBwYXJzZUludChjcm9wZGF0YS53aWR0aCk7XG5cdFx0XHRjcm9wZGF0YS5oZWlnaHQgPSBwYXJzZUludChjcm9wZGF0YS5oZWlnaHQpO1xuXHRcdFx0Y3JvcGRhdGEueCA9IHBhcnNlSW50KGNyb3BkYXRhLngpO1xuXHRcdFx0Y3JvcGRhdGEueSA9IHBhcnNlSW50KGNyb3BkYXRhLnkpO1xuXG5cdFx0XHRmb3JtRGF0YS5hcHBlbmQoJ2lkJywgc2VsZi5jdXJyZW50Vmlld2Zvby5pZCk7XG5cdFx0XHRmb3JtRGF0YS5hcHBlbmQoJ3VzZXJpZCcsIHNlbGYubG9naW5Vc2VyLmlkKTtcblx0XHRcdGZvcm1EYXRhLmFwcGVuZChcImNyb3BkYXRhXCIsIEpTT04uc3RyaW5naWZ5KGNyb3BkYXRhKSk7XG5cblx0XHRcdGZvcm1EYXRhLmFwcGVuZCgnY292ZXJpbWFnZScsIGJsb2IsIHNlbGYuY3VycmVudFZpZXdmb28uaWQgKyBcIi5qcGdcIik7XG5cblx0XHRcdCQuYWpheChteUdsb2JhbHMuaW1hZ2VVcmwgKyBcIi9jb3ZlcmltYWdlL3ZpZXdmb29cIiwge1xuXHRcdFx0XHRtZXRob2Q6IFwiUE9TVFwiLFxuXHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0J0F1dGhvcml6YXRpb24nOiAnQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT0nLFxuXHRcdFx0XHRcdC8vJ1hfQ1NSRl9UT0tFTic6J3h4eHh4eHh4eHh4eHh4eHh4eHh4Jyxcblx0XHRcdFx0XHQvLydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGF0YTogZm9ybURhdGEsXG5cdFx0XHRcdHByb2Nlc3NEYXRhOiBmYWxzZSxcblx0XHRcdFx0Y29udGVudFR5cGU6IGZhbHNlLFxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnVXBsb2FkIHN1Y2Nlc3MnKTtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcblxuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRzZWxmLnVwbG9hZGluZ0Nyb3BlckltYWdlID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRzZWxmLmNyb3BDb3Zlci5zdG9wQ3JvcHBlcigpO1xuXG5cdFx0XHRcdFx0XHRzZWxmLmZpbGVuYW1lID0gbXlHbG9iYWxzLmltYWdlVXJsICsgXCIvdXBsb2FkL2dhbGxlcnkvXCIgKyByZXN1bHQuZGF0YS5jb3ZlcmltYWdlO1xuXG5cdFx0XHRcdFx0XHR2YXIgJGltZyA9ICQoJzxpbWcgc3JjPVwiJyArIHNlbGYuZmlsZW5hbWUgKyAnXCIgaWQ9XCJhdnRhcmltZ1wiIGNsYXNzPVwiY292ZXJpbWdcIj4nKTtcblx0XHRcdFx0XHRcdCQoJyNjb3ZlcldyYXBwZXInKS5lbXB0eSgpLmh0bWwoJGltZyk7XG5cdFx0XHRcdFx0XHQkKFwiI2ZybUJyb3dzZVwiKVswXS5yZXNldCgpO1xuXG5cdFx0XHRcdFx0XHQvL3NlbGYuZmlsZW5hbWUgPSBteUdsb2JhbHMuc2VydmljZVVybCArIFwiL3VwbG9hZC9wcm9maWxlcy9cIiArIHJlc3VsdC5kYXRhLnByb2ZpbGVpbWFnZTtcblx0XHRcdFx0XHRcdG15R2xvYmFscy5jdXJyZW50Vmlld2Zvby5jb3ZlcmltYWdlID0gcmVzdWx0LmRhdGEuY292ZXJpbWFnZTtcblx0XHRcdFx0XHRcdC8vc2VsZi5maWxlbmFtZSA9IHJlc3VsdC5kYXRhLmNvdmVyaW1hZ2U7XG5cblx0XHRcdFx0XHR9LCB0aGlzLnRpbWVvdXRzZWNvbmRzKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHNlbGYudXBsb2FkaW5nQ3JvcGVySW1hZ2UgPSBmYWxzZTtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnVXBsb2FkIGVycm9yJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuXHRcdFx0Y29uc29sZS5sb2coXCJCbG9iIGVyclwiKTtcblx0XHRcdGNvbnNvbGUubG9nKGVycik7XG5cdFx0fSk7XG5cdH1cblx0dXBsb2FkY2xpY2soKSB7XG5cdFx0dGhpcy5pc3VwbG9hZCA9IHRydWU7XG5cdH1cblx0cHVibGlzaHZpZXdmb28oKSB7XG5cblx0XHR0aGlzLmF1dGhTZXJ2aWNlLnB1Ymxpc2h2aWV3Zm9vdXBkYXRlKHRoaXMuY3VycmVudFZpZXdmb28uaWQsIHRoaXMuY3VycmVudFZpZXdmb28udmlld2Zvb3RpdGxlLCB0aGlzLmN1cnJlbnRWaWV3Zm9vLnRhZ3MsIHRoaXMuY3VycmVudEZvbGRlci5pZCwgdGhpcy52aWV3Zm9vdHlwZSlcblx0XHRcdC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuXG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cdFx0XHRcdCQoXCIjbXlQdWJsaXNoTW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcblx0XHRcdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJ10pO1xuXHRcdFx0XHQvLyQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwibW9kYWwtb3BlblwiKTtcblx0XHRcdFx0Ly9hbGVydChcInZpZXdmb28gaGFzIGJlZW4gcHVibGlzaGVkXCIpO1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKHRoaXMuY3VycmVudFZpZXdmb28pO1xuXG5cdFx0XHR9LCAoZXJyb3I6IGFueSkgPT4ge1xuXHRcdFx0XHR0aGlzLmVycm9yTXNnID0gZXJyb3I7XG5cdFx0XHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcInZpZXdmb28gdXBkYXRlIGZhaWw6IFwiICsgZXJyb3IpO1xuXHRcdFx0fSk7XG5cblx0fVxuXG5cdC8vZm9yIHBhc3N3b3JkIHByb3RlY3RlZFxuICAgICAgICBvcGVucGFzc3dvcmRwb3B1cChjdXJyaWQpIHtcbiAgICAgICAgICAgIHRoaXMudmlld2Zvb3Bhc3N3b3JkaWQgPSBjdXJyaWQ7XG4gICAgICAgICAgICAkKCcjcGFzc3dvcmRNb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG4gICAgICAgICAgICAvL3RoaXMuZ2VuZXJhdGVwYXNzd29yZCgpO1xuICAgICAgICB9XG4gICAgICAgIG9wZW5zZWxmZGVzdHJ1Y3Rwb3B1cChjdXJyaWQpe1xuICAgICAgICAgICAgIHRoaXMudmlld2Zvb3NlbGZkZXN0cnVjdGlkID0gY3VycmlkO1xuICAgICAgICAgICAgJCgnI3NlbGZkZXN0cnVjdE1vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgICAgICAgfVxuICAgICAgICBjaGFuZ2VpbnZpZXdmb29saXN0KGV2ZW50OiBhbnkpIHtcbiAgICAgICAgICAgIGxldCBpZCA9IGV2ZW50LmlkO1xuICAgICAgICAgICAgbGV0IHZhbHVlOiBib29sZWFuID0gZXZlbnQudmFsdWU7XG5cbiAgICAgICAgICAgIC8vICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudmlld2Zvb2xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKHRoaXMudmlld2Zvb2xpc3RbaV0uaWQgPT0gaWQpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRoaXMudmlld2Zvb2xpc3RbaV0uaXNwYXNzd29yZHByb3RlY3RlZCA9IHZhbHVlO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgICAgfVxuICAgICAgICB9XG4gICAgLy9lbmQgb2YgcGFzc3dvcmQgcHJvdGVjdGVkXG4gICAgXG59XG4iXX0=
