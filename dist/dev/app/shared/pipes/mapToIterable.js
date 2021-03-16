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
var MapToIterable = (function () {
    function MapToIterable() {
    }
    MapToIterable.prototype.transform = function (dict) {
        var a = [];
        for (var key in dict) {
            if (dict.hasOwnProperty(key)) {
                a.push({ key: key, val: dict[key] });
            }
        }
        return a;
    };
    MapToIterable = __decorate([
        core_1.Pipe({ name: 'mapToIterable' }), 
        __metadata('design:paramtypes', [])
    ], MapToIterable);
    return MapToIterable;
}());
exports.MapToIterable = MapToIterable;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcGlwZXMvbWFwVG9JdGVyYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWtDLGVBQWUsQ0FBQyxDQUFBO0FBR2xEO0lBQUE7SUFVQSxDQUFDO0lBVEMsaUNBQVMsR0FBVCxVQUFVLElBQVk7UUFDcEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1gsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUM7WUFDckMsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQVZIO1FBQUMsV0FBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLGVBQWUsRUFBQyxDQUFDOztxQkFBQTtJQVc5QixvQkFBQztBQUFELENBVkEsQUFVQyxJQUFBO0FBVlkscUJBQWEsZ0JBVXpCLENBQUEiLCJmaWxlIjoiYXBwL3NoYXJlZC9waXBlcy9tYXBUb0l0ZXJhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe25hbWU6ICdtYXBUb0l0ZXJhYmxlJ30pXG5leHBvcnQgY2xhc3MgTWFwVG9JdGVyYWJsZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oZGljdDogT2JqZWN0KTogQXJyYXkge1xuICAgIHZhciBhID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIGRpY3QpIHtcbiAgICAgIGlmIChkaWN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgYS5wdXNoKHtrZXk6IGtleSwgdmFsOiBkaWN0W2tleV19KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGE7XG4gIH1cbn1cbiJdfQ==
