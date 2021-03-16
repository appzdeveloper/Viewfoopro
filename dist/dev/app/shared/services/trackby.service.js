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
var TrackByService = (function () {
    function TrackByService() {
    }
    TrackByService.prototype.customer = function (index, customer) {
        return customer.id;
    };
    TrackByService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TrackByService);
    return TrackByService;
}());
exports.TrackByService = TrackByService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvdHJhY2tieS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMkIsZUFBZSxDQUFDLENBQUE7QUFLM0M7SUFBQTtJQU1BLENBQUM7SUFKQyxpQ0FBUSxHQUFSLFVBQVMsS0FBWSxFQUFFLFFBQW1CO1FBQ3hDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFMSDtRQUFDLGlCQUFVLEVBQUU7O3NCQUFBO0lBT2IscUJBQUM7QUFBRCxDQU5BLEFBTUMsSUFBQTtBQU5ZLHNCQUFjLGlCQU0xQixDQUFBIiwiZmlsZSI6ImFwcC9zaGFyZWQvc2VydmljZXMvdHJhY2tieS5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJQ3VzdG9tZXIsIElPcmRlciB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJhY2tCeVNlcnZpY2Uge1xuICBcbiAgY3VzdG9tZXIoaW5kZXg6bnVtYmVyLCBjdXN0b21lcjogSUN1c3RvbWVyKSB7XG4gICAgcmV0dXJuIGN1c3RvbWVyLmlkO1xuICB9XG4gIFxufSJdfQ==
