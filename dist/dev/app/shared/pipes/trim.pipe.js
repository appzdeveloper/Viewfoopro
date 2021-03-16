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
var TrimPipe = (function () {
    function TrimPipe() {
    }
    TrimPipe.prototype.transform = function (value) {
        if (!value) {
            return '';
        }
        return value.trim();
    };
    TrimPipe = __decorate([
        core_1.Pipe({ name: 'trim' }), 
        __metadata('design:paramtypes', [])
    ], TrimPipe);
    return TrimPipe;
}());
exports.TrimPipe = TrimPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcGlwZXMvdHJpbS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0MsZUFBZSxDQUFDLENBQUE7QUFHbEQ7SUFBQTtJQU9BLENBQUM7SUFOQyw0QkFBUyxHQUFULFVBQVUsS0FBVTtRQUNsQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ1osQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQVBIO1FBQUMsV0FBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOztnQkFBQTtJQVFyQixlQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7QUFQWSxnQkFBUSxXQU9wQixDQUFBIiwiZmlsZSI6ImFwcC9zaGFyZWQvcGlwZXMvdHJpbS5waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe25hbWU6ICd0cmltJ30pXG5leHBvcnQgY2xhc3MgVHJpbVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZS50cmltKCk7XG4gIH1cbn0iXX0=
