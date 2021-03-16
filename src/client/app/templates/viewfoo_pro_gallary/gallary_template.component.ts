
import { Component, OnInit, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';

import { CORE_DIRECTIVES } from '@angular/common';


import { GallaryComponent } from '../gallary/gallary.component';

import { CarouselComponent } from '../carousel/carousel.component';
import { FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { User } from '../../shared/interfaces';
import { AuthService } from '../../shared/services/auth.service';
import { Viewfoo } from '../../shared/interfaces';
import { Container } from '../../shared/interfaces';
import { Folder } from '../../shared/interfaces';

import { PaginationComponent } from '../../shared/pagination/pagination.component';
// import { FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES }
// from '@angular/forms';
// import {CustomValidators} from '../../shared/utils/CustomValidators';
import { NgForm }    from '@angular/forms';

import myGlobals = require('../../globals');
import { SubstrPipe } from '../../shared/pipes/substr.pipe';
import { Sub_SubstrPipe } from '../../shared/pipes/sub_substr.pipe';

import { NgGrid, NgGridItem } from 'angular2-grid';
import {CustomValidators} from '../../shared/utils/CustomValidators';
import { PasswordProtectModal } from '../../shared/widgets/passwordprotectmodal/passwordprotectmodal.component';
import { SelfDestructModal } from '../../shared/widgets/selfdestructmodal/selfdestructmodal.component';
@Component({
	moduleId: module.id,
	selector: 'gallary',
	templateUrl: 'gallary_template.component.html',
	pipes: [SubstrPipe, Sub_SubstrPipe],
	directives: [ROUTER_DIRECTIVES, PaginationComponent,
		CORE_DIRECTIVES, GallaryComponent,
		CarouselComponent,
		NgGrid, NgGridItem, REACTIVE_FORM_DIRECTIVES,PasswordProtectModal,SelfDestructModal]
})
export class GallaryTemplateComponent implements OnInit {

	ngGridOptions = {
		'margins': [0, 20, 30, 0],            //  The size of the margins of each item. Supports up to four values in the same way as CSS margins. Can be updated using setMargins()
		'draggable': true,          //  Whether the items can be dragged. Can be updated using enableDrag()/disableDrag()
		'resizable': true,          //  Whether the items can be resized. Can be updated using enableResize()/disableResize()
		'max_cols': 0,              //  The maximum number of columns allowed. Set to 0 for infinite. Cannot be used with max_rows
		'max_rows': 0,              //  The maximum number of rows allowed. Set to 0 for infinite. Cannot be used with max_cols
		'visible_cols': 0,          //  The number of columns shown on screen when auto_resize is set to true. Set to 0 to not auto_resize. Will be overriden by max_cols
		'visible_rows': 0,          //  The number of rows shown on screen when auto_resize is set to true. Set to 0 to not auto_resize. Will be overriden by max_rows
		'min_cols': 1,              //  The minimum number of columns allowed. Can be any number greater than or equal to 1.
		'min_rows': 1,              //  The minimum number of rows allowed. Can be any number greater than or equal to 1.
		'col_width': 68,           //  The width of each column
		'row_height': 68,          //  The height of each row
		'cascade': 'up',            //  The direction to cascade grid items ('up', 'right', 'down', 'left')
		'min_width': 68,           //  The minimum width of an item. If greater than col_width, this will update the value of min_cols
		'min_height': 68,          //  The minimum height of an item. If greater than row_height, this will update the value of min_rows
		'fix_to_grid': false,       //  Fix all item movements to the grid
		'auto_style': true,         //  Automatically add required element styles at run-time
		'auto_resize': false,       //  Automatically set col_width/row_height so that max_cols/max_rows fills the screen. Only has effect is max_cols or max_rows is set
		'maintain_ratio': false,    //  Attempts to maintain aspect ratio based on the colWidth/rowHeight values set in the config
		'prefer_new': false,        //  When adding new items, will use that items position ahead of existing items
		'limit_to_screen': false   //  When resizing the screen, with this true and auto_resize false, the grid will re-arrange to fit the screen size. Please note, at present this only works with cascade direction up.

	}

	//----- Form Validation Variables ------
	// form_viewfootitle: FormControl;
	// form_viewfootags: FormControl;
	// form_viewfoofolder: FormControl;
	//
	// formViefooGroup: FormGroup;
	//------- Form Validation Done ----

	public vftitle: string;
	public vftags: string;
	public msg: string;
	invalid: boolean = false;
	public containertype: string;
	sharing: boolean = false;
	sharingdemo: boolean = true;
	loginUser: User;
	thisviewfoo: Viewfoo;
	public filename: string = "img/build_viewfoo/kim_sharma.jpg";
	public imagesize: string;
	public imagedefaultno: string;

	public backgroundcolor: string;
	public menufontcolor: string;
	public menubackgroundcolor: string;
	public newfoldername: string;
	public folderid: string;
	public currentimagesize: string;
	public currentnormalsize: string;
	public currenthiressize: string;
	public setcomment: boolean = false;
	public setsharing: boolean = false;
	public setselection: boolean = false;
	public setmousehover: boolean = false;
	public setimageinfoframe: boolean = false;
	public setimagewatermark: boolean = false;
	public inputfile: boolean = false;

	public addprivatefolder: boolean = false;
	public addpublicfolder: boolean = false;
	public addnewpublicfolder: boolean = false;
	public addnewpublicsubfolder: boolean = false;
	public addnewprivatesubfolder: boolean = false;
	public addnewprivatefolder: boolean = false;
	public sublimit: boolean = true;
	public newfolderid: string;
	public selectedfoldername: any;
	public folderadd: boolean = false;

	public errorMsg: any;
	public paramSubscribed: any;
	loading: boolean = false;
	public folderloading: boolean = false;
	//for passpwrd protected
//	public isEnable: boolean = true;
//	viewfoopassword: FormGroup;
//	loading: boolean = false;
//	password: FormControl = new FormControl("", Validators.required);
//	confirmpassword: FormControl = new FormControl("", Validators.required);
//	generatedpassword: FormControl;
//	viewfoopasswordid: string;
//	viewfoopasswordtype: string = "autopassword";
//	generateownpassword: boolean = true;
//	chkmail: FormControl = false;
//	chksms: FormControl = false;
//	public checkemail: boolean = false;
//	public checksms: boolean = false;
//	public unlockviewfooid: string;
//	public iserror: boolean = false;
//	public checkunlocksms: boolean = false;
    //end of password protected
        
        //selfdestruct//
        public currentday:number=0;
        public currenthour:number=0;
        public currentminute:number=0;
        public currentsecond:number=0;
        //end of self destruct//
  
	serviceUrl: string = myGlobals.serviceUrl;
	currentViewfoo: Viewfoo = {
		viewfootitle: "",
		viewfootype: "private",
		userid: "",
		id: "",
		containers: []
	};

	currentFolder: any = {
		id: ""
	};

	viewfooid: string;
	containerid: string;


	privatefolder: Viewfoo[] = [];
	publicfolder: Viewfoo[] = [];
	backupfolder: Viewfoo[] = [];

	publicFolderForSelect: Folder[] = [];
	privateFolderForSelect: Folder[] = [];

	isupload: boolean = false;
	myDropzone: any;

	zone: NgZone;

	cropCover: any;

	constructor(//private builder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		zone: NgZone,
		private authService: AuthService, private builder: FormBuilder) {
		this.zone = zone;

		// this.form_viewfootitle = new FormControl("", Validators.required);
		// this.form_viewfootags = new FormControl("", Validators.required);
		// this.form_viewfoofolder = new FormControl("", Validators.required);
		//
		// this.formViefooGroup = this.builder.group({
        //     "form_viewfootitle": this.form_viewfootitle,
        //     "form_viewfootags": this.form_viewfootags,
        //     "form_viewfoofolder": this.form_viewfoofolder
        // });

		//for password protected
        this.viewfoopassword = builder.group({
            "password": this.password,
            "generatedpassword": this.generatedpassword,
            "chkmail": this.chkmail,
            "chksms": this.chksms,
            confirmpassword: this.confirmpassword,

        },
			{ validator: CustomValidators.matchingPasswords('password', 'confirmpassword') });
        //end of password protected
	}

	creatingOrFetchingViewfoo() {
		this.loading = true;
		this.paramSubscribed = this.route.params.subscribe(params => {
			//console.log("GallaryTemplateComponent > constructor ");
			//console.log(params);
			this.viewfooid = params['viewfooid']; // (+) converts string 'id' to a number

			this.loginUser = myGlobals.LoginUser;

			this.authService.viewfooDetail(this.viewfooid)
				.subscribe((result) => {

					this.currentViewfoo = result.data;
					console.log(this.currentViewfoo);

					myGlobals.currentViewfoo = this.currentViewfoo;

					this.currentViewfoo.mapContainer = {};

					//console.log(this.currentViewfoo.imagesize);
					this.setviewrsettingvalue(this.currentViewfoo);

					if (this.currentViewfoo.coverimage != "") {
						this.filename = myGlobals.imageUrl + "/upload/gallery/" + this.currentViewfoo.coverimage;
					}
					if (this.currentViewfoo.imagewatermark != "") {
						this.imagewatermark = myGlobals.imageUrl + "/upload/gallery/" + this.currentViewfoo.imagewatermark;
					}
					if (this.currentViewfoo.imagesize === "normal") {
						this.currentnormalsize = true;
						this.currenthiressize = false;
					}
					else {
						this.currentnormalsize = false;
						this.currenthiressize = true;

					}

					console.log("viewfoo folder");
					console.log(this.currentViewfoo.folderid);

					if (this.currentViewfoo.folderid) {
						this.currentFolder = this.currentViewfoo.folderid;
					}

					this.loading = false;
					//console.log("current viewfoo allow sharing is:"+ this.currentViewfoo.allowsharing);

					//this.creatingDropzoneInstances();
					for (var i = 0; i < this.currentViewfoo.containers.length; i++) {
						var container = this.currentViewfoo.containers[i];

						container.ngGridItemOptions.dragHandle = ".gridMover";

						this.currentViewfoo.mapContainer[container.id] = container;

						//                            console.log("ng-grid-container-option");
						//                            console.log(container)
						//                            console.log(container.ngGridItemOptions);
					}

					//console.log("this.currentViewfoo.mapContainer");
					//console.log(this.currentViewfoo.mapContainer);
				}, (error: any) => {
					this.errorMsg = error;
					this.loading = false;
					//console.log("viewfoo create fail: " + error);
				})

			//console.log("current viewfoo allow sharing is:" + this.currentViewfoo.allowsharing);
		});
	}

	updateItem(index, event) {
		// console.log("updateItem");
		// console.log(index);
		//console.log(event);
		//---------- event.payload.containerid
	}

	//------ Folder/Subfolder Add ------
    public viewfootype: string;
    public publicclick: boolean = false;
    public privateclick: boolean = false;
    public strSelectFolderType: string;
    public isFolder: boolean = false;
    public isSubFolder: boolean = false;
    public folderForSelect: any = [];
    public parentFolders: any = [];
    public parentfolderid: string = "";
    public foldername: string = "";
    isModelHiddenRegistered: boolean = false;
	onPublishViewfoo() {
		this.privateclick = false;
		this.publicclick = false;

		$('#myPublishModal').modal('show');
		if (!this.isModelHiddenRegistered) {
			this.isModelHiddenRegistered = true;
			$('#myPublishModal').on('hidden.bs.modal', function(e) {
				if ($('.toggle-private').css('display') != 'none') {
					$(".toggle-private").slideToggle("slow");
				}
			});
		}
	}

	publishviewfoopopup(vtype) {

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

			} else if ($('.toggle-private').css('display') != 'none'
				&& this.publicclick == true) {

				$(".toggle-private").slideToggle("slow");
				this.publicclick = false;

			} else if ($('.toggle-private').css('display') != 'none'
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
					//alert("Cropper called");
					var imgUrl = this.serviceUrl
						+ "/upload/gallery/"
						+ this.currentViewfoo.containers[0].containerimages[0].imagename;
					this.cropCover.url = imgUrl;
					this.cropCover.startCropper();
				}
            }
            //
        }

	}

	arrangeFolderforSelection(folderArray: any) {

		this.folderForSelect = [];//myGlobals.PublicFolder;
		this.parentFolders = folderArray;

		for (var i = 0; i < folderArray.length; i++) {
			this.folderForSelect.push({
				folderid: folderArray[i].id,
				foldername: folderArray[i].foldername
			});
			if (folderArray[i].subfolder) {
				let subfolders = folderArray[i].subfolder;

				for (var j = 0; j < subfolders.length; j++) {
					let objsubfolder = subfolders[j];
					let subfoldername = objsubfolder.foldername;
					var splitArray = subfoldername.split("/");
					subfoldername = "--- " + splitArray[splitArray.length - 1];

					this.folderForSelect.push({
						folderid: objsubfolder.id,
						foldername: subfoldername
					});
				}
			}
		}
	}

	showAddFolderRow(isFol: boolean, isSubFol: boolean) {
		this.isFolder = isFol;
		this.isSubFolder = isSubFol;
	}

	createFolder() {

		let foldertype = this.viewfootype;

		if (this.foldername != '') {
			this.folderloading = true;
			this.authService.addfolder(this.loginUser.id, this.foldername, foldertype, this.parentfolderid)
				.subscribe((result) => {
					if (!this.parentfolderid) {

						this.currentFolder = result.data;

						if (foldertype == 'public') {
							this.publicfolder.push(result.data);
							this.arrangeFolderforSelection(this.publicfolder);

						} else if (foldertype == 'private') {
							this.privatefolder.push(result.data);
							this.arrangeFolderforSelection(this.privatefolder);
						}
					} else {
						if (foldertype == 'public') {
							for (var i = 0; i < this.publicfolder.length; i++) {
								if (this.publicfolder[i].id === result.data.id) {
									this.publicfolder[i].subfolder.push(result.data);
								}
							}
							this.arrangeFolderforSelection(this.publicfolder);

						} else if (foldertype == 'private') {
							for (var i = 0; i < this.privatefolder.length; i++) {
								if (this.privatefolder[i].id === result.data.id) {
									this.privatefolder[i].subfolder.push(result.data);
								}
							}
							this.arrangeFolderforSelection(this.privatefolder);
						}
					}
					this.folderloading = false;
					this.showAddFolderRow(false, false);

				}, (error: any) => {
					//this.errorMsg = error;
					this.folderloading = false;
				})
		}
	}

	//---------- Folder Done --------

	getFolderListFromServer() {

		this.authService.folderlist(this.loginUser.id)
			.subscribe((result: any) => {

				var pubfolder: any = [];
				var privfolder: any = [];


				for (var i = 0; i < result.data.length; i++) {
					let temp_foldertype = result.data[i].foldertype;
					if (temp_foldertype == 'backup') {

					}
					else if (temp_foldertype == 'public') {

						pubfolder.push(result.data[i]);

					} else if (temp_foldertype == 'private') {

						privfolder.push(result.data[i]);
					}
				}

				this.publicfolder = pubfolder;
				this.privatefolder = privfolder;


			}, (error: any) => {
                var pubfolder: any = [];
				var privfolder: any = [];

                this.publicfolder = pubfolder;
				this.privatefolder = privfolder;

				this.errorMsg = error;
				console.log("folder Add fail: " + error);
			});
	}

	displaysubtag(text, id) {
		$(".select_btn").text(text);
		$(".btn-group").removeClass("open");
		this.folderid = id;
	}

	//end of publish now folder code

	updateItems(event) {
		console.log("updateItems");
		console.log(event);
		for (var i = 0; i < event.length; i++) {
			var object = event[i];
			var container = this.currentViewfoo.mapContainer[object.payload.containerid];
			//console.log("container:" + container.id);
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
				.subscribe((result) => {
					if (result) {
						console.log(result);
					}
				}, (error: any) => {
					console.log(error);
					console.log("grid item update fail: " + error);
				})


		}

	}

	attachGridOptionsToContainer(container: any) {
		container.ngGridItemOptions = {
			'col': 1,               //  The start column for the item
			'row': 1,               //  The start row for the item
			'sizex': 5,             //  The start width in terms of columns for the item
			'sizey': 5,             //  The start height in terms of rows for the item
			'dragHandle': null,     //  The selector to be used for the drag handle. If null, uses the whole item
			'resizeHandle': null,   //  The selector to be used for the resize handle. If null, uses 'borderSize' pixels from the right for horizontal resize,
			//    'borderSize' pixels from the bottom for vertical, and the square in the corner bottom-right for both
			//'borderSize': 15,
			'fixed': false,         //  If the grid item should be cascaded or not. If yes, manual movement is required
			'draggable': true,      //  If the grid item can be dragged. If this or the global setting is set to false, the item cannot be dragged.
			'resizable': true,      //  If the grid item can be resized. If this or the global setting is set to false, the item cannot be resized.
			'payload': null,        //  An optional custom payload (string/number/object) to be used to identify the item for serialization
			'maxCols': 0,           //  The maximum number of columns for a particular item. This value will only override the value from the grid (if set) if it is smaller
			'minCols': 0,           //  The minimum number of columns for a particular item. This value will only override the value from the grid if larger
			'maxRows': 0,           //  The maximum number of rows for a particular item. This value will only override the value from the grid (if set) if it is smaller
			'minRows': 0,           //  The minimum number of rows for a particular item. This value will only override the value from the grid if larger
			'minWidth': 0,          //  The minimum width of a particular item. This value will override the value from the grid, as well as the minimum columns if the resulting size is larger
			'minHeight': 0,        //  The minimum height of a particular item. This value will override the value from the grid, as well as the minimum rows if the resulting size is larger
			payload: {
				containerid: container.id
			}
		}
	}

	setviewrsettingvalue(Viewfoo) {
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
		else  {
			$("#color8").css("background-color", Viewfoo.menubackgroundcolor);
			$("#radio5").prop('checked', false);
			$("#radio6").prop('checked', false);
		}
                
                
	}

	ngOnInit() {

		//            this.viewfoopassword.controls['chkmail'].updateValue(false);
		//            this.viewfoopassword.controls['chksms'].updateValue(false);
		this.creatingOrFetchingViewfoo();

		this.getFolderListFromServer();

		$(".CBimagesize").change(function() {
			var checked = $(this).is(':checked');
			$(".CBimagesize").prop('checked', false);
			if (checked) {
				$(this).prop('checked', true);

				this.imagesize = this.value;

			}
		});
		$(".CBpasswordtype").change(function() {
			var checked = $(this).is(':checked');
			$(".CBpasswordtype").prop('checked', false);
			if (checked) {
				$(this).prop('checked', true);
				//this.imagesize = this.value;
			}
		});



		$("[data-toggle]").click(function() {
			var toggle_el = $(this).data("toggle");
			$(toggle_el).toggleClass("open-sidebar");
		});

	}



	ngAfterViewInit() {
		//window.jscolor();

		this.cropCover = new CropCover($('#crop-avatar'));
		jscolor.init();
	}


	setTextColor(picker) {
		//document.getElementsByTagName('body')[0].style.color = '#' + picker.toString()
		console.log(picker.string());
	}

	selecttemplate() {
		this.router.navigate(['/select_template']);
	}


	containerCreate(containertype: string) {

		console.log("gallary_template containerCreate " + containertype);
		var self = this;
		this.authService.containerCreate(containertype, this.currentViewfoo.id, this.loginUser.id)
			.subscribe((result) => {
				console.log("Container Created");
				//console.log(result);
				var container: Container = result.data;
				console.log(container.ngGridItemOptions);

				container.containerimages = [];

				container.ngGridItemOptions.dragHandle = ".gridMover";
				this.currentViewfoo.mapContainer[container.id] = container;
				// container.ngGridItemOptions=this.currentViewfoo.container.ngGridItemOptions;
				//this.attachGridOptionsToContainer(container);
				self.currentViewfoo.containers.push(container);

				$("html, body").animate({ scrollTop: $(document).height() }, 'slow');
				//this.initContainerForDropzone(container);

				//                setTimeout(function() {
				//                    var dZone = self.createDropZone(container);
				//                }, 1000);

			}, (error: any) => {
				this.errorMsg = error;
				this.loading = false;
				console.log("container create fail: " + error);
			});
	}

	updatecontainer(event: any) {
		//alert(
		//alert("name:"+event.name);
		//alert("id:"+event.id);
		let containertitle = event.title;
		let containerid = event.id;
		var containerupdateDict = {
			containerid: containerid,
            containertitle: containertitle
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
	}

	deletecontainer(containerid: string, index: number) {
		//alert("delete "+containerid);
		console.log("deletecontainer : " + containerid + "  index : " + index);
		var self = this;

		var currContainer = self.currentViewfoo.containers[index];
		this.authService.containerDelete(containerid)
			.subscribe((result) => {
				console.log(result);

				currContainer.deleted = true;

				setTimeout(function() {
					self.currentViewfoo.containers.splice(index, 1);
				}, 1000);

				delete self.currentViewfoo.mapContainer[containerid];
				//crateBlankImg(cid, numDiv);
			}, (error: any) => {
				this.errorMsg = error;
				console.log("Containerimage delete fail: " + error);
			});
	}

	deleteviewfoo() {
		this.currentViewfoo.deleting = true;
		this.authService.viewfoodelete(this.currentViewfoo.id)
			.subscribe((result) => {

				if (result) {
					console.log(result);

					this.router.navigate(['/']);

				}
			}, (error: any) => {
				this.errorMsg = error;
				this.loading = false;

				console.log("viewfoo delete fail: " + error);
			})
	}

	allowsharing(val) {

		let settingtype: string = "allowsharing";

		this.authService.viewfooupdate(this.currentViewfoo.id, val, settingtype)
			.subscribe((result) => {
				if (result) {

					console.log(result);
					this.setviewrsettingvalue(result.data);
				}
			}, (error: any) => {
				this.errorMsg = error;
				this.loading = false;

				console.log("viewfoo update fail: " + error);
			})

	}

	allowcomment(val) {

		let settingtype: string = "allowcomment";

		this.authService.viewfooupdate(this.currentViewfoo.id, val, settingtype)
			.subscribe((result) => {
				if (result) {

					console.log(result);
					this.setviewrsettingvalue(result.data);
				}
			}, (error: any) => {
				this.errorMsg = error;
				this.loading = false;

				console.log("viewfoo update fail: " + error);
			})

	}

	allowselection(val) {

		let settingtype: string = "allowselection";

		this.authService.viewfooupdate(this.currentViewfoo.id, val, settingtype)
			.subscribe((result) => {
				if (result) {

					console.log(result);
					this.setviewrsettingvalue(result.data);
				}
			}, (error: any) => {
				this.errorMsg = error;
				this.loading = false;

				console.log("viewfoo update fail: " + error);
			})

	}

	changeimagesize(value) {
		this.iamgesize = value;
		let settingtype: string = "imagesize";
		this.authService.viewfooupdate(this.currentViewfoo.id, this.iamgesize, settingtype)
			.subscribe((result) => {
				if (result) {
					console.log(result);

				}
			}, (error: any) => {
				this.errorMsg = error;
				this.loading = false;

				console.log("viewfoo update fail: " + error);
			})
	}

	changemousehover(val) {

		let settingtype: string = "imagedatamousehover";

		this.authService.viewfooupdate(this.currentViewfoo.id, val, settingtype)
			.subscribe((result) => {
				if (result) {

					console.log(result);
					this.setviewrsettingvalue(result.data);
				}
			}, (error: any) => {
				this.errorMsg = error;
				this.loading = false;

				console.log("viewfoo update fail: " + error);
			})

	}

	changeframe(val) {

		let settingtype: string = "imageinfoframe";

		this.authService.viewfooupdate(this.currentViewfoo.id, val, settingtype)
			.subscribe((result) => {
				if (result) {

					console.log(result);
					this.setviewrsettingvalue(result.data);
				}
			}, (error: any) => {
				this.errorMsg = error;
				this.loading = false;

				console.log("viewfoo update fail: " + error);
			})
	}

	changeApplyWatermark(val) {

		let settingtype: string = "applywatermark";

		this.authService.viewfooupdate(this.currentViewfoo.id, val, settingtype)
			.subscribe((result) => {
				if (result) {

					console.log(result);
					this.setviewrsettingvalue(result.data);
				}
			}, (error: any) => {
				this.errorMsg = error;
				this.loading = false;

				console.log("viewfoo update fail: " + error);
			})
	}

	imagedefaultnoFun(val) {

		let settingtype: string = "imagedefaultno";
		this.imagedefaultno = val;

		this.authService.viewfooupdate(this.currentViewfoo.id, this.imagedefaultno, settingtype)
			.subscribe((result) => {
				if (result) {

					console.log(result);
				}
			}, (error: any) => {
				this.errorMsg = error;
				this.loading = false;

				console.log("viewfoo update fail: " + error);
			})

	}

	changebgcolor(val) {

		let settingtype: string = "backgroundcolor";
		let backgroundcolor;
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
			.subscribe((result) => {
				if (result) {

					console.log(result);
				}
			}, (error: any) => {
				this.errorMsg = error;
				this.loading = false;

				console.log("viewfoo update fail: " + error);
			})
	}

	changefontcolor(val) {
		let settingtype: string = "menufontcolor";

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
			.subscribe((result) => {
				if (result) {

					console.log(result);
				}
			}, (error: any) => {
				this.errorMsg = error;
				this.loading = false;

				console.log("viewfoo update fail: " + error);
			})
	}

	changemenubgcolor(val) {
		let settingtype: string = "menubackgroundcolor";

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
			.subscribe((result) => {
				if (result) {

					console.log(result);
				}
			}, (error: any) => {
				this.errorMsg = error;
				this.loading = false;

				console.log("viewfoo update fail: " + error);
			})

	}

	timeoutseconds: number = 5000;
	uploadingWatermark: boolean = false;
	fileChangeWatermark(fileInput: any) {

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
				//'X_CSRF_TOKEN':'xxxxxxxxxxxxxxxxxxxx',
				//'Content-Type': 'application/json'
			},
			data: formData,
			processData: false,
			contentType: false,
			success: function(result) {
				console.log('Watermark Upload success');
				console.log(JSON.stringify(result));

				setTimeout(function() {
					self.uploadingWatermark = false;
					self.imagewatermark = myGlobals.imageUrl + "/upload/gallery/" + result.data.imagewatermark;

					myGlobals.currentViewfoo.imagewatermark = result.data.coverimage;

				}, this.timeoutseconds);
			},
			error: function() {
				self.uploadingWatermark = false;
				console.log('Upload error');
			}
		});

	}
	uploadingCroperImage: boolean = false;
	oncroppopupdone() {

		this.uploadingCroperImage = true;
		this.isupload = false;
		var $image = this.cropCover.$img;

		//var croppedcanvas = $image.cropper('getCroppedCanvas');
		//this.filename = croppedcanvas.toDataURL("image/png");

		//var $img = $('<img src="' + this.filename + '" id="avtarimg" class="coverimg">');
		//$('#coverWrapper').empty().html($img);
		//$("#frmBrowse")[0].reset();

		var img = document.getElementById('avtarimg');
		var self = this;
		blobUtil.imgSrcToBlob(img.src).then(function(blob) {
			blob.lastModifiedDate = new Date();
			blob.name = self.currentViewfoo.id + ".jpg";

			//var file = new File([blob], self.currentViewfoo.id+".jpg");

			console.log("Blob success");
			console.log(blob);
			console.log(self.cropCover.$fileCover);

			var formData = new FormData();
			//formData.append('coverimage', file); //self.currentViewfoo.id+".jpg"

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
					//'X_CSRF_TOKEN':'xxxxxxxxxxxxxxxxxxxx',
					//'Content-Type': 'application/json'
				},
				data: formData,
				processData: false,
				contentType: false,
				success: function(result) {
					console.log('Upload success');
					console.log(JSON.stringify(result));

					setTimeout(function() {
						self.uploadingCroperImage = false;
						self.cropCover.stopCropper();

						self.filename = myGlobals.imageUrl + "/upload/gallery/" + result.data.coverimage;

						var $img = $('<img src="' + self.filename + '" id="avtarimg" class="coverimg">');
						$('#coverWrapper').empty().html($img);
						$("#frmBrowse")[0].reset();

						//self.filename = myGlobals.serviceUrl + "/upload/profiles/" + result.data.profileimage;
						myGlobals.currentViewfoo.coverimage = result.data.coverimage;
						//self.filename = result.data.coverimage;

					}, this.timeoutseconds);
				},
				error: function() {
					self.uploadingCroperImage = false;
					console.log('Upload error');
				}
			});
		}).catch(function(err) {
			console.log("Blob err");
			console.log(err);
		});
	}
	uploadclick() {
		this.isupload = true;
	}
	publishviewfoo() {

		this.authService.publishviewfooupdate(this.currentViewfoo.id, this.currentViewfoo.viewfootitle, this.currentViewfoo.tags, this.currentFolder.id, this.viewfootype)
			.subscribe((result) => {

				console.log(result);
				$("#myPublishModal").modal('hide');
				this.router.navigate(['/']);
				//$("body").removeClass("modal-open");
				//alert("viewfoo has been published");
				//console.log(this.currentViewfoo);

			}, (error: any) => {
				this.errorMsg = error;
				this.loading = false;
				console.log("viewfoo update fail: " + error);
			});

	}

	//for password protected
        openpasswordpopup(currid) {
            this.viewfoopasswordid = currid;
            $('#passwordModal').modal('show');
            //this.generatepassword();
        }
        openselfdestructpopup(currid){
             this.viewfooselfdestructid = currid;
            $('#selfdestructModal').modal('show');
        }
        changeinviewfoolist(event: any) {
            let id = event.id;
            let value: boolean = event.value;

            //        for (var i = 0; i < this.viewfoolist.length; i++) {
            //            if (this.viewfoolist[i].id == id) {
            //                this.viewfoolist[i].ispasswordprotected = value;
            //            }
            //        }
        }
    //end of password protected
    
}
