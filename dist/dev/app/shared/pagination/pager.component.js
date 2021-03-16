"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var pagination_component_1 = require('./pagination.component');
var pagerConfig = {
    itemsPerPage: 10,
    previousText: '« Previous',
    nextText: 'Next »',
    align: true
};
var PAGER_TEMPLATE = "\n    <ul class=\"pager\">\n      <li [class.disabled]=\"noPrevious()\" [class.previous]=\"align\" [ngClass]=\"{'pull-right': align}\">\n        <a href (click)=\"selectPage(page - 1, $event)\">{{getText('previous')}}</a>\n      </li>\n      <li [class.disabled]=\"noNext()\" [class.next]=\"align\" [ngClass]=\"{'pull-right': align}\">\n        <a href (click)=\"selectPage(page + 1, $event)\">{{getText('next')}}</a>\n      </li>\n  </ul>\n";
var Pager = (function (_super) {
    __extends(Pager, _super);
    function Pager(cd, renderer, elementRef) {
        _super.call(this, cd, renderer, elementRef);
        this.config = pagerConfig;
    }
    Pager = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'pager[ngModel]',
            template: PAGER_TEMPLATE,
            directives: [common_1.NgClass],
            inputs: [
                'align',
                'totalItems', 'itemsPerPage',
                'previousText', 'nextText',
            ]
        }),
        __param(0, core_1.Self()), 
        __metadata('design:paramtypes', [common_1.NgModel, core_1.Renderer, core_1.ElementRef])
    ], Pager);
    return Pager;
}(pagination_component_1.Pagination));
exports.Pager = Pager;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcGFnaW5hdGlvbi9wYWdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUJBQTRELGVBQWUsQ0FBQyxDQUFBO0FBQzVFLHVCQUErQixpQkFBaUIsQ0FBQyxDQUFBO0FBRWpELHFDQUF5Qix3QkFBd0IsQ0FBQyxDQUFBO0FBRWxELElBQU0sV0FBVyxHQUFHO0lBQ2hCLFlBQVksRUFBRSxFQUFFO0lBQ2hCLFlBQVksRUFBRSxZQUFZO0lBQzFCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQUVGLElBQU0sY0FBYyxHQUFHLDJiQVN0QixDQUFDO0FBYUY7SUFBMkIseUJBQVU7SUFHakMsZUFBb0IsRUFBVSxFQUFFLFFBQWlCLEVBQUUsVUFBcUI7UUFDcEUsa0JBQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUg3QixXQUFNLEdBQUcsV0FBVyxDQUFDO0lBSTVCLENBQUM7SUFoQkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsVUFBVSxFQUFFLENBQUMsZ0JBQU8sQ0FBQztZQUNyQixNQUFNLEVBQUU7Z0JBQ0osT0FBTztnQkFDUCxZQUFZLEVBQUUsY0FBYztnQkFDNUIsY0FBYyxFQUFFLFVBQVU7YUFDN0I7U0FDSixDQUFDO21CQUllLFdBQUksRUFBRTs7YUFKckI7SUFPRixZQUFDO0FBQUQsQ0FOQSxBQU1DLENBTjBCLGlDQUFVLEdBTXBDO0FBTlksYUFBSyxRQU1qQixDQUFBIiwiZmlsZSI6ImFwcC9zaGFyZWQvcGFnaW5hdGlvbi9wYWdlci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBFbGVtZW50UmVmLCBSZW5kZXJlciwgU2VsZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nTW9kZWwsIE5nQ2xhc3N9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7UGFnaW5hdGlvbn0gZnJvbSAnLi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5cbmNvbnN0IHBhZ2VyQ29uZmlnID0ge1xuICAgIGl0ZW1zUGVyUGFnZTogMTAsXG4gICAgcHJldmlvdXNUZXh0OiAnwqsgUHJldmlvdXMnLFxuICAgIG5leHRUZXh0OiAnTmV4dCDCuycsXG4gICAgYWxpZ246IHRydWVcbn07XG5cbmNvbnN0IFBBR0VSX1RFTVBMQVRFID0gYFxuICAgIDx1bCBjbGFzcz1cInBhZ2VyXCI+XG4gICAgICA8bGkgW2NsYXNzLmRpc2FibGVkXT1cIm5vUHJldmlvdXMoKVwiIFtjbGFzcy5wcmV2aW91c109XCJhbGlnblwiIFtuZ0NsYXNzXT1cInsncHVsbC1yaWdodCc6IGFsaWdufVwiPlxuICAgICAgICA8YSBocmVmIChjbGljayk9XCJzZWxlY3RQYWdlKHBhZ2UgLSAxLCAkZXZlbnQpXCI+e3tnZXRUZXh0KCdwcmV2aW91cycpfX08L2E+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIFtjbGFzcy5kaXNhYmxlZF09XCJub05leHQoKVwiIFtjbGFzcy5uZXh0XT1cImFsaWduXCIgW25nQ2xhc3NdPVwieydwdWxsLXJpZ2h0JzogYWxpZ259XCI+XG4gICAgICAgIDxhIGhyZWYgKGNsaWNrKT1cInNlbGVjdFBhZ2UocGFnZSArIDEsICRldmVudClcIj57e2dldFRleHQoJ25leHQnKX19PC9hPlxuICAgICAgPC9saT5cbiAgPC91bD5cbmA7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdwYWdlcltuZ01vZGVsXScsXG4gICAgdGVtcGxhdGU6IFBBR0VSX1RFTVBMQVRFLFxuICAgIGRpcmVjdGl2ZXM6IFtOZ0NsYXNzXSxcbiAgICBpbnB1dHM6IFtcbiAgICAgICAgJ2FsaWduJyxcbiAgICAgICAgJ3RvdGFsSXRlbXMnLCAnaXRlbXNQZXJQYWdlJyxcbiAgICAgICAgJ3ByZXZpb3VzVGV4dCcsICduZXh0VGV4dCcsXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBQYWdlciBleHRlbmRzIFBhZ2luYXRpb24gaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyBjb25maWcgPSBwYWdlckNvbmZpZztcblxuICAgIGNvbnN0cnVjdG9yKEBTZWxmKCkgY2Q6TmdNb2RlbCwgcmVuZGVyZXI6UmVuZGVyZXIsIGVsZW1lbnRSZWY6RWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihjZCwgcmVuZGVyZXIsIGVsZW1lbnRSZWYpO1xuICAgIH1cbn0iXX0=
