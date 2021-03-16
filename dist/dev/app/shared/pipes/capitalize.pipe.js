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
var CapitalizePipe = (function () {
    function CapitalizePipe() {
    }
    CapitalizePipe.prototype.transform = function (value) {
        if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
    };
    CapitalizePipe = __decorate([
        core_1.Pipe({ name: 'capitalize' }), 
        __metadata('design:paramtypes', [])
    ], CapitalizePipe);
    return CapitalizePipe;
}());
exports.CapitalizePipe = CapitalizePipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcGlwZXMvY2FwaXRhbGl6ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBb0MsZUFBZSxDQUFDLENBQUE7QUFHcEQ7SUFBQTtJQVNBLENBQUM7SUFQQyxrQ0FBUyxHQUFULFVBQVUsS0FBVTtRQUNuQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNkLENBQUM7SUFSSDtRQUFDLFdBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQzs7c0JBQUE7SUFVN0IscUJBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQTtBQVRZLHNCQUFjLGlCQVMxQixDQUFBIiwiZmlsZSI6ImFwcC9zaGFyZWQvcGlwZXMvY2FwaXRhbGl6ZS5waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7IG5hbWU6ICdjYXBpdGFsaXplJyB9KVxuZXhwb3J0IGNsYXNzIENhcGl0YWxpemVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnkpIHtcblx0ICBpZiAodmFsdWUpIHtcbiAgICAgIFx0cmV0dXJuIHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSk7XG5cdCAgfVxuXHQgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG59Il19
