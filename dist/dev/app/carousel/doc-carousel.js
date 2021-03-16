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
var angular2_1 = require('angular2/angular2');
var DocCarousel = (function () {
    function DocCarousel() {
    }
    DocCarousel = __decorate([
        angular2_1.Component({
            selector: 'doc-carousel',
            templateUrl: './samples/carousel/README.html'
        }), 
        __metadata('design:paramtypes', [])
    ], DocCarousel);
    return DocCarousel;
}());
exports.DocCarousel = DocCarousel;
var SourceHtmlCarousel = (function () {
    function SourceHtmlCarousel() {
    }
    SourceHtmlCarousel = __decorate([
        angular2_1.Component({
            selector: 'source-html-carousel',
            templateUrl: './samples/carousel/demo-carousel.html.source.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SourceHtmlCarousel);
    return SourceHtmlCarousel;
}());
exports.SourceHtmlCarousel = SourceHtmlCarousel;
var SourceTsCarousel = (function () {
    function SourceTsCarousel() {
    }
    SourceTsCarousel = __decorate([
        angular2_1.Component({
            selector: 'source-ts-carousel',
            templateUrl: './samples/carousel/demo-carousel.ts.source.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SourceTsCarousel);
    return SourceTsCarousel;
}());
exports.SourceTsCarousel = SourceTsCarousel;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jYXJvdXNlbC9kb2MtY2Fyb3VzZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlCQUF3QixtQkFBbUIsQ0FBQyxDQUFBO0FBTTVDO0lBQUE7SUFDQSxDQUFDO0lBTEQ7UUFBQyxvQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLGdDQUFnQztTQUM5QyxDQUFDOzttQkFBQTtJQUVGLGtCQUFDO0FBQUQsQ0FEQSxBQUNDLElBQUE7QUFEWSxtQkFBVyxjQUN2QixDQUFBO0FBTUQ7SUFBQTtJQUNBLENBQUM7SUFMRDtRQUFDLG9CQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFdBQVcsRUFBRSxtREFBbUQ7U0FDakUsQ0FBQzs7MEJBQUE7SUFFRix5QkFBQztBQUFELENBREEsQUFDQyxJQUFBO0FBRFksMEJBQWtCLHFCQUM5QixDQUFBO0FBTUQ7SUFBQTtJQUNBLENBQUM7SUFMRDtRQUFDLG9CQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFdBQVcsRUFBRSxpREFBaUQ7U0FDL0QsQ0FBQzs7d0JBQUE7SUFFRix1QkFBQztBQUFELENBREEsQUFDQyxJQUFBO0FBRFksd0JBQWdCLG1CQUM1QixDQUFBIiwiZmlsZSI6ImFwcC9jYXJvdXNlbC9kb2MtY2Fyb3VzZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvYW5ndWxhcjInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkb2MtY2Fyb3VzZWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2FtcGxlcy9jYXJvdXNlbC9SRUFETUUuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgRG9jQ2Fyb3VzZWwge1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzb3VyY2UtaHRtbC1jYXJvdXNlbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zYW1wbGVzL2Nhcm91c2VsL2RlbW8tY2Fyb3VzZWwuaHRtbC5zb3VyY2UuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgU291cmNlSHRtbENhcm91c2VsIHtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc291cmNlLXRzLWNhcm91c2VsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NhbXBsZXMvY2Fyb3VzZWwvZGVtby1jYXJvdXNlbC50cy5zb3VyY2UuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgU291cmNlVHNDYXJvdXNlbCB7XG59Il19
