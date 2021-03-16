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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var NgTransclude = (function () {
    function NgTransclude(viewRef) {
        this.viewRef = viewRef;
    }
    Object.defineProperty(NgTransclude.prototype, "ngTransclude", {
        get: function () {
            return this._ngTransclude;
        },
        set: function (templateRef) {
            this._ngTransclude = templateRef;
            if (templateRef) {
                this.viewRef.createEmbeddedView(templateRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    NgTransclude = __decorate([
        core_1.Directive({
            selector: '[ngTransclude]',
            properties: ['ngTransclude']
        }),
        __param(0, core_1.Inject(core_1.ViewContainerRef)), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], NgTransclude);
    return NgTransclude;
}());
exports.NgTransclude = NgTransclude;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcGFnaW5hdGlvbi9JQXR0cmlidXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQkFBK0QsZUFBZSxDQUFDLENBQUE7QUFVL0U7SUFjSSxzQkFBNkMsT0FBd0I7UUFBeEIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7SUFDckUsQ0FBQztJQVpELHNCQUFZLHNDQUFZO2FBT3hCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzthQVRELFVBQXlCLFdBQXVCO1lBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqRCxDQUFDO1FBQ0wsQ0FBQzs7O09BQUE7SUFaTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFVBQVUsRUFBRSxDQUFDLGNBQWMsQ0FBQztTQUMvQixDQUFDO21CQWVlLGFBQU0sQ0FBQyx1QkFBZ0IsQ0FBQzs7b0JBZnZDO0lBaUJGLG1CQUFDO0FBQUQsQ0FoQkEsQUFnQkMsSUFBQTtBQWhCWSxvQkFBWSxlQWdCeEIsQ0FBQSIsImZpbGUiOiJhcHAvc2hhcmVkL3BhZ2luYXRpb24vSUF0dHJpYnV0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiwgSW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBJQXR0cmlidXRlIHtcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW25nVHJhbnNjbHVkZV0nLFxuICAgIHByb3BlcnRpZXM6IFsnbmdUcmFuc2NsdWRlJ11cbn0pXG5leHBvcnQgY2xhc3MgTmdUcmFuc2NsdWRlIHtcbiAgICBwcml2YXRlIF9uZ1RyYW5zY2x1ZGU6IFRlbXBsYXRlUmVmO1xuXG4gICAgcHJpdmF0ZSBzZXQgbmdUcmFuc2NsdWRlKHRlbXBsYXRlUmVmOlRlbXBsYXRlUmVmKSB7XG4gICAgICAgIHRoaXMuX25nVHJhbnNjbHVkZSA9IHRlbXBsYXRlUmVmO1xuICAgICAgICBpZiAodGVtcGxhdGVSZWYpIHtcbiAgICAgICAgICAgIHRoaXMudmlld1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGVtcGxhdGVSZWYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgbmdUcmFuc2NsdWRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmdUcmFuc2NsdWRlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoVmlld0NvbnRhaW5lclJlZikgcHVibGljIHZpZXdSZWY6Vmlld0NvbnRhaW5lclJlZikge1xuICAgIH1cbn1cbiJdfQ==
