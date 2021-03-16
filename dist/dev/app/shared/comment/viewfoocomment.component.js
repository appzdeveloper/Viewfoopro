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
var common_1 = require('@angular/common');
var ViewfooCommentComponent = (function () {
    function ViewfooCommentComponent() {
    }
    ViewfooCommentComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ViewfooCommentComponent.prototype, "viewfooid", void 0);
    ViewfooCommentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'viewfoocomment',
            templateUrl: 'viewfoocomment.component.html',
            directives: [common_1.CORE_DIRECTIVES, common_1.NgIf]
        }), 
        __metadata('design:paramtypes', [])
    ], ViewfooCommentComponent);
    return ViewfooCommentComponent;
}());
exports.ViewfooCommentComponent = ViewfooCommentComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tbWVudC92aWV3Zm9vY29tbWVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUVLLGVBQWUsQ0FBQyxDQUFBO0FBQ3JCLHVCQUFtQyxpQkFBaUIsQ0FBQyxDQUFBO0FBZXJEO0lBQUE7SUFLQSxDQUFDO0lBSEcsMENBQVEsR0FBUjtJQUVBLENBQUM7SUFIRjtRQUFDLFlBQUssRUFBRTs7OERBQUE7SUFQWDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLFVBQVUsRUFBRSxDQUFDLHdCQUFlLEVBQUMsYUFBSSxDQUFDO1NBQ3JDLENBQUM7OytCQUFBO0lBTUYsOEJBQUM7QUFBRCxDQUxBLEFBS0MsSUFBQTtBQUxZLCtCQUF1QiwwQkFLbkMsQ0FBQSIsImZpbGUiOiJhcHAvc2hhcmVkL2NvbW1lbnQvdmlld2Zvb2NvbW1lbnQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZH1cbmZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVMsTmdJZn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld2ZvbyB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vLi4vZ2xvYmFscycpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAndmlld2Zvb2NvbW1lbnQnLFxuICAgIHRlbXBsYXRlVXJsOiAndmlld2Zvb2NvbW1lbnQuY29tcG9uZW50Lmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtDT1JFX0RJUkVDVElWRVMsTmdJZl1cbn0pXG5leHBvcnQgY2xhc3MgVmlld2Zvb0NvbW1lbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgQElucHV0KCkgcHVibGljIHZpZXdmb29pZDogc3RyaW5nOyBcbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICBcbiAgICB9XG59Il19
